import { Fragment, jsx } from 'hono/jsx'
import { raw } from 'hono/html'
import type { HtmlEscapedString } from 'hono/utils/html'
import type { Child } from 'hono/jsx'
import { JUCA_PATHS, JUCA_VIEWBOX, JUK_PATH } from './brand.js'
import { base, langNames, langs, ui, type Lang } from './i18n.js'
import { icon } from './icons.js'

/** As páginas são árvores `jsx()`; o `c.html()` do Hono espera a string já escapada. */
export const render = (node: unknown) => node as HtmlEscapedString | Promise<HtmlEscapedString>

export type Ctx = { lang: Lang; origin: string; path: string }

/** Rota de uma página em cada idioma. `path` é sempre sem prefixo de idioma. */
export const href = (lang: Lang, path: string) => (path === '/' ? base(lang) || '/' : base(lang) + path)

const Icon = ({ svg }: { svg: string }) => jsx(Fragment, null, raw(svg))

export function Brand() {
  return jsx(
    'span',
    { class: 'brand' },
    jsx(
      'svg',
      { height: '14', viewBox: '0 0 96 22', fill: 'currentColor', role: 'img', 'aria-label': 'JUK.re' },
      jsx('path', { d: JUK_PATH })
    ),
    jsx('span', { class: 'bar', 'aria-hidden': 'true' }),
    jsx('span', { class: 'tag' }, 'CNPJ')
  )
}

function LangMenu({ ctx, up = false }: { ctx: Ctx; up?: boolean }) {
  const t = ui[ctx.lang]
  return jsx(
    'div',
    { class: 'menu' },
    jsx(
      'button',
      {
        class: 'pill lang-btn',
        'data-menu': true,
        'aria-haspopup': 'menu',
        'aria-expanded': 'false',
        'aria-label': t.nav.language,
      },
      jsx(Icon, { svg: icon.languages }),
      jsx('span', { class: 'lname' }, langNames[ctx.lang]),
      jsx('span', { class: 'mono lcode' }, ctx.lang.toUpperCase()),
      jsx(Icon, { svg: icon.chevron })
    ),
    jsx(
      'div',
      { class: up ? 'menu-pop up' : 'menu-pop', role: 'menu', hidden: true },
      langs.map((l) =>
        jsx(
          'a',
          {
            href: href(l, ctx.path),
            hreflang: l,
            role: 'menuitemradio',
            'aria-checked': l === ctx.lang ? 'true' : 'false',
          },
          langNames[l],
          l === ctx.lang ? jsx(Icon, { svg: icon.check }) : null
        )
      )
    )
  )
}

function Nav({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang]
  const cur = (p: string) => (ctx.path === p || ctx.path.startsWith(p + '/') ? 'page' : undefined)
  return jsx(
    Fragment,
    null,
    jsx(
      'header',
      { class: 'nav' },
      jsx(
        'nav',
        { class: 'wrap nav-in' },
        jsx('a', { href: href(ctx.lang, '/'), 'aria-label': t.nav.home }, jsx(Brand, null)),
        jsx(
          'div',
          { class: 'navlinks' },
          jsx(
            'a',
            { class: 'pill', href: href(ctx.lang, '/'), 'aria-current': ctx.path === '/' ? 'page' : undefined },
            t.nav.test
          ),
          jsx(
            'a',
            { class: 'pill', href: href(ctx.lang, '/docs'), 'aria-current': cur('/docs') ?? undefined },
            t.nav.docs
          ),
          jsx('a', { class: 'pill', href: href(ctx.lang, '/docs/usage') }, t.nav.api)
        ),
        jsx(
          'div',
          { class: 'nav-r' },
          jsx(LangMenu, { ctx: ctx }),
          jsx(
            'button',
            { class: 'iconbtn hide-sm', 'data-theme-toggle': true, 'aria-label': t.nav.theme },
            jsx(Icon, { svg: icon.sun }),
            jsx(Icon, { svg: icon.moon })
          ),
          jsx(
            'a',
            {
              class: 'iconbtn hide-sm',
              href: 'https://github.com/juca-soft/cnpj-api',
              target: '_blank',
              rel: 'noreferrer',
              'aria-label': t.nav.github,
            },
            jsx(Icon, { svg: icon.github })
          ),
          jsx(
            'button',
            { class: 'iconbtn mob-only', 'data-mob': true, 'aria-expanded': 'false', 'aria-label': t.nav.menu },
            jsx(Icon, { svg: icon.menu })
          )
        )
      )
    ),
    jsx(
      'div',
      { class: 'mobpanel mob-only', id: 'mobpanel', hidden: true },
      jsx('a', { href: href(ctx.lang, '/') }, t.nav.test),
      jsx('a', { href: href(ctx.lang, '/docs') }, t.nav.docs),
      jsx('a', { href: href(ctx.lang, '/docs/usage') }, t.nav.api),
      jsx('a', { href: 'https://github.com/juca-soft/cnpj-api', target: '_blank', rel: 'noreferrer' }, 'GitHub'),
      jsx('p', { class: 'lbl' }, t.nav.themeTitle),
      jsx('div', { class: 'tsw' }, jsx(ThemeButtons, { ctx: ctx }))
    )
  )
}

