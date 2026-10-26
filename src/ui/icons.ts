const s = (body: string, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`

export const icon = {
  search: s('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
  sun: s('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>', 'class="theme-sun"'),
  moon: s('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>', 'class="theme-moon"'),
  copy: s('<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
  check: s('<path d="M20 6 9 17l-5-5"/>'),
  languages: s('<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>'),
  chevron: s('<path d="m6 9 6 6 6-6"/>'),
  menu: s('<path d="M4 6h16M4 12h16M4 18h16"/>'),
  x: s('<path d="M18 6 6 18M6 6l12 12"/>'),
  minus: s('<path d="M5 12h14"/>'),
  square: s('<rect width="16" height="16" x="4" y="4" rx="1"/>'),
  toc: s('<path d="M15 12H3M17 18H3M21 6H3"/>'),
  arrowLeft: s('<path d="m12 19-7-7 7-7M19 12H5"/>'),
  arrowRight: s('<path d="m12 5 7 7-7 7M5 12h14"/>'),
  play: s('<path d="M6 4v16l14-8z" fill="currentColor"/>'),
  monitor: s('<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>'),
  github:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>',
}

