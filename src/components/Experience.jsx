import { roles, milestones, education } from '../data/experience.js';
import DevChip from './DevChip.jsx';

export default function Experience() {
  const shownRoles = roles.filter((r) => r.confirmed || import.meta.env.DEV);
  const hasHistory = shownRoles.length > 0 || education.length > 0;

  return (
    <section id="journey" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">05 / The journey</p>
          <h2 className="display section-title">
            Little wins. <span className="accent-text">Big meaning</span>.
          </h2>
          <p className="lead">
            Practical software and automation for jewellery manufacturing and business workflows. The milestones are
            measured results from the projects themselves.
          </p>
        </header>

        <div className={`journey-grid ${hasHistory ? '' : 'is-single'}`}>
          {hasHistory && (
            <div className="roles" data-reveal>
              {shownRoles.map((r) => (
                <article key={r.id} className="role">
                  <p className="role-dates">{r.dates || <DevChip>Add dates</DevChip>}</p>
                  <h3 className="role-title">{r.title}</h3>
                  <p className="role-org">{r.org}</p>
                  <p className="muted">{r.summary}</p>
                  {!r.confirmed && <DevChip>{r.note}</DevChip>}
                </article>
              ))}

              {education.map((e) => (
                <article key={e.title} className="role">
                  <p className="role-dates">{e.dates}</p>
                  <h3 className="role-title">{e.title}</h3>
                  <p className="role-org">{e.org}</p>
                </article>
              ))}
            </div>
          )}

          <div className="milestones" data-reveal>
            <h3 className="kicker">Measured milestones</h3>
            <ol className="milestone-list">
              {milestones.map((m) => (
                <li key={m.title}>
                  <span className="milestone-title">{m.title}</span>
                  <span className="milestone-text">{m.text}</span>
                  <a className="milestone-link" href="#work">
                    See the work <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
