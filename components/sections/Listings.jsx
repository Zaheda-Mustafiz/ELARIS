'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const listings = [
  { id: 'A', title: 'Marina Heights Apartment', price: 'AED 3,200,000', location: 'Dubai Marina, UAE', tag: 'Apartment', specs: '2 Beds · 1,450 sqft · Floor 28', image: '/images/Marina Height apartment.png' },
  { id: 'B', title: 'Palm Jumeirah Garden Villa', price: 'AED 5,800,000', location: 'Palm Jumeirah, Dubai', tag: 'Residence', specs: '3 Beds · 2,100 sqft · Floor 42', image: '/images/Palm Jumeirah Garden villa.png' },
  { id: 'C', title: 'DIFC Glass Tower Residence', price: 'AED 28,500,000', location: 'DIFC, Dubai', tag: 'Villa', specs: '5 Beds · Pool · Direct Beach · 6,800 sqft', image: '/images/Glass House.png', featured: true },
  { id: 'D', title: 'Downtown Burj View Apartment', price: 'AED 7,200,000', location: 'Downtown Dubai, UAE', tag: 'Apartment', specs: '3 Beds · Burj View · 2,400 sqft', image: '/images/BurjKhalifap.png' },
  { id: 'E', title: 'JBR Beachfront Penthouse', price: 'AED 12,900,000', location: 'JBR, Dubai', tag: 'Penthouse', specs: '4 Beds · Sea View · 3,600 sqft', image: '/images/JBR Beach Front.png' },
];

const headingText = 'Discover Newly Listed Luxury Properties in Dubai';

