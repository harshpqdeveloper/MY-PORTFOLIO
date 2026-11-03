import { useEffect, useRef } from 'react';
import ArtThumb from './ArtThumb.jsx';
import { lockPageScroll } from '../lib/motion.js';

function Section({ title, children }) {
  return (
    <section className="detail-section">
      <h3 className="kicker">{title}</h3>
      {children}
    </section>
  );
}

export default function ProjectDetail({ project, onClose }) {
  const closeRef = useRef(null);
  const p = project;

  useEffect(() => {
    const previous = document.activeElement;
    const unlockPageScroll = lockPageScroll();
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      unlockPageScroll();
      previous?.focus?.();
    };
  }, [onClose]);

  const hasLinks = p.links?.live || p.links?.github;

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      {/* data-lenis-prevent lets the mouse wheel scroll this dialog natively instead of the page behind it. */}
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" data-lenis-prevent>
        <button ref={closeRef} type="button" className="modal-close" onClick={onClose}>
          Close <span aria-hidden="true">×</span>
        </button>

        <header className="modal-head">
          <p className="eyebrow">
            {p.number} · {p.category}
          </p>
          <h2 id="detail-title" className="display modal-title">
            {p.title}
          </h2>
          <p className={`status status-${p.status.toLowerCase().replace(/\s+/g, '-')}`}>{p.status}</p>
          {p.statusNote && <p className="muted">{p.statusNote}</p>}
        </header>

        <div className="modal-media">
          {p.thumb.type === 'image' ? (
            <img src={p.thumb.src} alt={p.thumb.caption} width="1400" height="875" decoding="async" />
          ) : (
            <div className="modal-art">
              <ArtThumb seed={p.thumb.seed} />
              <span className="art-note">Project artwork, not a screenshot</span>
            </div>
          )}
        </div>

        {p.overview && <Section title="Overview">{<p>{p.overview}</p>}</Section>}
        {p.problem && (
          <div className="detail-two">
            <Section title="Problem">
              <p>{p.problem}</p>
            </Section>
            <Section title="Objective">
              <p>{p.objective}</p>
            </Section>
          </div>
        )}
        {p.solution && (
          <Section title="Solution">
            <p>{p.solution}</p>
          </Section>
        )}
        {p.contribution !== undefined && (
          <Section title="My contribution">
            <p>{p.contribution || 'To be confirmed by Harsh before publishing.'}</p>
          </Section>
        )}

        {p.workflow && (
          <Section title="Workflow">
            <ol className="workflow">
              {p.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Section>
        )}

        {p.features?.length > 0 && (
          <Section title="Main features">
            <ul className="plain-list">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Section>
        )}

        {p.measured && (
          <Section title="Measured results">
            <ul className="plain-list">
              {p.measured.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Section>
        )}

        {p.tech?.length > 0 && (
          <Section title="Technologies">
            <ul className="chip-list">
              {p.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {p.screenshots?.length > 0 && (
          <Section title="Screenshots">
            <div className="shot-grid">
              {p.screenshots.map((s) => (
                <figure key={s.src}>
                  <img src={s.src} alt={s.caption} width="1400" height="875" loading="lazy" decoding="async" />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Section>
        )}

        <Section title="Links">
          {hasLinks ? (
            <ul className="link-list">
              {p.links.live && (
                <li>
                  <a href={p.links.live} target="_blank" rel="noopener noreferrer">
                    Live site <span aria-hidden="true">↗</span>
                  </a>
                </li>
              )}
              {p.links.github && (
                <li>
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                    GitHub repository <span aria-hidden="true">↗</span>
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <p className="muted">No public link. This tool runs on a Windows business PC.</p>
          )}
        </Section>
      </div>
    </div>
  );
}
