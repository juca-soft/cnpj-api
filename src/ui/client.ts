// JavaScript do navegador, servido em /assets/app.js. Fica em String.raw: use concatenação
// (sem `${}` nem crases) para o código não ser interpretado pelo template.
export const clientJs = String.raw`
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var cfgEl = $('#i18n');
  var T = cfgEl ? JSON.parse(cfgEl.textContent) : {};
  var root = document.documentElement;
  function store(k, v) { try { if (v == null) localStorage.removeItem(k); else if (v === undefined) return localStorage.getItem(k); else localStorage.setItem(k, v); } catch (e) {} return null; }
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* ---------- tema ---------- */
  function isDark() { return root.dataset.theme === 'dark' || (root.dataset.theme !== 'light' && matchMedia('(prefers-color-scheme:dark)').matches); }
  function setTheme(t) {
    store('theme', t === 'system' ? null : t);
    if (t === 'system') delete root.dataset.theme; else root.dataset.theme = t;
    syncTheme();
  }
  function syncTheme() {
    $$('[data-theme-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.themeSet === (root.dataset.theme || 'system'))); });
  }
  syncTheme();

  /* ---------- copiar ---------- */
  function flash(btn) {
    var old = btn.innerHTML; var label = btn.querySelector('span');
    var prev = label ? label.textContent : null;
    if (label) { label.textContent = btn.dataset.done || prev; btn.insertAdjacentHTML('afterbegin', T.icons.check); }
    else btn.innerHTML = T.icons.check;
    setTimeout(function () { btn.innerHTML = old; }, 1500);
  }
  function copy(text, btn) {
    try { navigator.clipboard.writeText(text).then(function () { flash(btn); }); } catch (e) {}
  }

  /* ---------- abas de linguagem ---------- */
  function setSnip(id) {
    store('snipLang', id);
    $$('[data-snip]').forEach(function (box) {
      $$('[data-lang-tab]', box).forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.langTab === id)); });
      $$('[data-pane]', box).forEach(function (p) { p.hidden = p.dataset.pane !== id; });
    });
  }
  var saved = get('snipLang'); if (saved) setSnip(saved);

  /* ---------- cliques ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-toggle],[data-theme-set],[data-menu],[data-mob],[data-copy],[data-copy-page],[data-lang-tab],[data-fill],[data-view],[data-docs-menu],[data-search]');
    var open = $$('.menu-pop').filter(function (p) { return !p.hidden; });
    if (!t || !t.hasAttribute('data-menu')) open.forEach(function (p) { if (!t || !p.parentNode.contains(t)) p.hidden = true; });
    if (!t) return;
    if (t.hasAttribute('data-theme-toggle')) setTheme(isDark() ? 'light' : 'dark');
    else if (t.dataset.themeSet) setTheme(t.dataset.themeSet);
    else if (t.hasAttribute('data-menu')) { var pop = t.parentNode.querySelector('.menu-pop'); pop.hidden = !pop.hidden; t.setAttribute('aria-expanded', String(!pop.hidden)); }
    else if (t.hasAttribute('data-mob')) { var mp = $('#mobpanel'); mp.hidden = !mp.hidden; t.setAttribute('aria-expanded', String(!mp.hidden)); }
    else if (t.hasAttribute('data-copy')) { var src = t.dataset.copy; var el = src && src.charAt(0) === '#' ? $(src) : null; copy(el ? el.textContent : src, t); }
    else if (t.hasAttribute('data-copy-page')) { var a = $('.article'); copy(a ? a.innerText : '', t); }
    else if (t.dataset.langTab) setSnip(t.dataset.langTab);
    else if (t.dataset.fill != null && $('#q')) { $('#q').value = t.dataset.fill; history.replaceState(null, '', '?cnpj=' + encodeURIComponent(t.dataset.fill)); lookup(t.dataset.fill); }
    else if (t.dataset.view) setView(t.dataset.view);
    else if (t.hasAttribute('data-docs-menu')) { var mn = $('#mobnav'); mn.hidden = !mn.hidden; t.setAttribute('aria-expanded', String(!mn.hidden)); }
    else if (t.hasAttribute('data-search')) openPalette();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { $$('.menu-pop').forEach(function (p) { p.hidden = true; }); closePalette(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k' && $('[data-search]')) { e.preventDefault(); palette ? closePalette() : openPalette(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest && e.target.closest('input,textarea,select,[contenteditable=true]')) return;
  });

  /* ---------- "Nesta página" ---------- */
  var heads = $$('.article h2[id]');
  if (heads.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      var vis = entries.filter(function (x) { return x.isIntersecting; }).sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (vis[0]) $$('.toc a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + vis[0].target.id); });
    }, { rootMargin: '-120px 0px -65% 0px' });
    heads.forEach(function (h) { io.observe(h); });
  }

  /* ---------- paleta de busca (Ctrl K) ---------- */
  var palette = null;
  function openPalette() {
    var idxEl = $('#search-index'); if (!idxEl || palette) return;
    var index = JSON.parse(idxEl.textContent); var active = 0; var results = index;
    palette = document.createElement('div'); palette.className = 'pal';
    palette.innerHTML = '<div class="pal-box" role="dialog" aria-modal="true"><div class="pal-in">' + T.icons.search + '<input placeholder="' + esc(T.docsSearch) + '" aria-label="' + esc(T.docsSearch) + '"></div><ul></ul></div>';
    document.body.appendChild(palette);
    var input = $('input', palette), list = $('ul', palette);
    function draw() {
      list.innerHTML = results.length ? results.map(function (r, i) { return '<li><a href="' + r.href + '" class="' + (i === active ? 'on' : '') + '">' + esc(r.title) + '<span>' + esc(r.group) + '</span></a></li>'; }).join('') : '<li class="empty">' + esc(T.noResults) + '</li>';
    }
    function filter() {
      var q = input.value.trim().toLowerCase();
      results = !q ? index : index.map(function (r) { return { r: r, s: r.title.toLowerCase().indexOf(q) >= 0 ? 2 : r.text.toLowerCase().indexOf(q) >= 0 ? 1 : 0 }; }).filter(function (x) { return x.s; }).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.r; });
      active = 0; draw();
    }
    input.addEventListener('input', filter);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, results.length - 1); draw(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); draw(); }
      if (e.key === 'Enter' && results[active]) location.href = results[active].href;
    });
    palette.addEventListener('mousedown', function (e) { if (e.target === palette) closePalette(); });
    draw(); input.focus();
  }
  function closePalette() { if (palette) { palette.remove(); palette = null; } }

  /* ---------- consulta (demo simples) ---------- */
  var form = $('#lookup');
  if (!form) return;
  var input = $('#q'), btn = $('#go'), out = $('#out'), meta = $('#meta'), copyBtn = $('#copyjson');
  var state = { data: null, view: 'card' }, token = 0;
  var R = T.r;

  function clean(v) { return v.replace(/[.\-\/\s]/g, '').toUpperCase(); }
  function maskCnpj(c) { return c.length === 14 ? c.slice(0, 2) + '.' + c.slice(2, 5) + '.' + c.slice(5, 8) + '/' + c.slice(8, 12) + '-' + c.slice(12) : c; }

  function setView(v) {
    state.view = v;
    $$('[data-view]').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.view === v)); });
    $$('[data-vpane]').forEach(function (p) { p.hidden = p.dataset.vpane !== v; });
    var box = $('.res'); if (box && box.getBoundingClientRect().top < 0) box.scrollIntoView({ block: 'start' });
  }

  function hl(line) {
    var o = '', last = 0, m, re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
    while ((m = re.exec(line))) {
      o += esc(line.slice(last, m.index));
      if (m[1]) o += m[2] ? '<span class="k">' + esc(m[1]) + '</span>' + esc(m[2]) : '<span class="s">' + esc(m[1]) + '</span>';
      else if (m[3]) o += '<span class="b">' + m[0] + '</span>';
      else o += '<span class="n">' + m[0] + '</span>';
      last = re.lastIndex;
    }
    return o + esc(line.slice(last));
  }
  function jsonHtml(data) {
    return JSON.stringify(data, null, 2).split('\n').map(function (l, i) { return '<span class="ln rv" style="--i:' + Math.min(i, 40) + '">' + hl(l) + '</span>'; }).join('');
  }
  function fmtDate(s) {
    if (!s) return '';
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return new Date(s.slice(0, 10) + 'T00:00:00Z').toLocaleDateString(T.lang === 'en' ? 'en-US' : 'pt-BR', { timeZone: 'UTC' });
    return s;
  }
  function fmtMoney(v) {
    var n = typeof v === 'string' ? parseFloat(v) : v;
    if (n == null || isNaN(n)) return '';
    return n.toLocaleString(T.lang === 'en' ? 'en-US' : 'pt-BR', { style: 'currency', currency: 'BRL' });
  }
  function norm(d, source) {
    if (source === 'receitaws') {
      var act = d.atividade_principal && d.atividade_principal[0];
      return {
        cnpj: d.cnpj, name: d.nome, fantasy: d.fantasia, status: d.situacao, opened: d.abertura, type: d.tipo, size: d.porte, legal: d.natureza_juridica,
        capital: d.capital_social, cnae: act ? act.text : '',
        address: [[d.logradouro, d.numero].filter(Boolean).join(', '), d.complemento, d.bairro, [d.municipio, d.uf].filter(Boolean).join(' - '), d.cep].filter(Boolean).join(' · '),
        phone: d.telefone, email: d.email,
        partners: (d.qsa || []).map(function (q) { return { name: q.nome, role: q.qual }; })
      };
    }
    return {
      cnpj: d.cnpj, name: d.razao_social, fantasy: d.nome_fantasia, status: d.descricao_situacao_cadastral, opened: d.data_inicio_atividade, type: d.descricao_identificador_matriz_filial, size: d.porte, legal: d.natureza_juridica,
      capital: d.capital_social, cnae: d.cnae_fiscal_descricao,
      address: [[[d.descricao_tipo_de_logradouro, d.logradouro].filter(Boolean).join(' '), d.numero].filter(Boolean).join(', '), d.complemento, d.bairro, [d.municipio, d.uf].filter(Boolean).join(' - '), d.cep].filter(Boolean).join(' · '),
      phone: d.ddd_telefone_1, email: d.email,
      partners: (d.qsa || []).map(function (q) { return { name: q.nome_socio, role: q.qualificacao_socio }; })
    };
  }
  function summaryHtml(d, source) {
    var n = norm(d, source), i = 0, f = R.fields;
    var st = String(n.status || ''); var cls = /ATIV/i.test(st) ? 'ok' : /SUSP|INAPT/i.test(st) ? 'warn' : 'bad';
    var rows = [
      [f.cnpj, maskCnpj(clean(String(n.cnpj || '')))], [f.fantasy, n.fantasy], [f.opened, fmtDate(n.opened)], [f.type, n.type], [f.size, n.size],
      [f.legal, n.legal], [f.capital, fmtMoney(n.capital)], [f.cnae, n.cnae], [f.address, n.address], [f.phone, n.phone], [f.email, n.email]
    ].filter(function (r) { return r[1]; });
    var h = '<div class="head rv"><h3>' + esc(n.name || '—') + '</h3>' + (st ? '<span class="status ' + cls + '">● ' + esc(st) + '</span>' : '') + '</div><dl class="kv">';
    rows.forEach(function (r) { i++; h += '<dt class="rv" style="--i:' + i + '">' + esc(r[0]) + '</dt><dd class="rv" style="--i:' + i + '">' + esc(r[1]) + '</dd>'; });
    h += '</dl><p class="ptitle">' + esc(R.partners) + '</p>';
    h += n.partners.length ? '<ul class="partners">' + n.partners.slice(0, 12).map(function (p, k) { return '<li class="rv" style="--i:' + (i + 1 + k) + '">' + esc(p.name) + '<span>' + esc(p.role || '') + '</span></li>'; }).join('') + '</ul>' : '<p class="err" style="color:var(--dim)">' + esc(R.noPartners) + '</p>';
    return h;
  }

  function render(data, source, status, ms, cnpj) {
    state.data = data;
    var url = '/cartao/' + encodeURIComponent(cnpj);
    out.innerHTML =
      '<div data-vpane="card"><div class="cardbar"><a href="' + url + '" target="_blank" rel="noopener">' + esc(R.openCard) + '</a></div><iframe id="cardframe" class="cardframe" scrolling="no" title="' + esc(R.tabCard) + '" src="' + url + '?embed=1"></iframe></div>' +
      '<div data-vpane="summary" hidden>' + summaryHtml(data, source) + '</div>' +
      '<pre class="json" data-vpane="json" hidden>' + jsonHtml(data) + '</pre>';
    meta.textContent = status + ' · ' + R.source + ': ' + source + (ms ? ' · ' + ms + ' ms' : '');
    copyBtn.hidden = false;
    setView(state.view);
  }
  function fail(msg, status) {
    state.data = null; copyBtn.hidden = true;
    out.innerHTML = '<p class="err rv">' + esc(msg) + '</p>';
    meta.textContent = status ? String(status) : '';
  }
  addEventListener('message', function (e) {
    var f = $('#cardframe');
    if (f && e.data && e.data.cnpjCardHeight) f.style.height = e.data.cnpjCardHeight + 'px';
  });

  async function lookup(raw) {
    raw = (raw || '').trim(); if (!raw) return;
    var id = ++token; btn.disabled = true;
    out.innerHTML = '<div class="sk" style="width:60%"></div><div class="sk" style="width:85%"></div><div class="sk" style="width:40%"></div>';
    meta.textContent = R.loading;
    var started = performance.now(), res;
    try { res = await fetch('/' + encodeURIComponent(raw)); } catch (e) { if (id === token) { btn.disabled = false; fail(R.network, ''); } return; }
    var j = null; try { j = await res.json(); } catch (e) {}
    if (id !== token) return;
    btn.disabled = false;
    var s = res.status;
    if (s === 200 && j) return render(j, res.headers.get('x-source') || '', s, Math.round(performance.now() - started), clean(raw));
    fail(s === 400 ? R.invalid : s === 404 ? R.notFound : s === 502 ? R.upstream : R.network, s);
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); history.replaceState(null, '', '?cnpj=' + encodeURIComponent(input.value.trim())); lookup(input.value); });
  copyBtn.addEventListener('click', function () { if (state.data) copy(JSON.stringify(state.data, null, 2), this); });
  setView('card');
  var q0 = new URLSearchParams(location.search).get('cnpj');
  if (q0) { input.value = q0; lookup(q0); }
})();
`
