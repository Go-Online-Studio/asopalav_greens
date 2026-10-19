import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { VENUES } from '../data/estateData';
import { ArrowUpRight, Users, Sparkles, Compass, Calendar, ArrowRight } from 'lucide-react';

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
      // ── Header Masthead Reveal ──
      gsap.fromTo(
        '.masthead-element',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      // ── Scroll-Triggered Two-Column Magazine Rows ──
      const venueRows = gsap.utils.toArray<HTMLElement>('.venue-magazine-row');

      venueRows.forEach((row, i) => {
        const imageWrapper = row.querySelector<HTMLElement>('.magazine-image-wrapper');
        const innerImage = row.querySelector<HTMLElement>('.magazine-inner-img');
        const textCol = row.querySelector<HTMLElement>('.magazine-text-col');
        const textElements = textCol ? textCol.querySelectorAll<HTMLElement>('.text-stagger-item') : [];

        // Image Slide & Scale Reveal (No parallax shift to prevent blank spaces)
        if (imageWrapper && innerImage) {
          const isEven = i % 2 === 0;

          // Slide into view smoothly
          gsap.fromTo(
            imageWrapper,
            {
              x: isEven ? -40 : 40,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Subtle image scale effect from 1.08 to 1.0
          gsap.fromTo(
            innerImage,
            { scale: 1.08 },
            {
              scale: 1.0,
              duration: 1.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Sequential Text Fade-In on the other side
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 78%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  const scrollToVenue = (slug: string) => {
    const el = document.getElementById(`space-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-[#FAF7F2] text-[#2A1C16] min-h-screen">
      {/* ── 1. Minimalist Editorial Masthead ── */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-[#C5A880]/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="masthead-element flex items-center gap-3 text-xs font-mono text-[#721B24] tracking-[0.25em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#721B24]" />
              ESTATE REPERTOIRE • VOLUME 2026–2027
            </div>

            <h1 className="masthead-element text-4xl sm:text-6xl lg:text-7xl font-serif text-[#2A1C16] font-light leading-[1.05] tracking-tight">
              THE SPACES
              <span className="block italic font-normal text-[#5C3D2E] text-3xl sm:text-5xl lg:text-6xl mt-1">
                &amp; Architectural Sanctums
              </span>
            </h1>

            <p className="masthead-element text-base sm:text-lg text-[#5C3D2E] font-sans font-light leading-relaxed max-w-2xl">
              Three singular environments shaped for monumental celebrations, pristine sightlines,
              and intimate ceremonial rituals. Focused on scale, natural light, and refined hospitality.
            </p>
          </div>

          {/* Quick Index Anchors */}
          <div className="masthead-element flex flex-wrap md:flex-col gap-2 md:items-end text-xs font-mono">
            <span className="text-[10px] uppercase tracking-widest text-[#5C3D2E]/70 mb-1">
              JUMP TO SANCTUARY
            </span>
            {VENUES.map((v, i) => (
              <button
                key={v.slug}
                onClick={() => scrollToVenue(v.slug)}
                className="px-3.5 py-1.5 rounded-full border border-[#C5A880]/40 text-[#2A1C16] hover:bg-[#721B24] hover:text-[#FAF7F2] hover:border-[#721B24] transition-all cursor-pointer text-left flex items-center gap-2 group"
              >
                <span className="text-[#721B24] group-hover:text-[#FAF7F2] font-semibold">
                  0{i + 1}
                </span>
                <span className="font-sans font-medium tracking-normal text-xs">{v.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Scroll-Triggered Two-Column Magazine Presentation ── */}
      <section className="py-10 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {VENUES.map((venue, idx) => {
          const isEven = idx % 2 === 0;
          const chapterNumber = `0${idx + 1}`;

          return (
            <div
              key={venue.slug}
              id={`space-${venue.slug}`}
              className={`venue-magazine-row flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-10 lg:gap-14 items-center scroll-mt-28`}
            >
              {/* ── Column A: Large, Full-Height Image (Slides in with subtle scale) ── */}
              <div className="w-full lg:w-[56%]">
                <div
                  onClick={() => onSelectVenue(venue.slug)}
                  className="magazine-image-wrapper group relative h-[420px] sm:h-[500px] lg:h-[580px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-xl cursor-pointer"
                >
                  <img
                    src={venue.heroImage}
                    alt={venue.name}
                    className="magazine-inner-img w-full h-full object-cover object-center will-change-transform transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  {/* Editorial Film Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/90 via-[#2A1C16]/20 to-transparent pointer-events-none" />

                  {/* Overlaid Magazine Folio Badges */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2.5">
                      <span className="px-4 py-1.5 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md text-[#2A1C16] font-mono text-xs tracking-widest uppercase shadow-md font-semibold">
                        SANCTUARY {venue.numeral}
                      </span>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2A1C16]/75 backdrop-blur-md text-[#FAF7F2] text-[11px] font-mono tracking-wider border border-[#C5A880]/30">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      EDITORIAL LOOKBOOK
                    </span>
                  </div>

                  {/* Image Bottom Ambiance Caption & Micro-CTA */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-[#FAF7F2]">
                    <div className="max-w-md space-y-1">
                      <div className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase">
                        ATMOSPHERIC ESSENCE
                      </div>
                      <p className="text-base sm:text-lg font-serif font-light leading-snug line-clamp-2">
                        {venue.tagline}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF7F2] text-[#2A1C16] text-xs font-semibold uppercase tracking-wider group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors shadow-lg">
                      <span className="hidden sm:inline">View Details</span>
                      <ArrowUpRight className="w-4 h-4 text-[#721B24] group-hover:text-[#FAF7F2] transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Column B: Sequential Fade-in Magazine Text ── */}
              <div className="magazine-text-col w-full lg:w-[42%] space-y-6 lg:py-4">
                {/* 1. Folio Chapter & Category */}
                <div className="text-stagger-item flex items-center gap-2 text-xs font-mono text-[#721B24] tracking-[0.25em] uppercase">
                  <span>CHAPTER {chapterNumber}</span>
                  <span className="text-[#C5A880]">•</span>
                  <span>ASOPALAV GREENS</span>
                </div>

                {/* 2. Venue Headline */}
                <div className="text-stagger-item space-y-2">
                  <h2 className="text-3xl sm:text-5xl font-serif text-[#2A1C16] font-light leading-[1.08] tracking-tight">
                    {venue.name}
                  </h2>
                  <p className="text-sm font-mono text-[#5C3D2E] tracking-wider uppercase">
                    {venue.ambianceSubtitle || venue.subtitle}
                  </p>
                </div>

                {/* 3. Essential Capacity Focal Callout (NO square footage!) */}
                <div className="text-stagger-item p-5 rounded-2xl bg-[#F3EDE2] border border-[#C5A880]/40 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#721B24] uppercase tracking-widest font-semibold">
                    <Users className="w-3.5 h-3.5" />
                    <span>GUEST CAPACITY &amp; SCALE</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl sm:text-3xl font-serif text-[#2A1C16] font-normal leading-none">
                        {venue.capacityFloating.toLocaleString()}
                      </div>
                      <div className="text-[11px] font-mono text-[#5C3D2E] uppercase tracking-wider mt-1">
                        Floating Guests
                      </div>
                    </div>

                    <div>
                      <div className="text-2xl sm:text-3xl font-serif text-[#721B24] font-normal leading-none">
                        {venue.capacitySeated.toLocaleString()}
                      </div>
                      <div className="text-[11px] font-mono text-[#5C3D2E] uppercase tracking-wider mt-1">
                        Banquet Seating
                      </div>
                    </div>
                  </div>

                  {venue.celebrationStyle && (
                    <div className="pt-2 border-t border-[#C5A880]/30 text-xs font-sans text-[#2A1C16] font-medium flex items-center gap-2">
                      <span className="text-[#721B24]">✦</span>
                      <span>{venue.celebrationStyle}</span>
                    </div>
                  )}
                </div>

                {/* 4. Evocative Ambiance Narrative */}
                <p className="text-stagger-item text-sm sm:text-base text-[#5C3D2E] font-sans font-light leading-relaxed">
                  {venue.description}
                </p>

                {/* 5. Minimal Ambiance Essence Points (Clean experience focus) */}
                {venue.essencePoints && venue.essencePoints.length > 0 && (
                  <ul className="text-stagger-item space-y-2 text-xs sm:text-sm text-[#2A1C16]/90 font-sans border-l-2 border-[#721B24]/40 pl-4 py-1">
                    {venue.essencePoints.map((point, pIdx) => (
                      <li key={pIdx} className="leading-snug">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {/* 6. Magazine Action Buttons */}
                <div className="text-stagger-item pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onSelectVenue(venue.slug)}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#2A1C16] hover:bg-[#721B24] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    <span>Explore Space</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </button>

                  <button
                    onClick={() => onOpenInquiry(venue.name)}
                    className="py-3.5 px-6 rounded-full border border-[#721B24] text-[#721B24] hover:bg-[#721B24] hover:text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer text-center"
                  >
                    Reserve Dates
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── 3. Exclusive Full Estate Buyout Repertoire ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#C5A880]/30">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] font-mono uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              EXCLUSIVE PRIVILEGE
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FAF7F2]">
              Grand Estate Buyout Repertoire
            </h3>
            <p className="text-xs sm:text-sm text-[#F3EDE2]/80 font-sans font-light leading-relaxed">
              Combine all three architectural sanctuaries for monumental multi-day destination weddings.
              Accommodates over 4,000 celebration guests with complete privacy, simultaneous ceremonial venues,
              and dedicated estate concierge staffing.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry('Complete Estate Exclusive Buyout')}
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold border border-[#C5A880]/40 transition-all cursor-pointer shadow-xl hover:scale-105"
          >
            Inquire Full Estate Buyout
          </button>
        </div>
      </section>
    </div>
  );
};

export default VenuesView;
