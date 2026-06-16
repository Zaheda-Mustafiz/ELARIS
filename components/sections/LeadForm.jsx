'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';

export default function LeadForm() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    // WhatsApp submission
    const msg = encodeURIComponent(
      `New Enquiry from ELARIS website:\nName: ${form.name}\nEmail: ${form.email}\nPhone: +971${form.phone}\nProperty Type: ${form.type || 'Not specified'}\nBudget: ${form.budget || 'Not specified'}\nMessage: ${form.message || 'None'}`
    );
    window.open(`https://wa.me/971XXXXXXXXX?text=${msg}`, '_blank');
    
    setSubmitted(true);
    gsap.from('.success-msg', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' });
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.lead-left > *', { 
        x: -50, 
        opacity: 0, 
        stagger: 0.12, 
        duration: 0.9, 
        ease: 'power3.out', 
        scrollTrigger: { 
          trigger: ref.current, 
          start: 'top 75%', 
          once: true 
        } 
      });
      gsap.from('.lead-right', { 
        x: 50, 
        opacity: 0, 
        duration: 0.9, 
        ease: 'power3.out', 
        delay: 0.2, 
        scrollTrigger: { 
          trigger: ref.current, 
          start: 'top 75%', 
          once: true 
        } 
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const inputStyle = { 
    width: '100%', 
    background: 'transparent', 
    border: 'none', 
    borderBottom: '1px solid rgba(20,17,14,0.15)', 
    borderRadius: 0,
    padding: '10px 0', 
    fontFamily: 'DM Sans, sans-serif', 
    fontSize: '14px', 
    fontWeight: 300, 
    color: '#1A1714', 
    outline: 'none', 
    transition: 'border-color 0.25s ease' 
  };

  const labelStyle = { 
    display: 'block', 
    fontFamily: 'DM Sans, sans-serif', 
    fontSize: '10px', 
    fontWeight: 400,
    letterSpacing: '0.18em', 
    textTransform: 'uppercase', 
    color: '#C4B8A8', 
    marginBottom: '6px' 
  };

  return (
    <section 
      ref={ref} 
      id="lead-form" 
      style={{ 
        backgroundColor: '#F5EDE3', 
        padding: 'clamp(60px, 8vw, 7rem) clamp(20px, 5vw, 3.5rem)' 
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">

        {/* Left Column */}
        <div className="lead-left flex flex-col justify-center gap-6">
          <span 
            className="font-dm text-[10px] sm:text-[11px] tracking-[0.25em] uppercase" 
            style={{ color: '#C4B8A8' }}
          >
            Get In Touch
          </span>
          
          <h2 
            className="font-cormorant font-semibold text-charcoal leading-tight" 
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Schedule Your<br /><em className="font-light">Private Viewing</em>
          </h2>
          
          <p 
            className="font-dm text-[13px] sm:text-[14px] leading-relaxed max-w-sm" 
            style={{ color: '#C4B8A8' }}
          >
            Our advisors are available 7 days a week.<br />Response guaranteed within 2 hours.
          </p>

          {/* Trust signals - Show only 3 on mobile */}
          <div className="flex flex-col gap-3 mt-2">
            {[
              'No broker fees',
              'DLD registered & RERA licensed',
              'WhatsApp response in under 2 hours',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-charcoal font-bold text-sm flex-shrink-0">✓</span>
                <span className="font-dm text-[13px]" style={{ color: 'rgba(46,42,36,0.7)' }}>
                  {item}
                </span>
              </div>
            ))}
            {/* Show these only on desktop */}
            <div className="hidden lg:flex flex-col gap-3">
              {[
                'Multilingual team — Arabic, English, Russian, Hindi',
                'Golden Visa property guidance available',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-charcoal font-bold text-sm flex-shrink-0">✓</span>
                  <span className="font-dm text-[13px]" style={{ color: 'rgba(46,42,36,0.7)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Form Card */}
        <div 
          className="lead-right" 
          style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: 'clamp(24px, 5vw, 36px)', 
            boxShadow: '0 24px 60px rgba(20,17,14,0.08)' 
          }}
        >
          {submitted ? (
            <div className="success-msg flex flex-col items-center justify-center text-center gap-4 py-12">
              <span className="text-4xl">✓</span>
              <h3 className="font-cormorant font-semibold text-charcoal text-2xl">
                Enquiry Received
              </h3>
              <p className="font-dm text-[13px]" style={{ color: '#C4B8A8' }}>
                We'll be in touch within 2 hours. Check your WhatsApp and email.
              </p>
              <a 
                href={`https://wa.me/971XXXXXXXXX?text=Hi%20ELARIS%2C%20I%20just%20submitted%20an%20enquiry.%20My%20name%20is%20${encodeURIComponent(form.name)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="font-dm text-[12px] tracking-widest text-cream px-8 py-3.5 rounded-full hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#25D366' }}
              >
                Continue on WhatsApp →
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              
              {/* Name + Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Sarah Al Maktoum" 
                    style={inputStyle} 
                    onFocus={e => e.target.style.borderBottomColor = '#2E2A24'} 
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(20,17,14,0.15)'} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="you@example.com" 
                    style={inputStyle} 
                    onFocus={e => e.target.style.borderBottomColor = '#2E2A24'} 
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(20,17,14,0.15)'} 
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone / WhatsApp *</label>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  borderBottom: '1px solid rgba(20,17,14,0.15)' 
                }}>
                  <span 
                    className="font-dm text-[13px]" 
                    style={{ 
                      color: '#C4B8A8', 
                      flexShrink: 0, 
                      paddingBottom: '10px', 
                      paddingTop: '10px' 
                    }}
                  >
                    +971
                  </span>
                  <input 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    placeholder="50 123 4567" 
                    style={{ 
                      ...inputStyle, 
                      borderBottom: 'none', 
                      flex: 1 
                    }} 
                  />
                </div>
              </div>

              {/* Property Type + Budget Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Property Type</label>
                  <select 
                    name="type" 
                    value={form.type} 
                    onChange={handleChange} 
                    style={{ 
                      ...inputStyle, 
                      cursor: 'pointer',
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C4B8A8' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 4px center',
                      paddingRight: '24px'
                    }}
                  >
                    <option value="">Select type</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    <option>Off-Plan</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Budget Range</label>
                  <select 
                    name="budget" 
                    value={form.budget} 
                    onChange={handleChange} 
                    style={{ 
                      ...inputStyle, 
                      cursor: 'pointer',
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C4B8A8' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 4px center',
                      paddingRight: '24px'
                    }}
                  >
                    <option value="">Select budget</option>
                    <option>AED 1–3M</option>
                    <option>AED 3–7M</option>
                    <option>AED 7–15M</option>
                    <option>AED 15M+</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  rows={3} 
                  placeholder="Tell us your requirements — location, bedrooms, move-in date..." 
                  style={{ 
                    ...inputStyle, 
                    resize: 'none', 
                    minHeight: '80px',
                    paddingTop: '10px' 
                  }} 
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  backgroundColor: '#2E2A24',
                  color: '#FAF7F2',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '16px',
                  fontFamily: 'DM Sans',
                  fontSize: '14px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'background 0.25s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#3D3830'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2E2A24'}
              >
                Send Enquiry →
              </button>

              {/* WhatsApp Alternative Link */}
              <a
                href="https://wa.me/971XXXXXXXXX?text=Hi%20ELARIS%2C%20I%27d%20like%20to%20enquire%20about%20properties"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: '#2E2A24',
                  fontFamily: 'DM Sans',
                  fontSize: '13px',
                  fontWeight: 300,
                  textDecoration: 'none',
                  marginTop: '16px',
                  opacity: 0.7,
                  transition: 'opacity 0.25s ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.7}
              >
                Or message us on WhatsApp →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}