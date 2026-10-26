import { raw } from 'hono/html'
import { docPages, groupOrder, pagePath, ui, type Block, type DocPage } from './i18n.js'
import { icon } from './icons.js'
import { snippet, snippetLangs } from './snippets.js'
import { href, Shell, type Ctx } from './shell.js'

const Icon = ({ svg }: { svg: string }) => <>{raw(svg)}</>

/** Exemplos em várias linguagens; a escolha vale para todas as caixas da página. */
function Snippets({ url }: { url: string }) {
  return (
    <div class="codebox" data-snip>
      <div class="ctabs" role="tablist">
        {snippetLangs.map((l, i) => (
          <button role="tab" data-lang-tab={l.id} aria-selected={i === 0 ? 'true' : 'false'}>{l.label}</button>
        ))}
      </div>
      {snippetLangs.map((l, i) => (
        <div class="cpane" data-pane={l.id} hidden={i !== 0}>
          <button class="copy" data-copy={snippet(l.id, url)} aria-label="copy"><Icon svg={icon.copy} /></button>
          <pre><code>{snippet(l.id, url)}</code></pre>
        </div>
      ))}
    </div>
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
  return [p.lead, ...p.blocks.flatMap((b) => ('text' in b ? [plain(b.text)] : 'items' in b ? b.items.map(plain) : 'rows' in b ? b.rows.flat().map(plain) : []))].join(' ')
}

function Blocks({ ctx, blocks }: { ctx: Ctx; blocks: Block[] }) {
  return (
    <>
      {blocks.map((b) => {
        switch (b.t) {
          case 'h2':
            return <h2 id={b.id}>{b.text}</h2>
          case 'p':
            return <p>{inline(b.text)}</p>
          case 'ul':
            return <ul>{b.items.map((i) => <li>{inline(i)}</li>)}</ul>
          case 'ol':
            return <ol>{b.items.map((i) => <li>{inline(i)}</li>)}</ol>
          case 'code':
            return <pre class="blk"><code>{b.code}</code></pre>
          case 'callout':
            return <div class="callout"><p>{inline(b.text)}</p></div>
          case 'table':
            return (
              <div class="tscroll"><table>
                <thead><tr>{b.head.map((h) => <th>{h}</th>)}</tr></thead>
                <tbody>{b.rows.map((r) => <tr>{r.map((c) => <td>{inline(c)}</td>)}</tr>)}</tbody>
              </table></div>
            )
          case 'endpoint':
            return (
              <div class="epl">
                <span class="method">GET</span>
                <code>{b.path}</code>
                <span class="badge">{b.badge}</span>
              </div>
            )
          case 'snippets':
            return <Snippets url={ctx.origin + b.path} />
        }
      })}
    </>
  )
}

function SideNav({ ctx, slug }: { ctx: Ctx; slug: string }) {
  const t = ui[ctx.lang]
  const pages = docPages[ctx.lang]
  return (
    <nav class="snav">
      {groupOrder.map((g) => (
        <div class="grp">
          <p class="gt">{t.docs.groups[g]}</p>
          <ul>
            {pages.filter((p) => p.group === g).map((p) => (
              <li><a href={href(ctx.lang, pagePath(p.slug))} aria-current={p.slug === slug ? 'page' : undefined}>{p.title}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function DocsFrame({ ctx, slug, children }: { ctx: Ctx; slug: string; children: unknown }) {
  const t = ui[ctx.lang]
  return (
    <>
      <div class="dsub">
        <div class="wrap-wide dsub-in">
          <button class="dsearch" data-search>
            <Icon svg={icon.search} />
            <span>{t.docs.search}</span>
            <kbd>Ctrl K</kbd>
          </button>
          <nav class="dtabs">
            <a href={href(ctx.lang, '/docs')} aria-current="page">{t.docs.tabGuides}</a>
            <a href="/openapi.json">OpenAPI</a>
          </nav>
        </div>
      </div>
      <div class="wrap-wide dgrid">
        <aside class="side"><SideNav ctx={ctx} slug={slug} /></aside>
        <div class="mobnav">
          <button data-docs-menu aria-expanded="false">{t.docs.menu} <Icon svg={icon.chevron} /></button>
          <div id="mobnav" hidden><SideNav ctx={ctx} slug={slug} /></div>
        </div>
        <div class="dmain">{children as never}</div>
      </div>
    </>
  )
}

export function DocsPage({ ctx, page }: { ctx: Ctx; page: DocPage }) {
  const t = ui[ctx.lang]
  const pages = docPages[ctx.lang]
  const i = pages.indexOf(page)
  const prev = pages[i - 1]
  const next = pages[i + 1]
  const toc = page.blocks.filter((b): b is Extract<Block, { t: 'h2' }> => b.t === 'h2')
  const index = pages.map((p) => ({ title: p.title, group: t.docs.groups[p.group], text: pageText(p), href: href(ctx.lang, pagePath(p.slug)) }))

  return (
    <Shell
      ctx={ctx}
      title={`${page.title} · CNPJ API`}
      description={page.lead}
      searchIndex={index}
    >
      <DocsFrame ctx={ctx} slug={page.slug}>
        <div class="dart">
          <article class="article">
            <p class="crumb">{t.docs.groups[page.group]}</p>
            <div class="titlerow">
              <h1>{page.title}</h1>
              <button class="cpage" data-copy-page data-done={t.docs.copied}><Icon svg={icon.copy} /><span>{t.docs.copyPage}</span></button>
            </div>
            <p class="lede">{page.lead}</p>
            <Blocks ctx={ctx} blocks={page.blocks} />
            <div class="pn">
              {prev ? (
                <a href={href(ctx.lang, pagePath(prev.slug))}>
                  <small><Icon svg={icon.arrowLeft} /> {t.docs.prev}</small>
                  <strong>{prev.title}</strong>
                </a>
              ) : <span />}
              {next ? (
                <a class="r" href={href(ctx.lang, pagePath(next.slug))}>
                  <small>{t.docs.next} <Icon svg={icon.arrowRight} /></small>
                  <strong>{next.title}</strong>
                </a>
              ) : null}
            </div>
          </article>
          {toc.length ? (
            <nav class="toc" aria-label={t.docs.onThisPage}>
              <p><Icon svg={icon.toc} /> {t.docs.onThisPage}</p>
              <ul>{toc.map((h) => <li><a href={`#${h.id}`}>{h.text}</a></li>)}</ul>
            </nav>
          ) : null}
        </div>
      </DocsFrame>
    </Shell>
  )
}

export function DocsNotFound({ ctx }: { ctx: Ctx }) {
  const t = ui[ctx.lang]
  return (
    <Shell ctx={{ ...ctx, path: '/docs' }} title={`${t.docs.notFound} · CNPJ API`} description={t.description}>
      <main class="wrap nf">
        <h1>{t.docs.notFound}</h1>
        <p><a href={href(ctx.lang, '/docs')}>{t.docs.backDocs}</a></p>
      </main>
    </Shell>
  )
}
