import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { VENUES } from '../data/estateData';
import { WordReveal } from '../utils/animations';
import { ArrowUpRight, Check, Users, Maximize, FileText, Sparkles, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface VenuesViewProps {
  onNavigate: (path: string) => void;
  onSelectVenue: (slug: string) => void;
  onOpenInquiry: (venue?: string) => void;
}

export const VenuesView: React.FC<VenuesViewProps> = ({
  onNavigate,
  onSelectVenue,
  onOpenInquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Word Reveal animations ──
      const wordReveals = gsap.utils.toArray<HTMLElement>('.word-reveal');
      wordReveals.forEach((el) => {
        const inners = el.querySelectorAll('.word-reveal-inner');
        if (!inners.length) return;
        gsap.fromTo(
          inners,
          { y: '100%' },
          {
            y: '0%',
            duration: 1,
            ease: 'power4.out',
            stagger: 0.06,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Fade-in-up ──
      const fadeUps = gsap.utils.toArray<HTMLElement>('.gsap-fade-up');
      fadeUps.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Clip-path reveal for hero images ──
      const clipReveals = gsap.utils.toArray<HTMLElement>('.gsap-clip-reveal');
      clipReveals.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Parallax images ──
      const parallaxImgs = gsap.utils.toArray<HTMLElement>('.gsap-parallax-img');
      parallaxImgs.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // ── Scale-in for sidebar specs ──
      const scaleIns = gsap.utils.toArray<HTMLElement>('.gsap-scale-in');
      scaleIns.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Stagger children ──
      const staggerGroups = gsap.utils.toArray<HTMLElement>('.gsap-stagger');
      staggerGroups.forEach((group) => {
        const children = group.children;
        gsap.fromTo(
          children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full bg-[#FAF7F2] text-[#2A1C16] min-h-screen">
      {/* Editorial Header */}
      <section className="pt-12 sm:pt-20 pb-12 px-4 sm:px-8 max-w-7xl mx-auto border-b border-[#C5A880]/30">
        <div className="space-y-4 max-w-4xl">
          <div className="gsap-fade-up flex items-center gap-2 text-xs font-mono text-[#721B24] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
            ESTATE CATALOG NO. 2026–2027
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#2A1C16] font-light leading-[1.08]">
            <WordReveal text="THE SPATIAL" />{' '}
            <span className="italic font-normal"><WordReveal text="REALMS" /></span>
          </h1>
          <p className="gsap-fade-up text-base sm:text-lg text-[#5C3D2E] font-sans font-light leading-relaxed max-w-2xl">
            A visual portfolio of Asopalav Greens' three premier event sanctums. Each meticulously designed for architectural presence, acoustic isolation, and seamless patron flow.
          </p>
        </div>
      </section>

      {/* Alternating Full-Width Photo Rows */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-24 sm:space-y-36">
        {VENUES.map((venue, idx) => {
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={venue.slug}
              className={`flex flex-col ${
                isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-12 items-start`}
            >
              {/* 70% Visual Panel — clip-path reveal + parallax */}
              <div className="gsap-clip-reveal w-full lg:w-[68%] rounded-3xl overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-2xl relative group">
                <div className="relative h-[420px] sm:h-[540px] lg:h-[640px] w-full overflow-hidden">
                  <img
                    src={venue.heroImage}
                    alt={venue.name}
                    className="gsap-parallax-img w-full h-full object-cover object-center scale-[1.2] will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/90 via-transparent to-[#2A1C16]/20" />

                  {/* Overlaid Badges */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-[#2A1C16]/80 backdrop-blur-md border border-[#C5A880]/50 text-[#D4AF37] font-serif text-sm tracking-widest">
                      REALM {venue.numeral}
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] font-mono tracking-widest uppercase">
                      {venue.areaSqFt.toLocaleString()} SQ. FT.
                    </span>
                  </div>

                  {/* Image Bottom Caption */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#FAF7F2]">
                    <div className="max-w-md">
                      <div className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase mb-1">
                        ARCHITECTURAL AMBIENCE
                      </div>
                      <div className="text-lg sm:text-xl font-serif font-light leading-snug">
                        {venue.tagline}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectVenue(venue.slug)}
                      className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-[#FAF7F2] text-[#2A1C16] text-xs font-medium uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                    >
                      <span>Explore Lookbook</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#721B24]" />
                    </button>
                  </div>
                </div>

                {/* Diptych teaser strip */}
                <div className="p-4 bg-[#F3EDE2] border-t border-[#C5A880]/30 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={venue.diptych[0]}
                      alt="Diptych detail 1"
                      className="w-16 h-12 rounded-lg object-cover border border-[#C5A880]/40"
                    />
                    <div className="text-xs font-mono text-[#5C3D2E]">
                      <div className="font-semibold text-[#2A1C16]">DIPTYCH VIEW 01</div>
                      <div className="text-[10px]">Staging & Lighting Rig</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={venue.diptych[1]}
                      alt="Diptych detail 2"
                      className="w-16 h-12 rounded-lg object-cover border border-[#C5A880]/40"
                    />
                    <div className="text-xs font-mono text-[#5C3D2E]">
                      <div className="font-semibold text-[#2A1C16]">DIPTYCH VIEW 02</div>
                      <div className="text-[10px]">Tablescape & Atmosphere</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 30% Sticky Spec Sidebar */}
              <div className="w-full lg:w-[32%] lg:sticky lg:top-24 space-y-6">
                <div className="space-y-2 border-b border-[#C5A880]/30 pb-4">
                  <div className="gsap-fade-up text-xs font-mono text-[#5C3D2E] tracking-[0.25em] uppercase">
                    {venue.subtitle}
                  </div>
                  <h2 className="text-3xl font-serif text-[#2A1C16] font-light leading-snug">
                    <WordReveal text={venue.name} />
                  </h2>
                  <p className="gsap-fade-up text-xs sm:text-sm text-[#5C3D2E] font-sans font-light leading-relaxed">
                    {venue.description}
                  </p>
                </div>

                {/* Technical spec cards with stagger */}
                <div className="gsap-stagger space-y-2.5">
                  <div className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                    TECHNICAL PARAMETERS
                  </div>

                  {venue.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-[#F3EDE2] border border-[#C5A880]/30 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="space-y-0.5">
                        <div className="text-[#2A1C16] font-medium">{spec.label}</div>
                        {spec.note && (
                          <div className="text-[10px] text-[#5C3D2E]/70">{spec.note}</div>
                        )}
                      </div>
                      <div className="font-bold text-[#721B24] text-right">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="gsap-fade-up pt-2 space-y-3">
                  <button
                    onClick={() => onSelectVenue(venue.slug)}
                    className="w-full py-3.5 rounded-full bg-[#2A1C16] hover:bg-[#721B24] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Explore Realm Details & Gallery</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                  </button>

                  <button
                    onClick={() => onOpenInquiry(venue.name)}
                    className="w-full py-3 rounded-full border border-[#721B24] text-[#721B24] hover:bg-[#721B24] hover:text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
                  >
                    Reserve Dates for This Realm
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default VenuesView;
