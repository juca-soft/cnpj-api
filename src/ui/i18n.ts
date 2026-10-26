export type Lang = 'pt' | 'en'
export const langs: Lang[] = ['pt', 'en']
export const langNames: Record<Lang, string> = { pt: 'Português', en: 'English' }

/** Prefixo de URL de cada idioma: português na raiz, inglês em /en. */
export const base = (lang: Lang) => (lang === 'en' ? '/en' : '')

export type Block =
  | { t: 'h2'; id: string; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul' | 'ol'; items: string[] }
  | { t: 'code'; code: string }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'callout'; text: string }
  | { t: 'endpoint'; path: string; badge?: string }
  | { t: 'snippets'; path: string }

export type DocPage = { slug: string; group: 'start' | 'reference' | 'data'; title: string; lead: string; blocks: Block[] }

const MR = 'https://docs.minhareceita.org/'
const EX = '06.990.590/0001-23'

export const ui = {
  pt: {
    htmlLang: 'pt-BR',
    title: 'CNPJ API · consulta de CNPJ numérico e alfanumérico',
    description: 'API HTTP para consultar empresas pelo CNPJ, numérico ou alfanumérico, com ou sem pontuação. Sem chave e sem cadastro.',
    nav: { test: 'Testar', docs: 'Documentação', api: 'API', home: 'Início', github: 'GitHub', theme: 'Alternar tema', language: 'Idioma', menu: 'Menu', themeTitle: 'Tema', light: 'Claro', system: 'Sistema', dark: 'Escuro' },
    demo: { placeholder: '00.000.000/0000-00 ou 00.000.000/E08G-12', search: 'Consultar', examples: 'Exemplos', card: 'Comprovante de inscrição', summary: 'Resumo', json: 'JSON', copy: 'Copiar', copied: 'Copiado' },
    home: {
      title: 'Consulte um CNPJ',
      text: 'Digite o número e veja o comprovante de inscrição, um resumo dos dados e o JSON que a API devolve.',
      empty: 'Digite um CNPJ acima para ver o resultado aqui.',
      curlTitle: 'Ou faça direto pelo terminal',
      links: [['Como usar', 'Consulta, busca e endpoints auxiliares.', '/docs/usage'], ['CNPJ alfanumérico', 'O novo formato, com letras.', '/docs/alphanumeric'], ['Perguntas frequentes', 'Limites, disponibilidade e dúvidas comuns.', '/docs/faq']],
    },
    result: {
      openCard: 'Abrir em nova aba',
      tabCard: 'Comprovante de inscrição',
      loading: 'Consultando…',
      network: 'Falha de rede. Tente novamente.',
      invalid: 'CNPJ inválido: informe 12 caracteres alfanuméricos + 2 dígitos verificadores.',
      notFound: 'CNPJ válido, mas não encontrado na base.',
      upstream: 'Nenhuma das fontes respondeu agora. Tente novamente em instantes.',
      source: 'fonte',
      partners: 'Quadro societário',
      noPartners: 'Sem sócios informados.',
      fields: { cnpj: 'CNPJ', fantasy: 'Nome fantasia', opened: 'Início da atividade', type: 'Tipo', size: 'Porte', legal: 'Natureza jurídica', capital: 'Capital social', cnae: 'Atividade principal', address: 'Endereço', phone: 'Telefone', email: 'E-mail' },
    },
    footer: {
      credit: 'Feito pela JUCA Soft. Os dados vêm da Minha Receita e de outros provedores do mesmo serviço: somos um cliente deles e agradecemos o trabalho de manter essa base aberta.',
      madeBy: 'Um projeto',
      project: 'Projeto',
      providers: 'Provedores',
      rights: 'Todos os direitos reservados',
      devBy: 'desenvolvido por',
    },
    docs: { search: 'Buscar na documentação', noResults: 'Nada encontrado.', menu: 'Menu da documentação', onThisPage: 'Nesta página', copyPage: 'Copiar página', copied: 'Copiado', prev: 'Anterior', next: 'Próxima', tabGuides: 'Guias', groups: { start: 'Primeiros passos', reference: 'Referência', data: 'Dados' }, notFound: 'Página não encontrada', backDocs: 'Voltar para a documentação' },
  },
  en: {
    htmlLang: 'en',
    title: 'CNPJ API · numeric and alphanumeric CNPJ lookup',
    description: 'HTTP API to look up Brazilian companies by CNPJ, numeric or alphanumeric, with or without punctuation. No key, no sign-up.',
    nav: { test: 'Try it', docs: 'Documentation', api: 'API', home: 'Home', github: 'GitHub', theme: 'Toggle theme', language: 'Language', menu: 'Menu', themeTitle: 'Theme', light: 'Light', system: 'System', dark: 'Dark' },
    demo: { placeholder: '00.000.000/0000-00 or 00.000.000/E08G-12', search: 'Look up', examples: 'Examples', card: 'Registration certificate', summary: 'Summary', json: 'JSON', copy: 'Copy', copied: 'Copied' },
    home: {
      title: 'Look up a CNPJ',
      text: 'Type the number and see the registration certificate, a summary of the data and the JSON the API returns.',
      empty: 'Type a CNPJ above to see the result here.',
      curlTitle: 'Or do it straight from the terminal',
      links: [['How to use', 'Lookup, search and auxiliary endpoints.', '/docs/usage'], ['Alphanumeric CNPJ', 'The new format, with letters.', '/docs/alphanumeric'], ['FAQ', 'Limits, availability and common questions.', '/docs/faq']],
    },
    result: {
      openCard: 'Open in a new tab',
      tabCard: 'Registration certificate',
      loading: 'Looking up…',
      network: 'Network error. Please try again.',
      invalid: 'Invalid CNPJ: use 12 alphanumeric characters + 2 check digits.',
      notFound: 'Valid CNPJ, but not found in the database.',
      upstream: 'Neither source answered right now. Please try again shortly.',
      source: 'source',
      partners: 'Partners',
      noPartners: 'No partners listed.',
      fields: { cnpj: 'CNPJ', fantasy: 'Trade name', opened: 'Activity start', type: 'Type', size: 'Size', legal: 'Legal nature', capital: 'Share capital', cnae: 'Main activity', address: 'Address', phone: 'Phone', email: 'Email' },
    },
    footer: {
      credit: 'Made by JUCA Soft. The data comes from Minha Receita and other providers of the same service: we are a client of theirs, and we are grateful for the work of keeping this database open.',
      madeBy: 'A project by',
      project: 'Project',
      providers: 'Providers',
      rights: 'All rights reserved',
      devBy: 'built by',
    },
    docs: { search: 'Search the docs', noResults: 'Nothing found.', menu: 'Docs menu', onThisPage: 'On this page', copyPage: 'Copy page', copied: 'Copied', prev: 'Previous', next: 'Next', tabGuides: 'Guides', groups: { start: 'Getting started', reference: 'Reference', data: 'Data' }, notFound: 'Page not found', backDocs: 'Back to the docs' },
  },
}

