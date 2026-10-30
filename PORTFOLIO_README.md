# Aymane Agharbi — AI Engineering Portfolio

> **Implementation specification for Codex**  
> Build a polished, production-ready personal portfolio. This document is the source of truth for visual decisions, content, interactions, architecture, and acceptance criteria. Do not replace specified decisions with generic portfolio templates.

## 1. Project mission

Build an English-language, dark-only, monochrome portfolio for **Aymane Agharbi**, presenting him primarily as an **AI Engineer** with complementary strength in **Data Engineering** and **Software Engineering**. The experience should feel like a premium technical control center, not a conventional résumé landing page.

The desired visitor journey is: understand AI-engineering identity in five seconds → inspect featured technical projects → understand engineering depth and experience → access GitHub, LinkedIn, résumé, or email.

### Immutable user decisions

| Area | Decision |
|---|---|
| Overall style | Premium bento-grid engineering dashboard (Option C) |
| Palette | Monochrome, near-black / charcoal / white / gray; **no colorful gradients** |
| Theme | Dark only; **no theme toggle** |
| Primary identity | **AI Engineer**; clearly explain Data Engineering and Software Engineering expertise |
| Typography | **Geist** and **Geist Mono** |
| Hero | **Bento dashboard hero** |
| Card style | Soft corners, nuanced gray borders, restrained hover glow |
| Page composition | **Hybrid**: bento hero, spacious project case studies, compact expertise/experience |
| Animations | Polished, balanced: scroll reveal, stagger, soft spotlight, subtle architecture motion |
| Mobile | Mobile-first **stacked cards**, simplified diagrams |
| Projects | **2–3 featured projects**, detailed case studies |
| Navigation | **Floating pill** navigation |
| Experience | Vertical timeline |
| Contact | Prominent email, GitHub, LinkedIn, and résumé download; **no contact form** |
| Special UI | Interactive AI architecture card; truthful system-status/engineering snapshot cards |
| Frontend | **React + TypeScript + Vite** |
| Styling | Tailwind CSS, CSS variables/design tokens |
| Animation | Motion for React; CSS transitions where simpler |
| Icons | Lucide React |
| Deployment | **Vercel** |
| Content | Local, type-safe TypeScript data files; no CMS |
| Language | English only |

### Choices deliberately left editable

The user did not explicitly choose a hero headline, portrait treatment, or availability label. Use these **provisional defaults** and expose them in the local content file for easy editing:
- Headline: **“Building Intelligent Systems.”**
- Supporting introduction: *“I design AI applications, retrieval systems, and reliable data foundations—from pipelines and search to grounded, useful AI experiences.”* (editorial copy inspired by résumé; not a quote)
- Hero visual: abstract, code-based AI system graphic rather than an invented portrait.
- Status: **“Currently building AI systems”**, not “open to work” or “available for hire” unless Aymane explicitly confirms availability.

Do not present any provisional choices as confirmed biography. Avoid fabricated testimonials, customers, numbers, job titles, certifications, awards, project screenshots, or employment claims.

---

## 2. Visual design system

### Color tokens

Use CSS variables, consistently and accessibly. The hex codes below are suggested exact defaults and may be tuned slightly for contrast, but stay strictly monochrome:

```css
:root {
  color-scheme: dark;
  --bg: #0a0a0a;
  --surface: #141414;
  --surface-raised: #1b1b1b;
  --surface-hover: #222222;
  --border: #2b2b2b;
  --border-strong: #464646;
  --text: #f5f5f5;
  --text-secondary: #b5b5b5;
  --text-muted: #858585;
  --accent: #ededed;
  --focus: #f5f5f5;
  --shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
  --radius-card: 20px;
  --radius-inner: 12px;
}
```

**Aesthetic:** matte charcoal background; restrained fine-line edges; high-contrast white titles; subtle off-white typography; mono uppercase micro-labels; light texture/grid only where it improves visual hierarchy. No neon or brand-colored logo carousel. Use grayscale or text-only treatments for logos, without changing external brands' official marks inaccurately.

### Typography

