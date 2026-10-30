import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects, visibleCaseStudy } from '../data/projects';
import { ProjectArchitecture } from '../components/ProjectArchitecture';
import { Chip, Reveal } from '../components/ui';
import NotFoundPage from './NotFoundPage';

export default function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) return <NotFoundPage />;
  const next = projects[(index + 1) % projects.length];
  return (
    <article className="case-study">
      <Link to="/#projects" className="text-link back-link">
        <ArrowLeft size={15} /> Back to selected work
      </Link>
      <div className="case-header">
        <div className="eyebrow">
          CASE STUDY 0{index + 1}
          <span className="divider-slash">/</span>
          {project.categoryLabel}
        </div>
        <h1>{project.title}</h1>
        <p className="case-lead">{project.summary}</p>
        <div className="case-tags">
          <span className="micro-tag project-ownership">
            {project.requiresPublicDisclosureReview && <ShieldCheck size={12} />}
            {project.ownershipLabel}
          </span>
          <span className="micro-tag">
            {project.status === 'in-progress'
              ? 'IN DEVELOPMENT'
              : project.liveUrl
                ? 'LIVE APPLICATION'
                : 'PROJECT OVERVIEW'}
          </span>
          {project.requiresPublicDisclosureReview && (
            <span className="micro-tag">
              <ShieldCheck size={12} /> GENERALIZED PUBLIC OVERVIEW
            </span>
          )}
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
              aria-label={`View ${project.shortTitle} source code`}
            >
              <Code2 size={15} /> View Code <ArrowUpRight size={14} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Try {project.shortTitle} <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
      {project.confidentialityNote && (
        <aside className="disclosure-note">
          <ShieldCheck size={21} />
          <p>{project.confidentialityNote}</p>
        </aside>
      )}
      <ProjectArchitecture project={project} />
      <p className="case-diagram-note">{project.architecture.description}</p>
      {project.verifiedMetrics.length > 0 && (
        <div className="case-metrics">
          {project.verifiedMetrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="case-layout">
        <aside className="case-sidebar">
          <div className="case-sidebar-inner">
            <span className="eyebrow">AT A GLANCE</span>
            <h2>Engineering scope</h2>
            <ul className="contribution-list">
              {project.contributions.map((item) => (
                <li key={item}>
                  <Check size={14} />
                  {item}
                </li>
              ))}
            </ul>
            <h2>Technology & approach</h2>
            <div className="case-tech">
              {project.technologies.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
            <a href="#case-challenge" className="text-link">
              Read the story <ArrowRight size={14} />
            </a>
          </div>
        </aside>
        <div className="case-narrative">
          <Reveal>
            <section id="case-challenge">
              <div className="eyebrow">THE CHALLENGE</div>
              <h2>What needed to work.</h2>
              <p>{project.problem}</p>
            </section>
          </Reveal>
          {visibleCaseStudy(project).map((section, i) => (
            <Reveal key={section.heading}>
              <section>
                <div className="eyebrow">0{i + 1} / THE APPROACH</div>
                <h2>{section.heading}</h2>
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
      <Link to={`/projects/${next.slug}`} className="next-project panel">
        <span className="eyebrow">NEXT CASE STUDY</span>
        <div>
          <h2>{next.title}</h2>
          <ArrowUpRight size={30} strokeWidth={1} />
        </div>
      </Link>
    </article>
  );
}
