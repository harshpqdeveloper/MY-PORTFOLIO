import { about, profile } from '../data/profile.js';
import Portrait from './Portrait.jsx';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">01 / About</p>
          <h2 className="display section-title">
            Behind the <span className="accent-text">solutions</span>.
          </h2>
          <p className="lead">{profile.brandStatement}</p>
        </header>

        <div className="about-grid">
          <div className="about-copy" data-reveal>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="muted">{about.independence}</p>

            <h3 className="kicker">Key areas of work</h3>
            <ul className="chip-list">
              {about.areas.map((a) => (
                <li key={a} className="chip">
                  {a}
                </li>
              ))}
            </ul>

            <h3 className="kicker">Technical interests</h3>
            <ul className="plain-list">
              {about.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <Portrait className="about-portrait" />
          </div>
        </div>

        <h3 className="kicker philosophy-title" data-reveal>
          Development philosophy
        </h3>
        <div className="philosophy" data-reveal>
          {about.philosophy.map((p) => (
            <article key={p.title} className="philosophy-item">
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
