import { processSteps } from '../data/process.js';

export default function Process() {
  return (
    <section id="process" className="section section-tint">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">04 / Process</p>
          <h2 className="display section-title">
            Five steps. <span className="accent-text">No guessing</span>.
          </h2>
        </header>

        <ol className="timeline">
          <span className="timeline-rail" aria-hidden="true">
            <span className="timeline-fill" data-timeline />
          </span>
          {processSteps.map((s) => (
            <li key={s.number} className="timeline-step" data-reveal>
              <span className="timeline-num">{s.number}</span>
              <div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-text">{s.text}</p>
                <p className="step-proof">
                  <span>From my work:</span> {s.proof}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
