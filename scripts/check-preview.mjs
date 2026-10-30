import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { preview } from 'vite';

// An HTTP smoke check, not a replacement for visual/browser accessibility testing.
const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } });
try {
  const address = server.httpServer.address();
  assert(address && typeof address === 'object');
  const origin = `http://127.0.0.1:${address.port}`;
  const base = server.config.base;
  const projectDirectories = await readdir('dist/projects', { withFileTypes: true });
  const routes = [
    '/',
    ...projectDirectories
      .filter((entry) => entry.isDirectory())
      .map((entry) => `/projects/${entry.name}`),
  ];
  for (const route of routes) {
    const diskPath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
    const expected = await readFile(diskPath, 'utf8');
    const response = await fetch(`${origin}${base}${route.replace(/^\/+/, '')}`);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal(
      html.match(/<title>(.*?)<\/title>/)?.[1],
      expected.match(/<title>(.*?)<\/title>/)?.[1],
      `${route}: unique prerendered title`,
    );
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: one primary heading`);
    assert(!html.includes('<!--app-->'), `${route}: complete server-rendered content`);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (match[1].startsWith(`${base}assets/`))
        assert.equal((await fetch(`${origin}${match[1]}`)).status, 200, match[1]);
    }
    if (route !== '/') {
      const directoryResponse = await fetch(`${origin}${base}${route.slice(1)}/`);
      assert.equal(directoryResponse.status, 200);
      assert.equal(
        (await directoryResponse.text()).match(/<title>(.*?)<\/title>/)?.[1],
        expected.match(/<title>(.*?)<\/title>/)?.[1],
        `${route}: directory refresh`,
      );
    }
    console.log(`PASS ${route}: HTTP 200, unique metadata, prerendered content, working assets`);
  }
  for (const file of ['/favicon.svg', '/og-image.png', '/robots.txt']) {
    assert.equal((await fetch(`${origin}${base}${file.slice(1)}`)).status, 200, file);
  }
  console.log('PASS favicon, social image, and robots.txt');
} finally {
  await server.close();
}
