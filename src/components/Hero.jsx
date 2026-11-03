import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';
import { prefersReducedMotion } from '../lib/motion.js';
import Portrait from './Portrait.jsx';

export default function Hero() {
  const [accent, setAccent] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setAccent((v) => (v + 1) % profile.heroAccents.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="hero">
      {/* The wrapper takes the scroll parallax; the word inside stays centred by CSS at any window size. */}
      <div className="hero-bg-wrap" aria-hidden="true" data-parallax>
        <span className="hero-bg">
          <span className="hero-bg-fill">HARSH</span>
        </span>
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hello" data-hero-in>
            Hello, I’m {profile.name}
          </p>

          <h1 className="display hero-title" data-hero-in>
            {profile.titleLines[0]}
            <br />
            {profile.titleLines[1]}
          </h1>

          <p className="accent-line" data-hero-in>
            <span key={accent} className="accent-word">
              {profile.heroAccents[accent]}
            </span>
          </p>

          <p className="hero-intro" data-hero-in>
            {profile.heroIntro}
          </p>

          <div className="hero-actions" data-hero-in>
            <a className="btn btn-primary" href="#work">
              View My Work <span aria-hidden="true">↓</span>
            </a>
            <a className="btn" href="#contact">
              Let’s Connect
            </a>
          </div>

          <ul className="hero-meta" data-hero-in>
            <li>
              <span className={`status-dot ${profile.availability.open ? 'is-on' : ''}`} aria-hidden="true" />
              {profile.availability.label}
            </li>
            <li>{profile.location}</li>
          </ul>
        </div>

        <div className="hero-visual" data-hero-in>
          <Portrait className="hero-portrait" />
        </div>
      </div>

      <a className="scroll-cue" href="#about">
        Scroll to discover
      </a>
    </section>
  );
}
