import { ArrowRight, ArrowUpRight, Braces, Database, MapPin, Sparkles } from 'lucide-react';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { ArchitectureFlow } from './ArchitectureFlow';
import { SystemOrb } from './ProjectArchitecture';
import { GitHubLink, ResumeLink, ScrollCue } from './ui';

export function HeroDashboard() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-prelude">
        <span className="eyebrow">
          AYMANE AGHARBI <span className="divider-slash">/</span> AI ENGINEER
        </span>
        <span className="location-label">
          <MapPin size={12} /> BASED IN MOROCCO
        </span>
      </div>
      <div className="hero-grid">
        <div className="hero-intro panel">
          <div className="eyebrow">
            <span className="tiny-dot" /> INTELLIGENCE, ENGINEERED.
          </div>
          <h1 id="hero-title">
            {site.heroHeadline.split(' ').map((word, index) => (
              <span key={word} className={index === 1 ? 'headline-muted' : ''}>
                {word}
                {index < site.heroHeadline.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p>{site.heroDescription}</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              Explore Projects <ArrowRight size={17} />
            </a>
            <ResumeLink />
            <a className="text-link hero-contact" href={`mailto:${site.email}`}>
              Get in touch <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="intro-bottom">
            <span>AI ENGINEERING</span>
            <span className="small-plus">+</span>
            <span>DATA</span>
            <span className="small-plus">+</span>
            <span>SOFTWARE</span>
          </div>
        </div>
        <div className="hero-side">
          <div className="focus-card panel">
            <div className="card-topline">
              <span className="eyebrow">CURRENT FOCUS</span>
              <Sparkles size={15} strokeWidth={1.4} />
            </div>
            <SystemOrb />
            <h2>AI systems & retrieval</h2>
            <p>Connecting data, context, and intelligence.</p>
            <div className="focus-status">
              <span className="status-dot" />
              {site.availabilityLabel}
            </div>
          </div>
          <a className="github-card panel" href={site.githubUrl} target="_blank" rel="noreferrer">
            <div>
              <span className="eyebrow">BUILDING IN THE OPEN</span>
              <span className="github-card-title">
                Explore my GitHub <ArrowUpRight size={18} />
              </span>
              <span className="muted small">github.com/StegenX</span>
            </div>
            <Braces size={33} strokeWidth={1} />
          </a>
        </div>
        <ArchitectureFlow />
        <div className="snapshot-card panel">
          <div className="card-topline">
            <span className="eyebrow">ENGINEERING SNAPSHOT</span>
            <Database size={14} />
          </div>
          <div className="snapshot-number">
            {String(projects.filter((p) => p.featured).length).padStart(2, '0')}
            <span>
              Featured projects.
              <br />
              Connected disciplines.
            </span>
          </div>
          <div className="snapshot-list">
            <span>
              01 <b>AI Engineering</b> <ArrowUpRight size={13} />
            </span>
            <span>
              02 <b>Data Engineering</b> <ArrowUpRight size={13} />
            </span>
            <span>
              03 <b>Software Engineering</b> <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </div>
      <div className="hero-footnote">
        <ScrollCue />
        <span className="mono">THOUGHTFULLY DESIGNED. PURPOSEFULLY BUILT.</span>
        <GitHubLink className="sr-only" />
      </div>
    </section>
  );
}
