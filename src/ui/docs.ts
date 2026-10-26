import { Fragment, jsx } from 'hono/jsx'
import { raw } from 'hono/html'
import { docPages, groupOrder, pagePath, ui, type Block, type DocPage } from './i18n.js'
import { icon } from './icons.js'
import { snippet, snippetLangs } from './snippets.js'
import { href, Shell, type Ctx } from './shell.js'

const Icon = ({ svg }: { svg: string }) => jsx(Fragment, null, raw(svg))

/** Exemplos em várias linguagens; a escolha vale para todas as caixas da página. */
function Snippets({ url }: { url: string }) {
  return jsx(
    'div',
    { class: 'codebox', 'data-snip': true },
    jsx(
      'div',
      { class: 'ctabs', role: 'tablist' },
      snippetLangs.map((l, i) =>
        jsx('button', { role: 'tab', 'data-lang-tab': l.id, 'aria-selected': i === 0 ? 'true' : 'false' }, l.label)
      )
    ),
    snippetLangs.map((l, i) =>
      jsx(
        'div',
        { class: 'cpane', 'data-pane': l.id, hidden: i !== 0 },
        jsx(
          'button',
          { class: 'copy', 'data-copy': snippet(l.id, url), 'aria-label': 'copy' },
          jsx(Icon, { svg: icon.copy })
        ),
        jsx('pre', null, jsx('code', null, snippet(l.id, url)))
      )
    )
  )
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Markdown mínimo: `código`, **negrito** e [texto](link). */
function inline(s: string) {
  return raw(
    escapeHtml(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  )
}

const plain = (s: string) => s.replace(/[`*]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

function pageText(p: DocPage) {
  return [
    p.lead,
    ...p.blocks.flatMap((b) =>
      'text' in b ? [plain(b.text)] : 'items' in b ? b.items.map(plain) : 'rows' in b ? b.rows.flat().map(plain) : []
    ),
  ].join(' ')
}

function Blocks({ ctx, blocks }: { ctx: Ctx; blocks: Block[] }) {
  return jsx(
    Fragment,
    null,
    blocks.map((b) => {
      switch (b.t) {
        case 'h2':
          return jsx('h2', { id: b.id }, b.text)
        case 'p':
          return jsx('p', null, inline(b.text))
        case 'ul':
          return jsx(
            'ul',
            null,
            b.items.map((i) => jsx('li', null, inline(i)))
          )
        case 'ol':
          return jsx(
            'ol',
            null,
            b.items.map((i) => jsx('li', null, inline(i)))
          )
        case 'code':
          return jsx('pre', { class: 'blk' }, jsx('code', null, b.code))
        case 'callout':
          return jsx('div', { class: 'callout' }, jsx('p', null, inline(b.text)))
        case 'table':
          return jsx(
            'div',
            { class: 'tscroll' },
            jsx(
              'table',
              null,
              jsx(
                'thead',
                null,
                jsx(
                  'tr',
                  null,
                  b.head.map((h) => jsx('th', null, h))
                )
              ),
              jsx(
                'tbody',
                null,
                b.rows.map((r) =>
                  jsx(
                    'tr',
                    null,
                    r.map((c) => jsx('td', null, inline(c)))
                  )
                )
              )
            )
          )
        case 'endpoint':
          return jsx(
            'div',
            { class: 'epl' },
            jsx('span', { class: 'method' }, 'GET'),
            jsx('code', null, b.path),
            jsx('span', { class: 'badge' }, b.badge)
          )
        case 'snippets':
          return jsx(Snippets, { url: ctx.origin + b.path })
      }
    })
  )
}

function SideNav({ ctx, slug }: { ctx: Ctx; slug: string }) {
  const t = ui[ctx.lang]
  const pages = docPages[ctx.lang]
  return jsx(
    'nav',
    { class: 'snav' },
    groupOrder.map((g) =>
      jsx(
        'div',
        { class: 'grp' },
        jsx('p', { class: 'gt' }, t.docs.groups[g]),
        jsx(
          'ul',
          null,
          pages
            .filter((p) => p.group === g)
            .map((p) =>
              jsx(
                'li',
                null,
                jsx(
                  'a',
                  { href: href(ctx.lang, pagePath(p.slug)), 'aria-current': p.slug === slug ? 'page' : undefined },
                  p.title
                )
              )
            )
        )
      )
    )
  )
}

function DocsFrame({ ctx, slug, children }: { ctx: Ctx; slug: string; children: unknown }) {
  const t = ui[ctx.lang]
  return jsx(
    Fragment,
    null,
    jsx(
      'div',
      { class: 'dsub' },
      jsx(
        'div',
        { class: 'wrap-wide dsub-in' },
        jsx(
          'button',
          { class: 'dsearch', 'data-search': true },
          jsx(Icon, { svg: icon.search }),
          jsx('span', null, t.docs.search),
          jsx('kbd', null, 'Ctrl K')
        ),
        jsx(
          'nav',
          { class: 'dtabs' },
          jsx('a', { href: href(ctx.lang, '/docs'), 'aria-current': 'page' }, t.docs.tabGuides),
          jsx('a', { href: '/openapi.json' }, 'OpenAPI')
        )
      )
    ),
    jsx(
      'div',
      { class: 'wrap-wide dgrid' },
      jsx('aside', { class: 'side' }, jsx(SideNav, { ctx: ctx, slug: slug })),
      jsx(
        'div',
        { class: 'mobnav' },
        jsx(
          'button',
          { 'data-docs-menu': true, 'aria-expanded': 'false' },
          t.docs.menu,
          ' ',
          jsx(Icon, { svg: icon.chevron })
        ),
        jsx('div', { id: 'mobnav', hidden: true }, jsx(SideNav, { ctx: ctx, slug: slug }))
      ),
      jsx('div', { class: 'dmain' }, children as never)
    )
  )
}

export function DocsPage({ ctx, page }: { ctx: Ctx; page: DocPage }) {
  const t = ui[ctx.lang]
  const pages = docPages[ctx.lang]
  const i = pages.indexOf(page)
  const prev = pages[i - 1]
  const next = pages[i + 1]
  const toc = page.blocks.filter((b): b is Extract<Block, { t: 'h2' }> => b.t === 'h2')
  const index = pages.map((p) => ({
    title: p.title,
    group: t.docs.groups[p.group],
    text: pageText(p),
    href: href(ctx.lang, pagePath(p.slug)),
  }))

  return jsx(
    Shell,
    { ctx: ctx, title: `${page.title} · CNPJ API`, description: page.lead, searchIndex: index },
    jsx(
      DocsFrame,
      { ctx: ctx, slug: page.slug },
      jsx(
        'div',
        { class: 'dart' },
        jsx(
          'article',
          { class: 'article' },
          jsx('p', { class: 'crumb' }, t.docs.groups[page.group]),
          jsx(
            'div',
            { class: 'titlerow' },
            jsx('h1', null, page.title),
            jsx(
              'button',
              { class: 'cpage', 'data-copy-page': true, 'data-done': t.docs.copied },
              jsx(Icon, { svg: icon.copy }),
              jsx('span', null, t.docs.copyPage)
            )
          ),
          jsx('p', { class: 'lede' }, page.lead),
          jsx(Blocks, { ctx: ctx, blocks: page.blocks }),
          jsx(
            'div',
            { class: 'pn' },
            prev
              ? jsx(
                  'a',
                  { href: href(ctx.lang, pagePath(prev.slug)) },
                  jsx('small', null, jsx(Icon, { svg: icon.arrowLeft }), ' ', t.docs.prev),
                  jsx('strong', null, prev.title)
                )
              : jsx('span', null),
            next
              ? jsx(
                  'a',
                  { class: 'r', href: href(ctx.lang, pagePath(next.slug)) },
                  jsx('small', null, t.docs.next, ' ', jsx(Icon, { svg: icon.arrowRight })),
                  jsx('strong', null, next.title)
                )
              : null
          )
        ),
        toc.length
          ? jsx(
              'nav',
              { class: 'toc', 'aria-label': t.docs.onThisPage },
              jsx('p', null, jsx(Icon, { svg: icon.toc }), ' ', t.docs.onThisPage),
              jsx(
                'ul',
                null,
                toc.map((h) => jsx('li', null, jsx('a', { href: `#${h.id}` }, h.text)))
              )
            )
          : null
      )
    )
  )
}

export function DocsNotFound({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang]
  return jsx(
    Shell,
    { ctx: { ...ctx, path: '/docs' }, title: `${t.docs.notFound} · CNPJ API`, description: t.description },
    jsx(
      'main',
      { class: 'wrap nf' },
      jsx('h1', null, t.docs.notFound),
      jsx('p', null, jsx('a', { href: href(ctx.lang, '/docs') }, t.docs.backDocs))
    )
  )
}
