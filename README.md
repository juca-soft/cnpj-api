# CNPJ API

**Português** · [English](README.en.md)

Uma API HTTP simples para consultar empresas brasileiras pelo **CNPJ**, numérico ou **alfanumérico**, com ou sem pontuação. Sem chave de API e sem cadastro.

Feita com [Hono](https://hono.dev) e TypeScript. Vem com página de testes própria, documentação em dois idiomas (pt/en, tema claro/escuro) e o **comprovante de inscrição** pronto para imprimir.

🌐 **<https://cnpj.juk.re>** · [Documentação](https://cnpj.juk.re/docs) · [Testar](https://cnpj.juk.re)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/juca-soft/cnpj-api)

## Começando

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

A fonte que respondeu vem no header `X-Source` (`minhareceita` ou `receitaws`).

## Recursos

- **CNPJ alfanumérico** (o novo formato), além do numérico tradicional.
- **Com ou sem pontuação**: `06990590000123` e `06.990.590/0001-23` funcionam igual. Letras minúsculas são normalizadas.
- **Dígitos verificadores validados** antes de qualquer consulta, então CNPJs inválidos nem chegam aos provedores.
- **Dois provedores**: [Minha Receita](https://docs.minhareceita.org/) primeiro e [ReceitaWS](https://receitaws.com.br) como plano B.
- **Comprovante de inscrição** no layout do original, com QR code e código de barras.
- **Página de testes** com abas de comprovante, resumo e JSON, e documentação em português e inglês.
- **CORS liberado**, e nada do que você consulta é guardado.
- **Rotas v1 e v2** disponíveis ao mesmo tempo.

## Endpoints

| Rota | Descrição |
| --- | --- |
| `GET /{cnpj}` | **v2.** Dados da empresa em JSON, fonte no header `X-Source`. |
| `GET /api/v1/{cnpj}` | **v1** (legada). Resposta envelopada em `{ "source", "data" }`. |
| `GET /cartao/{cnpj}` | Comprovante de inscrição (HTML, imprimível). Com `?embed=1` some a barra de ações. |
| `GET /?uf=DF&limit=10` | Busca paginada (experimental), repassada à Minha Receita. |
| `GET /updated` | Mês de referência dos dados, ex.: `{ "message": "2026-10" }`. |
| `GET /healthz`, `GET /readyz` | Verificações de saúde (`GET` ou `HEAD`). |
| `GET /openapi.json` | Especificação OpenAPI 3.1. |
| `GET /`, `GET /docs/*` | Página de testes e documentação (`/en`, `/en/docs/*` em inglês). |

### Formatos de CNPJ aceitos

```
/06990590000123
/06.990.590/0001-23
/00000000E08G12
/00.000.000/E08G-12
```

A barra do CNPJ mascarado pode ir direto na URL ou codificada como `%2F`.

### Busca paginada

Filtros: `cnae_fiscal`, `cnae`, `cnpf`, `municipio`, `natureza_juridica`, `uf`, `limit` (até 1024) e `cursor`. Para vários valores, repita o parâmetro ou separe por vírgulas. A resposta traz `data` e `cursor`; quando o `cursor` não vem, essa foi a última página. A busca é repassada à Minha Receita, sem plano B, e pode responder `429`.

### Erros

| Status | Quando |
| --- | --- |
| `400` | CNPJ inválido (formato ou dígitos verificadores). Na busca, `limit` ou `cursor` inválidos. |
| `404` | CNPJ válido, mas não encontrado. |
| `429` | Busca paginada: limite do provedor atingido. |
| `502` | Nenhum provedor respondeu. O corpo traz o erro de cada um. |

Na v2 o corpo de erro é `{ "error": "…" }`; na v1, `{ "detail": "…" }`.

## Rodando localmente

Requer Node.js 20+ e [pnpm](https://pnpm.io).

```bash
git clone https://github.com/juca-soft/cnpj-api.git
cd cnpj-api
pnpm install
pnpm dev          # http://localhost:3000 (use PORT para trocar a porta)
```

Outros scripts: `pnpm start` (sem watch) e `pnpm typecheck`.

## Deploy

O projeto está pronto para a [Vercel](https://vercel.com/): o preset do Hono encontra o `src/index.ts` sem configuração extra. Use o botão acima ou importe o repositório no painel da Vercel. O `src/server.ts` é só a entrada para rodar localmente com Node.

## Estrutura do projeto

```
src/
  index.ts      rotas (API, comprovante, docs, arquivos estáticos)
  cnpj.ts       normalização e dígitos verificadores (numérico e alfanumérico)
  upstream.ts   provedores, plano B, cache curto e proxy
  card.ts       comprovante de inscrição (HTML, QR code, código de barras)
  openapi.ts    documento OpenAPI
  server.ts     servidor Node local
  ui/           páginas, textos i18n, estilos e script do navegador
```

## Créditos

Feito pela [JUCA Soft](https://www.jucasoft.com.br/). Este projeto é um **cliente da [Minha Receita](https://docs.minhareceita.org/)** e de outros provedores do mesmo serviço: os dados, a infraestrutura e o trabalho de manter tudo atualizado são deles.

Não há garantia de nível de serviço. Se você precisa de disponibilidade garantida, tenha a sua própria versão. Um bom ponto de partida é o projeto de código aberto [BrasilAPI](https://github.com/BrasilAPI/BrasilAPI); para hospedar a base completa, veja como [montar o seu servidor da Minha Receita](https://docs.minhareceita.org/servidor/).

A página do comprovante é uma visualização feita a partir de dados públicos. Ela não substitui o comprovante oficial, que deve ser emitido no site da Receita Federal.
