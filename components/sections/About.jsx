'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const stats = [
  { value: 500, suffix: '+', label: 'Properties Sold in Dubai' },
  { value: 2.4, suffix: 'B+', label: 'AED Value Closed' },
  { value: 96, suffix: '%', label: 'Client Satisfaction Rate' },
  { value: 18, suffix: 'yrs', label: 'Years in Dubai Market' },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.about-label', { opacity: 0, y: 20, duration: 0.7, scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
      gsap.from('.about-left-child', { x: -50, opacity: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
      gsap.from('.about-right-img', { x: 70, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 68%' } });
      if (window.innerWidth > 768) {
        gsap.to('.about-right-img img', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      }
      document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseFloat(el.dataset.target);
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: target, duration: 2.2, ease: 'power2.out',
              onUpdate: function () {
                const v = this.targets()[0].val;
                el.textContent = (target % 1 !== 0 ? v.toFixed(1) : Math.ceil(v)) + el.dataset.suffix;
              },
            });
          },
        });
      });
      gsap.from('.stat-card', { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.stats-bar', start: 'top 85%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="relative" style={{ backgroundColor: '#F5EDE3' }}>
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[85vh]">
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20 gap-5 sm:gap-6">
          <span className="about-label about-left-child font-dm text-[10px] sm:text-[11px] tracking-[0.25em] uppercase" style={{ color: '#C4B8A8' }}>Why Elaris</span>
          <div className="about-left-child w-[90px] sm:w-[110px] h-[90px] sm:h-[110px] rounded-lg overflow-hidden flex-shrink-0">
            <Image src="/images/BurjKhalifap.png" alt="Dubai property" width={110} height={110} className="object-cover w-full h-full" />
          </div>
          <h2 className="about-left-child font-cormorant font-semibold text-charcoal leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.9rem)' }}>
            Dubai's Most Trusted<br /><em className="font-light">Property Advisors</em>
          </h2>
          <p className="about-left-child font-dm text-[13px] sm:text-[14px] leading-relaxed max-w-md" style={{ color: 'rgba(46,42,36,0.65)' }}>
            We connect discerning buyers and investors with Dubai's most exclusive properties. From off-plan investments to ready villas — every listing is handpicked for value, location, and lifestyle.
          </p>
          <p className="about-left-child font-dm text-[13px] sm:text-[14px] leading-relaxed max-w-md" style={{ color: 'rgba(46,42,36,0.65)' }}>
            DLD registered and RERA licensed, we operate with full transparency — no hidden fees, no pressure, just expert guidance for your most important investment.
          </p>
          <a href="#listings" className="about-left-child font-dm text-[11px] sm:text-[12px] tracking-widest text-cream px-7 sm:px-8 py-3.5 sm:py-4 rounded-full inline-flex w-fit hover:opacity-80 transition-opacity mt-1" style={{ backgroundColor: '#2E2A24' }}>
            Our Properties →
          </a>
        </div>
        <div className="relative flex items-center justify-center lg:justify-start py-12 lg:py-0 px-6 lg:px-8 overflow-hidden lg:overflow-visible">
  <div className="about-right-img relative overflow-hidden shadow-2xl w-full max-w-sm lg:max-w-none lg:rounded-2xl" style={{ height: 'clamp(280px, 50vh, 440px)', borderRadius: '16px' }}>
    <Image
      src="/images/Residential Sales.png"  
       alt="Dubai luxury interior" 
      fill 
      className="object-cover"
      style={{ objectFit: 'cover', objectPosition: 'center' }}
      sizes="(max-width: 1024px) 90vw, 45vw"
      priority
     />
      </div>
        </div>
      </div>

      <div
  className="stats-bar grid grid-cols-2 sm:grid-cols-4"
  style={{ backgroundColor: '#2E2A24', position: 'relative', zIndex: 10 }}
>
  {stats.map((s, i) => (
    <div
      key={i}
      className="stat-card flex flex-col items-center justify-center text-center"
      style={{
        borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        padding: '36px 16px 40px',
        minHeight: '160px',
      }}
    >
      <span
        className="stat-number font-cormorant font-bold text-white leading-none"
        style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '10px' }}
        data-target={s.value}
        data-suffix={s.suffix}
      >
        0{s.suffix}
      </span>
      <span
        className="font-dm uppercase text-white/45 text-center leading-relaxed"
        style={{ fontSize: '9px', letterSpacing: '0.15em' }}
      >
        {s.label}
      </span>
    </div>
  ))}
</div>
    </section>
  );
}
