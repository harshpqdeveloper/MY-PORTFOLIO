import { skillGroups, marqueeTools } from '../data/skills.js';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">03 / Toolkit</p>
          <h2 className="display section-title">
            Tools I have <span className="accent-text">used</span>.
          </h2>
          <p className="lead">
            Every tool below appears in a repository, a requirements file or a built executable. Nothing is listed for
            popularity, and there are no skill percentages.
          </p>
        </header>

        <div className="skill-groups">
          {skillGroups.map((g) => (
            <article key={g.title} className="skill-group" data-reveal>
              <h3 className="kicker">{g.title}</h3>
              <p className="muted small">{g.note}</p>
              <ul className="skill-list">
                {g.skills.map((s) => (
                  <li key={s.name}>
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-found">{s.foundIn}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeTools, ...marqueeTools].map((t, i) => (
            <span key={`${t}-${i}`}>
              {t} <i>✳</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
