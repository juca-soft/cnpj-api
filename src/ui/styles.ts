// Estrutura de docs do meuip (nav, subbar com busca, sidebar, "Nesta página") com o azul #57a3f2.
const light = `
  color-scheme:light;
  --surface:#fff;--soft:#f6f9fe;--hover:#eef4fd;--strong:#0f1b2e;--ink:#1c2a41;--muted:#56647a;--dim:#77849a;
  --line:#dde5f1;--pill:#cdd8ea;--hair:#e8eef7;
  --accent:#57a3f2;--accent-hover:#3f8fe6;--accent-fg:#0b1b3a;--accent-ink:#1d6fd0;--tint:rgba(87,163,242,.12);--tint-line:rgba(87,163,242,.4);--focus:rgba(87,163,242,.4);
  --code:#f3f7fc;--ok:#15803d;--bad:#b42318;--warn:#9a6700;
  --shadow:0 1px 2px rgba(15,27,46,.05),0 18px 44px -18px rgba(15,27,46,.2);
`
const dark = `
  color-scheme:dark;
  --surface:#0a0e14;--soft:#0d131b;--hover:#151e2a;--strong:#f1f5fb;--ink:#dbe4f2;--muted:#9fb0c8;--dim:#7d8fa8;
  --line:#1e2b3c;--pill:#2b3b52;--hair:#172233;
  --accent:#57a3f2;--accent-hover:#7cb8f6;--accent-fg:#0b1b3a;--accent-ink:#7cb8f6;--tint:rgba(87,163,242,.14);--tint-line:rgba(87,163,242,.36);--focus:rgba(87,163,242,.45);
  --code:#0d131b;--ok:#4ade80;--bad:#f87171;--warn:#fbbf24;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 18px 44px -18px rgba(0,0,0,.7);
`

