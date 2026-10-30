import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  GraduationCap,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroDashboard } from '../components/HeroDashboard';
import { ProjectArchitecture } from '../components/ProjectArchitecture';
import {
  Chip,
  CopyEmailButton,
  GitHubLink,
  ResumeLink,
  Reveal,
  SectionHeading,
} from '../components/ui';
import { about, site } from '../data/site';
import { projects } from '../data/projects';
import { expertise, stack } from '../data/skills';
import { achievements, education, experience } from '../data/experience';

export default function HomePage() {
  return (
    <>
      <HeroDashboard />
      <section className="section about-section" id="about" aria-labelledby="about-title">
        <Reveal>
          <div className="about-layout">
            <div>
              <div className="eyebrow">
                <span className="section-number">01</span> A LITTLE CONTEXT
              </div>
              <h2 id="about-title">{about.introduction}</h2>
              <div className="about-signature">
                <span className="signature-mark">aa.</span>
                <span>
                  Aymane Agharbi<small>AI · Data · Software</small>
                </span>
              </div>
            </div>
            <div className="about-copy">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="principles">
          {about.principles.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.06} className="principle">
              <span className="mono muted">/{p.number}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section" id="projects" aria-label="Featured projects">
        <Reveal>
          <SectionHeading
            number="02"
            label="SELECTED WORK"
            title="Ideas into working systems."
            description="Three projects across AI, enterprise intelligence, and the data foundations underneath."
          />
        </Reveal>
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.slug} className={`project-card panel project-${index}`}>
              <Link
                to={`/projects/${project.slug}`}
                className="project-visual-link"
                aria-label={`Read ${project.title} case study`}
              >
                <ProjectArchitecture project={project} />
              </Link>
              <div className="project-content">
                <div className="project-ownership-row">
                  <span className="micro-tag project-ownership">
                    {project.requiresPublicDisclosureReview && <ShieldCheck size={12} />}
                    {project.ownershipLabel}
                  </span>
                  {project.status === 'in-progress' && (
                    <span className="micro-tag">IN DEVELOPMENT</span>
                  )}
                </div>
                <div className="project-index">
                  <span className="eyebrow">
                    0{index + 1} <span className="divider-slash">/</span> {project.categoryLabel}
                  </span>
                </div>
                <h3>
                  <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <p>{project.summary}</p>
                {project.verifiedMetrics.length > 0 ? (
                  <div className="project-metrics">
                    {project.verifiedMetrics.map((metric) => (
                      <div key={metric.label}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="confidential-note">
                    <ShieldCheck size={15} />
                    <span>
                      Confidential OCP internal project.
                      <br />
                      Generalized case study.
                    </span>
                  </div>
                )}
                <div className="project-tech">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
                <div className="project-actions">
                  <Link className="project-action" to={`/projects/${project.slug}`}>
                    {project.liveUrl ? 'View Case Study' : 'Explore Case Study'}
                    <ArrowUpRight size={17} />
                  </Link>
                  {project.repositoryUrl && (
                    <a
                      className="button button-secondary project-code-action"
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.shortTitle} source code`}
                    >
                      <Code2 size={15} /> View Code <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      className="button button-primary project-live-action"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try {project.shortTitle} <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section" id="expertise" aria-label="Engineering expertise">
        <Reveal>
          <SectionHeading
            number="03"
            label="ENGINEERING EXPERTISE"
            title="One connected engineering mindset."
            description="AI is the focus. Data and software are what make it work."
          />
        </Reveal>
        <div className="expertise-grid">
          {expertise.map((item, index) => {
            const Icon = index === 0 ? BrainCircuit : index === 1 ? Database : Code2;
            return (
              <Reveal
                key={item.title}
                delay={index * 0.06}
                className={`expertise-card panel ${index === 0 ? 'expertise-primary' : ''}`}
              >
                <div className="card-topline">
                  <div className="expertise-icon">
                    <Icon size={24} strokeWidth={1.3} />
                  </div>
                  <span className="eyebrow">{item.label}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                {item.projectSlug ? (
                  <Link className="expertise-proof" to={`/projects/${item.projectSlug}`}>
                    {item.proof}
                    <ArrowUpRight size={14} />
                  </Link>
                ) : (
                  <a
                    className="expertise-proof"
                    href={site.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.proof}
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="section stack-section" aria-label="Technology stack">
        <Reveal>
          <SectionHeading number="04" label="THE TOOLKIT" title="Tools for the whole system." />
        </Reveal>
        <div className="stack-grid">
          {stack.map((group, index) => (
            <Reveal key={group.label} className="stack-group">
              <span className="mono stack-number">0{index + 1}</span>
              <div>
                <h3>{group.label}</h3>
                <div className="stack-items">
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section experience-section" id="experience" aria-label="Experience">
        <Reveal>
          <SectionHeading number="05" label="EXPERIENCE" title="Engineering in context." />
        </Reveal>
        {experience.map((item) => (
          <Reveal key={item.company} className="experience-layout">
            <div className="experience-aside">
              <span className="eyebrow">{item.dateLabel}</span>
              <span className="muted small">{item.plannedEndLabel}</span>
              <span className="micro-tag">
                <span className="tiny-dot" /> ONGOING
              </span>
            </div>
            <div className="timeline-content">
              <span className="timeline-dot" />
              <div className="experience-company">
                <h3>{item.company}</h3>
                <span className="company-symbol">OCP</span>
              </div>
              <p className="experience-role">{item.role}</p>
              <p className="experience-summary">{item.description}</p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link className="text-link" to="/projects/business-process-impact-analysis">
                View professional case study <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="section education-section" aria-label="Education and achievements">
        <Reveal>
          <SectionHeading number="06" label="LEARNING & LEADERSHIP" title="Built on curiosity." />
        </Reveal>
        <div className="education-grid">
          <Reveal className="education-card panel">
            <GraduationCap size={27} strokeWidth={1.2} />
            <span className="eyebrow">{education.dates}</span>
            <h3>{education.program}</h3>
            <p className="education-university">{education.school}</p>
            <p>{education.field}</p>
            <div className="school-number" aria-hidden="true">
              1337
            </div>
          </Reveal>
          <div className="achievement-list">
            {achievements.map((item) => {
              const Icon = item.icon === 'trophy' ? Trophy : ShieldCheck;
              return (
                <Reveal key={item.title} className="achievement-card panel">
                  <div className="achievement-icon">
                    <Icon size={21} strokeWidth={1.3} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <span className="mono muted">{item.subtitle}</span>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <Reveal>
          <div className="contact-panel panel">
            <div className="contact-prelude">
              <span className="eyebrow">
                <span className="tiny-dot" /> START A CONVERSATION
              </span>
              <ArrowDownRight size={29} strokeWidth={1} />
            </div>
            <h2 id="contact-title">
              Let’s build something
              <br />
              <span>intelligent.</span>
            </h2>
            <div className="contact-bottom">
              <div className="email-group">
                <a className="email-link" href={`mailto:${site.email}`}>
                  {site.email}
                  <ArrowUpRight size={19} />
                </a>
                <CopyEmailButton />
              </div>
              <div className="contact-socials">
                <GitHubLink />
                {site.linkedinUrl && (
                  <a href={site.linkedinUrl} target="_blank" rel="noreferrer">
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                )}
                <ResumeLink className="text-link" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <div className="back-top">
        <a href="#home">
          Back to top <ArrowRight size={14} />
        </a>
      </div>
    </>
  );
}
