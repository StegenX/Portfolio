/** Resolve public assets under either a root site or a repository subfolder. */
export function assetUrl(path: string) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

/** productionUrl is the full site root, including its GitHub Pages repository path. */
export function siteUrl(path: string, productionUrl: string) {
  return new URL(path.replace(/^\/+/, ''), `${productionUrl.replace(/\/+$/, '')}/`).href;
}
