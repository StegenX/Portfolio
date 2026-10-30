import {
  Database,
  FileText,
  GitBranch,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { Project } from '../types/content';

export function SystemOrb() {
  return (
    <svg className="system-orb" viewBox="0 0 320 180" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="orb-light">
          <stop stopColor="#ddd" stopOpacity=".12" />
          <stop offset="1" stopColor="#ddd" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="90" r="86" fill="url(#orb-light)" />
      <path
        d="M55 90h210M160 3v174M84 41l152 98M84 139l152-98"
        stroke="#444"
        strokeWidth=".65"
        strokeDasharray="2 5"
      />
      <circle cx="160" cy="90" r="67" stroke="#555" strokeWidth=".65" />
      <g className="orb-mesh">
        <g className="orb-ring orb-ring-equator">
          <ellipse cx="160" cy="90" rx="67" ry="26" stroke="#777" strokeWidth=".65" />
          <circle className="orb-particle orb-particle-equator" r="2.5" fill="#eee" />
        </g>
        <g className="orb-ring orb-ring-meridian">
          <ellipse cx="160" cy="90" rx="26" ry="67" stroke="#666" strokeWidth=".65" />
          <circle className="orb-particle orb-particle-meridian" r="2.5" fill="#ddd" />
        </g>
        <g transform="rotate(42 160 90)">
          <g className="orb-ring orb-ring-diagonal">
            <ellipse cx="160" cy="90" rx="49" ry="67" stroke="#666" strokeWidth=".65" />
            <circle className="orb-particle orb-particle-diagonal" r="2" fill="#ddd" />
          </g>
        </g>
        <g transform="rotate(-42 160 90)">
          <g className="orb-ring orb-ring-counter">
            <ellipse cx="160" cy="90" rx="49" ry="67" stroke="#555" strokeWidth=".65" />
            <circle className="orb-particle orb-particle-counter" r="2" fill="#bbb" />
          </g>
        </g>
        <circle className="orb-particle orb-particle-rim" r="3" fill="#ddd" />
      </g>
      <rect x="143" y="73" width="34" height="34" rx="9" fill="#1c1c1c" stroke="#999" />
      <path d="m153 95 7-12 7 12M155 92h10" stroke="#eee" strokeWidth="1.5" />
      <g fill="#858585" fontSize="8" fontFamily="monospace">
        <text x="15" y="94">
          INPUT
        </text>
        <text x="275" y="94">
          OUTPUT
        </text>
      </g>
    </svg>
  );
}
export function ProjectArchitecture({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const type = project.category;
  const isAI = type === 'ai';
  const isData = type === 'data';
  const SourceIcon = isAI ? FileText : isData ? Database : Layers3;
  const CenterIcon = isAI ? Search : isData ? Workflow : GitBranch;
  const EndIcon = isAI ? Sparkles : isData ? Database : ShieldCheck;
  return (
    <div
      className={`project-diagram ${compact ? 'compact' : ''} diagram-${type}`}
      role="img"
      aria-label={project.architecture.description}
    >
      <div className="diagram-grid" />
      <div className="diagram-caption">
        <span className="tiny-dot" />
        {isAI
          ? 'HYBRID RETRIEVAL ARCHITECTURE'
          : isData
            ? 'ORCHESTRATED DATA WORKFLOW'
            : 'ILLUSTRATIVE AI WORKFLOW'}
        <span className="diagram-version">{isAI ? 'RAG' : isData ? 'ETL' : 'AI'}</span>
      </div>
      <div className="diagram-body">
        <div className="diagram-source">
          <div className="source-stack">
            <SourceIcon size={23} strokeWidth={1.2} />
          </div>
          <span>{isAI ? 'SEC 10-K' : isData ? 'FastF1 API' : 'Inputs'}</span>
        </div>
        <div className="diagram-wire">
          <span />
        </div>
        <div className="diagram-core">
          <div className="core-orbit" />
          <CenterIcon size={28} strokeWidth={1.2} />
          <span>{isAI ? 'Hybrid search' : isData ? 'Transform' : 'AI workflow'}</span>
          <small>
            {isAI ? 'SEMANTIC + BM25' : isData ? 'VALIDATE + LOAD' : 'EXTRACT + ENRICH'}
          </small>
        </div>
        <div className="diagram-wire">
          <span />
        </div>
        <div className="diagram-output">
          <EndIcon size={23} strokeWidth={1.2} />
          <span>{isAI ? 'Grounded answer' : isData ? 'BigQuery' : 'Evidence report'}</span>
        </div>
      </div>
      <div className="diagram-bottom">
        <span>{isAI ? '01 / RETRIEVE' : isData ? '01 / EXTRACT' : '01 / EXTRACT'}</span>
        <span>{isAI ? '02 / RERANK' : isData ? '02 / VALIDATE' : '02 / VALIDATE'}</span>
        <span>{isAI ? '03 / GENERATE' : isData ? '03 / LOAD' : '03 / REVIEW'}</span>
      </div>
      <div className="diagram-type">
        {isAI
          ? 'SYSTEM OVERVIEW'
          : isData
            ? 'PIPELINE OVERVIEW'
            : 'GENERALIZED · NO INTERNAL DETAILS'}
      </div>
    </div>
  );
}
