import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import {
  Braces,
  CheckCheck,
  FileText,
  Layers3,
  Network,
  ScanText,
  Search,
  ArrowRight,
  Pause,
  Play,
} from 'lucide-react';
import { workflow } from '../data/site';
const icons = [FileText, ScanText, Network, Search, Layers3, Braces, CheckCheck];
export function ArchitectureFlow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const playing = !reducedMotion && !paused && !hovered && !focused;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActive((step) => (step + 1) % workflow.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [playing]);
  return (
    <div className="architecture-card panel">
      <div className="card-topline">
        <span className="eyebrow">
          <Network size={14} /> ANATOMY OF AN AI SYSTEM
        </span>
        <div className="flow-controls">
          <span className="micro-tag">CONCEPTUAL WORKFLOW</span>
          <button
            type="button"
            className="flow-playback"
            aria-label={paused ? 'Resume workflow animation' : 'Pause workflow animation'}
            aria-pressed={paused}
            title={paused ? 'Resume workflow animation' : 'Pause workflow animation'}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        </div>
      </div>
      <div
        className="workflow"
        aria-label="Interactive document intelligence workflow"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        {workflow.map((step, index) => {
          const Icon = icons[index];
          return (
            <div className={`flow-step ${active === index ? 'active' : ''}`} key={step.label}>
              <button
                type="button"
                className="flow-node"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-pressed={active === index}
                aria-label={`Explore ${step.label}`}
                aria-describedby={active === index ? 'workflow-detail' : undefined}
              >
                <Icon size={20} strokeWidth={1.35} />
              </button>
              <span className="flow-label">{step.label}</span>
              {index < workflow.length - 1 && (
                <ArrowRight
                  className={`flow-connector ${active === index || active === index + 1 ? 'lit' : ''}`}
                  size={16}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flow-detail" id="workflow-detail" aria-live={playing ? 'off' : 'polite'}>
        <span className="mono">
          0{active + 1} / {workflow[active].label}
        </span>
        <p>{workflow[active].detail}</p>
      </div>
      <p className="diagram-disclaimer">
        Illustrative AI workflow — project-specific architectures are explained in case studies.
      </p>
    </div>
  );
}
