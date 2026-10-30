import { Link, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { FloatingNav } from '../components/FloatingNav';
import { Monogram } from '../components/FloatingNav';
import { SEO } from '../components/SEO';
import { site } from '../data/site';
import HomePage from '../pages/HomePage';
import ProjectCaseStudyPage from '../pages/ProjectCaseStudyPage';
import NotFoundPage from '../pages/NotFoundPage';
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SEO />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="site-shell">
        <FloatingNav />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <Link className="footer-brand" to="/#home">
            <Monogram />
            <span>
              {site.name}
              <small>AI Engineer</small>
            </span>
          </Link>
          <span className="mono">© {new Date().getFullYear()} · CRAFTED WITH INTENTION</span>
          <a className="footer-email" href={`mailto:${site.email}`}>
            Say hello ↗
          </a>
        </footer>
      </div>
    </MotionConfig>
  );
}
