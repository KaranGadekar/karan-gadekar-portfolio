/**
 * Prerender: renders <App /> to static HTML at build time and injects it into
 * dist/index.html, so content, headings and links are in the initial HTML
 * (faster first paint, crawlable without JavaScript). The client then hydrates.
 */
import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const appHtml = render();

const indexPath = resolve(dist, 'index.html');
let html = readFileSync(indexPath, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Root placeholder not found in dist/index.html');

// Preload the Latin subset of Inter (the only subset this English page needs).
const font = readdirSync(resolve(dist, 'assets')).find((f) => /^inter-latin-wght-normal.*\.woff2$/.test(f));
const base = process.env.PRERENDER_BASE ?? '/';
const preload = font
  ? `<link rel="preload" href="${base}assets/${font}" as="font" type="font/woff2" crossorigin />\n  `
  : '';

// Without JavaScript, scroll-reveal elements must still be visible.
const noscriptStyle =
  '<noscript><style>[data-reveal]{opacity:1!important;transform:none!important}</style></noscript>\n  ';

html = html
  .replace('</head>', `  ${preload}${noscriptStyle}</head>`)
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

writeFileSync(indexPath, html);
rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${(appHtml.length / 1024).toFixed(1)} KB of HTML into dist/index.html`);