- Geist: display, headings, body, links, UI.
- Geist Mono: section overlines, tags, timelines, architecture labels, metadata, small numeric summaries.
- Fluid typography using `clamp()`: large confident hero heading, medium section headings, comfortable 16–18px body text.
- Aim for body line-height 1.6; short paragraphs and readable measures (60–75ch).
- Prefer `font-display: swap`; self-host or use the appropriate supported font package; avoid layout shifts.

### Layout metrics

- Overall content max width: **1200–1280px**, centered.
- Desktop horizontal padding: **32–48px**; tablet: **24px**; mobile: **16–20px**.
- Grid gutter: **16px** desktop, **12px** mobile; section separation: **88–120px** desktop, **56–72px** mobile.
- Desktop hero: 12-column grid, main introduction spanning ~7–8 columns with supporting smaller cards spanning remaining columns; create visual interest via measured card heights, not chaotic masonry.
- Cards: 18–24px padding on desktop and 16–20px on mobile; 18–22px corner radius; 1px hairline borders.
- Subtle grayscale glows should appear **only on interaction** or behind a focal graphic. No animated visual noise.

### Interaction rules

- Hover: slight raise (`translateY(-3px)` max), border brightening, extremely subtle radial spotlight within card.
- Cards that open case studies must be fully keyboard reachable and have clear visible focus.
- Entrance: opacity + 12–20px translate, 0.45–0.7s, stagger 0.05–0.10s.
- Navigation: smooth anchor scroll, active section indicator, readable pill labels, background blur only if performant.
- Architecture data-flow animation: subtle motion, paced rather than constantly flashing.
- Respect `prefers-reduced-motion`: replace transforms and looping motion with static states; retain content/functionality.
- Do not force scrolljacking, tilt effects, custom cursor, 3D scene, or per-letter animation.

---

## 3. Information architecture

### Routes

- `/` — single-page portfolio, sections in this exact order:
  1. Hero / Bento Dashboard
  2. About Me
  3. Featured Projects
  4. Engineering Expertise
  5. Technology Stack
  6. Experience
  7. Education & Achievements
  8. Contact / Footer
- `/projects/:slug` — deep project case study for each featured project (client-side route using React Router or equivalent). Provide working refresh/deep-link behavior on Vercel via SPA rewrite.
- Optional `/404` or polished fallback route; all links must resolve.

The **Education & Achievements** section should include résumé-verified awards and leadership activities without introducing an extra main navbar item.

### Floating navigation

Desktop: horizontally centered or centered-top floating pill with short anchors **Home · About · Projects · Expertise · Experience · Contact**, an accessible active state and optionally a compact résumé action. Avoid cramming every section into the pill; Stack and Education remain scroll-reachable and semantically titled. Mobile: pill with condensed labels or an accessible menu when needed; never allow horizontal overflow. Include appropriate ARIA labels, Escape close behavior if using a menu, and obvious focus states.

---

## 4. Home page detailed specification

### 4.1 Hero dashboard

Desktop bento composition (illustrative, not rigid):

```text
┌───────────────────────────────────────────┬──────────────────────┐
│ AI ENGINEER / AYMANE AGHARBI              │ Current focus /      │
│ Building Intelligent Systems.             │ engineering snapshot │
│ AI, data, software introduction           ├──────────────────────┤
│ [Explore Projects] [Download Résumé]      │ GitHub / contact /   │
│                                           │ compact metadata     │
├───────────────────────────────┬───────────┴──────────────────────┤
│ Interactive AI system flow    │ AI / Data / Software expertise  │
└───────────────────────────────┴──────────────────────────────────┘
```

- Clear name: **Aymane Agharbi**.
- Visual title: **AI Engineer**; supporting labels: *Data Engineering / Software Engineering*.
- Proposed hero statement: **Building Intelligent Systems.**
- CTA order: **Explore Projects**, **Download Résumé**, optional discreet **Get in Touch**.
- Subtle mono eyebrow: `AI ENGINEER  /  BASED IN MOROCCO` (résumé lists Rabat/Technopolis; avoid displaying precise workplace as permanent residence).
- A small status card should say **Currently building AI systems**, framed as editorial status rather than live infrastructure telemetry.
- Hero should feel compelling at 1440px, 1024px, 768px and 375px without becoming extremely tall before projects appear.
- No fake chat assistant or terminal required; these were *not* selected.

