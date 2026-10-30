import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { site } from '../data/site';
import { siteUrl } from '../lib/urls';
export function SEO() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  const project = projects.find((p) => pathname === `/projects/${p.slug}`);
  const title = project
    ? `${project.title} — ${site.name}`
    : pathname === '/'
      ? `${site.name} — AI Engineer`
      : `Page not found — ${site.name}`;
  const description = project?.summary ?? site.heroDescription;
  useEffect(() => {
    document.title = title;
    const set = (selector: string, content: string) =>
      document.querySelector(selector)?.setAttribute('content', content);
    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
    set('meta[name="twitter:title"]', title);
    set('meta[name="twitter:description"]', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (site.productionUrl) {
      const url = siteUrl(pathname, site.productionUrl);
      if (canonical) canonical.setAttribute('href', url);
      else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = url;
        document.head.append(link);
      }
      set('meta[property="og:url"]', url);
    }
  }, [title, description, pathname]);
  return null;
}
