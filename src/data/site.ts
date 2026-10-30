import type { SiteConfig } from '../types/content';
export const site: SiteConfig = {
  name: 'Aymane Agharbi',
  role: 'AI Engineer',
  // Editorial defaults; change these without editing components.
  heroHeadline: 'Building Intelligent Systems.',
  heroDescription:
    'I design AI applications, retrieval systems, and reliable data foundations—from pipelines and search to grounded, useful AI experiences.',
  availabilityLabel: 'Currently building AI systems',
  email: 'aymaneagharbi00@gmail.com',
  githubUrl: 'https://github.com/StegenX',
  linkedinUrl: 'https://www.linkedin.com/in/aymane-agharbi-7b0a351a0',
  // TODO_CONFIRM_RESUME: add the PDF and obtain explicit permission to publish its contact details.
  resumeUrl: null,
  // GitHub Pages supplies its actual URL during the workflow build.
  productionUrl: import.meta.env.VITE_SITE_URL?.trim() || null,
};
export const about = {
  introduction: 'Good AI starts well before the model.',
  paragraphs: [
    'I’m Aymane, a Data & AI Engineer focused on building useful AI systems backed by dependable data infrastructure.',
    'My work spans retrieval-augmented generation, AI agents, data pipelines, and production-minded software. I enjoy connecting system design with implementation—from ingestion and retrieval through APIs, evaluation, and user-facing experiences.',
    'I bring an engineering mindset to the full path: understand the problem, build the foundations, and make the result useful.',
  ],
  principles: [
    {
      number: '01',
      title: 'AI-first thinking',
      description: 'Grounded retrieval, purposeful agents, and evidence behind the answer.',
    },
    {
      number: '02',
      title: 'Data foundations',
      description: 'Reliable pipelines, intentional models, and quality at every stage.',
    },
    {
      number: '03',
      title: 'Software discipline',
      description: 'Clear interfaces, maintainable systems, and thoughtful implementation.',
    },
  ],
};
export const workflow = [
  {
    label: 'Documents',
    detail:
      'Start with source documents. Preserve document and page metadata so an answer can point back to its evidence.',
  },
  {
    label: 'Processing',
    detail:
      'Extract text, tables, and OCR content; split it into useful chunks while retaining source context.',
  },
  {
    label: 'Embeddings',
    detail:
      'Represent chunks as vectors for semantic search, alongside a lexical index for exact terminology.',
  },
  {
    label: 'Retrieval',
    detail:
      'Find relevant passages with hybrid search and rerank the candidates for the current question.',
  },
  {
    label: 'Context',
    detail:
      'Assemble the selected passages and source references into a focused, evidence-rich context.',
  },
  {
    label: 'LLM',
    detail:
      'Ask the language model to answer from the supplied context, with explicit grounding instructions.',
  },
  {
    label: 'Answer',
    detail:
      'Return a grounded answer with source references. Evidence still needs evaluation; grounding is not a guarantee of correctness.',
  },
];
export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
