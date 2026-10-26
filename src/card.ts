import bwipjs from 'bwip-js'
import * as code128a from 'jsbarcode/bin/barcodes/CODE128/CODE128A.js'
import { BRASAO_GIF_BASE64 } from './ui/brasao.js'

export type Card = {
  cnpj: string
  type: string
  opened: string
  name: string
  fantasy: string
  size: string
  mainCnae: string
  otherCnae: string[]
  legal: string
  street: string
  number: string
  complement: string
  zip: string
  district: string
  city: string
  uf: string
  email: string
  phone: string
  efr: string
  status: string
  statusDate: string
  reason: string
  special: string
  specialDate: string
}

type Json = Record<string, any>

// O CJS do jsbarcode chega como { default } no ESM do Node.
const Code128A = ((code128a as { default: unknown }).default as { default?: unknown }).default ?? (code128a as { default: unknown }).default
const RECEITA_URL = 'https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/'

/** Código de barras idêntico ao do comprovante: CODE128 (conjunto A) com os 14 caracteres, módulo de 2px, altura 48 e margem 10. */
function barcodeSvg(text: string): string {
  const Encoder = Code128A as new (t: string, o: object) => { encode(): { data: string } }
  const bits = new Encoder(text, {}).encode().data
  const bars: string[] = []
  for (let i = 0; i < bits.length; ) {
    if (bits[i] !== '1') {
      i++
      continue
    }
    let j = i
    while (bits[j] === '1') j++
    bars.push(`<rect x="${i * 2}" y="0" width="${(j - i) * 2}" height="48"></rect>`)
    i = j
  }
  const w = bits.length * 2 + 20
  return `<svg width="${w}px" height="68px" viewBox="0 0 ${w} 68" xmlns="http://www.w3.org/2000/svg" version="1.1"><rect x="0" y="0" width="${w}" height="68" fill="#ffffff"></rect><g transform="translate(10, 10)" fill="#000000">${bars.join('')}</g></svg>`
}

const MASK = '********'
const str = (v: unknown) => (v == null ? '' : String(v).trim())
const or = (v: unknown, fallback: string) => str(v) || fallback

export const maskCnpj = (c: string) =>
  c.length === 14 ? `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12)}` : c

/** 2004-09-01 ou 01/09/2004 -> 01/09/2004 */
function date(v: unknown): string {
  const s = str(v)
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s)
  return m ? `${m[3]}/${m[2]}/${m[1]}` : s
}

/** 6319400 -> 63.19-4-00 */
function cnaeCode(v: unknown): string {
  const s = String(v ?? '').padStart(7, '0')
  return `${s.slice(0, 2)}.${s.slice(2, 4)}-${s.slice(4, 5)}-${s.slice(5)}`
}

function phone(v: unknown): string {
  const d = str(v).replace(/\D/g, '')
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  return str(v)
}

const zip = (v: unknown) => {
  const d = str(v).replace(/\D/g, '')
  return d.length === 8 ? `${d.slice(0, 2)}.${d.slice(2, 5)}-${d.slice(5)}` : str(v)
}

