import { describe, expect, it } from 'vitest';
import { projects, visibleCaseStudy } from '../src/data/projects';
import { site } from '../src/data/site';
import { experience } from '../src/data/experience';

describe('publication-safe portfolio content', () => {
  it('has exactly three unique featured projects with detailed case studies', () => {
    expect(projects).toHaveLength(3);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(3);
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.featured).toBe(true);
      expect(visibleCaseStudy(project).length).toBeGreaterThanOrEqual(4);
      for (const section of visibleCaseStudy(project))
        expect(section.body.length).toBeGreaterThan(0);
    }
  });
  it('only enables valid external destinations and preserves unconfirmed links', () => {
    const urls = [
      site.githubUrl,
      site.linkedinUrl,
      ...projects.flatMap((p) => [p.repositoryUrl, p.liveUrl]),
    ];
    for (const url of urls) if (url) expect(new URL(url).protocol).toBe('https:');
    expect(site.resumeUrl).toBeNull();
  });
  it('keeps confidential work generalized, in development, and free of invented metrics', () => {
    const professional = projects.find((p) => p.category === 'professional-ai')!;
    expect(professional.requiresPublicDisclosureReview).toBe(true);
    expect(professional.caseStudy).toHaveLength(0);
    const unreviewed = {
      ...professional,
      caseStudy: [{ heading: 'Unreviewed details', body: ['Do not publish'] }],
    };
    expect(visibleCaseStudy(unreviewed)).toEqual(professional.publicCaseStudy);
    expect(professional.status).toBe('in-progress');
    expect(professional.verifiedMetrics).toHaveLength(0);
    expect(professional.repositoryUrl).toBeNull();
    expect(professional.architecture.description).toContain('illustrative');
    expect(experience[0].ongoing).toBe(true);
  });
});
