import { raw } from 'hono/html'
import type { Child } from 'hono/jsx'
import { JUCA_PATHS, JUCA_VIEWBOX, JUK_PATH } from './brand.js'
import { base, langNames, langs, ui, type Lang } from './i18n.js'
import { icon } from './icons.js'

export type Ctx = { lang: Lang; origin: string; path: string }

/** Rota de uma página em cada idioma. `path` é sempre sem prefixo de idioma. */
export const href = (lang: Lang, path: string) => (path === '/' ? base(lang) || '/' : base(lang) + path)

const Icon = ({ svg }: { svg: string }) => <>{raw(svg)}</>

export function Brand() {
  return (
    <span class="brand">
      <svg height="14" viewBox="0 0 96 22" fill="currentColor" role="img" aria-label="JUK.re">
        <path d={JUK_PATH} />
      </svg>
      <span class="bar" aria-hidden="true" />
      <span class="tag">CNPJ</span>
    </span>
  )
}

function LangMenu({ ctx, up = false }: { ctx: Ctx; up?: boolean }) {
  const t = ui[ctx.lang]
  return (
    <div class="menu">
      <button class="pill lang-btn" data-menu aria-haspopup="menu" aria-expanded="false" aria-label={t.nav.language}>
        <Icon svg={icon.languages} />
        <span class="lname">{langNames[ctx.lang]}</span>
        <span class="mono lcode">{ctx.lang.toUpperCase()}</span>
        <Icon svg={icon.chevron} />
      </button>
      <div class={up ? 'menu-pop up' : 'menu-pop'} role="menu" hidden>
        {langs.map((l) => (
          <a href={href(l, ctx.path)} hreflang={l} role="menuitemradio" aria-checked={l === ctx.lang ? 'true' : 'false'}>
            {langNames[l]}
            {l === ctx.lang ? <Icon svg={icon.check} /> : null}
          </a>
        ))}
      </div>
    </div>
  )
}

function Nav({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang]
  const cur = (p: string) => (ctx.path === p || ctx.path.startsWith(p + '/') ? 'page' : undefined)
  return (
    <>
      <header class="nav">
        <nav class="wrap nav-in">
          <a href={href(ctx.lang, '/')} aria-label={t.nav.home}>
            <Brand />
          </a>
          <div class="navlinks">
            <a class="pill" href={href(ctx.lang, '/')} aria-current={ctx.path === '/' ? 'page' : undefined}>{t.nav.test}</a>
            <a class="pill" href={href(ctx.lang, '/docs')} aria-current={cur('/docs') ?? undefined}>{t.nav.docs}</a>
            <a class="pill" href={href(ctx.lang, '/docs/usage')}>{t.nav.api}</a>
          </div>
          <div class="nav-r">
            <LangMenu ctx={ctx} />
            <button class="iconbtn hide-sm" data-theme-toggle aria-label={t.nav.theme}>
              <Icon svg={icon.sun} />
              <Icon svg={icon.moon} />
            </button>
            <a class="iconbtn hide-sm" href="https://github.com/juca-soft/cnpj-api" target="_blank" rel="noreferrer" aria-label={t.nav.github}>
              <Icon svg={icon.github} />
            </a>
            <button class="iconbtn mob-only" data-mob aria-expanded="false" aria-label={t.nav.menu}>
              <Icon svg={icon.menu} />
            </button>
          </div>
        </nav>
      </header>
      <div class="mobpanel mob-only" id="mobpanel" hidden>
        <a href={href(ctx.lang, '/')}>{t.nav.test}</a>
        <a href={href(ctx.lang, '/docs')}>{t.nav.docs}</a>
        <a href={href(ctx.lang, '/docs/usage')}>{t.nav.api}</a>
        <a href="https://github.com/juca-soft/cnpj-api" target="_blank" rel="noreferrer">GitHub</a>
        <p class="lbl">{t.nav.themeTitle}</p>
        <div class="tsw">
          <ThemeButtons ctx={ctx} />
        </div>
      </div>
    </>
  )
}

function ThemeButtons({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang].nav
  return (
    <>
      <button data-theme-set="light" aria-label={t.light} aria-pressed="false"><Icon svg={icon.sun.replace('class="theme-sun"', '')} /></button>
      <button data-theme-set="system" aria-label={t.system} aria-pressed="false"><Icon svg={icon.monitor} /></button>
      <button data-theme-set="dark" aria-label={t.dark} aria-pressed="false"><Icon svg={icon.moon.replace('class="theme-moon"', '')} /></button>
    </>
  )
}

function Footer({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang]
  return (
    <footer class="ft">
      <div class="wrap ft-g">
        <div>
          <p class="small">{t.footer.madeBy}</p>
          <a href="https://www.jucasoft.com.br/" target="_blank" rel="noreferrer" aria-label="JUCA Soft" style="display:inline-block;margin-top:.75rem;color:var(--strong)">
            <svg height="22" viewBox={JUCA_VIEWBOX} fill="currentColor" role="img" aria-label="JUCA Soft">
              {JUCA_PATHS.map((d) => <path d={d} />)}
            </svg>
          </a>
          <p class="blurb">{t.footer.credit}</p>
        </div>
        <div>
          <p class="col">{t.footer.project}</p>
          <ul>
            <li><a href={href(ctx.lang, '/')}>{t.nav.test}</a></li>
            <li><a href={href(ctx.lang, '/docs')}>{t.nav.docs}</a></li>
            <li><a href={href(ctx.lang, '/docs/usage')}>{t.nav.api}</a></li>
            <li><a href="/openapi.json">OpenAPI</a></li>
            <li><a href="https://github.com/juca-soft/cnpj-api" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
        <div>
          <p class="col">{t.footer.providers}</p>
          <ul>
            <li><a href="https://docs.minhareceita.org/" target="_blank" rel="noreferrer">Minha Receita</a></li>
            <li><a href="https://receitaws.com.br" target="_blank" rel="noreferrer">ReceitaWS</a></li>
          </ul>
        </div>
      </div>
      <div class="wrap ft-b">
        <p class="small">
          {t.footer.rights}, {t.footer.devBy} <a href="https://josuejuca.com" target="_blank" rel="noreferrer">Juca</a>
        </p>
        <div class="ft-r">
          <LangMenu ctx={ctx} up />
          <div class="tsw" role="group" aria-label={t.nav.themeTitle}>
            <ThemeButtons ctx={ctx} />
          </div>
        </div>
      </div>
    </footer>
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
  return (
    <html lang={t.htmlLang}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {langs.map((l) => <link rel="alternate" hreflang={l} href={ctx.origin + href(l, ctx.path)} />)}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta name="theme-color" content="#57a3f2" />
        <link rel="icon" href="/icon.svg?v=2" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script>{raw(themeInit)}</script>
        <link rel="stylesheet" href="/assets/app.css" />
      </head>
      <body>
        <Nav ctx={ctx} />
        {children}
        <Footer ctx={ctx} />
        <script type="application/json" id="i18n">{raw(JSON.stringify(clientCfg).replace(/</g, '\\u003c'))}</script>
        {searchIndex ? <script type="application/json" id="search-index">{raw(JSON.stringify(searchIndex).replace(/</g, '\\u003c'))}</script> : null}
        <script src="/assets/app.js" defer />
      </body>
    </html>
  )
}