function ThemeButtons({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang].nav
  return jsx(
    Fragment,
    null,
    jsx(
      'button',
      { 'data-theme-set': 'light', 'aria-label': t.light, 'aria-pressed': 'false' },
      jsx(Icon, { svg: icon.sun.replace('class="theme-sun"', '') })
    ),
    jsx(
      'button',
      { 'data-theme-set': 'system', 'aria-label': t.system, 'aria-pressed': 'false' },
      jsx(Icon, { svg: icon.monitor })
    ),
    jsx(
      'button',
      { 'data-theme-set': 'dark', 'aria-label': t.dark, 'aria-pressed': 'false' },
      jsx(Icon, { svg: icon.moon.replace('class="theme-moon"', '') })
    )
  )
}

function Footer({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang]
  return jsx(
    'footer',
    { class: 'ft' },
    jsx(
      'div',
      { class: 'wrap ft-g' },
      jsx(
        'div',
        null,
        jsx('p', { class: 'small' }, t.footer.madeBy),
        jsx(
          'a',
          {
            href: 'https://www.jucasoft.com.br/',
            target: '_blank',
            rel: 'noreferrer',
            'aria-label': 'JUCA Soft',
            style: 'display:inline-block;margin-top:.75rem;color:var(--strong)',
          },
          jsx(
            'svg',
            { height: '22', viewBox: JUCA_VIEWBOX, fill: 'currentColor', role: 'img', 'aria-label': 'JUCA Soft' },
            JUCA_PATHS.map((d) => jsx('path', { d: d }))
          )
        ),
        jsx('p', { class: 'blurb' }, t.footer.credit)
      ),
      jsx(
        'div',
        null,
        jsx('p', { class: 'col' }, t.footer.project),
        jsx(
          'ul',
          null,
          jsx('li', null, jsx('a', { href: href(ctx.lang, '/') }, t.nav.test)),
          jsx('li', null, jsx('a', { href: href(ctx.lang, '/docs') }, t.nav.docs)),
          jsx('li', null, jsx('a', { href: href(ctx.lang, '/docs/usage') }, t.nav.api)),
          jsx('li', null, jsx('a', { href: '/openapi.json' }, 'OpenAPI')),
          jsx(
            'li',
            null,
            jsx('a', { href: 'https://github.com/juca-soft/cnpj-api', target: '_blank', rel: 'noreferrer' }, 'GitHub')
          )
        )
      ),
      jsx(
        'div',
        null,
        jsx('p', { class: 'col' }, t.footer.providers),
        jsx(
          'ul',
          null,
          jsx(
            'li',
            null,
            jsx('a', { href: 'https://docs.minhareceita.org/', target: '_blank', rel: 'noreferrer' }, 'Minha Receita')
          ),
          jsx(
            'li',
            null,
            jsx('a', { href: 'https://receitaws.com.br', target: '_blank', rel: 'noreferrer' }, 'ReceitaWS')
          )
        )
      )
    ),
    jsx(
      'div',
      { class: 'wrap ft-b' },
      jsx(
        'p',
        { class: 'small' },
        t.footer.rights,
        ', ',
        t.footer.devBy,
        ' ',
        jsx('a', { href: 'https://josuejuca.com', target: '_blank', rel: 'noreferrer' }, 'Juca')
      ),
      jsx(
        'div',
        { class: 'ft-r' },
        jsx(LangMenu, { ctx: ctx, up: true }),
        jsx('div', { class: 'tsw', role: 'group', 'aria-label': t.nav.themeTitle }, jsx(ThemeButtons, { ctx: ctx }))
      )
    )
  )
}

const themeInit =
  "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}"

export function Shell({
  ctx,
  title,
  description,
  children,
  data = {},
  searchIndex,
}: {
  ctx: Ctx
  title: string
  description: string
  children: Child
  data?: Record<string, unknown>
  searchIndex?: unknown
}) {
  const t = ui[ctx.lang]
  const canonical = ctx.origin + href(ctx.lang, ctx.path)
  const clientCfg = {
    lang: ctx.lang,
    origin: ctx.origin,
    r: t.result,
    docsSearch: t.docs.search,
    noResults: t.docs.noResults,
    icons: { check: icon.check, search: icon.search },
    ...data,
  }
  return jsx(
    'html',
    { lang: t.htmlLang },
    jsx(
      'head',
      null,
      jsx('meta', { charset: 'utf-8' }),
      jsx('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      jsx('title', null, title),
      jsx('meta', { name: 'description', content: description }),
      jsx('link', { rel: 'canonical', href: canonical }),
      langs.map((l) => jsx('link', { rel: 'alternate', hreflang: l, href: ctx.origin + href(l, ctx.path) })),
      jsx('meta', { property: 'og:title', content: title }),
      jsx('meta', { property: 'og:description', content: description }),
      jsx('meta', { property: 'og:type', content: 'website' }),
      jsx('meta', { property: 'og:url', content: canonical }),
      jsx('meta', { name: 'theme-color', content: '#57a3f2' }),
      jsx('link', { rel: 'icon', href: '/icon.svg?v=2', type: 'image/svg+xml' }),
      jsx('link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
      jsx('link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }),
      jsx('link', {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
      }),
      jsx('script', null, raw(themeInit)),
      jsx('link', { rel: 'stylesheet', href: '/assets/app.css' })
    ),
    jsx(
      'body',
      null,
      jsx(Nav, { ctx: ctx }),
      children,
      jsx(Footer, { ctx: ctx }),
      jsx('script', { type: 'application/json', id: 'i18n' }, raw(JSON.stringify(clientCfg).replace(/</g, '\\u003c'))),
      searchIndex
        ? jsx(
            'script',
            { type: 'application/json', id: 'search-index' },
            raw(JSON.stringify(searchIndex).replace(/</g, '\\u003c'))
          )
        : null,
      jsx('script', { src: '/assets/app.js', defer: true })
    )
  )
}
