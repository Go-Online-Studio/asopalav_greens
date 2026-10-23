import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { VENUES, Venue } from '../data/estateData';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  Clock,
  CheckCircle2,
  Calendar,
  Eye,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface VenueDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (venue?: string) => void;
}

export const VenueDetailView: React.FC<VenueDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenInquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize slug to match VENUES array
  const normalizeSlug = (s: string) => {
    if (s === 'royal-lawn') return 'lawn';
    if (s === 'crystal-banquet' || s === 'crystal-hall') return 'banquet';
    return s;
  };

  const normalizedSlug = normalizeSlug(slug);
  const venueIndex = VENUES.findIndex((v) => v.slug === normalizedSlug);
  const venue: Venue = VENUES[venueIndex >= 0 ? venueIndex : 0];
  const isBanquet = venue.slug === 'banquet';

  const otherVenue = VENUES[venueIndex === 0 ? 1 : 0];

  useGSAP(
    () => {
      // ── Hero Image & Title Animations ──
      gsap.fromTo(
        '.detail-hero-img',
        { scale: 1.15 },
        {
          scale: 1.02,
          duration: 1.8,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.hero-stagger-text',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      // ── Magazine Spread Scroll Animations ──
      const fadeUpElements = gsap.utils.toArray<HTMLElement>('.detail-fade-up');
      fadeUpElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Diptych Scroll Reveals ──
      const diptychPanels = gsap.utils.toArray<HTMLElement>('.diptych-panel');
      diptychPanels.forEach((panel) => {
        const img = panel.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1.02,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    },
    { scope: containerRef, dependencies: [venue.slug] }
  );

  return (
    <div ref={containerRef} className="w-full bg-[#FAF7F2] text-[#2A1C16] min-h-screen">
      {/* ── 1. Top Editorial Navigation Bar ── */}
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 xl:px-12 pt-8 pb-4 flex items-center justify-between text-xs xl:text-sm font-mono uppercase tracking-widest text-[#5C3D2E] border-b border-[#C5A880]/20">
        <button
          onClick={() => onNavigate('/venues')}
          className="inline-flex items-center gap-2 hover:text-[#721B24] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Spaces</span>
        </button>

        <div className="flex items-center gap-3 text-[#5C3D2E]">
          <span className="text-[#721B24] font-semibold">SPACE 0{venueIndex + 1} / 02</span>
          <span className="text-[#C5A880]">•</span>
          <span>VADODARA, GUJARAT</span>
        </div>

        <button
          onClick={() => onOpenInquiry(venue.name)}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 xl:px-5 xl:py-2 rounded-full border border-[#721B24] text-[#721B24] hover:bg-[#721B24] hover:text-[#FAF7F2] transition-colors text-xs xl:text-sm font-semibold cursor-pointer"
        >
          <span>Reserve Dates</span>
        </button>
      </div>

      {/* ── 2. Magazine Cover Hero ── */}
      <section className="px-3 sm:px-6 xl:px-10 pt-6 pb-12">
        <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto relative h-[72vh] sm:h-[84vh] xl:h-[86vh] rounded-3xl sm:rounded-[36px] xl:rounded-[44px] overflow-hidden border border-[#C5A880]/40 shadow-2xl bg-[#2A1C16]">
          <img
            src={venue.heroImage}
            alt={venue.name}
            className="detail-hero-img w-full h-full object-cover object-center will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/95 via-[#2A1C16]/40 to-[#2A1C16]/20" />

          {/* Top Folio Header Over Image */}
          <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-12 sm:right-12 xl:top-10 xl:left-14 xl:right-14 flex items-center justify-between text-[#FAF7F2] gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 xl:px-5 xl:py-2 rounded-full bg-[#2A1C16]/80 backdrop-blur-md border border-[#C5A880]/40 text-[#FAF7F2] text-[10px] sm:text-xs xl:text-sm font-mono tracking-widest uppercase flex-none">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
              SPACE 0{venueIndex + 1}
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#721B24]/90 backdrop-blur-md text-[9px] sm:text-xs xl:text-sm font-mono tracking-widest text-[#FAF7F2] uppercase font-semibold text-right">
              {isBanquet ? '30,000 SQ. FT.' : 'PARTY PLOT 9,000 SQ. FT.'}
            </div>
          </div>

          {/* Bottom Magazine Overlay Content */}
          <div className="absolute bottom-6 left-4 right-4 sm:bottom-12 sm:left-12 sm:right-12 xl:bottom-14 xl:left-14 xl:right-14 flex flex-col md:flex-row md:items-end justify-between gap-5 text-[#FAF7F2]">
            <div className="space-y-3 sm:space-y-4 max-w-3xl xl:max-w-4xl">
              <div className="hero-stagger-text text-[10px] sm:text-sm xl:text-base font-mono text-[#D4AF37] tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                {isBanquet ? 'GRAND INDOOR BANQUET' : 'LANDSCAPED OPEN-AIR PARTY PLOT'}
              </div>

              <h1 className="hero-stagger-text text-3xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif font-light leading-[1.03] tracking-tight">
                {venue.name}
              </h1>

              <div className="hero-stagger-text inline-flex flex-wrap items-center gap-2 py-1 px-3 sm:py-1.5 sm:px-4 xl:px-5 xl:py-2 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#C5A880]/30 text-[10px] sm:text-xs xl:text-sm font-mono tracking-wider sm:tracking-widest text-[#D4AF37] uppercase">
                <span>{isBanquet ? 'Pillarless Indoor Sanctuary' : 'Manicured Open-Air Grounds'}</span>
                <span className="text-[#FAF7F2]/40">•</span>
                <span className="text-[#FAF7F2]">{isBanquet ? '30,000 Sq. Ft.' : 'Party Plot 9,000 Sq. Ft.'}</span>
              </div>
            </div>

            <div className="hero-stagger-text flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenInquiry(venue.name)}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 xl:px-10 xl:py-4 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-widest font-semibold border border-[#C5A880]/40 transition-all cursor-pointer shadow-xl hover:scale-105 text-center"
              >
                Inquire For This Space
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Exact Key Specifications & Architectural Intent — Slightly Darker Cream bg-[#F3EDE2] ── */}
      <section className="w-full bg-[#F3EDE2] py-16 sm:py-24 xl:py-28 border-b border-[#C5A880]/30">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
            {/* Left Column: Exact Specifications Card */}
            <div className="lg:col-span-5 space-y-6 xl:space-y-8">
              <div className="detail-fade-up space-y-2">
                <span className="text-xs xl:text-sm font-mono tracking-widest text-[#721B24] uppercase">
                  ESSENTIAL PARAMETERS
                </span>
                <h2 className="text-2xl sm:text-4xl xl:text-5xl font-serif text-[#2A1C16] font-light leading-snug">
                  Space Specifications
                </h2>
              </div>

              {/* Exact Details List (bg-[#FAF7F2] stands out crisply on darker cream) */}
              <div className="detail-fade-up p-4 sm:p-6 xl:p-8 rounded-2xl xl:rounded-3xl bg-[#FAF7F2] border border-[#C5A880]/40 space-y-4 xl:space-y-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs xl:text-sm font-mono text-[#721B24] uppercase tracking-wider font-semibold">
                  <Users className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span>OFFICIAL SPECIFICATIONS</span>
                </div>

                <div className="space-y-3 xl:space-y-4 text-sm sm:text-base xl:text-lg font-sans text-[#2A1C16]">
                  {isBanquet ? (
                    <>
                      <div className="flex items-start gap-3 pb-3 border-b border-[#C5A880]/20">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">30,000 sq.ft</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Grand indoor banquet hall footprint</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b border-[#C5A880]/20">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Banquet seating :- 750 spacious seating capacity</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Generously spaced banquet dining and lounge arrangements</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b border-[#C5A880]/20">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Rooms :- 10 luxury room</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Air-conditioned luxury en-suite accommodations</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b border-[#C5A880]/20">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Ample parking space</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Dedicated on-site parking for all celebration guests</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Vallet parking available in main event</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Dedicated valet concierge for primary celebrations</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3 pb-3 border-b border-[#C5A880]/20">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Party plot :- 9,000 sq. ft</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Lush landscaped open-air celebration grounds</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b border-[#C5A880]/20">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Lawn seating :- 1,200 capacity</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Open-sky seating and mandap sightlines</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b border-[#C5A880]/20">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Rooms :- 10 luxury room</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Air-conditioned luxury en-suite accommodations</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b border-[#C5A880]/20">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Ample parking space</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Dedicated on-site parking for all celebration guests</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] mt-0.5 flex-none" />
                        <div>
                          <div className="font-semibold text-[#2A1C16]">Vallet parking available in main event</div>
                          <div className="text-xs xl:text-sm text-[#5C3D2E]">Dedicated valet concierge for primary celebrations</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Clean Modern Narrative */}
            <div className="lg:col-span-7 space-y-8 xl:space-y-10">
              <div className="detail-fade-up space-y-4 text-[#5C3D2E] text-base sm:text-lg xl:text-xl 2xl:text-2xl font-sans font-light leading-relaxed">
                <p>{venue.description}</p>
              </div>

              {/* Curated Hospitality Highlights */}
              {venue.hospitalityHighlights && venue.hospitalityHighlights.length > 0 && (
                <div className="detail-fade-up space-y-4 xl:space-y-6 pt-4">
                  <div className="text-xs xl:text-sm font-mono text-[#721B24] tracking-widest uppercase">
                    AMENITIES &amp; PROVISIONS
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6">
                    {venue.hospitalityHighlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 xl:p-6 rounded-xl xl:rounded-2xl bg-[#FAF7F2] border border-[#C5A880]/35 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm xl:text-base font-serif font-bold text-[#2A1C16]">
                          <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] flex-none" />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm xl:text-base text-[#5C3D2E] font-sans font-light leading-relaxed pl-6">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Architectural Diptych & Inquire Card — Natural Cream bg-[#FAF7F2] ── */}
      <section className="w-full bg-[#FAF7F2] py-16 sm:py-24 xl:py-28 border-b border-[#C5A880]/30">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto space-y-16 xl:space-y-24">
          <div className="space-y-6 xl:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs xl:text-sm font-mono text-[#5C3D2E] uppercase tracking-widest border-b border-[#C5A880]/20 pb-3">
              <span>FIGURES 01 &amp; 02 — ARCHITECTURAL PERSPECTIVES</span>
              <span className="text-[#721B24]">VISUAL STUDY</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">
              <div className="diptych-panel group rounded-3xl xl:rounded-[36px] overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-xl relative h-[420px] sm:h-[500px] xl:h-[580px] 2xl:h-[640px]">
                <img
                  src={venue.diptych[0]}
                  alt={`${venue.name} View 01`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 xl:bottom-8 xl:left-8 xl:right-8 text-[#FAF7F2] space-y-1">
                  <div className="text-[10px] xl:text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                    PERSPECTIVE 01
                  </div>
                  <div className="text-xl xl:text-2xl font-serif font-light">Ceremonial Staging &amp; Ambience</div>
                </div>
              </div>

              <div className="diptych-panel group rounded-3xl xl:rounded-[36px] overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-xl relative h-[420px] sm:h-[500px] xl:h-[580px] 2xl:h-[640px]">
                <img
                  src={venue.diptych[1]}
                  alt={`${venue.name} View 02`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 xl:bottom-8 xl:left-8 xl:right-8 text-[#FAF7F2] space-y-1">
                  <div className="text-[10px] xl:text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                    PERSPECTIVE 02
                  </div>
                  <div className="text-xl xl:text-2xl font-serif font-light">Evening Lighting &amp; Hospitality</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. Inquire Call-to-Action Card ── */}
          <div className="detail-fade-up p-8 sm:p-12 xl:p-16 rounded-3xl xl:rounded-[36px] bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 xl:space-y-4 max-w-2xl xl:max-w-3xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] xl:text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                DATE AVAILABILITY
              </div>
              <h3 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-light text-[#FAF7F2]">
                Reserve {venue.name}
              </h3>
              <p className="text-xs sm:text-sm xl:text-base 2xl:text-lg text-[#F3EDE2]/80 font-sans font-light leading-relaxed">
                We host a limited number of signature celebrations each season to maintain pristine grounds and ensure undivided attention.
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry(venue.name)}
              className="shrink-0 px-8 py-4 xl:px-10 xl:py-4.5 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-widest font-semibold border border-[#C5A880]/40 transition-all cursor-pointer shadow-xl hover:scale-105"
            >
              Check Auspicious Dates
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. Two-Space Toggle Navigation — Slightly Darker Cream bg-[#F3EDE2] ── */}
      <section className="w-full bg-[#F3EDE2] py-12 xl:py-16">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => onNavigate(`/venues/${otherVenue.slug}`)}
              className="flex items-center gap-4 text-left group cursor-pointer"
            >
              <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full border border-[#C5A880]/40 flex items-center justify-center group-hover:bg-[#721B24] group-hover:border-[#721B24] transition-all bg-[#FAF7F2]">
                <ArrowLeft className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] group-hover:text-[#FAF7F2] transition-colors" />
              </div>
              <div>
                <div className="text-[10px] xl:text-xs font-mono uppercase tracking-widest text-[#5C3D2E]">
                  OTHER SPACE
                </div>
                <div className="font-serif text-lg sm:text-xl xl:text-2xl text-[#2A1C16] group-hover:text-[#721B24] transition-colors">
                  {otherVenue.name}
                </div>
                <div className="text-[11px] xl:text-xs font-mono text-[#5C3D2E]/70">
                  {otherVenue.slug === 'banquet' ? '30,000 Sq. Ft. • 750 Seating' : 'Party plot 9,000 Sq. Ft. • 1,200 Seating'}
                </div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('/venues')}
              className="text-xs xl:text-sm font-mono uppercase tracking-widest text-[#721B24] hover:underline"
            >
              All Spaces Catalog
            </button>

            <button
              onClick={() => onNavigate(`/venues/${otherVenue.slug}`)}
              className="flex items-center gap-4 text-right group cursor-pointer"
            >
              <div>
                <div className="text-[10px] xl:text-xs font-mono uppercase tracking-widest text-[#5C3D2E]">
                  EXPLORE
                </div>
                <div className="font-serif text-lg sm:text-xl xl:text-2xl text-[#2A1C16] group-hover:text-[#721B24] transition-colors">
                  {otherVenue.name}
                </div>
                <div className="text-[11px] xl:text-xs font-mono text-[#5C3D2E]/70">
                  {otherVenue.slug === 'banquet' ? '30,000 Sq. Ft. • 750 Seating' : 'Party plot 9,000 Sq. Ft. • 1,200 Seating'}
                </div>
              </div>
              <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full border border-[#C5A880]/40 flex items-center justify-center group-hover:bg-[#721B24] group-hover:border-[#721B24] transition-all bg-[#FAF7F2]">
                <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 text-[#721B24] group-hover:text-[#FAF7F2] transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenueDetailView;
