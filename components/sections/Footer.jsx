'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const LETTER_DATA = [
  { letter: 'E', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', label: 'Downtown Dubai' },
  { letter: 'L', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', label: 'Palm Jumeirah' },
  { letter: 'A', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', label: 'DIFC Residences' },
  { letter: 'R', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', label: 'Private Villas' },
  { letter: 'I', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80', label: 'Dubai Marina' },
  { letter: 'S', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', label: 'JBR Penthouses' },
];

const footerLinks = {
  Social: [
    { label: 'Instagram', href: 'https://instagram.com/elarisrealestate' }, 
    { label: 'Pinterest', href: 'https://pinterest.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' }, 
    { label: 'Twitter / X', href: 'https://x.com' },
  ],
  'Quick Links': [
    { label: 'Properties', href: '#listings' }, 
    { label: 'About ELARIS', href: '#about' },
    { label: 'Our Services', href: '#services' }, 
    { label: 'Contact', href: '#lead-form' },
  ],
  'Property Types': [
    { label: 'Apartments', href: '#listings' }, 
    { label: 'Villas & Townhouses', href: '#listings' },
    { label: 'Penthouses', href: '#listings' }, 
    { label: 'Off-Plan Projects', href: '#listings' },
  ],
};

export default function Footer() {
  const footerRef = useRef(null);
  const megaRef = useRef(null);
  const hoverCardRef = useRef(null);
  const hoverImgRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const ctx = gsap.context(() => {
      gsap.from('.footer-top-left > *', { 
        y: 35, 
        opacity: 0, 
        stagger: 0.12, 
        duration: 0.9, 
        ease: 'power3.out', 
        scrollTrigger: { 
          trigger: '.footer-top-left', 
          start: 'top 82%', 
          once: true 
        } 
      });
      
      gsap.from('.footer-top-right > *', { 
        y: 35, 
        opacity: 0, 
        stagger: 0.12, 
        duration: 0.9, 
        ease: 'power3.out', 
        scrollTrigger: { 
          trigger: '.footer-top-right', 
          start: 'top 82%', 
          once: true 
        } 
      });
      
      gsap.from('.footer-col', { 
        y: 30, 
        opacity: 0, 
        stagger: 0.09, 
        duration: 0.8, 
        ease: 'power3.out', 
        scrollTrigger: { 
          trigger: '.footer-cols', 
          start: 'top 85%', 
          once: true 
        } 
      });

      const letters = gsap.utils.toArray('.elaris-mega-letter');
      gsap.set(letters, { y: '105%' });
      gsap.to(letters, { 
        y: '0%', 
        stagger: 0.06, 
        ease: 'none', 
        scrollTrigger: { 
          trigger: megaRef.current, 
          start: 'top 95%', 
          end: 'top 30%', 
          scrub: 1.2 
        } 
      });

      const card = hoverCardRef.current;
      const cardImg = hoverImgRef.current;
      const cardLabel = hoverLabelRef.current;
      let cardInitialised = false;

      const onMouseMove = (e) => {
        mouseXRef.current = e.clientX; 
        mouseYRef.current = e.clientY;
        if (!cardInitialised) { 
          gsap.set(card, { x: e.clientX - 80, y: e.clientY - 130 }); 
          cardInitialised = true; 
        }
        gsap.to(card, { 
          x: e.clientX - 80, 
          y: e.clientY - 130, 
          duration: 0.18, 
          ease: 'power2.out', 
          overwrite: 'auto' 
        });
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
          if (cardImg.src !== letter.dataset.image) cardImg.src = letter.dataset.image;
          if (cardLabel) cardLabel.textContent = letter.dataset.label;
          gsap.to(card, { 
            opacity: 1, 
            scale: 1, 
            rotation: -1.5 + Math.random() * 3, 
            duration: 0.38, 
            ease: 'back.out(1.4)', 
            overwrite: true 
          });
          gsap.to(letter, { 
            color: '#FFFFFF', 
            duration: 0.25, 
            ease: 'power2.out' 
          });
        });
        
        letter.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            opacity: 0, 
            scale: 0.85, 
            rotation: -3, 
            duration: 0.28, 
            ease: 'power2.in', 
            overwrite: true 
          });
          gsap.to(letter, { 
            color: '#FAF7F2', 
            duration: 0.28, 
            ease: 'power2.out' 
          });
        });
      });

      return () => window.removeEventListener('mousemove', onMouseMove);
    }, footerRef);
    
    return () => ctx.revert();
  }, []);

  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef} 
      id="contact" 
      style={{ backgroundColor: '#2E2A24', cursor: 'default' }}
    >
      {/* Top Section */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 px-6 sm:px-10 md:px-14 pt-16 sm:pt-20 pb-12 sm:pb-16 border-b" 
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="footer-top-left flex flex-col gap-5">
          <span 
            className="font-dm text-[10px] sm:text-[11px] tracking-[0.25em] uppercase" 
            style={{ color: '#C4B8A8' }}
          >
            Get In Touch
          </span>
          <h2 
            className="font-cormorant font-semibold leading-tight" 
            style={{ color: '#FAF7F2', fontSize: 'clamp(1.6rem, 3.5vw, 2.75rem)' }}
          >
            Discover Dubai's Finest<br /><em className="font-light">Properties with ELARIS</em>
          </h2>
        </div>
        
        <div className="footer-top-right flex flex-col justify-center items-start md:items-end gap-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80','https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80'].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  key={i} 
                  src={src} 
                  alt="client" 
                  className="w-9 h-9 rounded-full object-cover" 
                  style={{ 
                    border: '2px solid #2E2A24', 
                    marginLeft: i === 0 ? 0 : '-8px' 
                  }} 
                />
              ))}
            </div>
            <div>
              <p className="font-cormorant text-white font-semibold text-lg leading-tight">
                500+ Happy Clients
              </p>
              <p className="font-dm text-[11px]" style={{ color: '#C4B8A8' }}>
                Across Dubai
              </p>
            </div>
          </div>
          <a 
            href="#lead-form"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#lead-form');
            }}
            className="font-dm text-[12px] tracking-widest text-white px-7 py-3.5 rounded-full border hover:bg-white/10 transition-colors cursor-pointer" 
            style={{ borderColor: 'rgba(255,255,255,0.22)' }}
          >
            Book a Viewing →
          </a>
        </div>
      </div>

      {/* Links Columns */}
      <div 
        className="footer-cols grid grid-cols-2 sm:grid-cols-4 gap-8 px-6 sm:px-10 md:px-14 py-10 sm:py-14 border-b" 
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {Object.entries(footerLinks).map(([col, links]) => (
          <div key={col} className="footer-col">
            <h4 className="font-dm text-[10px] tracking-[0.2em] uppercase text-white/30 mb-5">
              {col}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.map(link => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollTo(link.href);
                      }
                    }}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-dm text-[13px] text-white/50 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      {link.href.startsWith('http') ? '↗' : '→'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Location Column */}
        <div className="footer-col">
          <h4 className="font-dm text-[10px] tracking-[0.2em] uppercase text-white/30 mb-5">
            Location
          </h4>
          <address className="not-italic font-dm text-[13px] text-white/50 leading-relaxed">
            ELARIS Real Estate LLC<br />
            DIFC Gate Building, Level 5<br />
            Dubai, UAE
          </address>
          <a 
            href="tel:+97140000000" 
            className="font-dm text-[13px] text-white/50 hover:text-white transition-colors block mt-3"
          >
            +971 4 XXX XXXX
          </a>
          
          {/* ✅ WhatsApp Link */}
          <a 
            href="https://wa.me/971XXXXXXXXX?text=Hi%20ELARIS%2C%20I%27m%20interested%20in%20Dubai%20properties"
            target="_blank" 
            rel="noopener noreferrer"
            className="font-dm text-[13px] hover:text-white transition-colors block mt-2"
            style={{ color: 'rgba(250,247,242,0.5)' }}
          >
            WhatsApp →
          </a>
          
          <p className="font-dm text-[11px] mt-2" style={{ color: 'rgba(196,184,168,0.5)' }}>
            DLD Registered Broker
          </p>
          <p className="font-dm text-[11px]" style={{ color: 'rgba(196,184,168,0.5)' }}>
            RERA No: XXXXXXXXX
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div 
        className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 md:px-14 py-5 gap-3" 
        style={{ 
          backgroundColor: '#252119',  /* ✅ Darker warm */
          borderTop: '1px solid rgba(255,255,255,0.08)' 
        }}
      >
        <p className="font-dm text-[11px]" style={{ color: '#C4B8A8' }}>
          © 2026 ELARIS Real Estate LLC. DLD Licensed. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a 
            href="#" 
            className="font-dm text-[11px] text-white/25 hover:text-white/55 transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="font-dm text-[11px] text-white/25 hover:text-white/55 transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>

      {/* Floating Hover Card */}
      <div className="elaris-hover-card" ref={hoverCardRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={hoverImgRef} src="" alt="" />
        <div className="elaris-hover-card-label" ref={hoverLabelRef} />
      </div>

      
    </footer>
  );
}