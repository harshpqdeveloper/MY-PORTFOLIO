import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="logo" aria-label="Back to top">
          HARSH
        </a>
        <p className="muted small">
          © {new Date().getFullYear()} {profile.name}. Built with React, GSAP and Lenis.
        </p>
        <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="small">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  );
}
