'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '../../lib/gsap';

const accordionItems = [
  { num: '01', title: 'Residential Sales', text: 'From studios to penthouses — we represent Dubai\'s finest ready properties with full legal support, DLD registration, and transparent pricing.', image: '/images/Rsidential property2.png' },
  { num: '02', title: 'Off-Plan Investment', text: 'Exclusive access to pre-launch pricing from Emaar, Damac, Sobha, Meraas and other top developers — before public release.', image: null },
  { num: '03', title: 'Golden Visa Properties', text: 'Properties qualifying for UAE 10-year Golden Visa from AED 2M. Full application support, legal guidance, and NOC assistance included.', image: null },
  { num: '04', title: 'Property Management', text: 'Full management service for investors. Tenant sourcing, maintenance coordination, and 6-8% annual yield on prime Dubai locations.', image: null },
  { num: '05', title: 'Mortgage & Finance', text: 'UAE and international bank connections. Up to 80% LTV for UAE residents. Free mortgage pre-approval in 48 hours.', image: null },
];

const serviceNames = accordionItems.map(i => i.title);

export default function Services() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.services-label', { opacity: 0, y: 20, duration: 0.7, scrollTrigger: { trigger: ref.current, start: 'top 78%' } });
      gsap.from('.services-heading', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.from('.service-list li', { x: -45, opacity: 0, stagger: 0.09, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } });
      gsap.from('.services-cta', { opacity: 0, y: 20, duration: 0.6, scrollTrigger: { trigger: ref.current, start: 'top 65%' } });
      gsap.from('.accordion-item', { x: 55, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 68%' } });
      const lis = ref.current.querySelectorAll('.service-list li');
      lis.forEach(li => {
        li.addEventListener('mouseenter', () => gsap.to(li, { x: 10, duration: 0.3, ease: 'power2.out' }));
        li.addEventListener('mouseleave', () => gsap.to(li, { x: 0, duration: 0.3, ease: 'power2.out' }));
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="services" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] min-h-screen section-pad gap-10 lg:gap-16">
        <div className="flex flex-col justify-center gap-8 sm:gap-10">
          <div>
            <span className="services-label font-dm text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-5 block" style={{ color: '#C4B8A8' }}>What We Offer</span>
            <h2 className="services-heading font-cormorant font-semibold text-charcoal leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Find, Buy &<br /><em className="font-light">Invest with ELARIS</em>
            </h2>
          </div>
          <ul className="service-list flex flex-col gap-3 sm:gap-4">
            {serviceNames.map((s, i) => (
              <li key={i} onClick={() => setActive(i)}
                className={`font-cormorant cursor-none transition-all duration-300 ${active === i ? 'active text-charcoal font-semibold' : 'text-charcoal/35 font-light hover:text-charcoal/65'}`}
                style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>{s}
              </li>
            ))}
          </ul>
          <a href="#listings" className="services-cta font-dm text-[11px] sm:text-[12px] tracking-widest border text-charcoal px-7 sm:px-8 py-3.5 sm:py-4 rounded-full inline-flex w-fit hover:bg-charcoal hover:text-cream transition-all" style={{ borderColor: '#2E2A24' }}>
            View All Properties →
          </a>
        </div>

        <div className="flex flex-col justify-center divide-y" style={{ borderColor: 'rgba(46,42,36,0.1)' }}>
          {accordionItems.map((item, i) => (
            <div key={i} className="accordion-item py-4 sm:py-5">
              <button className="w-full flex items-center justify-between text-left gap-4" onClick={() => setActive(active === i ? -1 : i)}>
                <div className="flex items-center gap-4 sm:gap-5">
                  <span className="font-dm text-[10px] sm:text-[11px] tracking-widest flex-shrink-0" style={{ color: '#C4B8A8' }}>{item.num}</span>
                  <span className={`font-cormorant transition-all ${active === i ? 'text-charcoal font-semibold' : 'text-charcoal/55 font-light'}`} style={{ fontSize: 'clamp(1rem, 2vw, 1.45rem)' }}>{item.title}</span>
                </div>
                <span className="text-charcoal/35 flex-shrink-0 text-lg transition-transform duration-300" style={{ transform: active === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              <div className={`accordion-content ${active === i ? 'open' : ''}`}>
                <div className="pt-4 pl-9 sm:pl-10 pr-2">
                  {item.image && (
                    <div className="relative w-full rounded-lg overflow-hidden mb-4" style={{ height: 'clamp(140px, 22vw, 200px)' }}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 50vw" />
                    </div>
                  )}
                  <p className="font-dm text-[12px] sm:text-[13px] leading-relaxed max-w-md" style={{ color: 'rgba(46,42,36,0.58)' }}>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