### 4.2 Interactive AI architecture card

A technically meaningful component showing an example **document intelligence / RAG workflow**, labeled clearly as a **conceptual workflow**, not an assertion of exact OCP internal architecture:

`Documents → Processing / Chunking → Embeddings → Retrieval → Context → LLM → Grounded Answer`

- Use SVG/HTML/CSS with orthogonal, clean connectors where practical; do not require a complex graph package.
- Hover/focus/tap reveals a short step explanation; the active step highlights only the relevant edges/nodes.
- Optional gentle flow indicator when motion is allowed.
- Mobile: simplified two-row or vertical flow, fully understandable without hover.
- Add a small disclaimer: *“Illustrative AI workflow — project-specific architectures are explained in case studies.”*
- Do **not** expose proprietary OCP system details or suggest access to corporate internals.

### 4.3 About Me

Suggested copy (editable, adapted to the résumé):

> I’m Aymane, a Data & AI Engineer focused on building useful AI systems backed by dependable data infrastructure. My work spans retrieval-augmented generation, AI agents, data pipelines, model-oriented workflows, and production-minded software. I enjoy connecting system design with implementation—from data ingestion and retrieval through APIs, evaluation, and user-facing experiences.

This prose is a polished synthesis, not a verbatim quote. Keep it to ~90–120 words if expanded. Pair with 2–3 small cards showing **AI-first thinking**, **Data foundations**, and **Software discipline**. No fabricated personal hobbies.

### 4.4 Featured projects

Exactly **three** features in this order, grounded in the résumé:

1. **Financial RAG Assistant** — strongest explicitly documented AI project.
2. **AI-Powered Business Process Impact Analysis** — ongoing professional work at OCP Group; present as a **confidential / professional case study with generalized architecture**, not public-source code or a finished public product.
3. **End-to-End Cloud Data Pipeline** — clear data engineering breadth, with the résumé's supported metrics.

Visual design: one visually prominent top project, two complementary cards or three spacious staggered cards; each shows category, name, concise problem statement, architecture motif rather than invented screenshot, outcome/scale if verified, stack tags, and action. The OCP project should have an **Explore Case Study** button, not invented GitHub link.

Every project must support a detailed case-study page, using the data model in section 8. If screenshots are unavailable, make an elegant diagram-based placeholder. **Never imply a mockup is a screenshot of the actual product.**

#### Project 1 — Financial RAG Assistant

**Source-grounded facts:**
- End-to-end RAG system over **14 SEC 10-K filings** from Apple, Microsoft, Tesla, Amazon, and Alphabet.
- Processed **2,312 pages** into **6,357** searchable chunks from text, tables, and OCR-derived content.
- Hybrid retrieval: MiniLM semantic embeddings + BM25; Reciprocal Rank Fusion; cross-encoder reranking; company/year metadata filters.
- Streamlit interface with history-aware query rewriting, financial-domain guardrails, source-page context, grounded answers with NVIDIA Nemotron.
- Stack: Python, Streamlit, ChromaDB, Sentence Transformers, BM25, LangChain, NVIDIA NIM, PyMuPDF, pdfplumber, Tesseract OCR, httpx.

**Suggested case-study outline:** Challenge → Document processing → Hybrid retrieval and reranking → Grounded answer flow → Interface and safeguards → Lessons / limitations (do not fabricate measured performance).

**Repository:** résumé prints a human-readable string `github.com/StegenX/Financial report RAG`, **not a verified valid GitHub slug**. Put `repositoryUrl: null` and a TODO to confirm URL. Do not construct a guessed link or render a broken GitHub button.

#### Project 2 — AI-Powered Business Process Impact Analysis (OCP Group)

**Source-grounded facts:**
- Data & AI Engineer Intern at OCP Group, **Aug 2026 – Jan 2027 (ongoing as of résumé)**.
- Developing an **on-premise AI agent for business process impact analysis**.
- Work includes structured extraction, contextual enrichment, evidence-based report generation, multi-layer validation and a manual evaluation harness.
- Also contributed to target architecture and technology-stack evaluation for an enterprise data & AI platform, considering business, security, governance, scalability, integration and operational criteria.

