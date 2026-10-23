import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Bridge Lenis → GSAP ScrollTrigger so pin/scrub stays in sync
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis instead of a standalone rAF loop,
    // ensuring both systems share the same frame cadence.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP ticker time is in seconds, Lenis expects ms
    });
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from throttling frames

    return () => {
      gsap.ticker.remove(lenis.raf as any);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
