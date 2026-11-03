import ArtThumb from './ArtThumb.jsx';

export default function ProjectCard({ project, onOpen }) {
  const { number, title, category, summary, tech = [], status, thumb } = project;

  return (
    <article className="card" data-reveal>
      <button type="button" className="card-button" onClick={onOpen} aria-label={`View project details: ${title}`}>
        <span className="card-thumb">
          {thumb.type === 'image' ? (
            <img src={thumb.src} alt={thumb.caption} width="1400" height="875" loading="lazy" decoding="async" />
          ) : (
            <ArtThumb seed={thumb.seed} />
          )}
          {thumb.type === 'art' && <span className="art-note">Project artwork, not a screenshot</span>}
        </span>

        <span className="card-body">
          <span className="card-meta">
            <span className="card-number">{number}</span>
            <span className="card-category">{category}</span>
          </span>
          <span className="card-title">{title}</span>
          <span className="card-summary">{summary}</span>

          <span className="tag-row">
            {tech.slice(0, 4).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </span>

          <span className="card-foot">
            <span className={`status status-${status.toLowerCase().replace(/\s+/g, '-')}`}>{status}</span>
            <span className="card-cta">
              View project details <span aria-hidden="true">→</span>
            </span>
          </span>
        </span>
      </button>
    </article>
  );
}