**Confidentiality:** Do not invent or disclose internal architecture specifics, process names, data sources, diagrams, company metrics, or private artifacts. Use a clearly marked **high-level illustrative architecture**. Do not claim deployment, benchmarks, or outcome not in the résumé. Say *“In development”* rather than *“launched”*.

**Suggested case-study outline:** Context (public/general) → Problem category → Responsibilities → High-level AI workflow → Evidence/validation emphasis → Engineering considerations → Work status. No public repository link unless supplied later.

#### Project 3 — End-to-End Cloud Data Pipeline

**Source-grounded facts:**
- Automated ETL pipeline extracting Formula 1 telemetry from the FastF1 API, transforming/validating with pandas and Great Expectations, loading into a Google BigQuery star-schema warehouse.
- **150+ races**, **165,000+ lap records**, **8 seasons** of historical data.
- Idempotent loading patterns to avoid duplication.
- Apache Airflow on Docker orchestrates scheduled Monday runs to detect/process latest race with retry logic.
- Stack: Python, pandas, Apache Airflow, Docker, Google BigQuery, Great Expectations, FastF1, SQL, Parquet, REST APIs.

**Suggested case-study outline:** Source and ingestion → Quality validation → Warehouse model → Idempotency → Orchestration and scheduling → Scale / outcomes → Possible improvements (label as future ideas, never implemented facts).

**Repository:** résumé prints `github.com/StegenX/F1 data pipeline`, which is not a verified URL slug. Set `repositoryUrl: null`, TODO confirm before enabling external link.

### 4.5 Engineering Expertise

Three well-balanced cards, in this hierarchy:

1. **AI Engineering (primary)** — LLMs, RAG, agentic AI, ML/DL, GenAI, prompt engineering, MCP, OCR; use real project references as proof.
2. **Data Engineering** — ETL/ELT, orchestration with Airflow, Spark, data modeling/quality, BigQuery/GCP, SQL.
3. **Software Engineering** — Python, C/C++, JavaScript/TypeScript, React, FastAPI, APIs, microservices, Linux, Git, CI/CD.

Use explanatory prose, not fake 90% skill-progress bars or experience-year claims.

### 4.6 Technology Stack

Display compact grouped cards/chips using verified résumé taxonomy:
- **Languages:** Python, SQL, C/C++, JavaScript, Bash.
- **AI / ML:** ML, DL, LLMs, RAG, Agentic AI, GenAI, Prompt Engineering, MCP, OCR.
- **Data:** Apache Airflow, Apache Spark, ETL/ELT, data modeling, data quality, BigQuery, GCP.
- **Software:** React, TypeScript, FastAPI, microservices, REST APIs.
- **Databases / Retrieval:** PostgreSQL, MongoDB, Redis, Milvus, Neo4j; ChromaDB for the specific RAG project.
- **Dev / Infra:** Docker, Git, Linux, CI/CD.

Do not imply hands-on proficiency at a particular level beyond what the resume states. If drawing brand icons requires new assets, prefer clean text over inaccurate logo artwork.

### 4.7 Experience timeline

**OCP Group — Data & AI Engineer Intern**  
*Aug 2026 – Jan 2027 (ongoing per résumé; end date is planned, do not present as completed)*

Resume-grounded bullets, paraphrased for scannability:
- Develop an on-premise AI agent for business process impact analysis, including evidence-based reporting and multiple validation layers.
- Build toward structured extraction, context enrichment, and a manual evaluation process.
- Contribute to evaluating the architecture and technology choices for enterprise data/AI infrastructure with security, governance, scale, and integration in mind.

Display the timeline without exaggeration. Store start/end as separate fields and an `ongoing` flag for easy future updating.

### 4.8 Education & Achievements

**University Mohammed VI Polytechnic — 1337 School**  
Software Engineering · **2024 – present** (per résumé)