/** Converte a resposta de qualquer fonte (Minha Receita ou ReceitaWS) para os campos do comprovante. */
export function toCard(d: Json, source: string, cnpj: string): Card {
  if (source === 'receitaws') {
    const main = d.atividade_principal?.[0]
    return {
      cnpj: maskCnpj(cnpj),
      type: str(d.tipo),
      opened: date(d.abertura),
      name: str(d.nome),
      fantasy: or(d.fantasia, MASK),
      size: str(d.porte),
      mainCnae: main ? `${main.code} - ${main.text}` : '',
      otherCnae: (d.atividades_secundarias ?? []).filter((a: Json) => a.code !== '00.00-0-00').map((a: Json) => `${a.code} - ${a.text}`),
      legal: str(d.natureza_juridica),
      street: str(d.logradouro),
      number: str(d.numero),
      complement: str(d.complemento),
      zip: zip(d.cep),
      district: str(d.bairro),
      city: str(d.municipio),
      uf: str(d.uf),
      email: str(d.email).toUpperCase(),
      phone: str(d.telefone),
      efr: or(d.efr, '*****'),
      status: str(d.situacao),
      statusDate: date(d.data_situacao),
      reason: str(d.motivo_situacao),
      special: or(d.situacao_especial, MASK),
      specialDate: or(date(d.data_situacao_especial), MASK),
    }
  }
  const nat = str(d.codigo_natureza_juridica).padStart(4, '0')
  return {
    cnpj: maskCnpj(cnpj),
    type: str(d.descricao_identificador_matriz_filial),
    opened: date(d.data_inicio_atividade),
    name: str(d.razao_social),
    fantasy: or(d.nome_fantasia, MASK),
    size: str(d.porte),
    mainCnae: d.cnae_fiscal ? `${cnaeCode(d.cnae_fiscal)} - ${str(d.cnae_fiscal_descricao)}` : '',
    otherCnae: (d.cnaes_secundarios ?? []).filter((c: Json) => c.codigo).map((c: Json) => `${cnaeCode(c.codigo)} - ${c.descricao}`),
    legal: d.codigo_natureza_juridica ? `${nat.slice(0, 3)}-${nat.slice(3)} - ${str(d.natureza_juridica)}` : str(d.natureza_juridica),
    street: [d.descricao_tipo_de_logradouro, d.logradouro].map(str).filter(Boolean).join(' '),
    number: str(d.numero),
    complement: str(d.complemento),
    zip: zip(d.cep),
    district: str(d.bairro),
    city: str(d.municipio),
    uf: str(d.uf),
    email: str(d.email).toUpperCase(),
    phone: phone(d.ddd_telefone_1),
    efr: or(d.ente_federativo_responsavel, '*****'),
    status: str(d.descricao_situacao_cadastral),
    statusDate: date(d.data_situacao_cadastral),
    reason: str(d.descricao_motivo_situacao_cadastral).replace(/^SEM MOTIVO$/i, ''),
    special: or(d.situacao_especial, MASK),
    specialDate: or(date(d.data_situacao_especial), MASK),
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Estrutura e estilos do componente do comprovante (copiados do original, sem os atributos do Angular).
const cell = (title: string, value: string, width: number, extra = '', big = false) =>
  `<td width="${width}%" class="section"${extra}><div class="section-title"> ${title} </div><div class="section-data${big ? ' data-big' : ''}"> ${esc(value)} </div></td>`
const gap = (extra = '') => `<td width="2%" class="section-no-border-vertical"${extra}></td>`
const table = (inner: string, last = '') => `<table class="info-table${last}"><tr class="info-row">${inner}</tr></table>`

const css = `
*,*::before,*::after{box-sizing:border-box}
html{font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%}
body{display:flow-root;margin:0;padding:8px;background:#fff;font-family:Arial,Helvetica,sans-serif;font-size:1rem;line-height:1.5;color:#212529;text-align:left}
table{border-collapse:collapse}
p{margin-top:0;margin-bottom:1rem}
b,strong{font-weight:bolder}
img{vertical-align:middle;border-style:none}
svg{overflow:hidden;vertical-align:middle}
.main-table{width:17cm;max-width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;line-height:9pt;border:2px inset #808080}
.main-table-wrapper{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
.content-box{border:.5pt solid windowtext;padding:5.65pt}
.header-table{width:100%;margin-bottom:12px}
.header-logo-cell{width:60px;height:60px;vertical-align:middle;text-align:left}
.logo{width:60px;height:60px;display:block;margin:auto}
.header-cell{text-align:center;font-weight:700}
.header-title{margin-top:12px;margin-bottom:36px}
.header-sub-title{margin-bottom:12px;font-size:medium}
.empty-col{vertical-align:middle;text-align:left;width:60px;height:60px}
.info-table{width:100%;border-collapse:collapse;line-height:normal;margin-bottom:12px}
.table-last{margin-bottom:0}
.info-row{vertical-align:top}
.section{border:.5pt solid windowtext;padding:0 0 3.5pt 3.5pt}
.section-centered-title{font-size:10pt;font-weight:700}
.section-title{font-size:6pt}
.section-data{font-size:8pt;font-weight:700}
.data-big{min-height:19.5px}
.section-centered{text-align:center;font-weight:700;border:.5pt solid windowtext;padding:1.5px 0 3.5pt 3.5pt;vertical-align:middle}
.section-no-border-vertical{border-left:.5pt solid windowtext;border-right:.5pt solid windowtext;border-top:none!important;padding:1.5px 0 3.5pt 3.5pt}
.texto-final{width:17cm;max-width:100%;line-height:normal;font-family:Arial,Helvetica,sans-serif;text-align:justify;font-size:small;margin-bottom:23px}
.qr-barcode-row{vertical-align:middle}
.qr-barcode-row .section{vertical-align:top}
.qr-barcode-row .section-title{margin-bottom:6px}
.media-center{min-height:120px;display:flex;align-items:center;justify-content:center}
.qrcode,.barcode{display:block}
.qrcode svg{width:120px;height:120px}
.barcode svg{max-width:100%;height:auto}
.acoes{display:flex;gap:8px;padding:0 0 12px}
.acoes a,.acoes button{font:600 13px Arial;padding:8px 14px;border-radius:8px;border:1px solid #b8c4d8;background:#fff;color:#0f1b2e;text-decoration:none;cursor:pointer}
@media (max-width:768px){.main-table{min-width:17cm}.texto-final{width:100%;font-size:.85rem}.content-box,.section,.section-centered{border:1px solid #222!important}.section-no-border-vertical{border-left:1px solid #222!important;border-right:1px solid #222!important;border-top:none!important}}
@media print{.no-print,.no-print *{display:none!important}@page{size:auto}.main-table{border:0}}
`

/** HTML do comprovante, na mesma estrutura do original. `embed` remove a barra de ações (iframe da página inicial). */
export function renderCard(card: Card, opts: { embed: boolean; url: string; backHref: string; issuedAt: Date }): string {
  const digits = card.cnpj.replace(/[.\/-]/g, '')
  const qr = bwipjs.toSVG({ bcid: 'qrcode', text: RECEITA_URL + digits, scale: 3, backgroundcolor: 'ffffff', paddingwidth: 4, paddingheight: 4 })
  const bc = barcodeSvg(digits)
  const when = opts.issuedAt
  const day = when.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const time = when.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const pad = ' style="padding-bottom: 3pt;"'

  const secondary = card.otherCnae.length
    ? table(
        `<td width="100%" class="section"><div class="section-title"> CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS </div><div class="section-data">${card.otherCnae.map((c) => ` ${esc(c)} `).join('<br>')}</div></td>`
      )
    : ''

  const body = `<div id="principal"><div class="main-table-wrapper"><table class="main-table"><tr><td class="content-box">
<table class="header-table"><tr><td class="header-logo-cell"><img src="/assets/brasao.gif" alt="Brasão" class="logo"></td><td class="header-cell"><div class="header-title"> REPÚBLICA FEDERATIVA DO BRASIL </div><div class="header-sub-title"> CADASTRO NACIONAL DA PESSOA JURÍDICA </div></td><td class="empty-col"></td></tr></table>
${table(`<td width="24%" class="section"><div class="section-title"> NÚMERO DE INSCRIÇÃO </div><div class="section-data">${esc(card.cnpj)}</div><div class="section-data"> ${esc(card.type)}</div></td><td width="52%" class="section-centered"><div class="section-centered-title" style="margin-top: -1px;"> COMPROVANTE DE INSCRIÇÃO E DE SITUAÇÃO CADASTRAL </div></td>${cell('DATA DE INSCRIÇÃO NO CNPJ', card.opened, 24)}`)}
${table(cell('NOME EMPRESARIAL', card.name, 76) + cell('DATA DE CONSTITUIÇÃO', card.opened, 24))}
${table(cell('TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)', card.fantasy, 88) + gap() + cell('PORTE', card.size, 10))}
${table(cell('CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL', card.mainCnae, 100))}
${secondary}
${table(cell('CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA', card.legal, 100))}
${table(cell('LOGRADOURO', card.street, 50) + gap() + cell('NÚMERO', card.number, 10) + gap() + cell('COMPLEMENTO', card.complement, 36))}
${table(cell('CEP', card.zip, 18) + gap() + cell('BAIRRO/DISTRITO', card.district, 30) + gap() + cell('MUNICÍPIO', card.city, 38) + gap() + cell('UF', card.uf, 10))}
${table(cell('ENDEREÇO ELETRÔNICO', card.email, 50) + gap() + cell('TELEFONE', card.phone, 48))}
${table(cell('ENTE FEDERATIVO RESPONSÁVEL (EFR)', card.efr, 100))}
${table(cell('SITUAÇÃO CADASTRAL', card.status, 64, pad) + gap(pad) + cell('DATA DA SITUAÇÃO CADASTRAL', card.statusDate, 24, pad))}
${table(cell('MOTIVO DE SITUAÇÃO CADASTRAL', card.reason, 100, '', true))}
${table(cell('SITUAÇÃO ESPECIAL', card.special, 64) + gap() + cell('DATA DA SITUAÇÃO ESPECIAL', card.specialDate, 24))}
<table class="info-table table-last"><tr class="info-row qr-barcode-row"><td width="28%" class="section"><div class="section-title"> CÓDIGO QR </div><div class="media-center"><div class="qrcode">${qr}</div></div></td>${gap()}<td width="70%" class="section"><div class="section-title"> CÓDIGO DE BARRAS </div><div class="media-center"><div class="barcode">${bc}</div></div></td></tr></table>
</td></tr></table></div>
<table border="0" cellspacing="0" class="texto-final" style="margin-top: 28px;"><tr><td align="left"><p> Emitido no dia <b> ${day} </b> às <b> ${time} </b> (data e hora de Brasília). </p></td><td align="right"><p> Página: <b> 1/1 </b></p></td></tr></table></div>`

  const actions = opts.embed
    ? ''
    : `<div class="acoes no-print"><a href="${esc(opts.backHref)}">← Voltar</a><button onclick="print()">Imprimir</button></div>`
  // Em telas estreitas o comprovante é reduzido para caber (o original rolaria na horizontal).
  const script = `<script>(function(){var embed=${opts.embed};function fit(){var p=document.getElementById('principal');p.style.zoom=1;var avail=document.documentElement.clientWidth-(embed?0:16),need=642.5;p.style.zoom=avail<need?avail/need:1;if(embed)parent.postMessage({cnpjCardHeight:Math.ceil(document.body.getBoundingClientRect().height)},'*')}addEventListener('load',fit);addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(function(){if(embed)parent.postMessage({cnpjCardHeight:Math.ceil(document.body.getBoundingClientRect().height)},'*')}).observe(document.body);fit()})()</script>`

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Comprovante de inscrição ${esc(card.cnpj)} · CNPJ API</title><style>${css}${opts.embed ? 'body{padding:0}' : ''}</style></head><body>${actions}${body}${script}</body></html>`
}
