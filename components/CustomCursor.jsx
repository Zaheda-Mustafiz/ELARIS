'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let rafId;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const loop = () => {
      // Dot follows instantly
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      // Ring follows with lag
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      rafId = requestAnimationFrame(loop);
    };

    const onEnter = () => ring.classList.add('hovered');
    const onLeave = () => ring.classList.remove('hovered');

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor], .listing-card, .service-list li, .accordion-item, .elaris-letter-wrap').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    // Attach after mount
    setTimeout(attach, 500);

    // ✅ HIDE CURSOR IN FOOTER
    const footer = document.querySelector('footer');
    if (footer) {
      footer.addEventListener('mouseenter', () => {
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      });
      footer.addEventListener('mouseleave', () => {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      });
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}