const cnpjParam = (description: string) => ({
  name: 'cnpj',
  in: 'path',
  required: true,
  description,
  schema: { type: 'string' },
  examples: {
    numerico: { summary: 'Numérico, sem máscara', value: '06990590000123' },
    mascara: { summary: 'Com pontuação (a barra é aceita na URL)', value: '06.990.590/0001-23' },
    alfanumerico: { summary: 'Alfanumérico', value: '00000000E08G12' },
  },
})

const errorResponses = (key: 'error' | 'detail') => ({
  400: {
    description: 'CNPJ com formato ou dígitos verificadores inválidos.',
    content: {
      'application/json': {
        schema: { type: 'object', properties: { [key]: { type: 'string' } }, required: [key] },
        example: { [key]: 'CNPJ inválido: informe 12 caracteres alfanuméricos + 2 dígitos verificadores.' },
      },
    },
  },
  404: {
    description: 'CNPJ válido, mas não encontrado nas fontes.',
    content: {
      'application/json': {
        schema: { type: 'object', properties: { [key]: { type: 'string' } }, required: [key] },
        example: { [key]: 'CNPJ não encontrado.' },
      },
    },
  },
  502: {
    description: 'Nenhuma das fontes respondeu.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            minhareceita_error: { type: 'string' },
            receitaws_error: { type: 'string' },
          },
        },
      },
    },
  },
})

const description = `
API para consulta de dados cadastrais de empresas brasileiras a partir do **CNPJ**.

## Formatos de CNPJ aceitos

O CNPJ pode ser enviado **com ou sem pontuação**, e suporta o novo **CNPJ alfanumérico** (12 caracteres \`0-9A-Z\` + 2 dígitos verificadores):

| Entrada | Exemplo |
| --- | --- |
| Somente números | \`/06990590000123\` |
| Com máscara | \`/06.990.590/0001-23\` |
| Alfanumérico | \`/00000000E08G12\` |
| Alfanumérico com máscara | \`/00.000.000/E08G-12\` |

Letras minúsculas são normalizadas para maiúsculas. Os dígitos verificadores são validados antes de qualquer consulta externa.

## Fontes

Os dados vêm da [Minha Receita](https://minhareceita.org); em caso de falha, é usada a [ReceitaWS](https://receitaws.com.br) como fallback (limite de ~3 req/min).

## Versões

- **v2** — \`GET /{cnpj}\`: retorna os dados diretamente; a fonte vem no header \`X-Source\`.
- **v1** — \`GET /api/v1/{cnpj}\`: mantida por compatibilidade, retorna \`{ "source", "data" }\`.
`

export const openapi = {
  openapi: '3.1.0',
  info: {
    title: 'CNPJ API',
    version: '2.0.0',
    description,
    license: { name: 'MIT' },
  },
  servers: [
    { url: 'https://cnpj.juk.re', description: 'Produção' },
    { url: '/', description: 'Servidor atual' },
  ],
  tags: [
    { name: 'v2', description: 'Versão atual.' },
    { name: 'v1', description: 'Versão legada, mantida por compatibilidade.' },
  ],
  paths: {
    '/{cnpj}': {
      get: {
        tags: ['v2'],
        summary: 'Consultar CNPJ',
        operationId: 'getCnpjV2',
        parameters: [cnpjParam('CNPJ numérico ou alfanumérico, com ou sem pontuação.')],
        responses: {
          200: {
            description: 'Dados da empresa, no formato da fonte que respondeu.',
            headers: {
              'X-Source': {
                description: 'Fonte que respondeu a consulta.',
                schema: { type: 'string', enum: ['minhareceita', 'receitaws'] },
              },
            },
            content: {
              'application/json': {
                schema: { type: 'object', additionalProperties: true },
                example: {
                  cnpj: '06990590000123',
                  razao_social: 'GOOGLE BRASIL INTERNET LTDA.',
                  uf: 'SP',
                  descricao_situacao_cadastral: 'ATIVA',
                },
              },
            },
          },
          ...errorResponses('error'),
        },
      },
    },
    '/api/v1/{cnpj}': {
      get: {
        tags: ['v1'],
        summary: 'Consultar CNPJ (v1)',
        operationId: 'getCnpjV1',
        parameters: [cnpjParam('CNPJ numérico ou alfanumérico, com ou sem pontuação.')],
        responses: {
          200: {
            description: 'Dados da empresa envelopados com a fonte.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    source: { type: 'string', enum: ['minhareceita', 'receitaws'] },
                    data: { type: 'object', additionalProperties: true },
                  },
                  required: ['source', 'data'],
                },
                example: {
                  source: 'minhareceita',
                  data: { cnpj: '06990590000123', razao_social: 'GOOGLE BRASIL INTERNET LTDA.' },
                },
              },
            },
          },
          ...errorResponses('detail'),
        },
      },
    },
  },
}
