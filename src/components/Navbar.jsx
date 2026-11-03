import { useState } from 'react';
import { navigation } from '../data/profile.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="logo" aria-label="Harsh, back to top" onClick={close}>
          HARSH<span className="logo-dot">.</span>
        </a>

        <nav id="primary-nav" aria-label="Primary" className={`nav-links ${open ? 'is-open' : ''}`}>
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={close}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact" onClick={close}>
          Let’s talk <span aria-hidden="true">→</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className="menu-bars" />
        </button>
      </div>
    </header>
  );
}
