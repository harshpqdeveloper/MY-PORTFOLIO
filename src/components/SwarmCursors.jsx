import { useEffect, useRef } from 'react';
import { swarmCursors } from '../data/profile.js';

/*
 * A swarm of multiplayer-style cursors that orbits close around the visitor's mouse.
 * Each arrow circles the pointer on its own ring and faces the way it is flying. When the real
 * pointer runs into one, it is knocked away (harder the faster the hit), tumbles, then flies back
 * into orbit. A click knocks away the cursors near it.
 * Drawn on one fixed canvas with pointer-events: none, so every link and button stays clickable.
 */

const COLORS = ['#e0283a', '#ff7a45', '#f5b301', '#3ddc84', '#2ec4b6', '#4da3ff', '#9b6bff', '#ff4f9a'];
const ARROW = 'M0 0 L0 16.5 L4.4 12.4 L7.4 19 L10 17.9 L7.1 11.4 L13 11.4 Z';
// Direction the unrotated arrow points (from its body towards the tip at 0,0).
const ARROW_AXIS = Math.atan2(-12.66, -5.99);
const ARROW_SCALE = 0.75; // drawn size relative to the 13 x 19 px arrow path
const OUTLINE_PX = 0.8; // white outline width on screen
const HIT_RADIUS = 22;
const SPACING = 16;
const MAX_SPEED = 3600;

const rand = (a, b) => a + Math.random() * (b - a);
const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));

export default function SwarmCursors() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const arrow = new Path2D(ARROW);
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const count = coarse ? swarmCursors.touchCount : swarmCursors.count;
    const ringScale = coarse ? 0.85 : 1;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Until the visitor moves the mouse, the swarm circles a point beside the hero copy
    // (on phones, over the big red name, away from the text).
    const pointer = {
      x: w * (coarse ? 0.5 : 0.62),
      y: h * (coarse ? 0.17 : 0.5),
      vx: 0,
      vy: 0,
      inside: false,
      lastMove: -Infinity,
      lastT: 0,
    };

    const agents = Array.from({ length: count }, (_, i) => ({
      color: COLORS[i % COLORS.length],
      x: pointer.x + rand(-w * 0.25, w * 0.25),
      y: pointer.y + rand(-h * 0.25, h * 0.25),
      vx: 0,
      vy: 0,
      angle: (i / count) * Math.PI * 2,
      speed: rand(1.4, 2.4),
      radius: rand(38, 85) * ringScale,
      stiffness: rand(16, 26),
      breathe: rand(0, Math.PI * 2),
      rot: 0,
      spin: 0,
      knock: 0,
    }));

    // Knock one cursor away from a point, adding the pointer's own motion.
    const knock = (a, fromX, fromY, power) => {
      const dx = a.x - fromX;
      const dy = a.y - fromY;
      const d = Math.hypot(dx, dy) || 1;
      let ix = (dx / d) * power + pointer.vx * 1.3;
      let iy = (dy / d) * power + pointer.vy * 1.3;
      const m = Math.hypot(ix, iy);
      if (m > 3200) {
        ix *= 3200 / m;
        iy *= 3200 / m;
      }
      a.vx += ix;
      a.vy += iy;
      a.knock = rand(0.8, 1.25);
      a.spin = rand(9, 16) * (Math.random() < 0.5 ? -1 : 1);
    };

    let fade = 0;
    let raf = 0;
    let last = performance.now();

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      const idle = !pointer.inside || now - pointer.lastMove > 3500;
      fade = Math.min(1, fade + dt * 1.5);

      // the pointer's speed fades out once it stops moving
      const settle = Math.exp(-dt * 10);
      pointer.vx *= settle;
      pointer.vy *= settle;

      const cx = pointer.x;
      const cy = pointer.y;

      for (const a of agents) {
        a.angle += a.speed * dt * (idle ? 0.55 : 1);
        const r = a.radius * (idle ? 1.6 : 1) + Math.sin(t * 2 + a.breathe) * 5;
        const tx = cx + Math.cos(a.angle) * r;
        const ty = cy + Math.sin(a.angle) * r;

        let ax;
        let ay;
        if (a.knock > 0) {
          // knocked away: mostly free flight with drag, a weak pull back home
          a.knock -= dt;
          const drag = Math.exp(-dt * 2.2);
          a.vx *= drag;
          a.vy *= drag;
          ax = (tx - a.x) * a.stiffness * 0.05;
          ay = (ty - a.y) * a.stiffness * 0.05;
        } else {
          // damped spring towards this cursor's spot on its ring
          ax = (tx - a.x) * a.stiffness - a.vx * 7;
          ay = (ty - a.y) * a.stiffness - a.vy * 7;
        }

        // keep a little room between cursors
        for (const b of agents) {
          if (b === a) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < SPACING) {
            ax += (dx / d) * (SPACING - d) * 60;
            ay += (dy / d) * (SPACING - d) * 60;
          }
        }

        // the real pointer ran into this cursor: knock it away
        if (pointer.inside && a.knock < 0.2 && Math.hypot(a.x - cx, a.y - cy) < HIT_RADIUS) {
          knock(a, cx, cy, 700);
        }

        a.vx += ax * dt;
        a.vy += ay * dt;
        const speed = Math.hypot(a.vx, a.vy);
        if (speed > MAX_SPEED) {
          a.vx *= MAX_SPEED / speed;
          a.vy *= MAX_SPEED / speed;
        }
        a.x += a.vx * dt;
        a.y += a.vy * dt;

        // face the direction of travel; tumble while knocked away
        if (a.knock > 0) {
          a.rot += a.spin * dt;
        } else if (speed > 25) {
          const heading = Math.atan2(a.vy, a.vx) - ARROW_AXIS;
          a.rot += wrapAngle(heading - a.rot) * Math.min(1, dt * 12);
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = fade;
      // the outline is set in path units, so divide by the scale to keep it OUTLINE_PX on screen
      ctx.lineWidth = OUTLINE_PX / ARROW_SCALE;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#fff';
      for (const a of agents) {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rot);
        ctx.scale(ARROW_SCALE, ARROW_SCALE);
        ctx.translate(1, 1.5);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fill(arrow);
        ctx.translate(-1, -1.5);
        ctx.fillStyle = a.color;
        ctx.fill(arrow);
        ctx.stroke(arrow);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      const now = performance.now();
      const gap = (now - pointer.lastT) / 1000;
      if (pointer.inside && gap > 0 && gap < 0.1) {
        // smoothed pointer velocity in px/s, used to aim and power the knock
        pointer.vx = pointer.vx * 0.5 + ((e.clientX - pointer.x) / gap) * 0.5;
        pointer.vy = pointer.vy * 0.5 + ((e.clientY - pointer.y) / gap) * 0.5;
      }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.lastT = now;
      pointer.lastMove = now;
      pointer.inside = true;
    };
    const onDown = (e) => {
      onMove(e);
      for (const a of agents) {
        if (Math.hypot(a.x - e.clientX, a.y - e.clientY) < 150) knock(a, e.clientX, e.clientY, 1100);
      }
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="swarm-cursors" aria-hidden="true" />;
}
