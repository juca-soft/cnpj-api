import { Hono, type Context } from 'hono'
import { cors } from 'hono/cors'
import { cleanCnpj, isValidCnpj } from './cnpj.js'
import { iconSvg } from './ui/brand.js'
import { DocsNotFound, DocsPage } from './ui/docs.js'
import { Home } from './ui/home.js'
import { docPages, type Lang } from './ui/i18n.js'
import { clientJs } from './ui/client.js'
import { BRASAO_GIF_BASE64 } from './ui/brasao.js'
import { css } from './ui/styles.js'
import { render, type Ctx } from './ui/shell.js'
import { openapi } from './openapi.js'
import { renderCard, toCard } from './card.js'
import { lookupCnpj, proxyPrimary, searchQuery } from './upstream.js'

const app = new Hono()

app.use('*', cors())

const ctxOf = (c: Context, lang: Lang, path: string): Ctx => ({ lang, origin: new URL(c.req.url).origin, path })

// Site: português na raiz, inglês em /en. Registrado antes da rota /:cnpj.
for (const lang of ['pt', 'en'] as const) {
  const prefix = lang === 'en' ? '/en' : ''
  app.get(prefix || '/', async (c) => {
    // Na raiz em português, parâmetros de busca viram a busca paginada (como na Minha Receita).
    const query = lang === 'pt' ? searchQuery(new URL(c.req.url).searchParams) : ''
    if (query) {
      const r = await proxyPrimary(`?${query}`)
      return c.body(r.body, r.status as 200, { 'Content-Type': 'application/json; charset=UTF-8' })
    }
    return c.html(render(Home({ ctx: ctxOf(c, lang, '/') })))
  })
  app.get(`${prefix}/docs`, (c) => c.html(render(DocsPage({ ctx: ctxOf(c, lang, '/docs'), page: docPages[lang][0] }))))
  app.get(`${prefix}/docs/:slug`, (c) => {
    const slug = c.req.param('slug')
    if (slug === 'about') return c.redirect(`${prefix}/docs`, 301)
    const page = docPages[lang].find((p) => p.slug === slug)
    if (!page) return c.html(render(DocsNotFound({ ctx: ctxOf(c, lang, '/docs') })), 404)
    return c.html(render(DocsPage({ ctx: ctxOf(c, lang, `/docs/${slug}`), page })))
  })
}
// Endpoints auxiliares (mesmo contrato da Minha Receita).
app.on(['GET', 'HEAD'], '/healthz', (c) => c.json({ status: 'ok' }))
app.on(['GET', 'HEAD'], '/readyz', (c) => c.json({ status: 'ok' }))
app.get('/updated', async (c) => {
  const r = await proxyPrimary('updated')
  return c.body(r.body, r.status as 200, { 'Content-Type': 'application/json; charset=UTF-8' })
})

app.get('/en/', (c) => c.redirect('/en', 301))

const asset = { 'Cache-Control': 'public, max-age=0, must-revalidate' }
app.get('/assets/app.css', (c) => c.body(css, 200, { ...asset, 'Content-Type': 'text/css; charset=utf-8' }))
app.get('/assets/brasao.gif', (c) =>
  c.body(Buffer.from(BRASAO_GIF_BASE64, 'base64'), 200, { 'Content-Type': 'image/gif', 'Cache-Control': 'public, max-age=86400' })
)
app.get('/assets/app.js', (c) => c.body(clientJs, 200, { ...asset, 'Content-Type': 'text/javascript; charset=utf-8' }))
app.get('/openapi.json', (c) => c.json(openapi))
app.get('/icon.svg', (c) => c.body(iconSvg, 200, { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' }))
app.get('/favicon.ico', (c) => c.redirect('/icon.svg', 301))

// Comprovante de inscrição (HTML). `?embed=1` remove a barra de ações para uso em iframe.
app.get('/cartao/:cnpj{.+}', async (c) => {
  const cnpj = cleanCnpj(c.req.param('cnpj'))
  if (!isValidCnpj(cnpj)) return c.html('<p style="font:16px Arial;padding:2rem">CNPJ inválido.</p>', 400)
  const result = await lookupCnpj(cnpj)
  if (!result.ok) {
    const msg = result.notFound ? 'CNPJ não encontrado.' : 'Nenhuma fonte respondeu agora. Tente novamente em instantes.'
    return c.html(`<p style="font:16px Arial;padding:2rem">${msg}</p>`, result.notFound ? 404 : 502)
  }
  const origin = new URL(c.req.url).origin
  const html = renderCard(toCard(result.data as Record<string, unknown>, result.source, cnpj), {
    embed: c.req.query('embed') === '1',
    url: `${origin}/cartao/${cnpj}`,
    backHref: `/?cnpj=${cnpj}`,
    issuedAt: new Date(),
  })
  return c.html(html)
})

const INVALID = 'CNPJ inválido: informe 12 caracteres alfanuméricos + 2 dígitos verificadores.'

const NOT_FOUND = 'CNPJ não encontrado.'

// `{.+}` permite que a barra do CNPJ mascarado (33.683.111/0002-80) faça parte do parâmetro.
app.get('/api/v1/:cnpj{.+}', async (c) => {
  const cnpj = cleanCnpj(c.req.param('cnpj'))
  if (!isValidCnpj(cnpj)) return c.json({ detail: INVALID }, 400)

  const result = await lookupCnpj(cnpj)
  if (!result.ok && result.notFound) return c.json({ detail: NOT_FOUND }, 404)
  if (!result.ok) {
    return c.json(
      {
        detail: {
          message: 'Falha ao consultar CNPJ em ambas as fontes.',
          minhareceita_error: result.errors.minhareceita,
          receitaws_error: result.errors.receitaws,
        },
      },
      502
    )
  }
  return c.json({ source: result.source, data: result.data })
})

app.get('/:cnpj{.+}', async (c) => {
  const cnpj = cleanCnpj(c.req.param('cnpj'))
  if (!isValidCnpj(cnpj)) return c.json({ error: INVALID }, 400)

  const result = await lookupCnpj(cnpj)
  if (!result.ok && result.notFound) return c.json({ error: NOT_FOUND }, 404)
  if (!result.ok) {
    return c.json(
      {
        message: 'Falha ao consultar CNPJ em ambas as fontes.',
        minhareceita_error: result.errors.minhareceita,
        receitaws_error: result.errors.receitaws,
      },
      502
    )
  }
  c.header('X-Source', result.source)
  return c.json(result.data as object)
})

export default app
