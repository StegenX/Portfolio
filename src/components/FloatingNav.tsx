import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navigation, site } from '../data/site';

export function Monogram() {
  return (
    <svg width="31" height="34" viewBox="0 0 31 34" aria-hidden="true" fill="none">
      <path d="M15.5 1 29 8.8v16.4L15.5 33 2 25.2V8.8Z" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="m8 23 7.5-14L23 23M11 18h9M15.5 15v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function FloatingNav() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 },
    );
    navigation.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        document.getElementById('nav-toggle')?.focus();
      }
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);
  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash, key]);
  return (
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label={`${site.name}, home`}>
        <Monogram />
        <span>
          Aymane<span className="wordmark-muted">.dev</span>
        </span>
      </Link>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={`floating-nav ${open ? 'is-open' : ''}`}
      >
        {navigation.map(({ id, label }) => (
          <Link
            key={id}
            to={`/#${id}`}
            onClick={() => {
              setOpen(false);
              setActive(id);
            }}
            aria-current={pathname === '/' && active === id ? 'location' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <a className="header-contact" href={`mailto:${site.email}`}>
        Let’s talk <ArrowUpRight size={15} />
      </a>
      <button
        id="nav-toggle"
        type="button"
        className="menu-toggle icon-button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  );
}
