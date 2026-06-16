'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const h1Words = ['Find', 'Your', 'Space', 'Above', 'the', 'Dubai', 'Skyline'];

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl
        .from('.nav', { y: -40, opacity: 0, duration: 0.9 })
        .from('.hero-bg img', { scale: 1.1, duration: 4, ease: 'power1.out' }, 0)
        .from('.h1-word', { clipPath: 'inset(0 0 100% 0)', y: 50, stagger: 0.1, duration: 1, ease: 'power4.out' }, 0.35)
        .from('.hero-body', { opacity: 0, y: 24, duration: 0.7 }, 1.0)
        .from('.hero-cta', { opacity: 0, y: 18, stagger: 0.12, duration: 0.6 }, 1.25)
        .from('.hero-scroll-ind', { opacity: 0, duration: 0.5 }, 1.6);

      if (window.innerWidth > 768) {
        gsap.to('.hero-bg img', {
          yPercent: 28, 
          ease: 'none',
          scrollTrigger: { 
            trigger: '.hero-section', 
            start: 'top top', 
            end: 'bottom top', 
            scrub: 1.2 
          },
        });
      }
    }, ref);
    
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={ref} 
      id="hero"
      className="hero-section relative w-full overflow-hidden" 
      style={{ 
        height: '100svh',  /* ✅ USE svh instead of vh */
        minHeight: '600px' 
      }}
    >
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 w-full h-full">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="hero-bg-img w-full h-full object-cover"
    style={{
      objectFit: 'cover',
      objectPosition: 'center center'
    }}
  >
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
    <source src="/videos/hero-bg.webm" type="video/webm" />
    {/* Fallback image for browsers that don't support video */}
    Your browser does not support the video tag.
  </video>
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.05) 100%)' 
          }} 
        />
      </div>

      {/* Navigation */}
      <nav className="nav absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 md:px-14 py-7">
        <button className="font-dm text-white text-sm tracking-widest opacity-75 hover:opacity-100 transition-opacity">
          ≡ &nbsp;Menu
        </button>
        <div 
          className="font-cormorant text-white text-base sm:text-lg tracking-[0.3em] font-semibold" 
          style={{ fontVariant: 'small-caps' }}
        >
          ◎ ELARIS
        </div>
        <a
          href="https://wa.me/971XXXXXXXXX?text=I'm%20interested%20in%20Dubai%20properties"
          target="_blank" 
          rel="noopener noreferrer"
          className="nav-pill font-dm text-white text-[11px] tracking-widest px-4 sm:px-5 py-2.5 rounded-full hidden sm:flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.558 4.112 1.528 5.837L.057 23.885a.5.5 0 00.612.612l6.048-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.814 9.814 0 01-5.028-1.382l-.36-.214-3.732.907.922-3.646-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
          WhatsApp Us →
        </a>
      </nav>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-10 md:px-14 pb-14 sm:pb-20">
        <div className="max-w-4xl">
          <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4 block">
            Dubai Luxury Properties
          </span>
          
          <h1 
            className="font-cormorant font-bold text-white leading-[0.95] mb-5 sm:mb-6" 
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            aria-label={h1Words.join(' ')}
          >
            {h1Words.map((w, i) => (
              <span 
                key={i} 
                className="h1-word" 
                style={{ 
                  display: 'inline-block', 
                  overflow: 'hidden', 
                  marginRight: '0.22em' 
                }}
              >
                {w}
              </span>
            ))}
          </h1>
          
          <p className="hero-body font-dm text-white/65 text-[13px] sm:text-sm leading-relaxed mb-7 sm:mb-8 max-w-md">
            Palm Jumeirah. Downtown Dubai. DIFC. Marina.<br />
            Handpicked properties from AED 2M to AED 50M+
          </p>
          
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={() => scrollTo('listings')}
              className="hero-cta font-dm bg-white text-[11px] sm:text-xs tracking-widest px-6 sm:px-7 py-3 sm:py-3.5 rounded-full hover:bg-cream transition-colors cursor-pointer" 
              style={{ color: '#2E2A24' }}
            >
              View Properties →
            </button>
            <button
              onClick={() => scrollTo('lead-form')}
              className="hero-cta font-dm text-white text-[11px] sm:text-xs tracking-widest px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-white/35 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Request Private Viewing
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-ind absolute bottom-14 sm:bottom-20 right-6 sm:right-14 z-10 flex flex-col items-center gap-3">
        <span 
          className="font-dm text-white/50 text-[9px] tracking-[0.25em] uppercase" 
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="scroll-chevron text-white/50 text-base">↓</div>
      </div>
    </section>
  );
}