export default function Listings() {
  const listingsRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const ctx = gsap.context(() => {
      // Heading words animation
      const headingWords = gsap.utils.toArray('.listings-word');
      if (headingWords.length > 0) {
        gsap.set(headingWords, { y: '110%', opacity: 0 });
        gsap.to(headingWords, { 
          y: '0%', 
          opacity: 1, 
          stagger: 0.08, 
          duration: 0.95, 
          ease: 'power4.out', 
          scrollTrigger: { 
            trigger: '.listings-heading-wrap', 
            start: 'top 82%', 
            toggleActions: 'play none none none', 
            once: true 
          } 
        });
      }

      // Card animations
      const cards = gsap.utils.toArray('.listing-card');
      gsap.set(cards, { opacity: 0, y: 80, scale: 0.97 });
      
      cards.forEach(card => {
        const img = card.querySelector('img');
        
        // Entrance animation
        gsap.to(card, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.0, 
          ease: 'power3.out', 
          scrollTrigger: { 
            trigger: card, 
            start: 'top 85%', 
            toggleActions: 'play none none none', 
            once: true 
          } 
        });

        if (img) {
          // Image clip entrance
          gsap.from(img, { 
            clipPath: 'inset(0 0 100% 0)', 
            duration: 1.2, 
            ease: 'power4.out', 
            scrollTrigger: { 
              trigger: card, 
              start: 'top 85%', 
              toggleActions: 'play none none none', 
              once: true 
            } 
          });

          // Parallax effect (desktop only)
          if (window.innerWidth > 768) {
            gsap.fromTo(img, 
              { yPercent: -8 }, 
              { 
                yPercent: 8, 
                ease: 'none', 
                scrollTrigger: { 
                  trigger: card, 
                  start: 'top bottom', 
                  end: 'bottom top', 
                  scrub: 1.5 
                } 
              }
            );
          }
        }

        // Hover interactions
        card.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 1.07, duration: 0.7, ease: 'power2.out' });
          gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1.0, duration: 0.9, ease: 'power2.inOut' });
          gsap.to(card, { y: 0, duration: 0.5, ease: 'power2.inOut' });
        });
      });
    }, listingsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={listingsRef} id="listings" className="overflow-hidden" style={{ backgroundColor: '#F5EDE3' }}>
      <div className="section-pad pb-4">
        <div className="font-dm text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-2" style={{ color: '#C4B8A8' }}>New Listings</div>
        <div className="listings-heading-wrap overflow-hidden mb-2">
          <h2 className="listings-heading font-cormorant font-semibold text-charcoal leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {headingText.split(' ').map((word, i) => (
              <span key={i} className="listings-word" style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
                {word}
              </span>
            ))}
          </h2>
        </div>
        <p className="font-dm text-[12px] sm:text-[13px]" style={{ color: '#C4B8A8' }}>
          Handpicked from Palm Jumeirah, Downtown, Marina &amp; DIFC — updated weekly.
        </p>
      </div>

      {/* Desktop grid */}
      <div 
        className="hidden md:grid section-pad pt-6" 
        style={{ 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '16px', 
          alignItems: 'start' 
        }}
      >
        <div style={{ gridColumn: '1 / 5' }}><ListingCard listing={listings[0]} imgHeight="240px" /></div>
        <div style={{ gridColumn: '7 / 13' }}><ListingCard listing={listings[1]} imgHeight="240px" /></div>
        <div style={{ gridColumn: '2 / 11', marginTop: '20px' }}><ListingCard listing={listings[2]} imgHeight="380px" featured /></div>
        <div style={{ gridColumn: '1 / 6', marginTop: '20px' }}><ListingCard listing={listings[3]} imgHeight="260px" /></div>
        <div style={{ gridColumn: '7 / 13', marginTop: '20px' }}><ListingCard listing={listings[4]} imgHeight="260px" /></div>
      </div>

      {/* View all button */}
      <div className="hidden md:flex justify-center pb-16 pt-10">
        <a 
          href="#lead-form" 
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-dm text-[12px] tracking-widest text-cream px-10 py-4 rounded-full hover:opacity-80 transition-opacity" 
          style={{ backgroundColor: '#2E2A24' }}
        >
          View All Listings →
        </a>
      </div>

      {/* Mobile scroll */}
      <div className="md:hidden flex gap-4 px-5 pb-8 pt-4 overflow-x-auto" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {listings.map(l => (
          <div 
            key={l.id} 
            className="listing-card flex-shrink-0 rounded-2xl overflow-hidden" 
            style={{ 
              width: '260px', 
              scrollSnapAlign: 'start', 
              backgroundColor: '#FAF7F2',
              boxShadow: '0 2px 20px rgba(20,17,14,0.06)'
            }}
          >
            <div className="relative overflow-hidden" style={{ height: '220px' }}>
              <Image src={l.image} alt={l.title} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="260px" />
              <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 5 }}>
                <span 
                  className="font-dm" 
                  style={{ 
                    background: 'rgba(20,17,14,0.65)', 
                    backdropFilter: 'blur(8px)', 
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#FAF7F2', 
                    fontSize: '9px', 
                    fontWeight: 400, 
                    letterSpacing: '0.18em', 
                    padding: '5px 12px', 
                    borderRadius: '100px', 
                    textTransform: 'uppercase' 
                  }}
                >
                  {l.tag}
                </span>
              </div>
            </div>
            <div style={{ padding: '16px 16px 20px' }}>
              <h3 className="font-cormorant font-semibold text-charcoal" style={{ fontSize: '18px', lineHeight: 1.2, marginBottom: '6px' }}>
                {l.title}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
                <p className="font-cormorant font-semibold text-charcoal" style={{ fontSize: '16px', whiteSpace: 'nowrap' }}>
                  {l.price}
                </p>
              </div>
              <p className="font-dm" style={{ fontSize: '11px', color: '#C4B8A8', marginTop: '4px' }}>
                📍 {l.location}
              </p>
              <p className="font-dm" style={{ fontSize: '10px', color: '#C4B8A8', letterSpacing: '0.05em', marginTop: '3px' }}>
                {l.specs}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ListingCard({ listing, imgHeight, featured }) {
  return (
    <div 
      className="listing-card rounded-2xl overflow-hidden" 
      style={{ 
        backgroundColor: '#FAF7F2', 
        cursor: 'pointer', 
        position: 'relative',
        boxShadow: '0 2px 20px rgba(20,17,14,0.06)',
        transition: 'box-shadow 0.4s ease'
      }}
    >
      <div className="relative overflow-hidden" style={{ height: imgHeight, borderRadius: '12px 12px 0 0' }}>
        <Image 
          src={listing.image} 
          alt={listing.title} 
          fill 
          style={{ 
            objectFit: 'cover', 
            objectPosition: 'center',
            transformOrigin: 'center center'
          }} 
          sizes="(max-width: 768px) 100vw, 50vw" 
        />
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 5 }}>
          <span 
            className="font-dm" 
            style={{ 
              background: 'rgba(20,17,14,0.65)', 
              backdropFilter: 'blur(8px)', 
              WebkitBackdropFilter: 'blur(8px)',
              color: '#FAF7F2', 
              fontSize: '9px', 
              fontWeight: 400, 
              letterSpacing: '0.18em', 
              padding: '5px 12px', 
              borderRadius: '100px', 
              textTransform: 'uppercase' 
            }}
          >
            {listing.tag}
          </span>
        </div>
        {featured && (
          <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 5 }}>
            <span 
              className="font-dm" 
              style={{ 
                background: 'rgba(250,247,242,0.92)', 
                color: '#1A1714', 
                fontSize: '9px', 
                fontWeight: 400, 
                letterSpacing: '0.18em', 
                padding: '5px 12px', 
                borderRadius: '100px', 
                textTransform: 'uppercase' 
              }}
            >
              FEATURED
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: '16px 20px 20px', background: 'transparent' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
          <h3 
            className="card-title font-cormorant font-semibold text-charcoal" 
            style={{ fontSize: featured ? '20px' : '18px', lineHeight: 1.2, marginBottom: '6px' }}
          >
            {listing.title}
          </h3>
          <span 
            className="font-cormorant font-semibold text-charcoal" 
            style={{ fontSize: '16px', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {listing.price}
          </span>
        </div>
        <p className="font-dm" style={{ fontSize: '11px', color: '#C4B8A8', marginTop: '4px' }}>
          📍 {listing.location}
        </p>
        <p className="font-dm" style={{ fontSize: '10px', color: '#C4B8A8', letterSpacing: '0.05em', marginTop: '3px' }}>
          {listing.specs}
        </p>
      </div>
    </div>
  );
}