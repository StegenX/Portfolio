import { build } from 'vite';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

// Render complete HTML for crawlers and no-JS visitors, then hydrate it in the browser.
const temporaryDirectory = await mkdtemp(path.resolve('.prerender-'));
await build({
  logLevel: 'warn',
  build: {
    ssr: path.resolve('src/entry-server.tsx'),
    outDir: temporaryDirectory,
    emptyOutDir: true,
    rolldownOptions: { output: { entryFileNames: 'render.mjs' } },
  },
});
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
try {
  const { render, projects, site, assetUrl, siteUrl } = await import(
    pathToFileURL(path.join(temporaryDirectory, 'render.mjs')).href
  );
  for (const project of projects) {
    if (project.requiresPublicDisclosureReview && project.caseStudy.length > 0) {
      throw new Error(
        `Public disclosure review is required before including detailed content for ${project.slug}. Keep its caseStudy empty and use only the generalized publicCaseStudy.`,
      );
    }
  }
  const template = await readFile('dist/index.html', 'utf8');
  const routes = ['/', ...projects.map((project) => `/projects/${project.slug}`), '/404'];
  for (const route of routes) {
    const project = projects.find((p) => route === `/projects/${p.slug}`);
    const title = project
      ? `${project.title} — ${site.name}`
      : route === '/'
        ? `${site.name} — AI Engineer`
        : `Page not found — ${site.name}`;
    const description = project?.summary ?? site.heroDescription;
    const canonical =
      site.productionUrl && route !== '/404' ? siteUrl(route, site.productionUrl) : null;
    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      jobTitle: site.role,
      sameAs: [site.githubUrl, ...(site.linkedinUrl ? [site.linkedinUrl] : [])],
      ...(site.productionUrl ? { url: site.productionUrl } : {}),
    };
    const metadata = [
      route === '/404' ? '<meta name="robots" content="noindex"/>' : '',
      canonical
        ? `<link rel="canonical" href="${escape(canonical)}"/><meta property="og:url" content="${escape(canonical)}"/>`
        : '',
      `<script type="application/ld+json">${JSON.stringify(person).replaceAll('<', '\\u003c')}</script>`,
    ].join('');
    let html = template
      .replace('<html lang="en">', `<html lang="en" data-prerendered-path="${escape(route)}">`)
      .replace('<!--app-->', render(route))
      .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace('<!--seo-->', metadata);
    for (const key of [
      'name="description"',
      'property="og:description"',
      'name="twitter:description"',
    ]) {
      html = html.replace(
        new RegExp(`(<meta ${key} content=")[^"]*("\\s*/?>)`),
        `$1${escape(description)}$2`,
      );
    }
    for (const key of ['property="og:title"', 'name="twitter:title"']) {
      html = html.replace(
        new RegExp(`(<meta ${key} content=")[^"]*("\\s*/?>)`),
        `$1${escape(title)}$2`,
      );
    }
    const socialImage = site.productionUrl
      ? siteUrl('/og-image.png', site.productionUrl)
      : assetUrl('/og-image.png');
    for (const key of ['property="og:image"', 'name="twitter:image"']) {
      html = html.replace(
        new RegExp(`(<meta ${key} content=")[^"]*("\\s*/?>)`),
        `$1${escape(socialImage)}$2`,
      );
    }
    const output =
      route === '/'
        ? 'dist/index.html'
        : route === '/404'
          ? 'dist/404.html'
          : path.join('dist', route, 'index.html');
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, html);
    console.log(`Prerendered ${route}`);
  }
  if (site.productionUrl) {
    const urls = routes
      .filter((route) => route !== '/404')
      .map((route) => `<url><loc>${escape(siteUrl(route, site.productionUrl))}</loc></url>`)
      .join('');
    await writeFile(
      'dist/sitemap.xml',
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    );
    await writeFile(
      'dist/robots.txt',
      `User-agent: *\nAllow: /\nSitemap: ${siteUrl('/sitemap.xml', site.productionUrl)}\n`,
    );
  } else console.log('Production domain unset: canonical URLs and sitemap intentionally deferred.');
  await writeFile('dist/.nojekyll', '');
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
