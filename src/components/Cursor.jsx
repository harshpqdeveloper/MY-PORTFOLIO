import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** A small red dot that follows the pointer. Only on fine pointers, and never with reduced motion. */
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const el = ref.current;
    const toX = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
    const toY = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });
    const hoverSel = 'a, button, [data-hover]';

    const move = (e) => {
      toX(e.clientX);
      toY(e.clientY);
    };
    const over = (e) => {
      if (e.target.closest(hoverSel)) el.classList.add('is-hover');
    };
    const out = (e) => {
      if (e.target.closest(hoverSel)) el.classList.remove('is-hover');
    };

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', out);
    document.documentElement.classList.add('has-cursor');

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
