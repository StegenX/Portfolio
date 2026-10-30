import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/geist/latin-400.css';
import '@fontsource/geist/latin-500.css';
import '@fontsource/geist/latin-600.css';
import '@fontsource/geist/latin-700.css';
import '@fontsource/geist-mono/latin-400.css';
import './styles/globals.css';
import App from './app/App';
const root = document.getElementById('root')!;
const basename = import.meta.env.BASE_URL;
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
const renderedPath = document.documentElement.dataset.prerenderedPath;
const appPath =
  basename === '/'
    ? window.location.pathname
    : window.location.pathname.slice(basename.length - 1) || '/';
if (
  root.hasChildNodes() &&
  (renderedPath === appPath || renderedPath === appPath.replace(/\/$/, ''))
)
  hydrateRoot(root, app);
else createRoot(root).render(app);
