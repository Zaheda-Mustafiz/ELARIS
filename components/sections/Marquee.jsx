'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const TEXT = "Dubai's Most Exclusive Properties · AED 2M to AED 50M+ · ";

export default function Marquee() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.marquee-section-inner', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
      gsap.to('.marquee-inner', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  const copies = Array(4).fill(TEXT);

  return (
    <section ref={ref} className="py-16 sm:py-20 flex flex-col items-center gap-12 overflow-hidden" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="marquee-section-inner w-full flex flex-col items-center gap-12">
        <div className="marquee-track w-full overflow-hidden">
          <div className="marquee-inner">
            {[...copies, ...copies].map((t, i) => (
              <span key={i} aria-hidden={i >= copies.length} className="font-cormorant italic select-none px-2 sm:px-4"
                style={{ color: '#2E2A24', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', whiteSpace: 'nowrap', display: 'inline-block' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <a
          href="https://wa.me/971XXXXXXXXX?text=Hi%20ELARIS%2C%20I%20am%20interested%20in%20Dubai%20properties"
          target="_blank" rel="noopener noreferrer"
          className="font-dm text-[11px] sm:text-[12px] tracking-widest text-cream px-8 sm:px-10 py-3.5 sm:py-4 rounded-full hover:opacity-80 transition-opacity flex items-center gap-2"
          style={{ backgroundColor: '#2E2A24' }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.558 4.112 1.528 5.837L.057 23.885a.5.5 0 00.612.612l6.048-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.814 9.814 0 01-5.028-1.382l-.36-.214-3.732.907.922-3.646-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          WhatsApp an Advisor →
        </a>
      </div>
    </section>
  );
}
