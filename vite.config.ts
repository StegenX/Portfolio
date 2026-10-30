import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { projects } from './src/data/projects.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const folder = (env.VITE_BASE_PATH ?? '').split('/').filter(Boolean).join('/');
  const base = folder ? `/${folder}/` : '/';
  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'prerendered-project-previews',
        configurePreviewServer(server) {
          server.middlewares.use((request, _response, next) => {
            const [pathname, query] = (request.url ?? '/').split('?');
            const relativePath =
              base !== '/' && pathname.startsWith(base)
                ? `/${pathname.slice(base.length)}`
                : pathname;
            const project = projects.find(
              (item) => relativePath.replace(/\/$/, '') === `/projects/${item.slug}`,
            );
            if (project)
              request.url = `${base}projects/${project.slug}/index.html${query ? `?${query}` : ''}`;
            next();
          });
        },
      },
    ],
    test: { environment: 'jsdom', setupFiles: './tests/setup.ts', css: false },
  };
});