Achievements / leadership, displayed as factual compact tiles:
- **SUP MTI Hackathon, 2026 edition — 1st Place.** Project lead and architect; designed system architecture and led technical presentation/Q&A.
- **Vice President — Cybersecurity Club, 1337 School Rabat.** Led activities, workshops, and coordination of cybersecurity initiatives.

Do not invent graduation dates, degree classification, certificates, or links.

### 4.9 Contact and footer

- Email: **aymaneagharbi00@gmail.com**
- GitHub: **https://github.com/StegenX**
- LinkedIn: **https://www.linkedin.com/in/Aymane** (résumé shows `linkedin.com/in/Aymane Agharbi` as display text; **verify actual canonical profile URL before shipping**; until then, set LinkedIn URL to `null` and provide an editable TODO in data)
- Résumé: use the user-supplied PDF, placed under `public/resume/Aymane_Agharbi.pdf`; accessible via **Download Résumé**. Note: public résumé includes a phone number and email, so make sure the user intends to publish it unchanged. If unavailable in Codex's repository/workspace, show a clear TODO instead of a broken button.

Contact headline suggestion: **“Let’s build something intelligent.”** (editorial copy). Include copy-email button with accessible confirmation and `mailto:` fallback. No contact form/backend required. Footer includes name, links and current year (computed in code).

**Privacy:** The résumé includes a phone number, but do **not** show it prominently on the website. It may remain within the downloadable PDF only after explicit consent.

---

## 5. System-status cards: truthfulness rules

These are *portfolio information cards*, not a production telemetry console. Suitable contents:
- `CURRENT FOCUS / AI Systems & Retrieval` — editorial description, not a live feed.
- `FEATURED PROJECTS / 03` — derived from the actual project data list.
- `ENGINEERING / AI • Data • Software` — focus taxonomy.
- `GITHUB / View public work` — working link to profile.

**Never** display fake uptime, simulated API status, fabricated commit counts, GitHub activity, availability for hiring, “live visitors”, latency, accuracy, token throughput or revenue. If fetching live GitHub metrics later, do it from an actual API with loading/error states and caching, but it is **out of scope for v1**.

---

## 6. Responsive specifications

- **Mobile (<640px):** single-column stacked bento cards; concise intro; main actions reachable without awkward overflow; floating navigation adapts to compact bottom or top presentation; architecture uses vertical layout; project case studies use one column; minimum 44×44px interactive targets.
- **Tablet (640–1023px):** 2-column simplified grid where appropriate; cards reflow naturally; navigation remains functional; architecture labels must not clip.
- **Desktop (≥1024px):** 12-column hero dashboard, asymmetric but orderly compositions; generous whitespace; ~1200–1280px content max.
- Test widths: **320, 375, 390, 768, 1024, 1280, 1440px**.
- Never use horizontal page scrolling; avoid fixed heights that cut off descriptions; status indicators have text, not color alone.

---

## 7. Technical stack and directory architecture

Initialize with current compatible stable versions of:
- React + TypeScript + Vite
- Tailwind CSS
- Motion for React (`motion/react` or the current supported package interface)
- Lucide React
- React Router (or equivalent routing solution for SPA case studies)
- Vitest + React Testing Library for component/data tests
- ESLint + TypeScript checks; format with Prettier

**Do not add** Next.js, a backend service, Redux, a CMS, heavy visualization dependencies, or runtime AI calls. Use lightweight native SVG/CSS for the architecture illustration.

Proposed structure:

```text
portfolio/
├── public/
│   ├── resume/Aymane_Agharbi.pdf      # Copy attached CV only if user approves public publishing
│   ├── favicon.svg
│   ├── og-image.png                    # Custom branded static social card
│   └── robots.txt
├── src/
│   ├── app/App.tsx
│   ├── app/router.tsx
│   ├── components/
│   │   ├── layout/FloatingNav.tsx
│   │   ├── layout/SectionHeading.tsx
│   │   ├── ui/BentoCard.tsx
│   │   ├── ui/Reveal.tsx
│   │   ├── ui/TechChip.tsx
│   │   ├── ui/CopyEmailButton.tsx
│   │   ├── hero/HeroDashboard.tsx
│   │   ├── hero/ArchitectureFlow.tsx
│   │   ├── hero/StatusCard.tsx
│   │   ├── projects/ProjectCard.tsx
│   │   ├── projects/ProjectArchitecture.tsx
│   │   └── experience/ExperienceTimeline.tsx
│   ├── sections/
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExpertiseSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   └── ContactSection.tsx
│   ├── pages/HomePage.tsx
│   ├── pages/ProjectCaseStudyPage.tsx
│   ├── pages/NotFoundPage.tsx
│   ├── data/site.ts
│   ├── data/projects.ts
│   ├── data/experience.ts
│   ├── data/skills.ts
│   ├── types/content.ts
│   ├── styles/globals.css
│   └── main.tsx
├── tests/
├── index.html
├── vercel.json
├── package.json
└── README.md
```

If the project is already initialized, **adapt without overwriting existing work**. Prefer a clean architecture with minimal duplication and composable components.

---

## 8. Type-safe content and placeholders

Store copy, project facts, contacts and links outside JSX. Example schema (adjust names as appropriate):

```ts
export type ProjectStatus = "completed" | "in-progress";

export interface CaseStudySection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: "ai" | "data" | "professional-ai";
  status: ProjectStatus;
  featured: boolean;
  summary: string;
  problem: string;
  contributions: string[];
  technologies: string[];
  verifiedMetrics: { label: string; value: string }[];
  repositoryUrl: string | null;
  liveUrl: string | null;
  confidentialityNote?: string;
  architecture: { nodes: string[]; description: string };
  caseStudy: CaseStudySection[];
}

export interface SiteConfig {
  name: string;
  role: string;
  heroHeadline: string;
  heroDescription: string;
  availabilityLabel: string | null;
  email: string;
  githubUrl: string;
  linkedinUrl: string | null;
  resumeUrl: string | null;
}
```

- Typed data files must contain all verified information above.
- `null` for missing external links; **do not display disabled buttons that look functional**.
- Use dedicated `TODO_CONFIRM_*` comments for uncertain URLs and opt-in publication details.
- Case-study outcomes must clearly distinguish **quantified metrics** from **architectural work** and **future work**.
- For OCP material, enforce a content review flag such as `requiresPublicDisclosureReview: true` to prevent proprietary details appearing without review.

---

## 9. Accessibility, performance, SEO, and quality

### Accessibility

- Semantic landmarks, one `h1` on home, logical h2/h3 heading order; a skip-to-content link.
- Keyboard navigation for pill links, case-study cards, architecture nodes, copy button, mobile menu.
- Visible focus styles (not hover-only); descriptive link names and icon labels.
- WCAG AA contrast for body and actionable text; check muted gray text carefully.
- Motion preferences honored across page reveal and diagram; no critical interaction reliant on hover.
- Accessible SVG labels and explanatory text alternative for architectural diagram.

### Performance

- Fast static build, responsive layout, lazy-load below-fold noncritical assets.
- Keep animation GPU-friendly (opacity/transform); avoid background blurs covering huge regions.
- Avoid huge image libraries, heavy shadows, remote font delays, or loading screens.
- Target Lighthouse scores **≥90** in Performance, Accessibility, Best Practices, and SEO on representative mobile/desktop checks (targets, not a guarantee).
- Provide a meaningful UI without JavaScript animations; avoid layout shift.

### SEO / social

- Unique page titles and descriptions for homepage and each case study.
- Canonical URLs once real production domain is known; **never invent a domain**.
- Open Graph/Twitter metadata, OG preview image, appropriate favicon, sitemap and robots.txt.
- Use JSON-LD `Person` and optionally `CreativeWork` with only verified public facts; do not include unconfirmed LinkedIn URL.
- Set document language to `en`.
- Deep links must work on Vercel. A sample `vercel.json` rewrite may be used for Vite SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- With a client-side SPA, make sure **case-study sharing metadata** is not misleading. If unique crawler-visible project previews are required, consider static prerendering during build; do not add a full framework unless necessary.

### Testing

