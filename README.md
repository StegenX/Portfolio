# Aymane Agharbi — Portfolio

A complete, dark-only AI engineering portfolio built from [the supplied brief](./PORTFOLIO_README.md). React, TypeScript, Vite, Tailwind CSS, Motion, Lucide, React Router, and locally hosted Geist fonts. No CMS, backend, analytics, or runtime AI calls.

## Run locally

Requires Node.js 20.19+ (Node 22 LTS recommended).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
# Or run the temporary HTTP smoke check (build first):
npm run check:preview
```

The build produces `dist/`, including prerendered HTML for the homepage and every case study. The browser hydrates those pages, and React Router handles subsequent navigation. Complete case-study text and distinct title/description metadata are visible to crawlers without JavaScript.

## Edit content

| File                                     | Content                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `src/data/site.ts`                       | Name, headline, editorial status, introduction, contacts, conceptual workflow, production domain |
| `src/data/projects.ts`                   | Three projects, verified metrics, architecture descriptions, detailed case studies               |
| `src/data/skills.ts`                     | Expertise and grouped technology stack                                                           |
| `src/data/experience.ts`                 | Experience, separate dates/ongoing flag, education, achievements                                 |
| `src/styles/globals.css`                 | Design tokens, layouts, breakpoints, reduced-motion rules                                        |
| `src/components/ProjectArchitecture.tsx` | Native, code-drawn architecture illustrations                                                    |

Unknown links are `null` and do not render. The résumé action appears automatically when `resumeUrl` is set. Editorial defaults (headline and status) remain editable; availability for hire is not asserted.

## Before public launch

These items do not block local use:

- Supply the résumé PDF and explicitly approve publication of its contact details. Only then place it at `public/resume/Aymane_Agharbi.pdf` and set `resumeUrl` to `/resume/Aymane_Agharbi.pdf`.
- Review the generalized OCP case study for public disclosure. `requiresPublicDisclosureReview: true` identifies this project. The renderer shows only `publicCaseStudy` while that flag is set, and the production build rejects nonempty detailed `caseStudy` content on an unreviewed project; do not add internal diagrams, artifacts, company metrics, or implementation details before review.
- Reconfirm the internship and education dates at launch. The internship is ongoing, with January 2027 shown as its planned end.
- For hosts other than GitHub Pages, set `VITE_SITE_URL` to the full real site URL (including any subfolder). GitHub Pages supplies it automatically. The build generates canonical URLs, absolute social-image URLs, an XML sitemap, and its robots.txt entry.

No résumé PDF was present in the workspace when the portfolio was built. No project screenshots or portrait were supplied; visual diagrams are explicitly illustrative. No benchmark, uptime, hiring availability, or deployment claims are fabricated.

## GitHub Pages deployment

The project is configured for GitHub Pages at either a repository URL, a user site, or a custom domain. Case studies are real prerendered directories, so direct visits and refreshes work without server rewrites or hash routing. The custom `404.html` handles unknown URLs. Assets, navigation, canonical URLs, and social images include the repository base path.

1. Push the source and `package-lock.json` to the `main` branch of your portfolio repository. Include `.github/workflows/deploy-pages.yml`; do not upload `node_modules` or `dist`.
2. In GitHub, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow** for the first deployment, or push another commit to `main`.
4. Once the workflow succeeds, use the URL shown in the `github-pages` deployment environment.

The workflow installs dependencies, lints, runs tests, builds and prerenders the site, checks its static output, and deploys `dist`. It obtains `VITE_BASE_PATH` and `VITE_SITE_URL` from GitHub Pages, so no repository name or domain is hardcoded. GitHub supplies the workflow token; no personal access token is required.

The workflow deploys commits already pushed to GitHub; it does not create the repository or push local changes. If you use a default branch other than `main`, update the workflow's push branch.

To verify a repository-folder build locally, replace the example values with your actual Pages URL:

```sh
VITE_BASE_PATH=/YOUR_REPOSITORY/ VITE_SITE_URL=https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/ npm run build
VITE_BASE_PATH=/YOUR_REPOSITORY/ VITE_SITE_URL=https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/ npm run check:static
VITE_BASE_PATH=/YOUR_REPOSITORY/ npm run check:preview
```

For a user site or custom domain, use `VITE_BASE_PATH=/`. You can also copy `.env.example` to `.env.local` and set the variables there. Keep the same base path for build and preview. `npm run check:static` verifies the generated files without starting a server; `check:preview` additionally checks real HTTP requests, including trailing-slash project URLs.

## Vercel deployment

Import this directory as a Vercel project with the **Vite** preset. Use `npm run build` as the build command and `dist` as the output directory. The included `vercel.json` supplies the SPA fallback and long-lived caching for fingerprinted assets. An explicit project rewrite serves each prerendered case study before the general SPA fallback, so direct project visits and sharing previews receive their own HTML. A small Vite preview middleware provides the same behavior locally.

After the first domain is assigned, set `VITE_SITE_URL` in Vercel to that full URL and rebuild. Leave `VITE_BASE_PATH=/` for a root deployment. To deploy using your configured Vercel CLI, run `vercel` (preview) or `vercel --prod` (production). This project does not contain hosting credentials or a registered deployment.

For another static host, preserve the generated route directories and configure unknown HTML requests to fall back to `index.html`; serve `404.html` for real missing pages when supported.

## Accessibility and interaction

Semantic landmarks, a skip link, visible focus, 44px minimum mobile targets, a keyboard/focus/touch-accessible workflow, an Escape-dismissable mobile navigation menu, polite clipboard confirmation, and `mailto:` fallback. No form or server is needed. Motion follows `prefers-reduced-motion`. Status cards describe portfolio content rather than simulated live infrastructure.

The test suite checks content integrity, confidentiality markers, missing destinations, workflow interaction, clipboard success/failure, unknown project handling, page navigation, and Escape-to-close menu behavior. `npm run check:preview` starts a temporary local server, verifies each prerendered route and its assets over HTTP, and stops the server afterward. Responsive CSS explicitly covers the brief's seven target widths; visual browser checks depend on an available browser session.

## Social assets

`public/favicon.svg` and `public/og-image.png` are original, code-drawn monochrome assets. Regenerate the social image with `python3 scripts/generate-og.py` (Pillow required; uses standard DejaVu fonts for this standalone asset). The website itself uses Geist and Geist Mono from local `@fontsource` packages.

## Verification in this workspace

- TypeScript checking, ESLint, and the production build pass.
- Content, interaction, and navigation tests include root hosting and repository-folder routing.
- HTTP checks pass for the homepage, all three direct project URLs, their distinct prerendered metadata, JavaScript/CSS assets, favicon, social image, and robots.txt.
- No browser session was available. Visual QA at the seven requested widths and Lighthouse scores remain unverified.
- The site has not been publicly deployed.
