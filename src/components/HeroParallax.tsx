import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, Sparkles, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroParallaxProps {
  onExploreSpaces?: () => void;
  onOpenInquiry?: () => void;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  onExploreSpaces,
  onOpenInquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax zoom from scale 1.15 down to 1 on scroll
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.18, y: 0 },
          {
            scale: 1.0,
            y: 80,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Staggered text entrance
      if (textContentRef.current) {
        const elements = textContentRef.current.children;
        gsap.fromTo(
          elements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section className="relative w-full px-3 sm:px-6 pt-3 sm:pt-4 pb-8 sm:pb-12 bg-[#FAF7F2] flex flex-col">
      {/* 16px Luxury Frame with 1px Gold Outline */}
      <div
        ref={containerRef}
        style={{
          minHeight: 'calc(100vh - var(--nav-height) - 1.25rem)',
        }}
        className="relative w-full h-auto min-h-[580px] rounded-2xl overflow-hidden border border-[#C5A880]/40 shadow-2xl shadow-espresso-950/10 flex flex-col"
      >
        {/* Background Image with Parallax Zoom */}
        <div className="absolute inset-0 overflow-hidden bg-[#2A1C16]">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
            alt="Asopalav Greens Grand Illuminated Banquet Hall"
            className="w-full h-full object-cover object-center transform will-change-transform opacity-80"
          />
          {/* Subtle Warm Luxury Gradient Overlays */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/95 via-[#2A1C16]/40 to-[#2A1C16]/25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A1C16]/60 via-transparent to-[#2A1C16]/60" />
        </div>

        {/* Delicate Corner Monogram Accents */}
        <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 text-[#C5A880]/80 tracking-widest text-[10px] uppercase font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          ESTATE NO. 01 — SEVASI ROAD
        </div>
        <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 text-[#FAF7F2]/70 tracking-widest text-[10px] uppercase font-mono">
          <MapPin className="w-3 h-3 text-[#C5A880]" />
          VADODARA, GUJARAT
        </div>

        {/* Editorial Text Content Overlay */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between items-center text-center p-6 sm:p-12 gap-6 sm:gap-8">
          {/* Top Spacing / Micro Emblem */}
          <div className="pt-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#C5A880]/40 bg-[#2A1C16]/60 backdrop-blur-md text-[#C5A880] text-xs font-serif">
              AG
            </div>
          </div>

          {/* Central Hero Block */}
          <div ref={textContentRef} className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Crimson Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#721B24] border border-[#C5A880]/30 text-[#FAF7F2] text-[9px] sm:text-xs tracking-[0.16em] sm:tracking-[0.25em] uppercase font-medium shadow-lg shadow-[#721B24]/30 whitespace-nowrap">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4AF37]" />
              <span>Sanctuary of Grand Celebrations</span>
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4AF37]" />
            </div>

            {/* Architectural Massive Serif Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#FAF7F2] leading-[1.08] sm:leading-[1.05] font-light">
              THE ARCHITECTURE OF <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#FAF7F2] tracking-normal">
                TIMELESS UNIONS
              </span>
            </h1>

            {/* Single Sentence Poetic Caption */}
            <p className="max-w-2xl mx-auto text-xs sm:text-lg text-[#F3EDE2]/90 font-light tracking-wide leading-relaxed font-sans px-2">
              Vadodara’s benchmark open-air estate and pillarless banquet hall, sculpted for generational ceremonies.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#721B24] hover:bg-[#5a151c] text-[#FAF7F2] tracking-[0.16em] sm:tracking-[0.2em] text-[11px] sm:text-xs uppercase font-medium border border-[#C5A880]/40 shadow-xl shadow-wine-950/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                Inquire For 2026–2027
              </button>

              <button
                onClick={onExploreSpaces}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-transparent hover:bg-[#FAF7F2]/10 backdrop-blur-md text-[#FAF7F2] tracking-[0.16em] sm:tracking-[0.2em] text-[11px] sm:text-xs uppercase font-medium border border-[#C5A880]/40 hover:border-[#C5A880] transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Explore The Grounds
                <ArrowDownRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </div>

          {/* Bottom Bar Metrics */}
          <div className="w-full max-w-4xl mx-auto pt-4 border-t border-[#C5A880]/20 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#F3EDE2]/80">
            <div className="flex items-center gap-2">
              <span className="text-[#C5A880]">I.</span>
              <span className="tracking-wider">45,000 SQ. FT. ESTATE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F3E34] border border-[#C5A880]/50" />
              <span className="tracking-wider text-[9px] sm:text-[11px] text-[#C5A880] uppercase">
                DIARY OPEN 2026–27
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroParallax;
