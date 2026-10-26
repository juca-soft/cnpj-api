import { Fragment, jsx } from 'hono/jsx'
import { raw } from 'hono/html'
import { ui } from './i18n.js'
import { icon } from './icons.js'
import { href, Shell, type Ctx } from './shell.js'

const Icon = ({ svg }: { svg: string }) => jsx(Fragment, null, raw(svg))

const examples = ['06.990.590/0001-23', '33.683.111/0002-80', '00.000.000/E08G-12']

/** Página de testes: o CNPJ entra, o comprovante, o resumo e o JSON saem. */
export function Home({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang]
  const h = t.home
  const curl = `curl ${ctx.origin}/06.990.590/0001-23`

  return jsx(
    Shell,
    { ctx: ctx, title: t.title, description: t.description },
    jsx(
      'main',
      { class: 'wrap' },
      jsx('section', { class: 'hero' }, jsx('h1', null, h.title), jsx('p', null, h.text)),
      jsx(
        'section',
        { class: 'test' },
        jsx(
          'form',
          { id: 'lookup', class: 'dform', autocomplete: 'off' },
          jsx('label', { class: 'sr', for: 'q' }, 'CNPJ'),
          jsx('input', {
            id: 'q',
            name: 'q',
            placeholder: t.demo.placeholder,
            spellcheck: false,
            autocapitalize: 'characters',
            autofocus: true,
          }),
          jsx('button', { id: 'go', class: 'btn', type: 'submit' }, jsx(Icon, { svg: icon.search }), ' ', t.demo.search)
        ),
        jsx(
          'div',
          { class: 'chips' },
          jsx('span', null, t.demo.examples, ':'),
          examples.map((c) => jsx('button', { type: 'button', 'data-fill': c }, c))
        ),
        jsx(
          'div',
          { class: 'res', style: 'margin-top:1.5rem' },
          jsx(
            'div',
            { class: 'rtabs', role: 'tablist' },
            jsx('button', { class: 't', role: 'tab', 'data-view': 'card', 'aria-selected': 'true' }, t.demo.card),
            jsx(
              'button',
              { class: 't', role: 'tab', 'data-view': 'summary', 'aria-selected': 'false' },
              t.demo.summary
            ),
            jsx('button', { class: 't', role: 'tab', 'data-view': 'json', 'aria-selected': 'false' }, t.demo.json),
            jsx(
              'span',
              { class: 'sp' },
              jsx('span', { id: 'meta', 'aria-live': 'polite' }),
              jsx(
                'button',
                { class: 'copy', id: 'copyjson', 'aria-label': t.demo.copy, title: t.demo.copy, hidden: true },
                jsx(Icon, { svg: icon.copy })
              )
            )
          ),
          jsx('div', { class: 'rbody', id: 'out', 'aria-live': 'polite' }, jsx('p', { class: 'empty-st' }, h.empty))
        ),
        jsx(
          'div',
          { style: 'text-align:center' },
          jsx('p', { style: 'margin:2rem 0 0;font-size:.875rem' }, h.curlTitle),
          jsx(
            'div',
            { class: 'cmd' },
            jsx('code', { id: 'curl' }, curl),
            jsx('button', { 'data-copy': '#curl', 'aria-label': t.demo.copy }, jsx(Icon, { svg: icon.copy }))
          )
        )
      ),
      jsx(
        'section',
        { class: 'links3' },
        h.links.map(([title, text, path]) =>
          jsx('a', { class: 'lk', href: href(ctx.lang, path) }, jsx('strong', null, title), jsx('span', null, text))
        )
      )
    )
  )
}
