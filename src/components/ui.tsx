import type { ReactNode } from 'react';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Check, Copy, Download, GitFork } from 'lucide-react';
import { site } from '../data/site';
import { assetUrl } from '../lib/urls';

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={false}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      style={{ y: reduced ? 0 : 12, opacity: reduced ? 1 : 0.85 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          <span className="section-number">{number}</span> {label}
        </div>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}
export function ResumeLink({ className = 'button button-secondary' }: { className?: string }) {
  return site.resumeUrl ? (
    <a className={className} href={assetUrl(site.resumeUrl)} download>
      <Download size={16} />
      Download Résumé
    </a>
  ) : null;
}
export function GitHubLink({
  className = '',
  label = 'GitHub',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a className={className} href={site.githubUrl} target="_blank" rel="noreferrer">
      <GitFork size={17} />
      {label}
      <ArrowUpRight size={14} />
    </a>
  );
}
export function CopyEmailButton() {
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus('Email copied');
    } catch {
      setStatus('Copy unavailable. Use the email link to get in touch.');
    }
  }
  return (
    <div className="copy-wrapper">
      <button className="icon-button" type="button" onClick={copy} aria-label="Copy email address">
        {status === 'Email copied' ? <Check size={18} /> : <Copy size={18} />}
      </button>
      <span className="copy-status" role="status">
        {status}
      </span>
    </div>
  );
}
export function ScrollCue() {
  return (
    <a className="scroll-cue" href="#about">
      <ArrowDown size={14} /> SCROLL TO EXPLORE
    </a>
  );
}
