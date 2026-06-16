'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const PROPERTIES = [
  {
    id: 1,
    name: 'Burj Khalifa View Penthouse',
    location: 'Downtown Dubai, UAE',
    description: '52nd floor penthouse with unobstructed Burj Khalifa views. 4 beds, private pool, fully furnished by Bentley Home.',
    price: 'AED 18,500,000',
    tag: 'FEATURED PROPERTY',
    specs: '4 Beds · 5 Baths · 4,200 sqft',
    image: '/images/BurjKhalifap.png',
  },
  {
    id: 2,
    name: 'Palm Jumeirah Villa',
    location: 'Palm Jumeirah, Dubai',
    description: '5-bedroom beachfront villa with direct beach access, private pool, and panoramic Arabian Gulf views.',
    price: 'AED 32,000,000',
    tag: 'BEACHFRONT',
    specs: '5 Beds · 6 Baths · 8,500 sqft',
    image: '/images/Palm jumeirah villa.png',
  },
  {
    id: 3,
    name: 'Marina Height apartment',
    location: 'Dubai Marina Waterfront',
    description: '5-bedroom beachfront villa with direct beach access, private pool, and panoramic Arabian Gulf views.',
    price: 'AED 32,000,000',
    tag: 'BEACHFRONT',
    specs: '5 Beds · 6 Baths · 8,500 sqft',
    image: '/images/Marina Height apartment.png',
  },
  {
    id: 4,
    name: 'JBR Beach Front penthouse',
    location: 'Bluewaters Island',
    description: '5-bedroom beachfront villa with direct beach access, private pool, and panoramic Arabian Gulf views.',
    price: 'AED 32,000,000',
    tag: 'BEACHFRONT',
    specs: '5 Beds · 6 Baths · 8,500 sqft',
    image: '/images/JBR Beach Front.png',
  },
  // ... add more properties
];