- Project data has unique slugs and only valid URLs/nulls.
- Every visible CTA works; missing URLs do not generate clickable broken links.
- Active nav indicator and smooth scroll work correctly with offsets.
- Project routing and browser refresh both work.
- Architecture tooltips function via focus, touch and pointer.
- Reduced motion disables meaningful motion.
- No horizontal overflow at supported breakpoints.
- TypeScript builds cleanly; lint/test commands pass.

---

## 10. Codex execution plan

Follow these steps in sequence, checking quality between them.

1. **Audit workspace.** Identify existing repo setup and files; avoid destructive changes.
2. **Initialize or align tooling.** Install React/TS/Vite/Tailwind/Motion/Router/Lucide and quality tooling with compatible versions.
3. **Create design tokens.** Fonts, color variables, spacing, radius, focus treatment, card primitives.
4. **Create typed content.** Implement `SiteConfig`, projects, skills, experience, education and contact from this README. Keep unknown values null/TODO.
5. **Build structure.** Header/floating nav, sections, footer, case-study routes, proper semantic hierarchy.
6. **Build hero bento.** Make editorial identity and CTAs strong; include responsive status and architecture cards.
7. **Build projects and case studies.** Populate all three verified projects; diagrams are illustrative unless actual screenshots are provided.
8. **Build expertise, stack, timeline, education and contact.** Use the résumé-derived text and verified labels.
9. **Apply polished motion.** Add once layout is stable; respect reduced motion and avoid overanimation.
10. **Responsive QA.** Check seven target widths and keyboard/touch interaction.
11. **SEO and deployment.** Add metadata, favicon, OG image, SPA rewrite, Vercel settings, and environment-independent build.
12. **Validate.** Typecheck, lint, test, production build, links, and manual a11y smoke test.
13. **Document.** Update repository README with install, development, build, content editing, asset publication, and Vercel deployment steps.

### Final acceptance checklist

- [ ] Clearly communicates **AI Engineer first**, with Data and Software Engineering secondary.
- [ ] Dark-only **monochrome** visual system, Geist + Geist Mono.
- [ ] Premium, responsive bento hero with soft cards and floating navigation.
- [ ] About, Featured Projects, Engineering Expertise, Technology Stack, Experience, Education/Achievements, Contact.
- [ ] Three accurate featured projects and meaningful case studies.
- [ ] Confidential OCP work described only at safe, high-level scope.
- [ ] Architecture card genuinely interactive and accessible.
- [ ] System-status cards show only authentic information.
- [ ] Motion subtle and optional for reduced-motion users.
- [ ] Real verified GitHub profile and email work; other unconfirmed links are omitted until validated.
- [ ] Resume download is implemented only with explicit publication approval and an actual file.
- [ ] Mobile-first layout tested, no overflow or clipped cards.
- [ ] Vite production build and Vercel route refresh work.
- [ ] Local typed data files make future edits simple.
- [ ] English only, meaningful SEO, clean accessibility, no fabricated information.

---

## 11. Open items to confirm before public launch

These do **not** block building the site; use documented placeholders and hide unavailable CTAs:

1. **Official LinkedIn profile URL** (résumé display text is not an unambiguous URL).
2. **Exact GitHub URLs** for Financial RAG Assistant and F1 data pipeline repositories.
3. **Permission to publish the submitted résumé unchanged**, including the contact details present in it.
4. **Current employment/education dates and wording** at launch, especially the internship's January 2027 planned end date.
5. **Any public screenshots, diagrams, personal portrait, or custom imagery** (none required for v1).
6. **Whether to change provisional hero headline and “Currently building AI systems” badge.**
7. **Any final performance results** for AI projects (no retrieval quality/LLM accuracy numbers have been provided).
8. **Public disclosure review** of the OCP professional project case study.

## 12. Final instruction to Codex

**Implement the site, don't merely mock it up.** Prioritize excellent visual hierarchy, accurate engineering content, working navigation, responsive polish, accessible interaction, reusable components, and build-ready code. Treat this document as the authoritative design brief. When facts are missing, use unobtrusive verified-safe placeholders and report remaining TODOs in the project README. Do not fabricate facts, screenshots, technologies, private company details, live metrics, links or availability. Do not replace this visual identity with an arbitrary template.
