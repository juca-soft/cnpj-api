import { raw } from 'hono/html'
import { ui } from './i18n.js'
import { icon } from './icons.js'
import { href, Shell, type Ctx } from './shell.js'

const Icon = ({ svg }: { svg: string }) => <>{raw(svg)}</>

const examples = ['06.990.590/0001-23', '33.683.111/0002-80', '00.000.000/E08G-12']

/** Página de testes: o CNPJ entra, o comprovante, o resumo e o JSON saem. */
export function Home({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang]
  const h = t.home
  const curl = `curl ${ctx.origin}/06.990.590/0001-23`

  return (
    <Shell ctx={ctx} title={t.title} description={t.description}>
      <main class="wrap">
        <section class="hero">
          <h1>{h.title}</h1>
          <p>{h.text}</p>
        </section>

        <section class="test">
          <form id="lookup" class="dform" autocomplete="off">
            <label class="sr" for="q">CNPJ</label>
            <input id="q" name="q" placeholder={t.demo.placeholder} spellcheck={false} autocapitalize="characters" autofocus />
            <button id="go" class="btn" type="submit"><Icon svg={icon.search} /> {t.demo.search}</button>
          </form>
          <div class="chips">
            <span>{t.demo.examples}:</span>
            {examples.map((c) => <button type="button" data-fill={c}>{c}</button>)}
          </div>

          <div class="res" style="margin-top:1.5rem">
            <div class="rtabs" role="tablist">
              <button class="t" role="tab" data-view="card" aria-selected="true">{t.demo.card}</button>
              <button class="t" role="tab" data-view="summary" aria-selected="false">{t.demo.summary}</button>
              <button class="t" role="tab" data-view="json" aria-selected="false">{t.demo.json}</button>
              <span class="sp">
                <span id="meta" aria-live="polite" />
                <button class="copy" id="copyjson" aria-label={t.demo.copy} title={t.demo.copy} hidden><Icon svg={icon.copy} /></button>
              </span>
            </div>
            <div class="rbody" id="out" aria-live="polite"><p class="empty-st">{h.empty}</p></div>
          </div>

          <div style="text-align:center">
            <p style="margin:2rem 0 0;font-size:.875rem">{h.curlTitle}</p>
            <div class="cmd">
              <code id="curl">{curl}</code>
              <button data-copy="#curl" aria-label={t.demo.copy}><Icon svg={icon.copy} /></button>
            </div>
          </div>
        </section>

        <section class="links3">
          {h.links.map(([title, text, path]) => (
            <a class="lk" href={href(ctx.lang, path)}>
              <strong>{title}</strong>
              <span>{text}</span>
            </a>
          ))}
        </section>
      </main>
    </Shell>
  )
}
