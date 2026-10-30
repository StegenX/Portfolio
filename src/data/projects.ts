import type { Project } from '../types/content.ts';
export const projects: Project[] = [
  {
    slug: 'financial-rag-assistant',
    title: 'FilingLens',
    shortTitle: 'FilingLens',
    category: 'ai',
    categoryLabel: 'AI ENGINEERING · DOCUMENT INTELLIGENCE',
    ownershipLabel: 'Personal project',
    status: 'completed',
    featured: true,
    summary:
      'From dense financial filings to grounded answers. An end-to-end retrieval system that makes company reports searchable, contextual, and useful.',
    problem:
      'Financial reports spread essential information across long narratives, complex tables, and scanned pages. The challenge was to make those sources searchable while keeping each answer connected to its evidence.',
    contributions: [
      'Multi-format document processing',
      'Hybrid search and cross-encoder reranking',
      'History-aware, grounded answer generation',
    ],
    technologies: [
      'Python',
      'Streamlit',
      'ChromaDB',
      'Sentence Transformers',
      'BM25',
      'LangChain',
      'NVIDIA NIM',
      'PyMuPDF',
      'pdfplumber',
      'Tesseract OCR',
      'httpx',
    ],
    verifiedMetrics: [
      { value: '14', label: 'SEC 10-K filings' },
      { value: '2,312', label: 'pages processed' },
      { value: '6,357', label: 'searchable chunks' },
    ],
    repositoryUrl: 'https://github.com/StegenX/Financial_report_RAG',
    liveUrl: 'https://financial-rag-assistance.streamlit.app/',
    architecture: {
      nodes: [
        'SEC 10-K filings',
        'Text · Tables · OCR',
        'Hybrid retrieval',
        'Rerank + context',
        'Grounded answer',
      ],
      description:
        'Illustrative overview of the documented retrieval workflow. Semantic and lexical search combine before reranking and source-grounded generation.',
    },
    caseStudy: [
      {
        heading: 'Documents into searchable knowledge',
        body: [
          'The corpus contains 14 SEC 10-K filings from Apple, Microsoft, Tesla, Amazon, and Alphabet. A processing workflow extracts text, tables, and OCR-derived content with PyMuPDF, pdfplumber, and Tesseract OCR.',
          'Across 2,312 pages, the pipeline produces 6,357 searchable chunks. Document, company, year, and page metadata preserve the context needed for filtered retrieval and source-page references.',
        ],
      },
      {
        heading: 'Two retrieval signals. One ranked context.',
        body: [
          'MiniLM semantic embeddings capture similarity in meaning, while BM25 supplies lexical matching for company names and financial terminology. Reciprocal Rank Fusion combines the candidate rankings.',
          'A cross-encoder reranks the candidates before context assembly. Company and year filters let a question narrow the corpus instead of depending on similarity alone.',
        ],
      },
      {
        heading: 'An answer with a traceable foundation',
        body: [
          'History-aware query rewriting turns follow-up questions into retrieval-ready queries. The selected source passages provide context for grounded generation with NVIDIA Nemotron through NVIDIA NIM.',
          'The Streamlit interface brings together conversation history, financial-domain guardrails, and source-page context so users can inspect the evidence alongside the response.',
        ],
      },
      {
        heading: 'What the numbers do—and do not—show',
        body: [
          'The documented metrics describe corpus size and processing scale. They do not measure retrieval quality, latency, or answer accuracy. No benchmark results are claimed.',
          'OCR and table extraction can lose structure, and retrieval can miss relevant passages. Source grounding supports inspection but cannot guarantee a correct answer. A future evaluation set with judged relevance and answer-faithfulness checks would help quantify those limitations.',
        ],
      },
    ],
  },
  {
    slug: 'business-process-impact-analysis',
    title: 'AI-Powered Business Process Impact Analysis',
    shortTitle: 'Business Process Impact Analysis',
    category: 'professional-ai',
    categoryLabel: 'PROFESSIONAL AI · OCP GROUP',
    ownershipLabel: 'Confidential · OCP internal project',
    status: 'in-progress',
    featured: true,
    summary:
      'Evidence-led AI for understanding business process change. Ongoing work on an on-premise agent with structured extraction and layered validation.',
    problem:
      'Business process changes require careful interpretation, contextual reasoning, and evidence that a reviewer can examine. This work explores how an on-premise AI agent can support that analysis responsibly.',
    contributions: [
      'Structured extraction and contextual enrichment',
      'Evidence-based report generation',
      'Multi-layer validation and manual evaluation',
    ],
    technologies: [
      'On-premise AI',
      'Agentic AI',
      'Structured extraction',
      'Evaluation',
      'Data governance',
    ],
    verifiedMetrics: [],
    repositoryUrl: null,
    liveUrl: null,
    confidentialityNote:
      'Confidential OCP internal project. This case study contains only a generalized description of responsibilities. The workflow is illustrative and does not represent OCP’s internal architecture.',
    requiresPublicDisclosureReview: true,
    architecture: {
      nodes: [
        'Inputs',
        'Structured extraction',
        'Context enrichment',
        'Evidence + validation',
        'Reviewable report',
      ],
      description:
        'High-level illustrative workflow only. No internal systems, process names, data sources, or implementation details are depicted.',
    },
    caseStudy: [],
    // Only the generalized résumé-derived overview is eligible for public display.
    publicCaseStudy: [
      {
        heading: 'The problem category',
        body: [
          'The project concerns business process impact analysis: interpreting a change, considering its context, and producing a report supported by evidence. The aim is assistance for reviewers rather than unsupported autonomous conclusions.',
          'Work takes place as part of a Data & AI Engineer internship at OCP Group. The project is in development; this overview makes no deployment or performance claims.',
        ],
      },
      {
        heading: 'Responsibilities and approach',
        body: [
          'Responsibilities include developing structured extraction, contextual enrichment, and evidence-based report generation for an on-premise AI agent.',
          'The high-level workflow shown here communicates those general stages only. It deliberately omits proprietary architecture, actual data sources, process names, and internal artifacts.',
        ],
      },
      {
        heading: 'Validation is part of the workflow',
        body: [
          'The work includes multi-layer validation and a manual evaluation harness. These provide a way to review generated output and examine its evidence rather than treating fluent language as proof.',
          'Evaluation remains an engineering activity, not a published benchmark. No accuracy, adoption, or efficiency improvement is asserted.',
        ],
      },
      {
        heading: 'Thinking beyond the agent',
        body: [
          'Alongside the agent work, contributions include evaluating target architecture and technology-stack options for an enterprise data & AI platform.',
          'The evaluation considers business needs, security, governance, scalability, integration, and operational criteria. Specific decisions and internal platform details are outside the public scope.',
        ],
      },
      {
        heading: 'Current status and disclosure',
        body: [
          'In development during the internship beginning August 2026, with a planned end in January 2027. Responsibilities and dates should be reconfirmed before future publication.',
          'This is a generalized professional case study. Further project-specific content requires public-disclosure review before it can be included.',
        ],
      },
    ],
  },
  {
    slug: 'cloud-data-pipeline',
    title: 'End-to-End Cloud Data Pipeline',
    shortTitle: 'Cloud Data Pipeline',
    category: 'data',
    categoryLabel: 'DATA ENGINEERING · CLOUD PIPELINES',
    ownershipLabel: 'Personal project',
    status: 'completed',
    featured: true,
    summary:
      'Race telemetry, engineered for analysis. An automated, quality-checked path from the FastF1 API to a BigQuery analytics warehouse.',
    problem:
      'Historical race telemetry needs consistent ingestion, validation, and modeling before it can support reliable analysis. The pipeline also needs to handle repeat runs and new races without duplicating data.',
    contributions: [
      'Automated extraction and data validation',
      'BigQuery star-schema warehouse',
      'Idempotent loading and scheduled orchestration',
    ],
    technologies: [
      'Python',
      'pandas',
      'Apache Airflow',
      'Docker',
      'Google BigQuery',
      'Great Expectations',
      'FastF1',
      'SQL',
      'Parquet',
      'REST APIs',
    ],
    verifiedMetrics: [
      { value: '150+', label: 'races processed' },
      { value: '165k+', label: 'lap records' },
      { value: '8', label: 'seasons of data' },
    ],
    repositoryUrl: 'https://github.com/StegenX/F1_data_pipeline',
    liveUrl: null,
    architecture: {
      nodes: [
        'FastF1 API',
        'pandas transforms',
        'Quality validation',
        'Idempotent load',
        'BigQuery',
      ],
      description:
        'Illustrative pipeline overview. Apache Airflow on Docker orchestrates ingestion, transformation, validation, and warehouse loading.',
    },
    caseStudy: [
      {
        heading: 'From race source to structured data',
        body: [
          'The pipeline extracts Formula 1 telemetry through the FastF1 API and transforms it with pandas. Python, SQL, and Parquet support the data path into the warehouse.',
          'The historical corpus spans eight seasons, more than 150 races, and over 165,000 lap records. These figures describe processed scale, not pipeline throughput.',
        ],
      },
      {
        heading: 'Quality before the warehouse',
        body: [
          'Great Expectations provides validation within the transformation workflow. Quality checks help make data issues explicit before records reach their analytical destination.',
          'The target is a Google BigQuery star-schema warehouse. The modeled data makes race telemetry suitable for analytical querying rather than leaving consumers to interpret raw API responses.',
        ],
      },
      {
        heading: 'Safe to run again',
        body: [
          'Idempotent loading patterns avoid duplicate records when the workflow is repeated. This matters for scheduled ingestion, retries, and historical backfills.',
          'Apache Airflow running on Docker schedules Monday runs to detect and process the latest race. Retry logic supports recovery when individual operations fail.',
        ],
      },
      {
        heading: 'Outcomes and next questions',
        body: [
          'The implemented workflow combines scheduled ingestion, transformation, quality validation, and warehouse loading across the documented historical corpus.',
          'Future ideas include richer data lineage, explicit freshness monitoring, and more systematic backfill observability. These are possible improvements, not implemented capabilities.',
        ],
      },
    ],
  },
];

export function visibleCaseStudy(project: Project) {
  return project.requiresPublicDisclosureReview
    ? (project.publicCaseStudy ?? [])
    : project.caseStudy;
}
