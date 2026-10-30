export interface CaseStudySection {
  heading: string;
  body: string[];
  bullets?: string[];
}
export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: 'ai' | 'data' | 'professional-ai';
  categoryLabel: string;
  ownershipLabel: string;
  status: 'completed' | 'in-progress';
  featured: boolean;
  summary: string;
  problem: string;
  contributions: string[];
  technologies: string[];
  verifiedMetrics: { label: string; value: string }[];
  repositoryUrl: string | null;
  liveUrl: string | null;
  confidentialityNote?: string;
  requiresPublicDisclosureReview?: boolean;
  architecture: { nodes: string[]; description: string };
  caseStudy: CaseStudySection[];
  publicCaseStudy?: CaseStudySection[];
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
  productionUrl: string | null;
}