export const css = `
:root{${light}--sans:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
:root[data-theme=dark]{${dark}}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){${dark}}}
*{box-sizing:border-box}
html{font-size:16px;-webkit-font-smoothing:antialiased;scroll-behavior:smooth;scroll-padding-top:8rem}
body{margin:0;background:var(--surface);color:var(--muted);font:16px/1.65 var(--sans);letter-spacing:.01em}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;cursor:pointer;background:none;border:0;padding:0}
svg{display:block}
:focus-visible{outline:3px solid var(--focus);outline-offset:2px;border-radius:6px}
::selection{background:var(--accent);color:var(--accent-fg)}
code,pre,kbd{font-family:var(--mono)}
[hidden]{display:none!important}
.theme-moon{display:none}
:root[data-theme=dark] .theme-sun{display:none}:root[data-theme=dark] .theme-moon{display:block}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) .theme-sun{display:none}:root:not([data-theme=light]) .theme-moon{display:block}}
.wrap{max-width:72rem;margin:0 auto;padding:0 1.25rem}
.wrap-wide{max-width:80rem;margin:0 auto;padding:0 1.25rem}
.mono{font-family:var(--mono)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}

/* nav */
.nav{position:sticky;top:0;z-index:30;height:4rem;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--surface) 85%,transparent);backdrop-filter:blur(12px) saturate(1.5)}
.nav-in{height:100%;display:flex;align-items:center;gap:.5rem}
.brand{display:inline-flex;align-items:center;gap:.65rem;color:var(--strong);margin-right:1rem}
.brand .bar{width:1px;height:14px;background:var(--pill)}
.brand .tag{font:500 11px var(--mono);letter-spacing:.1em;color:var(--accent-ink)}
.navlinks{display:none;gap:.25rem}
.pill{display:inline-flex;align-items:center;gap:.25rem;height:2.25rem;padding:0 .75rem;border-radius:999px;font-size:.875rem;color:var(--muted);transition:background .15s,color .15s}
.pill:hover,.pill[aria-expanded=true],.pill[aria-current=page]{background:var(--hover);color:var(--strong)}
.nav-r{margin-left:auto;display:flex;align-items:center;gap:.5rem}
.iconbtn{display:grid;place-items:center;width:2.25rem;height:2.25rem;border:1px solid var(--pill);border-radius:999px;color:var(--muted);transition:background .15s,color .15s}
.iconbtn:hover{background:var(--hover);color:var(--strong)}
.iconbtn svg{width:1rem;height:1rem}
.hide-sm{display:none}
@media (min-width:768px){.navlinks{display:flex}.hide-sm{display:grid}.mob-only{display:none!important}}
.menu{position:relative}
.menu-pop{position:absolute;z-index:40;top:calc(100% + .5rem);right:0;min-width:10rem;background:var(--surface);border:1px solid var(--line);border-radius:.75rem;padding:.375rem;box-shadow:var(--shadow)}
.menu-pop.up{top:auto;bottom:calc(100% + .5rem)}
.menu-pop a{display:flex;justify-content:space-between;align-items:center;gap:1rem;height:2.25rem;padding:0 .75rem;border-radius:.5rem;font-size:.875rem;color:var(--muted)}
.menu-pop a:hover,.menu-pop a[aria-checked=true]{background:var(--hover);color:var(--strong)}
.menu-pop svg{width:1rem;height:1rem;color:var(--accent-ink)}
.lang-btn svg{width:1rem;height:1rem}
.lname{display:none}.lcode{font-size:12px}
@media (min-width:640px){.lname{display:inline}.lcode{display:none}}
.mobpanel{position:fixed;inset:4rem 0 0;z-index:29;background:var(--surface);padding:1rem 1.25rem;overflow:auto}
.mobpanel a{display:flex;align-items:center;gap:.75rem;padding:.75rem .5rem;border-radius:.5rem;color:var(--strong)}
.mobpanel a:hover{background:var(--hover)}
.mobpanel .lbl{margin:1rem .5rem .5rem;font:11px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--dim)}

/* subbar da documentação */
.dsub{position:sticky;top:4rem;z-index:20;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--surface) 90%,transparent);backdrop-filter:blur(12px)}
.dsub-in{display:flex;align-items:center;gap:1.5rem;height:3.75rem}
.dsearch{display:flex;align-items:center;gap:.5rem;width:100%;max-width:28rem;height:2.5rem;padding:0 1rem;border:1px solid var(--line);border-radius:999px;background:var(--soft);font-size:.875rem;color:var(--dim);transition:border-color .15s,color .15s}
.dsearch:hover{border-color:var(--pill);color:var(--muted)}
.dsearch svg{width:1rem;height:1rem}
.dsearch span{flex:1;text-align:left}
kbd{padding:.125rem .375rem;border:1px solid var(--line);border-radius:.375rem;font-size:11px}
.dtabs{margin-left:auto;display:none;gap:1.25rem;font-size:.875rem}
@media (min-width:640px){.dtabs{display:flex}}
.dtabs a{padding:1rem 0;color:var(--muted)}.dtabs a:hover{color:var(--strong)}
.dtabs a[aria-current=page]{border-bottom:2px solid var(--accent-ink);color:var(--strong);font-weight:500}

/* layout da documentação */
.dgrid{display:grid;padding:0 1.25rem}
@media (min-width:1024px){.dgrid{grid-template-columns:250px minmax(0,1fr)}}
.side{display:none;position:sticky;top:7.75rem;height:calc(100vh - 7.75rem);overflow-y:auto;border-right:1px solid var(--line);padding:2rem 1rem 2rem 0}
@media (min-width:1024px){.side{display:block}.mobnav{display:none}}
.mobnav{border-bottom:1px solid var(--line)}
.mobnav>button{display:flex;width:100%;align-items:center;justify-content:space-between;padding:.75rem 0;font-size:.875rem;color:var(--strong)}
.mobnav>button svg{width:1rem;height:1rem;transition:transform .15s}.mobnav>button[aria-expanded=true] svg{transform:rotate(180deg)}
.mobnav .snav{padding-bottom:1rem}
.snav .grp{margin-bottom:1.5rem}
.snav .gt{margin:0 0 .5rem;padding:0 .75rem;font:600 11px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--dim)}
.snav ul{margin:0;padding:0;list-style:none;display:grid;gap:.125rem}
.snav a{display:block;padding:.375rem .75rem;border-radius:.5rem;font-size:.875rem;color:var(--muted);transition:background .15s,color .15s}
.snav a:hover{background:var(--hover);color:var(--strong)}
.snav a[aria-current=page]{background:var(--tint);color:var(--strong);font-weight:500}
.dmain{min-width:0}
@media (min-width:1024px){.dmain{padding-left:2.5rem}}
.dart{display:grid;gap:2rem;padding-bottom:3rem}
@media (min-width:1280px){.dart{grid-template-columns:minmax(0,1fr) 14rem}}
.article{min-width:0;padding-top:2.5rem}
.crumb{font-size:.875rem;color:var(--dim)}
.titlerow{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}
.article h1{margin:.5rem 0 0;font-size:clamp(1.75rem,4vw,2.25rem);line-height:1.15;font-weight:500;letter-spacing:-.02em;color:var(--strong)}
.cpage{display:inline-flex;align-items:center;gap:.5rem;flex:none;height:2.25rem;padding:0 .875rem;border:1px solid var(--pill);border-radius:.5rem;font-size:.875rem;color:var(--muted);transition:background .15s}
.cpage:hover{background:var(--hover);color:var(--strong)}
.cpage svg{width:1rem;height:1rem}
.lede{margin:1rem 0 0;font-size:1.125rem;color:var(--ink)}
.article h2{margin:2.5rem 0 .5rem;font-size:1.5rem;font-weight:500;letter-spacing:-.01em;color:var(--strong)}
.article p{margin:.75rem 0}
.article ul,.article ol{margin:.75rem 0;padding-left:1.5rem}
.article li{margin:.375rem 0;padding-left:.25rem}
.article ol{list-style:none;counter-reset:n;padding-left:0}
.article ol li{counter-increment:n;padding-left:2rem;position:relative}
.article ol li::before{content:counter(n) ".";position:absolute;left:0;font-family:var(--mono);font-weight:600;color:var(--accent-ink)}
.article li::marker{color:var(--accent-ink)}
.article a{color:var(--accent-ink);text-decoration:underline;text-underline-offset:2px}
.article strong{color:var(--strong);font-weight:600}
.article :not(pre)>code{padding:.125rem .375rem;border-radius:.375rem;background:var(--hover);font-size:.85em;color:var(--strong)}
.article pre.blk{margin:1rem 0;padding:1rem;border:1px solid var(--line);border-radius:.75rem;background:var(--code);color:var(--ink);font:13px/1.65 var(--mono);overflow:auto;white-space:pre}
.article table{width:100%;margin:1rem 0;border-collapse:collapse;font-size:.9rem}
.article th,.article td{padding:.625rem .75rem;border-bottom:1px solid var(--hair);text-align:left;vertical-align:top}
.article th{color:var(--strong);font-weight:600;font-size:.8125rem}
.article .tscroll{overflow-x:auto}
.callout{margin:1.25rem 0;padding:.875rem 1rem;border:1px solid var(--tint-line);border-radius:.75rem;background:var(--tint);color:var(--strong)}
.callout p{margin:0}
.epl{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem;margin:1.5rem 0 .5rem}
.article{overflow-wrap:anywhere}
.article code{overflow-wrap:anywhere}
.epl code{font-size:1rem!important;background:none!important;padding:0!important}
.method{display:inline-block;padding:.0625rem .5rem;border:1px solid var(--tint-line);border-radius:.375rem;background:var(--tint);color:var(--accent-ink);font:600 11px var(--mono)}
.badge{display:inline-block;padding:0 .625rem;border:1px solid var(--line);border-radius:999px;font-size:.75rem;color:var(--dim)}
.toc{position:sticky;top:8.5rem;display:none;padding-top:2.5rem;align-self:start}
@media (min-width:1280px){.toc{display:block}}
.toc p{display:flex;align-items:center;gap:.5rem;margin:0 0 .75rem;font-size:.875rem;color:var(--strong)}
.toc p svg{width:1rem;height:1rem;color:var(--dim)}
.toc ul{margin:0;padding:0;list-style:none;border-left:1px solid var(--line)}
.toc a{display:block;margin-left:-1px;padding:.375rem 0 .375rem 1rem;border-left:1px solid transparent;font-size:.875rem;color:var(--muted);transition:color .15s}
.toc a:hover{color:var(--strong)}
.toc a.on{border-left-color:var(--accent-ink);color:var(--strong);font-weight:500}
.pn{display:grid;gap:1rem;margin-top:3rem}
@media (min-width:640px){.pn{grid-template-columns:1fr 1fr}}
.pn a{display:block;padding:1rem 1.25rem;border:1px solid var(--line);border-radius:.75rem;transition:border-color .15s,background .15s}
.pn a:hover{border-color:var(--accent-ink);background:var(--tint)}
.pn small{display:flex;align-items:center;gap:.375rem;font:11px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--dim)}
.pn small svg{width:.75rem;height:.75rem}
.pn strong{display:block;margin-top:.25rem;color:var(--strong);font-weight:500}
.pn .r{text-align:right}.pn .r small{justify-content:flex-end}

/* exemplos em várias linguagens */
.codebox{margin:1rem 0;border:1px solid var(--line);border-radius:.75rem;background:var(--code);overflow:hidden}
.ctabs{display:flex;flex-wrap:wrap;gap:.25rem;padding:.5rem .5rem 0;border-bottom:1px solid var(--line)}
.ctabs button{padding:.4rem .75rem;border-radius:.5rem .5rem 0 0;font-size:.8125rem;color:var(--muted);border-bottom:2px solid transparent;transition:color .15s}
.ctabs button:hover{color:var(--strong)}
.ctabs button[aria-selected=true]{color:var(--strong);border-bottom-color:var(--accent-ink)}
.cpane{position:relative}
.cpane pre{margin:0;padding:1rem 3rem 1rem 1rem;font:13px/1.65 var(--mono);white-space:pre-wrap;overflow-wrap:anywhere;color:var(--ink)}
.copy{display:grid;place-items:center;width:2rem;height:2rem;border-radius:.5rem;color:var(--dim);transition:background .15s,color .15s}
.copy:hover{background:var(--hover);color:var(--strong)}
.copy svg{width:1rem;height:1rem}
.cpane .copy{position:absolute;top:.5rem;right:.5rem}

/* demo */
.demo{margin:1rem 0;padding:1rem;border:1px solid var(--line);border-radius:1rem;background:var(--soft)}
.dform{display:flex;gap:.5rem}
.dform input{flex:1;min-width:0;height:2.75rem;padding:0 1rem;border:1px solid var(--line);border-radius:.75rem;background:var(--surface);color:var(--strong);font:15px var(--mono);transition:border-color .15s,box-shadow .15s}
.dform input:focus{outline:0;border-color:var(--accent);box-shadow:0 0 0 4px var(--focus)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;height:2.75rem;padding:0 1.25rem;border-radius:.75rem;background:var(--accent);color:var(--accent-fg);font-weight:600;font-size:.9375rem;transition:background .15s,transform .1s}
.btn:hover{background:var(--accent-hover)}.btn:active{transform:scale(.97)}
.btn[disabled]{opacity:.6;cursor:progress}
.btn svg{width:1rem;height:1rem}
.chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem;font-size:.8125rem;color:var(--dim);align-items:center}
.chips button{font:12px var(--mono);padding:.25rem .75rem;border:1px solid var(--line);border-radius:999px;background:var(--surface);color:var(--muted);transition:border-color .15s,color .15s}
.chips button:hover{border-color:var(--accent-ink);color:var(--accent-ink)}
.res{scroll-margin-top:5rem;margin-top:1rem;border:1px solid var(--line);border-radius:.75rem;background:var(--surface);overflow:hidden}
.rtabs{display:flex;flex-wrap:wrap;align-items:center;gap:.25rem;padding:.5rem .5rem 0;border-bottom:1px solid var(--line)}
.rtabs button.t{padding:.4rem .75rem;font-size:.8125rem;color:var(--muted);border-bottom:2px solid transparent}
.rtabs button.t[aria-selected=true]{color:var(--strong);border-bottom-color:var(--accent-ink)}
.rtabs .sp{margin-left:auto;display:flex;align-items:center;gap:.5rem;padding:0 .25rem .5rem;font:11px var(--mono);color:var(--dim)}
.rbody{padding:1rem;max-height:28rem;overflow:auto;font-size:.9rem}
.rv{animation:rise .3s both;animation-delay:calc(var(--i,0)*18ms)}
@keyframes rise{from{opacity:0;transform:translateY(4px)}}
.sk{height:.875rem;margin:.6rem 0;border-radius:4px;background:linear-gradient(90deg,var(--hover),var(--line),var(--hover));background-size:200% 100%;animation:shim 1.2s linear infinite}
@keyframes shim{to{background-position:-200% 0}}
.head h3{margin:0;font:600 1.25rem/1.3 var(--sans);letter-spacing:-.01em;color:var(--strong)}
.status{display:inline-block;margin-top:.5rem;padding:.0625rem .625rem;border:1px solid currentColor;border-radius:999px;font-size:.75rem}
.status.ok{color:var(--ok)}.status.bad{color:var(--bad)}.status.warn{color:var(--warn)}
.kv{display:grid;gap:0 1.5rem;margin:1rem 0 0}
@media (min-width:560px){.kv{grid-template-columns:11rem 1fr}}
.kv dt{color:var(--dim);padding-top:.5rem;font-size:.8125rem}
.kv dd{margin:0;padding-top:.5rem;color:var(--strong);overflow-wrap:anywhere}
.ptitle{margin:1.25rem 0 .25rem;font:11px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--dim)}
.partners{margin:0;padding:0!important;list-style:none}
.partners li{display:flex;justify-content:space-between;gap:1rem;padding:.4rem 0!important;border-top:1px solid var(--hair);margin:0!important;color:var(--strong)}
.partners span{color:var(--dim);text-align:right;font-size:.8125rem}
.json{margin:0;font:12.5px/1.65 var(--mono);white-space:pre-wrap;overflow-wrap:anywhere;color:var(--ink)}
.json .ln{display:block}
.k{color:var(--accent-ink)}.n{color:var(--warn)}.b{color:var(--ok)}.s{color:var(--ink)}
.err{color:var(--bad);margin:0}

/* home de testes */
.hero{padding:3.5rem 0 1rem;text-align:center}
.hero h1{margin:0;font-size:clamp(2rem,6vw,3rem);line-height:1.1;font-weight:600;letter-spacing:-.03em;color:var(--strong)}
.hero p{margin:1rem auto 0;max-width:36rem;font-size:1.125rem}
.test{max-width:56rem;margin:2rem auto 0}
.test .dform{padding:.375rem;border:1px solid var(--line);border-radius:1rem;background:var(--soft)}
.test .dform input{border:0;background:transparent;height:3rem;font-size:1rem}
.test .dform input:focus{box-shadow:none}
.test .dform:focus-within{border-color:var(--accent);box-shadow:0 0 0 4px var(--focus)}
.test .btn{height:3rem;border-radius:.75rem}
.test .chips{justify-content:center}
.empty-st{margin:0;padding:2rem 1rem;text-align:center;color:var(--dim)}
.cardbar{display:flex;justify-content:flex-end;margin:-.25rem 0 .5rem;font-size:.8125rem}
.cardbar a{color:var(--accent-ink);text-decoration:underline;text-underline-offset:2px}
.cardframe{display:block;width:100%;height:560px;border:1px solid var(--line);border-radius:.5rem;background:#fff}
.test .rbody{max-height:none;overflow:visible}
.test .json{max-height:34rem;overflow:auto;padding-right:.5rem}
.cmd{display:inline-flex;max-width:100%;align-items:center;gap:.75rem;margin-top:1.25rem;padding:.625rem 1rem;border:1px solid var(--line);border-radius:.75rem;background:var(--soft);font:13px var(--mono);color:var(--strong)}
.cmd code{min-width:0;overflow-wrap:anywhere}
.cmd button{flex:none;opacity:.6}.cmd button:hover{opacity:1}
.cmd svg{width:1rem;height:1rem}
.links3{display:grid;gap:1rem;margin:3rem 0 1rem}
@media (min-width:768px){.links3{grid-template-columns:repeat(3,1fr)}}
.lk{display:block;padding:1.25rem;border:1px solid var(--line);border-radius:1rem;transition:border-color .15s,background .15s}
.lk:hover{border-color:var(--accent-ink);background:var(--tint)}
.lk strong{display:block;color:var(--strong);font-weight:500}
.lk span{display:block;margin-top:.25rem;font-size:.9rem}

@media (max-width:640px){.rtabs .sp{order:5;width:100%;margin:0;padding:.5rem}.rtabs button.t{padding:.4rem .5rem}.hero{padding-top:2.25rem}.links3{margin-top:2rem}.dform{flex-wrap:wrap}.dform .btn{width:100%}.test .dform .btn{width:auto;flex:1 0 100%}}

/* busca (Ctrl K) */
.pal{position:fixed;inset:0;z-index:70;display:grid;place-items:start center;padding:12vh 1rem 0;background:rgba(0,0,0,.5)}
.pal-box{width:100%;max-width:36rem;overflow:hidden;border:1px solid var(--line);border-radius:1rem;background:var(--surface);box-shadow:var(--shadow)}
.pal-in{display:flex;align-items:center;gap:.75rem;padding:0 1rem;border-bottom:1px solid var(--line)}
.pal-in svg{width:1rem;height:1rem;color:var(--dim)}
.pal-in input{flex:1;height:3rem;border:0;outline:0;background:none;color:var(--strong);font:15px var(--sans)}
.pal ul{max-height:50vh;overflow:auto;margin:0;padding:.5rem;list-style:none}
.pal li a{display:flex;align-items:baseline;justify-content:space-between;gap:.75rem;padding:.625rem .75rem;border-radius:.5rem;font-size:.875rem;color:var(--muted)}
.pal li a.on{background:var(--tint);color:var(--strong)}
.pal li a span{font:11px var(--mono);color:var(--dim)}
.pal .empty{padding:1.5rem;text-align:center;font-size:.875rem;color:var(--dim)}
.nf{padding:6rem 0;text-align:center}.nf h1{color:var(--strong);font-weight:500}.nf a{color:var(--accent-ink);text-decoration:underline}

/* rodapé */
.ft{border-top:1px solid var(--line)}
.ft-g{display:grid;gap:2.5rem;padding:3rem 0}
@media (min-width:768px){.ft-g{grid-template-columns:1.6fr 1fr 1fr}}
.ft p{margin:0}
.ft .small{font-size:.75rem;color:var(--dim)}
.ft .blurb{margin-top:1rem;font-size:.875rem;max-width:28rem}
.ft .col{margin-bottom:.75rem;font:500 10.5px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--dim)}
.ft ul{margin:0;padding:0;list-style:none;display:grid;gap:.5rem}
.ft ul a{font-size:.875rem;color:var(--muted);transition:color .15s}.ft ul a:hover{color:var(--strong)}
.ft-b{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding:1.25rem 0;border-top:1px solid var(--hair)}
.ft-b a:hover{text-decoration:underline;color:var(--strong)}
.ft-r{display:flex;align-items:center;gap:.75rem}
.tsw{display:inline-flex;gap:.25rem;padding:.25rem;border:1px solid var(--line);border-radius:999px;background:var(--soft)}
.tsw button{display:grid;place-items:center;width:2rem;height:2rem;border-radius:999px;color:var(--dim);transition:color .15s}
.tsw button svg{width:.875rem;height:.875rem}
.tsw button:hover{color:var(--strong)}
.tsw button[aria-pressed=true]{background:var(--surface);color:var(--strong);box-shadow:0 0 0 1px var(--line)}
@media (prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto!important;transition:none!important}}
`
