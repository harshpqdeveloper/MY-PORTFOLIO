import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let activeLenis = null;

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Pauses smooth page scrolling, e.g. while a dialog is open. Returns a function that resumes it. */
export function lockPageScroll() {
  const lenis = activeLenis;
  lenis?.stop();
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = '';
    lenis?.start();
  };
}

/**
 * Starts smooth scrolling and scroll-triggered motion. Returns a cleanup function.
 * With reduced motion requested, nothing moves: content is shown in its final state.
 */
export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const reduced = prefersReducedMotion();

  let lenis = null;
  let tick = null;
  if (!reduced) {
    lenis = new Lenis({ duration: 1.1 });
    activeLenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  }

  const ctx = gsap.context(() => {
    if (reduced) return;

    gsap.from('[data-hero-in]', { opacity: 0, y: 28, duration: 1.1, stagger: 0.12, ease: 'power3.out' });

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      );
    });

    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      gsap.to(el, {
        yPercent: -12,
        force3D: false, // 2D transform keeps the giant text sharp instead of a blurry GPU bitmap
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top top', end: 'bottom top', scrub: true },
      });
    });

    gsap.utils.toArray('[data-timeline]').forEach((el) => {
      gsap.fromTo(
        el,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: true },
        },
      );
    });
  });

  return () => {
    ctx.revert();
    if (tick) gsap.ticker.remove(tick);
    if (lenis) lenis.destroy();
    if (activeLenis === lenis) activeLenis = null;
  };
}
