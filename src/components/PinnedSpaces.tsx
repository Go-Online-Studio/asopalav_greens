import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { VENUES } from '../data/estateData';
import { ArrowUpRight, Sparkles, Calendar, Check, Car, BedDouble, Users, Maximize2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PinnedSpacesProps {
  onSelectVenue?: (slug: string) => void;
  onOpenInquiry?: (venueName?: string) => void;
}

export const PinnedSpaces: React.FC<PinnedSpacesProps> = ({
  onSelectVenue,
  onOpenInquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Smooth fade & lift for the space cards on natural vertical scroll (No horizontal scrub)
      const cards = gsap.utils.toArray<HTMLElement>('.space-showcase-card');
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: idx * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="spaces-showcase"
      ref={containerRef}
      className="relative w-full bg-[#F3EDE2] py-16 sm:py-24 xl:py-28 border-y border-[#C5A880]/30 scroll-mt-28"
    >
      {/* Editorial Section Heading */}
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 xl:px-12 mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 border-b border-[#C5A880]/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs xl:text-sm font-mono text-[#5C3D2E] tracking-[0.25em] uppercase whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
              CURATED ARCHITECTURAL SANCTUARIES
            </div>
            <h2 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-serif text-[#2A1C16] font-light leading-tight">
              THE TWO <span className="italic font-normal">SPACES</span>
            </h2>
            <p className="text-xs sm:text-sm xl:text-base text-[#5C3D2E] font-sans font-light">
              Vadodara’s signature indoor banquet and open-air party plot.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs xl:text-sm font-mono text-[#721B24] tracking-widest uppercase">
            <span>VOLUME 2026–2027</span>
          </div>
        </div>
      </div>

      {/* Two Spaces Grid — Natural Vertical Scroll with Big Images & Minimal Text */}
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
          {VENUES.map((venue, idx) => {
            const isBanquet = venue.slug === 'banquet';

            return (
              <div
                key={venue.slug}
                className="space-showcase-card group relative flex flex-col rounded-3xl xl:rounded-[36px] overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-2xl transition-all duration-500 hover:border-[#C5A880]"
              >
                {/* Big Image Visual Canvas (Height: 460px - 600px) */}
                <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[480px] xl:h-[540px] 2xl:h-[600px] overflow-hidden">
                  <img
                    src={venue.heroImage}
                    alt={venue.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Luxury Ambient Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16] via-[#2A1C16]/30 to-black/20" />

                  {/* Top Floating Folio Badges */}
                  <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 xl:top-7 xl:left-7 xl:right-7 flex items-center justify-between gap-2 z-10">
                    <span className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 xl:px-4 xl:py-2 rounded-full bg-[#2A1C16]/85 backdrop-blur-md border border-[#C5A880]/40 text-[#D4AF37] font-serif text-[10px] sm:text-xs xl:text-sm tracking-widest uppercase shadow-md flex-none">
                      SPACE 0{idx + 1}
                    </span>
                    <span className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 xl:px-4 xl:py-2 rounded-full bg-[#721B24]/90 backdrop-blur-md border border-[#C5A880]/30 text-[#FAF7F2] text-[9px] sm:text-[11px] xl:text-xs tracking-wider uppercase font-mono shadow-md font-medium text-right">
                      {isBanquet ? 'INDOOR LUXURY HALL' : 'OPEN-AIR CELEBRATION LAWN'}
                    </span>
                  </div>

                  {/* Bottom Title Overlay on Image */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 xl:bottom-8 xl:left-8 xl:right-8 z-10">
                    <h3 className="text-2xl sm:text-4xl xl:text-5xl font-serif text-[#FAF7F2] font-normal leading-tight drop-shadow-md">
                      {venue.name}
                    </h3>
                  </div>
                </div>

                {/* Minimal Text Specifications Body */}
                <div className="p-4 sm:p-8 xl:p-10 bg-[#2A1C16] flex flex-col justify-between flex-1 space-y-6 xl:space-y-8">
                  {/* Clean Minimal Bullet Details */}
                  <div className="space-y-3 xl:space-y-4 pt-1">
                    {isBanquet ? (
                      <>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span className="font-semibold text-[#D4AF37]">30,000 sq.ft</span>
                          <span className="text-[#F3EDE2]/60">• Clear-span indoor hall</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span>Banquet seating :- <strong className="text-[#FAF7F2] font-semibold">750 spacious seating capacity</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span>Rooms :- <strong className="text-[#FAF7F2] font-semibold">10 luxury room</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span>Ample parking space</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span>Vallet parking available in main event</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs sm:text-sm xl:text-base text-[#D4AF37]/90 font-sans pt-2 border-t border-[#C5A880]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] flex-none" />
                          <span>Pillar-free vista • Centralized AC • Dedicated indoor dining promenade</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span className="font-semibold text-[#D4AF37]">Party plot :- 9,000 sq. ft</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span>Lawn seating :- <strong className="text-[#FAF7F2] font-semibold">1,200 capacity</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span>Rooms :- <strong className="text-[#FAF7F2] font-semibold">10 luxury room</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span>Ample parking space</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm sm:text-base xl:text-lg text-[#FAF7F2]/90 font-sans">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex-none" />
                          <span>Vallet parking available in main event</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs sm:text-sm xl:text-base text-[#D4AF37]/90 font-sans pt-2 border-t border-[#C5A880]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] flex-none" />
                          <span>Natural carpet grass • Grand baraat avenue • Sub-soil drainage</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Minimal Action CTAs */}
                  <div className="pt-4 border-t border-[#C5A880]/20 flex flex-col sm:flex-row items-center gap-3 xl:gap-4">
                    <button
                      onClick={() => onSelectVenue ? onSelectVenue(venue.slug) : undefined}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 xl:py-4 px-5 xl:px-6 rounded-full bg-[#FAF7F2] hover:bg-[#F3EDE2] text-[#2A1C16] text-xs xl:text-sm uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg"
                    >
                      <span>Explore Space</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#721B24]" />
                    </button>

                    <button
                      onClick={() => onOpenInquiry ? onOpenInquiry(venue.name) : undefined}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 xl:py-4 px-6 xl:px-8 rounded-full bg-[#721B24] hover:bg-[#58151C] border border-[#C5A880]/40 text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-widest font-medium transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-md"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Reserve Dates</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Combined Full Estate Option */}
        <div className="mt-10 sm:mt-12 xl:mt-16 p-6 sm:p-8 xl:p-12 rounded-3xl xl:rounded-[36px] bg-[#721B24] border border-[#C5A880]/40 text-[#FAF7F2] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 xl:gap-8">
          <div className="space-y-2 xl:space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] xl:text-xs font-mono tracking-widest uppercase text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXCLUSIVE COMBINED BOOKING</span>
            </div>
            <h4 className="text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl font-serif font-light">
              Concurrent Banquet &amp; Lawn Access
            </h4>
            <p className="text-xs sm:text-sm xl:text-base 2xl:text-lg text-[#FAF7F2]/80 font-sans font-light max-w-xl xl:max-w-2xl leading-relaxed">
              Enjoy complete exclusivity across both indoor and open-air realms. Perfect for monumental multi-phase weddings requiring concurrent indoor dining, sangeet stages, and starlit open-sky mandaps.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry ? onOpenInquiry('Combined Estate (Banquet & Lawn)') : undefined}
            className="shrink-0 px-7 py-3 xl:px-9 xl:py-3.5 rounded-full bg-[#FAF7F2] text-[#721B24] hover:bg-[#F3EDE2] text-xs xl:text-sm font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:scale-105"
          >
            Inquire Combined Estate
          </button>
        </div>
      </div>
    </section>
  );
};

export default PinnedSpaces;
