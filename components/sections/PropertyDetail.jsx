'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function PropertyDetail() {
  const ref = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 65%', once: true },
      });
      tl
        .from('.property-img', { clipPath: 'inset(0 100% 0 0)', duration: 1.3, ease: 'power4.inOut' })
        .from('.property-card', {
          y: 55, opacity: 0,
          webkitFilter: 'blur(8px)', filter: 'blur(8px)',
          duration: 0.9, ease: 'power3.out',
        }, 0.65)
        .from('.inset-card', { scale: 0.88, opacity: 0, duration: 0.7, ease: 'back.out(1.4)' }, 1.05)
        .from('.property-label', { opacity: 0, x: 20, duration: 0.5, ease: 'power2.out' }, 1.1);

      // Image parallax
      if (window.innerWidth > 768) {
        gsap.to('.property-img img', {
          yPercent: 18, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: '560px' }}>
      <div className="property-img absolute inset-0 w-full h-full" style={{ clipPath: 'inset(0 0% 0 0)' }}>
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85"
          alt="Luxury property interior"
          fill className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.3) 100%)' }} />
      </div>

      {/* Bottom-left card */}
      <div className="property-card absolute bottom-8 sm:bottom-10 left-6 sm:left-14 z-20 rounded-2xl shadow-2xl p-5 sm:p-6 w-[260px] sm:w-[300px]"
        style={{ background: 'rgba(250,247,242,0.96)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', WebkitFilter: 'blur(0)', filter: 'blur(0)' }}>
        <h3 className="font-cormorant font-bold text-charcoal mb-1" style={{ fontSize: '1.35rem' }}>Casa Lumina</h3>
        <p className="font-dm text-[12px] mb-3 flex items-center gap-1.5" style={{ color: '#C4B8A8' }}>📍 Coral Gables, FL</p>
        <p className="font-dm text-[12px] leading-relaxed mb-4" style={{ color: 'rgba(46,42,36,0.58)' }}>
          A masterwork of tropical modernism — dissolving boundaries between interior and the surrounding canopy.
        </p>
        <div className="flex items-center gap-2 mb-4">
          {[0,1,2,3].map(i => (
            <button key={i} onClick={() => setActiveDot(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: activeDot===i?'20px':'6px', height:'6px', background: activeDot===i?'#2E2A24':'#C4B8A8' }} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-dm text-[10px] tracking-widest uppercase" style={{ color: '#C4B8A8' }}>Listed Price</span>
            <p className="font-cormorant font-bold text-charcoal text-xl">$4,750,000</p>
          </div>
          <button className="font-dm text-[11px] tracking-widest text-cream px-4 py-2.5 rounded-full text-xs" style={{ backgroundColor: '#2E2A24' }}>View →</button>
        </div>
      </div>

      {/* Top-right inset */}
      <div className="inset-card absolute top-8 sm:top-10 right-6 sm:right-14 z-20 rounded-xl overflow-hidden shadow-xl"
        style={{ width: '160px', height: '110px' }}>
        <Image src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80" alt="Infinity view" fill className="object-cover" sizes="160px" />
        <div className="absolute inset-0 flex items-end p-2.5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}>
          <span className="font-dm text-white text-[9px] tracking-widest uppercase">Infinity View</span>
        </div>
      </div>

      {/* Right label */}
      <div className="property-label absolute right-6 sm:right-14 bottom-8 sm:bottom-10 z-10 text-right hidden sm:block">
        <span className="font-dm text-white/45 text-[10px] tracking-[0.2em] uppercase block">Featured Property</span>
        <span className="font-cormorant italic text-white/30 text-lg">01 / 08</span>
      </div>
    </section>
  );
}
