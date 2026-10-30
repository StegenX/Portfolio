import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), 'VITE_');
const folder = (env.VITE_BASE_PATH ?? '').split('/').filter(Boolean).join('/');
const base = folder ? `/${folder}/` : '/';
const productionUrl = env.VITE_SITE_URL?.trim();
const directories = await readdir('dist/projects', { withFileTypes: true });
const routes = [
  '/',
  ...directories.filter((entry) => entry.isDirectory()).map((entry) => `/projects/${entry.name}`),
];

function deploymentUrl(route) {
  return new URL(route.replace(/^\/+/, ''), `${productionUrl.replace(/\/+$/, '')}/`).href;
}

for (const route of [...routes, '/404']) {
  const file =
    route === '/'
      ? 'dist/index.html'
      : route === '/404'
        ? 'dist/404.html'
        : `dist${route}/index.html`;
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: complete prerendered page`);
  assert(html.includes(`data-prerendered-path="${route}"`), `${route}: hydration path`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1].replaceAll('&amp;', '&');
    if (!url.startsWith('/')) continue;
    assert(url.startsWith(base), `${route}: escaped deployment base: ${url}`);
    const localPath = decodeURI(url.slice(base.length).split(/[?#]/)[0]);
    const target = path.join('dist', localPath);
    assert(
      existsSync(target) || existsSync(path.join(target, 'index.html')),
      `${route}: missing ${url}`,
    );
  }
  if (productionUrl && route !== '/404') {
    assert(
      html.includes(`<link rel="canonical" href="${deploymentUrl(route)}"`),
      `${route}: canonical URL`,
    );
    assert(
      html.includes(`content="${deploymentUrl('/og-image.png')}"`),
      `${route}: social image URL`,
    );
  }
  console.log(
    `PASS ${base}${route.replace(/^\/+/, '')}: static HTML, assets, navigation, and metadata`,
  );
}
if (productionUrl) {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  for (const route of routes) assert(sitemap.includes(`<loc>${deploymentUrl(route)}</loc>`));
  assert((await readFile('dist/robots.txt', 'utf8')).includes(deploymentUrl('/sitemap.xml')));
}
assert(existsSync('dist/.nojekyll'));
console.log('PASS GitHub Pages artifact and deployment base');
