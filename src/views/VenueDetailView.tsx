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
  const normalizedSlug =
    slug === 'royal-lawn' ? 'lawn' : slug === 'crystal-hall' ? 'crystal-banquet' : slug;

  const venueIndex = VENUES.findIndex((v) => v.slug === normalizedSlug);
  const venue: Venue = VENUES[venueIndex >= 0 ? venueIndex : 0];

  const prevVenue = VENUES[(venueIndex - 1 + VENUES.length) % VENUES.length];
  const nextVenue = VENUES[(venueIndex + 1) % VENUES.length];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#5C3D2E] border-b border-[#C5A880]/20">
        <button
          onClick={() => onNavigate('/venues')}
          className="inline-flex items-center gap-2 hover:text-[#721B24] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Spaces</span>
        </button>

        <div className="flex items-center gap-3 text-[#5C3D2E]">
          <span className="text-[#721B24] font-semibold">SANCTUARY 0{venueIndex + 1} / 03</span>
          <span className="text-[#C5A880]">•</span>
          <span>VADODARA, GUJARAT</span>
        </div>

        <button
          onClick={() => onOpenInquiry(venue.name)}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#721B24] text-[#721B24] hover:bg-[#721B24] hover:text-[#FAF7F2] transition-colors text-xs font-semibold cursor-pointer"
        >
          <span>Reserve Dates</span>
        </button>
      </div>

      {/* ── 2. Magazine Cover Hero ── */}
      <section className="px-3 sm:px-6 pt-6 pb-12">
        <div className="max-w-7xl mx-auto relative h-[72vh] sm:h-[84vh] rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#C5A880]/40 shadow-2xl bg-[#2A1C16]">
          <img
            src={venue.heroImage}
            alt={venue.name}
            className="detail-hero-img w-full h-full object-cover object-center will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/95 via-[#2A1C16]/40 to-[#2A1C16]/20" />

          {/* Top Folio Header Over Image */}
          <div className="absolute top-8 left-6 sm:left-12 right-6 sm:right-12 flex items-center justify-between text-[#FAF7F2]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A1C16]/80 backdrop-blur-md border border-[#C5A880]/40 text-[#FAF7F2] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              SANCTUARY {venue.numeral}
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
              ARCHITECTURAL MONOGRAPH
            </div>
          </div>

          {/* Bottom Magazine Overlay Content */}
          <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-[#FAF7F2]">
            <div className="space-y-4 max-w-3xl">
              <div className="hero-stagger-text text-xs sm:text-sm font-mono text-[#D4AF37] tracking-[0.25em] uppercase">
                {venue.ambianceSubtitle || venue.subtitle}
              </div>

              <h1 className="hero-stagger-text text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.05] tracking-tight">
                {venue.name}
              </h1>

              {/* Essential Capacity Hero Banner (NO square footage!) */}
              <div className="hero-stagger-text inline-flex flex-wrap items-center gap-4 py-2 px-4 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#C5A880]/30 text-xs sm:text-sm font-mono tracking-wide text-[#FAF7F2]">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>UP TO {venue.capacityFloating.toLocaleString()} GUESTS</span>
                </div>
                <span className="text-[#C5A880]">•</span>
                <span>{venue.capacitySeated.toLocaleString()} BANQUET DINING</span>
              </div>
            </div>

            <div className="hero-stagger-text flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenInquiry(venue.name)}
                className="px-8 py-3.5 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold border border-[#C5A880]/40 transition-all cursor-pointer shadow-xl hover:scale-105"
              >
                Inquire For This Sanctuary
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Magazine Editorial Spread: Ambiance Narrative & Essential Scale ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start border-b border-[#C5A880]/30 pb-16">
          {/* Left Column: Monograph Statement & Essential Scale Callout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="detail-fade-up space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#721B24] uppercase">
                ARCHITECTURAL INTENT
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2A1C16] font-light leading-snug">
                Ambiance &amp; Spatial Scale
              </h2>
            </div>

            {venue.editorialQuote && (
              <blockquote className="detail-fade-up text-lg sm:text-xl font-serif italic text-[#5C3D2E] border-l-2 border-[#721B24] pl-4 py-1 leading-relaxed">
                "{venue.editorialQuote}"
              </blockquote>
            )}

            {/* Essential Scale Card (NO square footage!) */}
            <div className="detail-fade-up p-6 rounded-2xl bg-[#F3EDE2] border border-[#C5A880]/40 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#721B24] uppercase tracking-wider font-semibold">
                <Users className="w-4 h-4" />
                <span>ESSENTIAL CAPACITY PARAMETERS</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="border-r border-[#C5A880]/30 pr-4">
                  <div className="text-3xl font-serif text-[#2A1C16]">
                    {venue.capacityFloating.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-[#5C3D2E] uppercase tracking-wider mt-1">
                    Floating Capacity
                  </div>
                </div>

                <div className="pl-2">
                  <div className="text-3xl font-serif text-[#721B24]">
                    {venue.capacitySeated.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-[#5C3D2E] uppercase tracking-wider mt-1">
                    Banquet Seating
                  </div>
                </div>
              </div>

              {venue.celebrationStyle && (
                <div className="pt-3 border-t border-[#C5A880]/30 text-xs font-sans text-[#2A1C16] leading-relaxed">
                  <span className="font-semibold text-[#721B24]">CELEBRATION SCOPE: </span>
                  {venue.celebrationStyle}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Minimal Modern Narrative & Patron Journey */}
          <div className="lg:col-span-7 space-y-8">
            <div className="detail-fade-up space-y-4 text-[#5C3D2E] text-base sm:text-lg font-sans font-light leading-relaxed">
              <p>{venue.description}</p>
              <p className="text-sm font-sans text-[#2A1C16]/80 italic">
                "{venue.tagline}"
              </p>
            </div>

            {/* Curated Hospitality Highlights */}
            {venue.hospitalityHighlights && venue.hospitalityHighlights.length > 0 && (
              <div className="detail-fade-up space-y-4 pt-4">
                <div className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                  EXPERIENCE &amp; HOSPITALITY PROVISIONS
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {venue.hospitalityHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-[#C5A880]/30 space-y-1.5 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#2A1C16]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#721B24] flex-none" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-[#5C3D2E] font-sans font-light leading-relaxed pl-5">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── 4. Architectural Diptych Magazine Spread ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#5C3D2E] uppercase tracking-widest border-b border-[#C5A880]/20 pb-3">
            <span>FIGURES 01 &amp; 02 — ARCHITECTURAL PERSPECTIVES</span>
            <span className="text-[#721B24]">VISUAL MONOGRAPH STUDY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="diptych-panel group rounded-3xl overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-xl relative h-[420px] sm:h-[500px]">
              <img
                src={venue.diptych[0]}
                alt={`${venue.name} View 01`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2] space-y-1">
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                  PERSPECTIVE 01
                </div>
                <div className="text-xl font-serif font-light">Ceremonial Staging &amp; Horizon</div>
              </div>
            </div>

            <div className="diptych-panel group rounded-3xl overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-xl relative h-[420px] sm:h-[500px]">
              <img
                src={venue.diptych[1]}
                alt={`${venue.name} View 02`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2] space-y-1">
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                  PERSPECTIVE 02
                </div>
                <div className="text-xl font-serif font-light">Illumination &amp; Evening Ambience</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. Day-to-Night Celebration Journey ── */}
        {venue.dayToNightPhases && venue.dayToNightPhases.length > 0 && (
          <div className="detail-fade-up py-8 space-y-8 border-t border-[#C5A880]/30">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                ATMOSPHERIC TIMELINE
              </span>
              <h3 className="text-3xl font-serif text-[#2A1C16] font-light">
                Day-to-Night Celebration Journey
              </h3>
              <p className="text-xs sm:text-sm text-[#5C3D2E] font-sans font-light">
                How {venue.name} transforms effortlessly across the ceremonial hours of your wedding day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {venue.dayToNightPhases.map((phase, pIdx) => (
                <div
                  key={pIdx}
                  className="p-6 rounded-2xl bg-[#F3EDE2] border border-[#C5A880]/40 space-y-3 relative group hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#721B24]">
                    <span>PHASE 0{pIdx + 1}</span>
                    <span className="text-[#5C3D2E]">{phase.time}</span>
                  </div>

                  <h4 className="text-xl font-serif text-[#2A1C16] font-normal">
                    {phase.title}
                  </h4>

                  <p className="text-xs text-[#5C3D2E] font-sans font-light leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 6. Inquire Call-to-Action Card ── */}
        <div className="detail-fade-up p-8 sm:p-12 rounded-3xl bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] font-mono uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              DATE AVAILABILITY
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#FAF7F2]">
              Reserve {venue.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#F3EDE2]/80 font-sans font-light leading-relaxed">
              We host a limited number of signature celebrations each season to maintain the pristine condition
              of the grounds and ensure undivided concierge attention.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry(venue.name)}
            className="shrink-0 px-8 py-4 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold border border-[#C5A880]/40 transition-all cursor-pointer shadow-xl hover:scale-105"
          >
            Check Auspicious Dates
          </button>
        </div>
      </section>

      {/* ── 7. Magazine Sanctuary Pagination (Prev / Next) ── */}
      <section className="border-t border-[#C5A880]/30 py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => onNavigate(`/venues/${prevVenue.slug}`)}
            className="flex items-center gap-4 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-[#C5A880]/40 flex items-center justify-center group-hover:bg-[#721B24] group-hover:border-[#721B24] transition-all">
              <ArrowLeft className="w-4 h-4 text-[#721B24] group-hover:text-[#FAF7F2] transition-colors" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#5C3D2E]">
                PREVIOUS SANCTUARY {prevVenue.numeral}
              </div>
              <div className="font-serif text-lg sm:text-xl text-[#2A1C16] group-hover:text-[#721B24] transition-colors">
                {prevVenue.name}
              </div>
              <div className="text-[11px] font-mono text-[#5C3D2E]/70">
                Up to {prevVenue.capacityFloating.toLocaleString()} Guests
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('/venues')}
            className="text-xs font-mono uppercase tracking-widest text-[#721B24] hover:underline"
          >
            All Spaces Catalog
          </button>

          <button
            onClick={() => onNavigate(`/venues/${nextVenue.slug}`)}
            className="flex items-center gap-4 text-right group cursor-pointer"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#5C3D2E]">
                NEXT SANCTUARY {nextVenue.numeral}
              </div>
              <div className="font-serif text-lg sm:text-xl text-[#2A1C16] group-hover:text-[#721B24] transition-colors">
                {nextVenue.name}
              </div>
              <div className="text-[11px] font-mono text-[#5C3D2E]/70">
                Up to {nextVenue.capacityFloating.toLocaleString()} Guests
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border border-[#C5A880]/40 flex items-center justify-center group-hover:bg-[#721B24] group-hover:border-[#721B24] transition-all">
              <ArrowRight className="w-4 h-4 text-[#721B24] group-hover:text-[#FAF7F2] transition-colors" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default VenueDetailView;
