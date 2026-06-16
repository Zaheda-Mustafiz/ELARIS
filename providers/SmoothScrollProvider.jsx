'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Refresh after all resources load — fixes incorrect scroll positions
    const onLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', onLoad);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return <>{children}</>;
}