const searchParamsPt: string[][] = [
  ['`cnae_fiscal`', 'CNAE fiscal (principal) do estabelecimento.'],
  ['`cnae`', 'CNAE principal ou secundário.'],
  ['`cnpf`', 'CPF ou CNPJ de um sócio.'],
  ['`municipio`', 'Código do município (IBGE ou SIAFI).'],
  ['`natureza_juridica`', 'Código da natureza jurídica.'],
  ['`uf`', 'Sigla do estado.'],
  ['`limit`', 'Itens por página, no máximo 1024.'],
  ['`cursor`', 'Cursor devolvido pela página anterior.'],
]
const searchParamsEn: string[][] = [
  ['`cnae_fiscal`', 'Main fiscal CNAE of the establishment.'],
  ['`cnae`', 'Main or secondary CNAE.'],
  ['`cnpf`', 'CPF or CNPJ of a partner.'],
  ['`municipio`', 'Municipality code (IBGE or SIAFI).'],
  ['`natureza_juridica`', 'Legal nature code.'],
  ['`uf`', 'State abbreviation.'],
  ['`limit`', 'Items per page, at most 1024.'],
  ['`cursor`', 'Cursor returned by the previous page.'],
]

const sampleResponse = `{
  "cnpj": "06990590000123",
  "razao_social": "GOOGLE BRASIL INTERNET LTDA.",
  "uf": "SP",
  "municipio": "SAO PAULO",
  "descricao_situacao_cadastral": "ATIVA",
  "qsa": [ … ]
}`

