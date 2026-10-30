import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './app/App';
import { assetUrl } from './lib/urls';
export { projects } from './data/projects';
export { site } from './data/site';
export { assetUrl, siteUrl } from './lib/urls';
export function render(url: string) {
  return renderToString(
    <StaticRouter basename={import.meta.env.BASE_URL} location={assetUrl(url)}>
      <App />
    </StaticRouter>,
  );
}
