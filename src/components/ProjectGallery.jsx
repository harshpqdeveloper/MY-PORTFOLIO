import { useMemo, useState } from 'react';
import { categories, projects } from '../data/projects.js';
import { visibleWebsites } from '../data/externalWebsites.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectDetail from './ProjectDetail.jsx';

// Project 09 entries are shaped like projects so the same card and detail view can show them.
const websiteProjects = visibleWebsites.map((site, index) => ({
  id: site.id,
  number: `09.${index + 1}`,
  title: site.name,
  category: 'Web Development',
  summary: `${site.industry}. Live business website.`,
  overview: site.url ? `Public website at ${site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}.` : '',
  contribution: site.contribution,
  status: site.status || 'Live website',
  statusNote: site.contribution ? '' : 'My contribution to this site is still to be confirmed.',
  tech: site.technologies,
  links: { live: site.url },
  thumb: site.screenshot
    ? { type: 'image', src: `/work/${site.screenshot}.webp`, caption: `Real screenshot: ${site.name}` }
    : { type: 'art', seed: index + 20 },
  screenshots: site.screenshot ? [{ src: `/work/${site.screenshot}.webp`, caption: `${site.name} homepage` }] : [],
  external: true,
}));

const allItems = [...projects, ...websiteProjects];

export default function ProjectGallery() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((p) => {
      if (active !== 'All' && p.category !== active) return false;
      if (!q) return true;
      return [p.title, p.summary, p.category, ...(p.tech || [])].join(' ').toLowerCase().includes(q);
    });
  }, [active, query]);

  const selected = allItems.find((p) => p.id === selectedId) || null;

  return (
    <section id="work" className="section section-tint">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">02 / Selected work</p>
          <h2 className="display section-title">
            Work that <span className="accent-text">runs</span>.
          </h2>
          <p className="lead">
            Each project below was checked against its repository, README or live site. Status is shown on every card.
          </p>
        </header>

        <div className="gallery-tools" data-reveal>
          <div className="filters" role="group" aria-label="Filter by category">
            {['All', ...categories].map((c) => (
              <button
                key={c}
                type="button"
                className={`filter ${active === c ? 'is-active' : ''}`}
                aria-pressed={active === c}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="search">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Search projects or tools"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        <p className="result-count" aria-live="polite">
          Showing {visible.length} of {allItems.length} projects
        </p>

        {visible.length > 0 ? (
          <ul className="project-grid">
            {visible.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} onOpen={() => setSelectedId(p.id)} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">No project matches that search. Try another word or category.</p>
        )}
      </div>

      {selected && <ProjectDetail project={selected} onClose={() => setSelectedId(null)} />}
    </section>
  );
}
