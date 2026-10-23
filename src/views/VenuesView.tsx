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
      {/* ── 1. Minimalist Editorial Masthead — Natural Cream bg-[#FAF7F2] ── */}
      <section className="w-full bg-[#FAF7F2] pt-10 sm:pt-16 pb-12 sm:pb-16 border-b border-[#C5A880]/30">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
            <div className="space-y-4 max-w-3xl xl:max-w-5xl">
              <div className="masthead-element flex items-center gap-3 text-xs xl:text-sm font-mono text-[#721B24] tracking-[0.25em] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#721B24]" />
                ESTATE REPERTOIRE • VOLUME 2026–2027
              </div>

              <h1 className="masthead-element text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif text-[#2A1C16] font-light leading-[1.03] tracking-tight">
                THE SPACES
                <span className="block italic font-normal text-[#5C3D2E] text-3xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mt-1">
                  &amp; Architectural Sanctums
                </span>
              </h1>

              <p className="masthead-element text-base sm:text-lg xl:text-xl 2xl:text-2xl text-[#5C3D2E] font-sans font-light leading-relaxed max-w-2xl xl:max-w-4xl">
                Two premier spaces shaped for monumental indoor banquets and open-air celebrations.
                The Banquet (30,000 sq. ft.) and The Lawn (9,000 sq. ft. party plot).
              </p>
            </div>

            {/* Quick Index Anchors */}
            <div className="masthead-element flex flex-wrap md:flex-col gap-2.5 md:items-end text-xs xl:text-sm font-mono">
              <span className="text-[10px] xl:text-xs uppercase tracking-widest text-[#5C3D2E]/70 mb-1 w-full md:w-auto">
                JUMP TO SPACE
              </span>
              {VENUES.map((v, i) => (
                <button
                  key={v.slug}
                  onClick={() => scrollToVenue(v.slug)}
                  className="px-4 py-2 xl:px-5 xl:py-2.5 rounded-full border border-[#C5A880]/40 text-[#2A1C16] hover:bg-[#721B24] hover:text-[#FAF7F2] hover:border-[#721B24] transition-all cursor-pointer text-left flex items-center gap-2 group"
                >
                  <span className="text-[#721B24] group-hover:text-[#FAF7F2] font-semibold">
                    0{i + 1}
                  </span>
                  <span className="font-sans font-medium tracking-normal text-xs xl:text-sm">{v.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Distinct Alternating Venue Chapters ── */}
      {VENUES.map((venue, idx) => {
        const isEven = idx % 2 === 0;
        const isBanquet = venue.slug === 'banquet';
        const chapterNumber = `0${idx + 1}`;
        const isDarker = idx % 2 === 0; // Space 01 is darker cream, Space 02 is natural cream

        return (
          <section
            key={venue.slug}
            id={`space-${venue.slug}`}
            className={`w-full py-16 sm:py-24 xl:py-28 border-b border-[#C5A880]/30 scroll-mt-24 transition-colors ${
              isDarker ? 'bg-[#F3EDE2]' : 'bg-[#FAF7F2]'
            }`}
          >
            <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
              <div
                className={`venue-magazine-row flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-10 lg:gap-14 xl:gap-20 items-center`}
              >
                {/* ── Column A: Large, Full-Height Image ── */}
                <div className="w-full lg:w-[54%] xl:w-[56%]">
                  <div
                    onClick={() => onSelectVenue(venue.slug)}
                    className="magazine-image-wrapper group relative h-[420px] sm:h-[520px] lg:h-[580px] xl:h-[660px] 2xl:h-[740px] rounded-[24px] sm:rounded-[36px] overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-xl cursor-pointer"
                  >
                    <img
                      src={venue.heroImage}
                      alt={venue.name}
                      className="magazine-inner-img w-full h-full object-cover object-center will-change-transform transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    {/* Editorial Film Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/90 via-[#2A1C16]/20 to-transparent pointer-events-none" />

                    {/* Overlaid Magazine Folio Badges */}
                    <div className="absolute top-3 left-3 right-3 sm:top-6 sm:left-6 sm:right-6 xl:top-8 xl:left-8 xl:right-8 flex items-center justify-between pointer-events-none gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 sm:px-4 sm:py-1.5 xl:px-5 xl:py-2 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md text-[#2A1C16] font-mono text-[10px] sm:text-xs xl:text-sm tracking-widest uppercase shadow-md font-semibold flex-none">
                          SPACE 0{idx + 1}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 xl:px-4 xl:py-2 rounded-full bg-[#721B24]/90 backdrop-blur-md text-[#FAF7F2] text-[9px] sm:text-[11px] xl:text-xs font-mono tracking-wider border border-[#C5A880]/30 font-medium text-right">
                        {isBanquet ? '30,000 SQ. FT.' : 'PARTY PLOT 9,000 SQ. FT.'}
                      </span>
                    </div>

                    {/* Image Bottom Caption & Micro-CTA */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 xl:bottom-8 xl:left-8 xl:right-8 flex items-end justify-between gap-3 text-[#FAF7F2]">
                      <div className="max-w-md xl:max-w-lg space-y-1">
                        <div className="text-[10px] xl:text-xs font-mono text-[#D4AF37] tracking-[0.2em] uppercase">
                          {isBanquet ? 'INDOOR BANQUET' : 'OPEN-AIR PARTY PLOT'}
                        </div>
                        <p className="text-base sm:text-2xl xl:text-3xl font-serif font-light leading-snug">
                          {venue.name}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 xl:px-5 xl:py-3 rounded-full bg-[#FAF7F2] text-[#2A1C16] text-[11px] sm:text-xs xl:text-sm font-semibold uppercase tracking-wider group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors shadow-lg">
                        <span className="hidden sm:inline">Explore Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#721B24] group-hover:text-[#FAF7F2] transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Column B: Sequential Fade-in Magazine Text ── */}
                <div className="magazine-text-col w-full lg:w-[46%] xl:w-[44%] space-y-6 xl:space-y-8 lg:py-4">
                  {/* 1. Folio Chapter & Category */}
                  <div className="text-stagger-item flex items-center gap-2 text-xs xl:text-sm font-mono text-[#721B24] tracking-[0.25em] uppercase">
                    <span>SPACE {chapterNumber}</span>
                    <span className="text-[#C5A880]">•</span>
                    <span>ASOPALAV GREENS</span>
                  </div>

                  {/* 2. Venue Headline */}
                  <div className="text-stagger-item space-y-2 xl:space-y-3">
                    <h2 className="text-2xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-serif text-[#2A1C16] font-light leading-[1.06] tracking-tight">
                      {venue.name}
                    </h2>
                    <p className="text-xs sm:text-sm xl:text-base 2xl:text-lg font-mono text-[#5C3D2E] tracking-wider uppercase">
                      {isBanquet ? 'Pillarless Indoor Grandeur • Centralized AC' : 'Manicured Open-Air Turf • Starlit Horizon'}
                    </p>
                  </div>

                  {/* 3. Exact Key Specifications Card */}
                  <div className={`text-stagger-item p-4 sm:p-6 xl:p-8 rounded-2xl xl:rounded-3xl border space-y-4 xl:space-y-5 shadow-sm ${
                    isDarker ? 'bg-[#FAF7F2] border-[#C5A880]/40' : 'bg-[#F3EDE2] border-[#C5A880]/40'
                  }`}>
                    <div className="text-xs xl:text-sm font-mono text-[#721B24] uppercase tracking-wider font-semibold">
                      VENUE SPECIFICATIONS
                    </div>

                    <div className="space-y-3 xl:space-y-4 text-sm sm:text-base xl:text-lg font-sans text-[#2A1C16]">
                      {isBanquet ? (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span><strong className="font-semibold">30,000 sq.ft</strong></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Banquet seating :- <strong className="font-semibold">750 spacious seating capacity</strong></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Rooms :- <strong className="font-semibold">10 luxury room</strong></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Ample parking space</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Vallet parking available in main event</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Party plot :- <strong className="font-semibold">9,000 sq. ft</strong></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Lawn seating :- <strong className="font-semibold">1,200 capacity</strong></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Rooms :- <strong className="font-semibold">10 luxury room</strong></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Ample parking space</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#721B24] flex-none" />
                            <span>Vallet parking available in main event</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 4. Distinct Architectural Highlights */}
                  <div className="text-stagger-item space-y-2.5">
                    <div className="text-[11px] xl:text-xs font-mono text-[#5C3D2E] uppercase tracking-wider font-semibold">
                      KEY VENUE ADVANTAGES
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm xl:text-base text-[#5C3D2E] font-sans border-l-2 border-[#721B24]/40 pl-3.5 leading-relaxed">
                      {isBanquet ? (
                        <>
                          <li>• Clear-span pillarless hall ensuring 360° stage visibility from all seating</li>
                          <li>• Multi-zone centralized climate control for comfortable celebrations in any season</li>
                          <li>• Dedicated indoor dining promenade designed for smooth buffet and live counter flow</li>
                        </>
                      ) : (
                        <>
                          <li>• Sculpted natural Bermuda turf with engineered sub-soil drainage</li>
                          <li>• 60-foot wide tree-lined grand baraat arrival boulevard</li>
                          <li>• 100% barrier-free paved access connecting all celebration pavilions</li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* 5. Action Buttons */}
                  <div className="text-stagger-item pt-2 flex flex-col sm:flex-row gap-3 xl:gap-4">
                    <button
                      onClick={() => onSelectVenue(venue.slug)}
                      className="flex-1 py-3.5 xl:py-4 px-6 xl:px-8 rounded-full bg-[#2A1C16] hover:bg-[#721B24] text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                      <span>Explore Space</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                    </button>

                    <button
                      onClick={() => onOpenInquiry(venue.name)}
                      className="py-3.5 xl:py-4 px-6 xl:px-8 rounded-full border border-[#721B24] text-[#721B24] hover:bg-[#721B24] hover:text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-widest font-semibold transition-all cursor-pointer text-center"
                    >
                      Reserve Dates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── 3. Exclusive Combined Estate Booking Option — Darker Cream bg-[#F3EDE2] ── */}
      <section className="w-full bg-[#F3EDE2] py-14 sm:py-20 xl:py-24 border-t border-[#C5A880]/30">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="p-8 sm:p-12 xl:p-16 rounded-3xl xl:rounded-[36px] bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 xl:space-y-4 text-center md:text-left max-w-2xl xl:max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] xl:text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                EXCLUSIVE PRIVILEGE
              </div>
              <h3 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-serif font-light text-[#FAF7F2]">
                Combined Estate Booking Repertoire
              </h3>
              <p className="text-xs sm:text-sm xl:text-base 2xl:text-lg text-[#F3EDE2]/80 font-sans font-light leading-relaxed">
                Reserve the entire estate grounds for complete celebration privacy. Enjoy seamless indoor-outdoor event choreography, dedicated catering commissaries, private host suites, and unified guest hospitality.
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry('Combined Estate (Banquet & Lawn)')}
              className="shrink-0 px-8 py-3.5 xl:px-10 xl:py-4 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-widest font-semibold border border-[#C5A880]/40 transition-all cursor-pointer shadow-xl hover:scale-105"
            >
              Inquire Combined Estate
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenuesView;
