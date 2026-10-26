const PRIMARY_URL = 'https://minhareceita.org/'
const FALLBACK_URL = 'https://receitaws.com.br/v1/cnpj/' // limite ~3 req/min
const TIMEOUT_MS = 12_000

export type Source = 'minhareceita' | 'receitaws'

export type LookupResult =
  | { ok: true; source: Source; data: unknown }
  | { ok: false; notFound: true }
  | { ok: false; notFound?: false; errors: { minhareceita: string; receitaws: string } }

class HttpError extends Error {
  constructor(readonly status: number, url: string) {
    super(`HTTP ${status} ao consultar ${new URL(url).host}`)
  }
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) throw new HttpError(res.status, url)
  return res.json()
}

const message = (e: unknown) => (e instanceof Error ? e.message : String(e))

const CACHE_TTL_MS = 5 * 60_000
const cache = new Map<string, { at: number; result: LookupResult }>()

/** Consulta com cache curto: evita repetir a chamada quando a página pede JSON e comprovante em seguida. */
export async function lookupCnpj(cnpj: string): Promise<LookupResult> {
  const hit = cache.get(cnpj)
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.result
  const result = await lookupUncached(cnpj)
  if (result.ok || result.notFound) {
    if (cache.size > 500) cache.clear()
    cache.set(cnpj, { at: Date.now(), result })
  }
  return result
}

/** Consulta a Minha Receita e, se falhar, a ReceitaWS. */
async function lookupUncached(cnpj: string): Promise<LookupResult> {
  let primaryError: string
  try {
    return { ok: true, source: 'minhareceita', data: await fetchJson(PRIMARY_URL + cnpj) }
  } catch (e) {
    // 404 na fonte primária: o CNPJ é válido mas não existe na base.
    if (e instanceof HttpError && e.status === 404) return { ok: false, notFound: true }
    primaryError = message(e)
  }

  try {
    const data = await fetchJson(FALLBACK_URL + cnpj)
    // A ReceitaWS responde 200 com status "ERROR" para CNPJs rejeitados/inexistentes.
    if ((data as { status?: string })?.status === 'ERROR') return { ok: false, notFound: true }
    return { ok: true, source: 'receitaws', data }
  } catch (e) {
    return { ok: false, errors: { minhareceita: primaryError, receitaws: message(e) } }
  }
}

const SEARCH_PARAMS = ['cnae_fiscal', 'cnae', 'cnpf', 'municipio', 'natureza_juridica', 'uf', 'limit', 'cursor']

/** Parâmetros de busca aceitos na raiz (`/?uf=DF`). Vazio quando a requisição não é uma busca. */
export function searchQuery(params: URLSearchParams): string {
  const out = new URLSearchParams()
  for (const [k, v] of params) if (SEARCH_PARAMS.includes(k)) out.append(k, v)
  return out.toString()
}

/** Repassa uma rota da Minha Receita (busca paginada, /updated) com o status original. Sem fallback. */
export async function proxyPrimary(pathAndQuery: string): Promise<{ status: number; body: string }> {
  try {
    const res = await fetch(PRIMARY_URL + pathAndQuery, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(30_000),
    })
    return { status: res.status, body: await res.text() }
  } catch (e) {
    return { status: 502, body: JSON.stringify({ error: `Falha ao consultar minhareceita.org: ${message(e)}` }) }
  }
}