export default function PropertyHero() {
  const sectionRef  = useRef(null);
  const imageRefs   = useRef([]);
  const cardRef     = useRef(null);
  const tagRef      = useRef(null);
  const activeRef   = useRef(0);
  const isAnimating = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile on mount
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const images = imageRefs.current;
      gsap.set(images[0], { opacity: 1, scale: 1, clipPath: 'inset(0 100% 0 0)', zIndex: 2 });
      images.slice(1).forEach(img => gsap.set(img, { opacity: 0, scale: 1.15, zIndex: 1 }));
      gsap.set([cardRef.current, tagRef.current], { opacity: 0, y: 30 });

      const entranceTl = gsap.timeline({ 
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 80%', 
          toggleActions: 'play none none none', 
          once: true 
        } 
      });
      
      entranceTl
        .to(images[0], { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut' })
        .to(cardRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.8)
        .to(tagRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.9);

      ScrollTrigger.create({
        trigger: sectionRef.current, 
        start: 'top top', 
        end: '+=300%',
        pin: true, 
        pinSpacing: true, 
        anticipatePin: 1,
        onUpdate: (self) => {
          const newIndex = Math.min(Math.floor(self.progress * 4), PROPERTIES.length - 1);
          if (newIndex !== activeRef.current && !isAnimating.current) {
            transitionScene(newIndex, images);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transitionScene = (newIndex, images) => {
    isAnimating.current = true;
    const prevIndex = activeRef.current;
    activeRef.current = newIndex;
    
    gsap.to(cardRef.current, {
      opacity: 0, 
      y: -25, 
      duration: 0.35, 
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(newIndex);
        gsap.set(images[newIndex], { opacity: 1, scale: 1.18, zIndex: 3 });
        gsap.to(images[newIndex], { 
          scale: 1.0, 
          duration: 1.1, 
          ease: 'power2.out', 
          onComplete: () => { 
            gsap.set(images[prevIndex], { opacity: 0, zIndex: 1 }); 
            gsap.set(images[newIndex], { zIndex: 2 }); 
            isAnimating.current = false; 
          } 
        });
        gsap.to(images[prevIndex], { opacity: 0, scale: 0.96, duration: 0.8, ease: 'power2.out' });
        gsap.fromTo(cardRef.current, 
          { opacity: 0, y: 45 }, 
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.25 }
        );
        gsap.fromTo(tagRef.current, 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.3 }
        );
      },
    });
  };

  const prop = PROPERTIES[activeIndex];

  return (
    <section 
      ref={sectionRef} 
      id="property-hero"
      style={{ 
        position: 'relative', 
        height: '100vh', 
        overflow: 'hidden', 
        background: '#0D0C0A' 
      }}
    >
      {/* Background Images */}
      {PROPERTIES.map((p, i) => (
        <div 
          key={p.id} 
          ref={el => imageRefs.current[i] = el} 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            transformOrigin: 'center center', 
            willChange: 'transform, opacity' 
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={p.image} 
            alt={p.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              display: 'block', 
              WebkitBackfaceVisibility: 'hidden', 
              backfaceVisibility: 'hidden' 
            }} 
          />
          <div 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to right, rgba(15,12,10,0.72) 0%, rgba(15,12,10,0.3) 45%, transparent 70%), linear-gradient(to top, rgba(15,12,10,0.4) 0%, transparent 40%)' 
            }} 
          />
        </div>
      ))}

      {/* Tag Badge */}
      <div 
        ref={tagRef} 
        style={{ 
          position: 'absolute', 
          top: isMobile ? '1rem' : '2rem', 
          right: isMobile ? '1rem' : '2rem', 
          zIndex: 30, 
          background: 'rgba(250,247,242,0.1)', 
          WebkitBackdropFilter: 'blur(12px)', 
          backdropFilter: 'blur(12px)', 
          border: '1px solid rgba(250,247,242,0.18)', 
          borderRadius: '100px', 
          padding: '7px 18px', 
          color: '#FAF7F2', 
          fontSize: '10px', 
          letterSpacing: '0.22em', 
          fontFamily: 'DM Sans, sans-serif', 
          fontWeight: 400 
        }}
      >
        {prop.tag}
      </div>

      {/* Property Info Card */}
      <div 
        ref={cardRef} 
        className="property-info-card"
        style={{ 
          position: 'absolute', 
          bottom: isMobile ? 0 : '8%', 
          left: isMobile ? 0 : 'clamp(1.5rem, 6vw, 5rem)', 
          right: isMobile ? 0 : 'auto',
          zIndex: 30, 
          background: 'rgba(255,255,255,0.96)', 
          WebkitBackdropFilter: 'blur(24px)', 
          backdropFilter: 'blur(24px)', 
          borderRadius: isMobile ? '20px 20px 0 0' : '20px', 
          padding: isMobile ? '20px 20px 28px' : '28px 28px 24px', 
          width: isMobile ? '100%' : 'clamp(240px, 28vw, 300px)', 
          maxWidth: isMobile ? '100%' : 'none',
          boxShadow: '0 24px 70px rgba(15,12,10,0.22)' 
        }}
      >
        {/* Property Name */}
        <h3 
          style={{ 
            fontFamily: 'Cormorant Garamond, serif', 
            fontWeight: 700, 
            fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
            color: '#1A1714', 
            lineHeight: 1.15, 
            margin: 0 
          }}
        >
          {prop.name}
        </h3>

        {/* Location */}
        <p 
          style={{ 
            fontFamily: 'DM Sans, sans-serif', 
            fontWeight: 300, 
            fontSize: '12px', 
            color: '#C4B8A8', 
            marginTop: '5px' 
          }}
        >
          📍 {prop.location}
        </p>

        {/* Description */}
        <p 
          style={{ 
            fontFamily: 'DM Sans, sans-serif', 
            fontWeight: 300, 
            fontSize: '12px', 
            color: '#7A7470', 
            lineHeight: 1.78, 
            marginTop: '10px' 
          }}
        >
          {prop.description}
        </p>

        {/* Specs Row - Fixed: No emojis, proper wrapping */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '12px', 
            flexWrap: 'wrap', 
            marginTop: '10px' 
          }}
        >
          {prop.specs.split(' · ').map((spec, i, arr) => (
            <span 
              key={i} 
              style={{
                fontFamily: 'DM Sans',
                fontSize: '11px',
                color: '#C4B8A8',
                fontWeight: 300,
                letterSpacing: '0.05em'
              }}
            >
              {spec}{i < arr.length - 1 ? ' ·' : ''}
            </span>
          ))}
        </div>

        {/* Progress Dots */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            marginTop: '14px' 
          }}
        >
          {PROPERTIES.map((_, i) => (
            <div 
              key={i} 
              style={{ 
                height: '4px', 
                width: i === activeIndex ? '22px' : '4px', 
                borderRadius: '100px', 
                background: i === activeIndex ? '#1A1714' : '#D4C8BC', 
                transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)' 
              }} 
            />
          ))}
        </div>

        {/* Divider */}
        <div 
          style={{ 
            height: '1px', 
            background: 'rgba(20,17,14,0.07)', 
            margin: '16px 0' 
          }} 
        />

        {/* Price & CTA Row */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '12px',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}
        >
          <div>
            <div 
              style={{ 
                fontFamily: 'DM Sans, sans-serif', 
                fontSize: '9px', 
                color: '#C4B8A8', 
                letterSpacing: '0.18em', 
                marginBottom: '4px' 
              }}
            >
              LISTED PRICE
            </div>
            <div 
              style={{ 
                fontFamily: 'Cormorant Garamond, serif', 
                fontWeight: 600, 
                fontSize: 'clamp(16px, 4vw, 22px)', 
                color: '#1A1714',
                whiteSpace: 'nowrap'  // ✅ PREVENTS PRICE SPLIT
              }}
            >
              {prop.price}
            </div>
          </div>
          <a 
            href="#lead-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ 
              background: '#1A1714', 
              color: '#FAF7F2', 
              border: 'none', 
              borderRadius: '100px', 
              padding: '10px 18px', 
              fontSize: '11px', 
              fontFamily: 'DM Sans, sans-serif', 
              letterSpacing: '0.05em', 
              textDecoration: 'none', 
              display: 'inline-block',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'background 0.25s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#2E2A24'}
            onMouseLeave={(e) => e.target.style.background = '#1A1714'}
          >
            Enquire →
          </a>
        </div>
      </div>

      {/* Right Progress Indicator */}
      <div 
        style={{ 
          position: 'absolute', 
          right: isMobile ? '1rem' : '2rem', 
          bottom: '50%', 
          transform: 'translateY(50%)', 
          zIndex: 30, 
          display: isMobile ? 'none' : 'flex',  // Hide on mobile
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '8px' 
        }}
      >
        {PROPERTIES.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: '2px', 
              height: i === activeIndex ? '28px' : '12px', 
              borderRadius: '2px', 
              background: i === activeIndex ? 'rgba(250,247,242,0.9)' : 'rgba(250,247,242,0.25)', 
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
            }} 
          />
        ))}
      </div>

      {/* Bottom Counter */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: isMobile ? '1rem' : '2rem', 
          right: isMobile ? '1rem' : '2rem', 
          zIndex: 30, 
          fontFamily: 'Cormorant Garamond, serif', 
          fontSize: '13px', 
          color: 'rgba(250,247,242,0.35)', 
          letterSpacing: '0.05em' 
        }}
      >
        {String(activeIndex + 1).padStart(2, '0')} / {String(PROPERTIES.length).padStart(2, '0')}
      </div>
    </section>
  );
}
