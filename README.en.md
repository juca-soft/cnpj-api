# CNPJ API

**English** · [Português](README.md)

A simple HTTP API to look up Brazilian companies by **CNPJ**, numeric or **alphanumeric**, with or without punctuation. No API key, no sign-up.

Built with [Hono](https://hono.dev) and TypeScript. It ships with its own test page, bilingual docs (pt/en, light/dark theme) and a printable **registration certificate** (comprovante de inscrição).

**<https://cnpj.juk.re>** · [Docs](https://cnpj.juk.re/en/docs) · [Try it](https://cnpj.juk.re/en)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/juca-soft/cnpj-api)

## Quick start

```bash
curl https://cnpj.juk.re/06.990.590/0001-23
```

```json
{
  "cnpj": "06990590000123",
  "razao_social": "GOOGLE BRASIL INTERNET LTDA.",
  "uf": "SP",
  "municipio": "SAO PAULO",
  "descricao_situacao_cadastral": "ATIVA",
  "qsa": [ … ]
}
```

The source that answered comes in the `X-Source` response header (`minhareceita` or `receitaws`).

## Features

- **Alphanumeric CNPJ** support (the new format), plus the classic numeric one.
- **With or without punctuation**: `06990590000123` and `06.990.590/0001-23` work the same. Lowercase letters are normalized.
- **Check digits are validated** before any lookup, so invalid CNPJs never reach the providers.
- **Two providers**: [Minha Receita](https://docs.minhareceita.org/) first, [ReceitaWS](https://receitaws.com.br) as a fallback.
- **Registration certificate** in the layout of the official one, with QR code and barcode.
- **Test page** with certificate, summary and JSON tabs, and docs in Portuguese and English.
- **CORS enabled**, nothing you look up is stored.
- **v1 and v2** routes available side by side.

## Endpoints

| Route | Description |
| --- | --- |
| `GET /{cnpj}` | **v2.** Company data as JSON, source in the `X-Source` header. |
| `GET /api/v1/{cnpj}` | **v1** (legacy). Response wrapped in `{ "source", "data" }`. |
| `GET /cartao/{cnpj}` | Registration certificate (HTML, printable). Add `?embed=1` to drop the toolbar. |
| `GET /?uf=DF&limit=10` | Paginated search (experimental), forwarded to Minha Receita. |
| `GET /updated` | Reference month of the data, e.g. `{ "message": "2026-10" }`. |
| `GET /healthz`, `GET /readyz` | Health checks (`GET` or `HEAD`). |
| `GET /openapi.json` | OpenAPI 3.1 specification. |
| `GET /`, `GET /docs/*` | Test page and docs (`/en`, `/en/docs/*` in English). |

### Accepted CNPJ formats

```
/06990590000123
/06.990.590/0001-23
/00000000E08G12
/00.000.000/E08G-12
```

The slash of a masked CNPJ can go straight in the URL or encoded as `%2F`.

### Paginated search

Filters: `cnae_fiscal`, `cnae`, `cnpf`, `municipio`, `natureza_juridica`, `uf`, `limit` (up to 1024) and `cursor`. Repeat a parameter or use commas for several values. The response carries `data` and `cursor`; when `cursor` is missing, that was the last page. It is forwarded to Minha Receita with no fallback and may answer `429`.

### Errors

| Status | When |
| --- | --- |
| `400` | Invalid CNPJ (format or check digits). On search, invalid `limit` or `cursor`. |
| `404` | Valid CNPJ, but not found. |
| `429` | Paginated search: provider limit reached. |
| `502` | No provider answered. The body carries each provider's error. |

The v2 error body is `{ "error": "…" }`; v1 uses `{ "detail": "…" }`.

## Run locally

Requires Node.js 20+ and [pnpm](https://pnpm.io).

```bash
git clone https://github.com/juca-soft/cnpj-api.git
cd cnpj-api
pnpm install
pnpm dev          # http://localhost:3000 (set PORT to change it)
```

Other scripts: `pnpm start` (no watch) and `pnpm typecheck`.

## Deploy

The project is ready for [Vercel](https://vercel.com/): the Hono preset picks up `src/index.ts` with no extra config. Use the button above, or import the repository in the Vercel dashboard. `src/server.ts` is only the local Node entry point.

## Project layout

```
src/
  index.ts      routes (API, certificate, docs, assets)
  cnpj.ts       normalization and check digits (numeric and alphanumeric)
  upstream.ts   providers, fallback, short cache and proxy
  card.ts       registration certificate (HTML, QR code, barcode)
  openapi.ts    OpenAPI document
  server.ts     local Node server
  ui/           pages, i18n texts, styles and browser script
```

## Credits

Made by [JUCA Soft](https://www.jucasoft.com.br/). This project is a **client of [Minha Receita](https://docs.minhareceita.org/)** and of other providers of the same service: the data, the infrastructure and the work of keeping it up to date are theirs.

There is no service-level guarantee. If you need guaranteed availability, run your own version. A good starting point is the open source [BrasilAPI](https://github.com/BrasilAPI/BrasilAPI) project; to host the full database, see how to [set up your own Minha Receita server](https://docs.minhareceita.org/servidor/).

The certificate page is a visualization built from public data. It does not replace the official certificate, which must be issued on the Receita Federal website.