export const docPages: Record<Lang, DocPage[]> = {
  pt: [
    {
      slug: 'about',
      group: 'start',
      title: 'Sobre',
      lead: 'Uma forma simples de consultar empresas brasileiras pelo CNPJ.',
      blocks: [
        { t: 'h2', id: 'proposito', text: 'Para que serve' },
        { t: 'p', text: 'Os dados de CNPJ são públicos, mas nem sempre é fácil chegar até eles: ficam atrás de CAPTCHA ou espalhados em vários arquivos. Aqui você manda o número do CNPJ e recebe a resposta em JSON, sem chave e sem cadastro.' },
        { t: 'code', code: `GET /${EX}` },
        { t: 'callout', text: 'Quer só ver funcionando? Na [página de testes](/) você digita o CNPJ e recebe o comprovante de inscrição, um resumo e o JSON.' },
        { t: 'h2', id: 'como-funciona', text: 'Como funciona' },
        { t: 'p', text: 'Esta API não guarda uma base própria. Quando você faz uma consulta, ela confere se o CNPJ é válido e pergunta para a [Minha Receita](https://minhareceita.org). Se ela não responder, tenta a ReceitaWS. Você recebe o que o provedor devolveu, e o header `X-Source` diz qual foi.' },
        { t: 'ul', items: ['Funciona com **CNPJ numérico e alfanumérico**, com ou sem pontos, barra e traço.', 'CNPJs inválidos são recusados na hora, sem gastar consulta dos provedores.', 'Dá para chamar direto do navegador (CORS liberado).', 'Nada do que você consulta fica guardado.'] },
        { t: 'h2', id: 'creditos', text: 'Créditos' },
        { t: 'callout', text: `Este projeto é feito pela **JUCA Soft** e é um **cliente da [Minha Receita](${MR})** e de outros provedores do mesmo serviço. Os dados, a infraestrutura e o trabalho de manter tudo atualizado são deles, e é por causa desse trabalho aberto que esta API existe.` },
        { t: 'h2', id: 'sua-versao', text: 'Quer ter a sua própria versão?' },
        { t: 'p', text: 'Se você precisa de mais controle ou de disponibilidade garantida, o caminho é rodar a sua própria API de CNPJ. Um bom ponto de partida é a base do projeto [BrasilAPI](https://github.com/BrasilAPI/BrasilAPI), que é de código aberto. Para hospedar a base completa, veja também como [montar o seu servidor da Minha Receita](' + MR + 'servidor/).' },
      ],
    },
    {
      slug: 'usage',
      group: 'start',
      title: 'Como usar',
      lead: 'Como consultar um CNPJ, buscar empresas e checar se o servidor está no ar.',
      blocks: [
        { t: 'p', text: 'Os exemplos usam o endereço em que você está lendo esta página. As respostas são sempre JSON.' },
        { t: 'h2', id: 'consulta', text: 'Consulta por CNPJ' },
        { t: 'endpoint', path: '/{cnpj}', badge: 'v2' },
        { t: 'p', text: 'Retorna os dados da empresa em JSON. A fonte que respondeu vem no header `X-Source` (`minhareceita` ou `receitaws`). O CNPJ pode ser enviado com ou sem pontuação.' },
        { t: 'snippets', path: `/${EX}` },
        { t: 'code', code: sampleResponse },
        { t: 'table', head: ['Status', 'Quando'], rows: [['`200`', 'Consulta realizada com sucesso.'], ['`400`', 'CNPJ com formato ou dígitos verificadores inválidos.'], ['`404`', 'CNPJ válido, mas inexistente na base.'], ['`502`', 'Nenhum provedor respondeu.']] },
        { t: 'h2', id: 'formatos', text: 'Formatos aceitos' },
        { t: 'table', head: ['Tipo', 'Exemplo'], rows: [['Numérico', '`/06990590000123`'], ['Numérico com máscara', '`/06.990.590/0001-23`'], ['Alfanumérico', '`/00000000E08G12`'], ['Alfanumérico com máscara', '`/00.000.000/E08G-12`']] },
        { t: 'p', text: 'Removemos `.`, `/`, `-` e espaços, passamos as letras para maiúsculas e conferimos o formato e os dígitos verificadores. A barra do CNPJ mascarado pode ir direto na URL ou como `%2F`. Veja [CNPJ alfanumérico](/docs/alphanumeric).' },
        { t: 'h2', id: 'comprovante', text: 'Comprovante de inscrição' },
        { t: 'endpoint', path: '/cartao/{cnpj}' },
        { t: 'p', text: 'Abre uma página com os dados no formato do comprovante de inscrição e de situação cadastral, com QR code e código de barras, pronta para imprimir ou salvar em PDF. Não substitui o comprovante oficial da Receita Federal.' },
        { t: 'h2', id: 'busca', text: 'Busca paginada' },
        { t: 'endpoint', path: '/?uf=DF&natureza_juridica=1015&limit=10', badge: 'experimental' },
        { t: 'p', text: 'Lista empresas a partir de filtros. A busca é repassada à Minha Receita, sem plano B, e pode responder `429` quando o limite do servidor é atingido. Sem nenhum filtro, a rota `/` mostra a página de testes.' },
        { t: 'table', head: ['Parâmetro', 'Descrição'], rows: searchParamsPt },
        { t: 'ul', items: ['Para vários valores, repita o parâmetro ou separe por vírgulas: `uf=DF,GO`.', 'CPFs de sócios são mascarados, então busque com `*` nos três primeiros e nos dois últimos dígitos: `***456789**`.', 'Buscar só por CPF ou CNPJ de sócio pode estourar o tempo; combine com `uf`.', '`limit` ou `cursor` inválidos retornam `400`.'] },
        { t: 'p', text: 'A resposta traz `data` (a lista) e `cursor`. Passe o `cursor` na próxima chamada para avançar; quando ele não vier, essa foi a última página.' },
        { t: 'code', code: `{\n  "data": [ { "cnpj": "01690511000145", "razao_social": "…" } ],\n  "cursor": "…"\n}` },
        { t: 'h2', id: 'auxiliares', text: 'Endpoints auxiliares' },
        { t: 'table', head: ['Rota', 'Descrição'], rows: [['`GET /updated`', 'Mês de referência dos dados da Receita Federal, no formato `{ "message": "2026-10" }`.'], ['`GET` ou `HEAD /healthz`', 'O servidor está no ar.'], ['`GET` ou `HEAD /readyz`', 'O servidor está pronto para responder consultas.'], ['`GET /openapi.json`', 'Especificação OpenAPI 3.1.']] },
        { t: 'p', text: 'Todos respondem `200` quando está tudo certo. O `/metrics` da Minha Receita não é oferecido aqui.' },
      ],
    },
    {
      slug: 'alphanumeric',
      group: 'start',
      title: 'CNPJ alfanumérico',
      lead: 'O novo formato do CNPJ, com letras nas 12 primeiras posições.',
      blocks: [
        { t: 'p', text: 'A Receita Federal passou a emitir CNPJs alfanuméricos para novos cadastros a partir de julho de 2026. Os CNPJs numéricos existentes continuam valendo, sem mudança.' },
        { t: 'h2', id: 'estrutura', text: 'Estrutura' },
        { t: 'table', head: ['Posições', 'Conteúdo'], rows: [['1 a 8', 'Raiz: letras `A-Z` e números'], ['9 a 12', 'Ordem (filial): letras e números'], ['13 e 14', 'Dígitos verificadores: sempre números']] },
        { t: 'h2', id: 'calculo', text: 'Cálculo dos dígitos' },
        { t: 'p', text: 'É o módulo 11 de sempre, só que cada caractere vale o seu código ASCII menos 48. Assim `0-9` continuam valendo 0 a 9 e `A-Z` valem 17 a 42.' },
        { t: 'code', code: `valor("7") = 55 - 48 = 7\nvalor("A") = 65 - 48 = 17\nvalor("Z") = 90 - 48 = 42\n\npesos 1º dígito: 5 4 3 2 9 8 7 6 5 4 3 2\npesos 2º dígito: 6 5 4 3 2 9 8 7 6 5 4 3 2\n\nresto = soma % 11\ndígito = resto < 2 ? 0 : 11 - resto` },
        { t: 'p', text: 'Exemplo válido: `00000000E08G12`.' },
      ],
    },
    {
      slug: 'v1',
      group: 'reference',
      title: 'Versão v1',
      lead: 'A versão original, mantida por compatibilidade.',
      blocks: [
        { t: 'endpoint', path: '/api/v1/{cnpj}', badge: 'v1' },
        { t: 'p', text: 'Aceita os mesmos formatos de CNPJ da v2. A diferença é o envelope na resposta e o formato dos erros.' },
        { t: 'code', code: `{\n  "source": "minhareceita",\n  "data": { "cnpj": "06990590000123", "razao_social": "GOOGLE BRASIL INTERNET LTDA.", … }\n}` },
        { t: 'h2', id: 'migrar', text: 'Migrando para a v2' },
        { t: 'table', head: ['', 'v1', 'v2'], rows: [['Rota', '`/api/v1/{cnpj}`', '`/{cnpj}`'], ['Corpo', '`{ source, data }`', 'dados direto'], ['Fonte', '`source`', 'header `X-Source`'], ['Erros', '`{ detail }`', '`{ error }`']] },
      ],
    },
    {
      slug: 'errors',
      group: 'reference',
      title: 'Erros',
      lead: 'Códigos de status e formato das respostas de erro.',
      blocks: [
        { t: 'table', head: ['Status', 'Quando'], rows: [['`400`', 'CNPJ com formato ou dígitos verificadores inválidos; na busca, `limit` ou `cursor` inválidos.'], ['`404`', 'CNPJ válido, mas inexistente na base.'], ['`429`', 'Busca paginada: limite do servidor atingido.'], ['`502`', 'Nenhum provedor respondeu. O corpo traz o erro de cada um.']] },
        { t: 'h2', id: 'formato', text: 'Formato' },
        { t: 'code', code: `// v2\n{ "error": "CNPJ inválido: informe 12 caracteres alfanuméricos + 2 dígitos verificadores." }\n\n// v1\n{ "detail": "CNPJ inválido: informe 12 caracteres alfanuméricos + 2 dígitos verificadores." }` },
        { t: 'h2', id: '502', text: 'Erro 502' },
        { t: 'code', code: `{\n  "message": "Falha ao consultar CNPJ em ambas as fontes.",\n  "minhareceita_error": "HTTP 500 ao consultar minhareceita.org",\n  "receitaws_error": "HTTP 429 ao consultar receitaws.com.br"\n}` },
      ],
    },
    {
      slug: 'dictionary',
      group: 'reference',
      title: 'Dicionário de dados',
      lead: 'Os principais campos da resposta.',
      blocks: [
        { t: 'callout', text: `Os campos seguem o provedor que respondeu. Os nomes abaixo são os da Minha Receita; o dicionário completo está em [docs.minhareceita.org/dicionario](${MR}dicionario/). Quando a consulta cai na ReceitaWS, os nomes são outros (por exemplo, \`nome\` no lugar de \`razao_social\`).` },
        { t: 'table', head: ['Campo', 'Descrição'], rows: [['`cnpj`', 'CNPJ com 14 caracteres, sem pontuação.'], ['`razao_social`', 'Nome empresarial.'], ['`nome_fantasia`', 'Nome fantasia.'], ['`descricao_situacao_cadastral`', 'Situação cadastral (ATIVA, BAIXADA etc.). O código vem em `situacao_cadastral`.'], ['`data_inicio_atividade`', 'Data de início da atividade.'], ['`descricao_identificador_matriz_filial`', 'MATRIZ ou FILIAL.'], ['`porte`', 'Porte da empresa.'], ['`natureza_juridica`', 'Natureza jurídica (código em `codigo_natureza_juridica`).'], ['`capital_social`', 'Capital social, em reais.'], ['`cnae_fiscal`, `cnae_fiscal_descricao`', 'Atividade econômica principal.'], ['`cnaes_secundarios`', 'Lista de atividades secundárias.'], ['`logradouro`, `numero`, `bairro`, `municipio`, `uf`, `cep`', 'Endereço.'], ['`ddd_telefone_1`, `email`', 'Contatos.'], ['`opcao_pelo_simples`, `opcao_pelo_mei`', 'Enquadramento no Simples e no MEI.'], ['`regime_tributario`', 'Formas de tributação por ano.'], ['`qsa`', 'Quadro de sócios e administradores.']] },
      ],
    },
    {
      slug: 'sources',
      group: 'data',
      title: 'Sobre os dados',
      lead: 'De onde vêm as informações e o que acontece quando um provedor falha.',
      blocks: [
        { t: 'ol', items: [`**Minha Receita** (\`minhareceita.org\`): provedor primário. Consolida os dados abertos da Receita Federal. [Saiba mais](${MR}sobre-os-dados/).`, '**ReceitaWS** (`receitaws.com.br`): usada só se o primário falhar. O limite dela é de cerca de 3 requisições por minuto.'] },
        { t: 'p', text: 'Se a Minha Receita responder `404`, devolvemos `404` na hora, sem tentar o fallback. A data de referência da base está em `/updated`.' },
        { t: 'p', text: 'A busca paginada e o `/updated` existem só na Minha Receita e são repassados sem fallback.' },
        { t: 'callout', text: 'Nada que você consulta é guardado por esta API.' },
      ],
    },
    {
      slug: 'faq',
      group: 'data',
      title: 'Perguntas frequentes',
      lead: 'Respostas rápidas sobre uso, limites e disponibilidade.',
      blocks: [
        { t: 'h2', id: 'chave', text: 'Preciso de chave ou cadastro?' },
        { t: 'p', text: 'Não. É só fazer o `GET`.' },
        { t: 'h2', id: 'limite', text: 'Existe limite de uso?' },
        { t: 'p', text: 'Esta API não impõe limite próprio, mas os provedores impõem: a ReceitaWS aceita cerca de 3 requisições por minuto e a busca paginada pode responder `429`.' },
        { t: 'h2', id: 'producao', text: 'Posso usar em produção?' },
        { t: 'p', text: 'Pode, mas sem garantia de disponibilidade: dependemos dos provedores e não prometemos um nível de serviço. Se o seu sistema não pode parar, tenha a sua própria versão (veja a pergunta abaixo).' },
        { t: 'h2', id: 'propria-versao', text: 'Como crio a minha própria API de CNPJ?' },
        { t: 'p', text: 'Uma boa base para começar é o projeto [BrasilAPI](https://github.com/BrasilAPI/BrasilAPI), que é de código aberto. Se quiser hospedar a base completa da Receita, veja também como [montar o seu servidor da Minha Receita](' + MR + 'servidor/).' },
        { t: 'h2', id: 'alfanumerico', text: 'O CNPJ alfanumérico funciona?' },
        { t: 'p', text: 'Sim, o formato e os dígitos são validados aqui. Se o provedor ainda não tiver o CNPJ, você recebe `404`.' },
        { t: 'h2', id: 'campos', text: 'Por que os campos mudam?' },
        { t: 'p', text: 'Porque a resposta é a do provedor que respondeu. O header `X-Source` diz qual foi.' },
        { t: 'h2', id: 'problema', text: 'Como reporto um problema?' },
        { t: 'p', text: 'Abra uma issue no [GitHub do projeto](https://github.com/juca-soft/cnpj-api).' },
      ],
    },
  ],
  en: [
    {
      slug: 'about',
      group: 'start',
      title: 'About',
      lead: 'A simple way to look up Brazilian companies by CNPJ.',
      blocks: [
        { t: 'h2', id: 'purpose', text: 'What it is for' },
        { t: 'p', text: 'CNPJ data is public, but it is not always easy to get to: it sits behind a CAPTCHA or is spread across many files. Here you send the CNPJ number and get the answer as JSON, with no key and no sign-up.' },
        { t: 'code', code: `GET /${EX}` },
        { t: 'callout', text: 'Just want to see it working? On the [test page](/en) you type the CNPJ and get the registration certificate, a summary and the JSON.' },
        { t: 'h2', id: 'how-it-works', text: 'How it works' },
        { t: 'p', text: 'This API keeps no database of its own. When you make a request, it checks that the CNPJ is valid and asks [Minha Receita](https://minhareceita.org). If that does not answer, it tries ReceitaWS. You get what the provider returned, and the `X-Source` header tells you which one it was.' },
        { t: 'ul', items: ['Works with **numeric and alphanumeric CNPJ**, with or without dots, slash and dash.', 'Invalid CNPJs are refused right away, without spending a provider request.', 'You can call it straight from the browser (CORS enabled).', 'Nothing you look up is stored.'] },
        { t: 'h2', id: 'credits', text: 'Credits' },
        { t: 'callout', text: `This project is made by **JUCA Soft** and is a **client of [Minha Receita](${MR})** and of other providers of the same service. The data, the infrastructure and the work of keeping everything up to date are theirs, and this API exists thanks to that open work.` },
        { t: 'h2', id: 'your-own', text: 'Want your own version?' },
        { t: 'p', text: 'If you need more control or guaranteed availability, the way to go is running your own CNPJ API. A good starting point is the base of the [BrasilAPI](https://github.com/BrasilAPI/BrasilAPI) project, which is open source. To host the full database, also see how to [set up your own Minha Receita server](' + MR + 'servidor/).' },
      ],
    },
    {
      slug: 'usage',
      group: 'start',
      title: 'How to use',
      lead: 'How to look up a CNPJ, search companies and check that the server is up.',
      blocks: [
        { t: 'p', text: 'Examples use the domain you are reading this page on. Responses are always `application/json`.' },
        { t: 'h2', id: 'lookup', text: 'CNPJ lookup' },
        { t: 'endpoint', path: '/{cnpj}', badge: 'v2' },
        { t: 'p', text: 'Returns the company data as JSON. The source that answered comes in the `X-Source` header (`minhareceita` or `receitaws`). The CNPJ can be sent with or without punctuation.' },
        { t: 'snippets', path: `/${EX}` },
        { t: 'code', code: sampleResponse },
        { t: 'table', head: ['Status', 'When'], rows: [['`200`', 'Lookup succeeded.'], ['`400`', 'CNPJ with invalid format or check digits.'], ['`404`', 'Valid CNPJ, but not in the database.'], ['`502`', 'No provider answered.']] },
        { t: 'h2', id: 'formats', text: 'Accepted formats' },
        { t: 'table', head: ['Type', 'Example'], rows: [['Numeric', '`/06990590000123`'], ['Numeric with mask', '`/06.990.590/0001-23`'], ['Alphanumeric', '`/00000000E08G12`'], ['Alphanumeric with mask', '`/00.000.000/E08G-12`']] },
        { t: 'p', text: 'We strip `.`, `/`, `-` and spaces, uppercase the letters and verify the format and check digits. The slash of a masked CNPJ can go straight in the URL or as `%2F`. See [Alphanumeric CNPJ](/en/docs/alphanumeric).' },
        { t: 'h2', id: 'certificate', text: 'Registration certificate' },
        { t: 'endpoint', path: '/cartao/{cnpj}' },
        { t: 'p', text: 'Opens a page with the data in the layout of the registration and status certificate, with a QR code and a barcode, ready to print or save as PDF. It does not replace the official certificate from the Receita Federal.' },
        { t: 'h2', id: 'search', text: 'Paginated search' },
        { t: 'endpoint', path: '/?uf=DF&natureza_juridica=1015&limit=10', badge: 'experimental' },
        { t: 'p', text: 'Lists companies from filters. The search is forwarded to Minha Receita, with no plan B, and may answer `429` when the server limit is reached. With no filters, the `/` route shows the test page.' },
        { t: 'table', head: ['Parameter', 'Description'], rows: searchParamsEn },
        { t: 'ul', items: ['For several values, repeat the parameter or separate with commas: `uf=DF,GO`.', 'Partner CPFs are masked, so search with `*` on the first three and last two digits: `***456789**`.', 'Searching only by partner CPF or CNPJ may time out; combine it with `uf`.', 'An invalid `limit` or `cursor` returns `400`.'] },
        { t: 'p', text: 'The response carries `data` (the list) and `cursor`. Pass the `cursor` in the next call to move on; when it is missing, that was the last page.' },
        { t: 'code', code: `{\n  "data": [ { "cnpj": "01690511000145", "razao_social": "…" } ],\n  "cursor": "…"\n}` },
        { t: 'h2', id: 'auxiliary', text: 'Auxiliary endpoints' },
        { t: 'table', head: ['Route', 'Description'], rows: [['`GET /updated`', 'Reference month of the Receita Federal data, as `{ "message": "2026-10" }`.'], ['`GET` or `HEAD /healthz`', 'The server is up.'], ['`GET` or `HEAD /readyz`', 'The server is ready to answer lookups.'], ['`GET /openapi.json`', 'OpenAPI 3.1 specification.']] },
        { t: 'p', text: 'They all answer `200` when everything is fine. Minha Receita’s `/metrics` is not offered here.' },
      ],
    },
    {
      slug: 'alphanumeric',
      group: 'start',
      title: 'Alphanumeric CNPJ',
      lead: 'The new CNPJ format, with letters in the first 12 positions.',
      blocks: [
        { t: 'p', text: 'Brazil’s federal revenue service started issuing alphanumeric CNPJs for new registrations in July 2026. Existing numeric CNPJs remain valid, unchanged.' },
        { t: 'h2', id: 'structure', text: 'Structure' },
        { t: 'table', head: ['Positions', 'Content'], rows: [['1 to 8', 'Root: letters `A-Z` and numbers'], ['9 to 12', 'Order (branch): letters and numbers'], ['13 and 14', 'Check digits: always numbers']] },
        { t: 'h2', id: 'calculation', text: 'Check digit calculation' },
        { t: 'p', text: 'It is the usual modulo 11, except each character is worth its ASCII code minus 48. So `0-9` stay 0 to 9 and `A-Z` are worth 17 to 42.' },
        { t: 'code', code: `value("7") = 55 - 48 = 7\nvalue("A") = 65 - 48 = 17\nvalue("Z") = 90 - 48 = 42\n\n1st digit weights: 5 4 3 2 9 8 7 6 5 4 3 2\n2nd digit weights: 6 5 4 3 2 9 8 7 6 5 4 3 2\n\nrest = sum % 11\ndigit = rest < 2 ? 0 : 11 - rest` },
        { t: 'p', text: 'Valid example: `00000000E08G12`.' },
      ],
    },
    {
      slug: 'v1',
      group: 'reference',
      title: 'Version v1',
      lead: 'The original version, kept for compatibility.',
      blocks: [
        { t: 'endpoint', path: '/api/v1/{cnpj}', badge: 'v1' },
        { t: 'p', text: 'Accepts the same CNPJ formats as v2. The difference is the response envelope and the error shape.' },
        { t: 'code', code: `{\n  "source": "minhareceita",\n  "data": { "cnpj": "06990590000123", "razao_social": "GOOGLE BRASIL INTERNET LTDA.", … }\n}` },
        { t: 'h2', id: 'migrate', text: 'Migrating to v2' },
        { t: 'table', head: ['', 'v1', 'v2'], rows: [['Route', '`/api/v1/{cnpj}`', '`/{cnpj}`'], ['Body', '`{ source, data }`', 'data directly'], ['Source', '`source`', '`X-Source` header'], ['Errors', '`{ detail }`', '`{ error }`']] },
      ],
    },
    {
      slug: 'errors',
      group: 'reference',
      title: 'Errors',
      lead: 'Status codes and the shape of error responses.',
      blocks: [
        { t: 'table', head: ['Status', 'When'], rows: [['`400`', 'CNPJ with invalid format or check digits; in search, an invalid `limit` or `cursor`.'], ['`404`', 'Valid CNPJ, but not in the database.'], ['`429`', 'Paginated search: server limit reached.'], ['`502`', 'No provider answered. The body carries each error.']] },
        { t: 'h2', id: 'shape', text: 'Shape' },
        { t: 'code', code: `// v2\n{ "error": "Invalid CNPJ: use 12 alphanumeric characters + 2 check digits." }\n\n// v1\n{ "detail": "Invalid CNPJ: use 12 alphanumeric characters + 2 check digits." }` },
        { t: 'h2', id: '502', text: '502 error' },
        { t: 'code', code: `{\n  "message": "Falha ao consultar CNPJ em ambas as fontes.",\n  "minhareceita_error": "HTTP 500 ao consultar minhareceita.org",\n  "receitaws_error": "HTTP 429 ao consultar receitaws.com.br"\n}` },
      ],
    },
    {
      slug: 'dictionary',
      group: 'reference',
      title: 'Data dictionary',
      lead: 'The main fields of the response.',
      blocks: [
        { t: 'callout', text: `Fields follow the provider that answered. The names below are Minha Receita’s; the full dictionary is at [docs.minhareceita.org/dicionario](${MR}dicionario/). When a lookup falls back to ReceitaWS the names differ (for example \`nome\` instead of \`razao_social\`).` },
        { t: 'table', head: ['Field', 'Description'], rows: [['`cnpj`', '14-character CNPJ, no punctuation.'], ['`razao_social`', 'Legal name.'], ['`nome_fantasia`', 'Trade name.'], ['`descricao_situacao_cadastral`', 'Registration status (ATIVA, BAIXADA, etc.). The code is in `situacao_cadastral`.'], ['`data_inicio_atividade`', 'Activity start date.'], ['`descricao_identificador_matriz_filial`', 'MATRIZ (head office) or FILIAL (branch).'], ['`porte`', 'Company size.'], ['`natureza_juridica`', 'Legal nature (code in `codigo_natureza_juridica`).'], ['`capital_social`', 'Share capital, in reais.'], ['`cnae_fiscal`, `cnae_fiscal_descricao`', 'Main economic activity.'], ['`cnaes_secundarios`', 'List of secondary activities.'], ['`logradouro`, `numero`, `bairro`, `municipio`, `uf`, `cep`', 'Address.'], ['`ddd_telefone_1`, `email`', 'Contacts.'], ['`opcao_pelo_simples`, `opcao_pelo_mei`', 'Simples and MEI tax regimes.'], ['`regime_tributario`', 'Tax regimes by year.'], ['`qsa`', 'Partners and administrators.']] },
      ],
    },
    {
      slug: 'sources',
      group: 'data',
      title: 'About the data',
      lead: 'Where the information comes from and what happens when a provider fails.',
      blocks: [
        { t: 'ol', items: [`**Minha Receita** (\`minhareceita.org\`): primary provider. It consolidates the open data of the Receita Federal. [Learn more](${MR}sobre-os-dados/).`, '**ReceitaWS** (`receitaws.com.br`): used only if the primary fails. Its limit is about 3 requests per minute.'] },
        { t: 'p', text: 'If Minha Receita answers `404` we return `404` right away, without trying the fallback. The database reference date is at `/updated`.' },
        { t: 'p', text: 'Paginated search and `/updated` exist only on Minha Receita and are forwarded with no fallback.' },
        { t: 'callout', text: 'This API stores nothing you look up.' },
      ],
    },
    {
      slug: 'faq',
      group: 'data',
      title: 'FAQ',
      lead: 'Quick answers about usage, limits and availability.',
      blocks: [
        { t: 'h2', id: 'key', text: 'Do I need a key or an account?' },
        { t: 'p', text: 'No. Just send the `GET`.' },
        { t: 'h2', id: 'limit', text: 'Is there a usage limit?' },
        { t: 'p', text: 'This API sets no limit of its own, but the providers do: ReceitaWS accepts about 3 requests per minute and paginated search may answer `429`.' },
        { t: 'h2', id: 'production', text: 'Can I use it in production?' },
        { t: 'p', text: 'You can, but with no availability guarantee: we depend on the providers and promise no service level. If your system cannot go down, have your own version (see the question below).' },
        { t: 'h2', id: 'own-version', text: 'How do I build my own CNPJ API?' },
        { t: 'p', text: 'A good base to start from is the [BrasilAPI](https://github.com/BrasilAPI/BrasilAPI) project, which is open source. To host the full Receita database, also see how to [set up your own Minha Receita server](' + MR + 'servidor/).' },
        { t: 'h2', id: 'alphanumeric', text: 'Does alphanumeric CNPJ work?' },
        { t: 'p', text: 'Yes, the format and digits are validated here. If the provider does not have that CNPJ yet, you get `404`.' },
        { t: 'h2', id: 'fields', text: 'Why do the fields change?' },
        { t: 'p', text: 'Because the response is the one from the provider that answered. The `X-Source` header says which.' },
        { t: 'h2', id: 'issue', text: 'How do I report a problem?' },
        { t: 'p', text: 'Open an issue on the [project GitHub](https://github.com/juca-soft/cnpj-api).' },
      ],
    },
  ],
}

export const groupOrder = ['start', 'reference', 'data'] as const
/** A página "Sobre" abre em /docs; as demais ficam em /docs/<slug>. */
export const pagePath = (slug: string) => (slug === 'about' ? '/docs' : `/docs/${slug}`)
