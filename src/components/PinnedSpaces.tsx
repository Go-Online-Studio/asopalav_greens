import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { VENUES } from '../data/estateData';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PinnedSpacesProps {
  onSelectVenue?: (slug: string) => void;
  onOpenInquiry?: (venueName?: string) => void;
}

export const PinnedSpaces: React.FC<PinnedSpacesProps> = ({
  onSelectVenue,
  onOpenInquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const totalItems = VENUES.length + 1; // 3 Venues + 1 Buyout card

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const mm = gsap.matchMedia();

      // Pin and translate on desktop/laptop viewports (width >= 768px)
      mm.add('(min-width: 768px)', () => {
        const scrollDistance = track.scrollWidth - window.innerWidth + 120;

        const tween = gsap.to(track, {
          x: () => -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1.1,
            start: 'top 85px',
            end: () => `+=${scrollDistance * 1.05}`,
            invalidateOnRefresh: true,
          },
        });

        scrollTriggerRef.current = tween.scrollTrigger || null;

        return () => {
          tween.kill();
          scrollTriggerRef.current = null;
        };
      });

      // On mobile viewports (< 768px), ensure no GSAP transform overrides native horizontal scrolling
      mm.add('(max-width: 767px)', () => {
        gsap.set(track, { clearProps: 'transform' });
        scrollTriggerRef.current = null;
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // Track active card on mobile horizontal scroll
  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const cardWidth = scrollContainerRef.current.clientWidth * 0.88;
    const newIndex = Math.min(
      Math.max(Math.round(scrollLeft / (cardWidth + 16)), 0),
      totalItems - 1
    );
    setActiveMobileIndex(newIndex);
  };

  const scrollToCard = (index: number) => {
    setActiveMobileIndex(index);

    // If on desktop with active GSAP ScrollTrigger, calculate vertical scroll position
    if (window.innerWidth >= 768 && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const fraction = index / (totalItems - 1);
      const targetScroll = st.start + fraction * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' }); 
      return;
    }

    // On mobile / horizontal scroll container
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelectorAll('.carousel-card')[index] as HTMLElement;
      if (card) {
        const offsetLeft = card.offsetLeft - (window.innerWidth < 640 ? 16 : 40);
        container.scrollTo({ left: offsetLeft, behavior: 'smooth' });
      } else {
        const cardWidth = container.clientWidth * 0.88;
        container.scrollTo({ left: index * (cardWidth + 16), behavior: 'smooth' });
      }
    }
  };

  const scrollStep = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      const nextIndex = Math.max(activeMobileIndex - 1, 0);
      scrollToCard(nextIndex);
    } else {
      const nextIndex = Math.min(activeMobileIndex + 1, totalItems - 1);
      scrollToCard(nextIndex);
    }
  };

  return (
    <section
      id="spaces-showcase"
      className="relative w-full bg-[#FAF7F2] pt-20 sm:pt-24 pb-16 sm:pb-24 border-t border-[#C5A880]/30 scroll-mt-28"
    >
      {/* Editorial Section Heading — Scrolls naturally past */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 border-b border-[#C5A880]/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C3D2E] tracking-[0.25em] uppercase whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
              CURATED ARCHITECTURAL SANCTUARIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#2A1C16] font-light leading-tight">
              THE THREE <span className="italic font-normal">REALMS</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5C3D2E] font-sans font-light">
              Explore each monolithic sanctuary.
            </p>
          </div>

          {/* Carousel Arrow Controls */}
          {/* <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs font-mono text-[#5C3D2E]/70 uppercase tracking-widest mr-1 sm:mr-2">
              NAVIGATE REALMS
            </span>
            <button
              onClick={() => scrollStep('left')}
              disabled={activeMobileIndex === 0}
              aria-label="Previous realm"
              className="w-10 h-10 rounded-full border border-[#C5A880]/40 bg-[#F3EDE2] hover:bg-[#FAF7F2] text-[#2A1C16] disabled:opacity-40 flex items-center justify-center transition-all hover:border-[#C5A880] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollStep('right')}
              disabled={activeMobileIndex === totalItems - 1}
              aria-label="Next realm"
              className="w-10 h-10 rounded-full border border-[#C5A880]/40 bg-[#F3EDE2] hover:bg-[#FAF7F2] text-[#2A1C16] disabled:opacity-40 flex items-center justify-center transition-all hover:border-[#C5A880] cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </div>

      {/* Pinning Anchor Container */}
      <div
        ref={containerRef}
        className="w-full relative py-2"
      >
        {/* Scrollable Container with data-lenis-prevent and touch optimizations */}
        <div
          ref={scrollContainerRef}
          onScroll={handleMobileScroll}
          data-lenis-prevent="true"
          style={{
            touchAction: 'pan-x pan-y',
            WebkitOverflowScrolling: 'touch',
          }}
          className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar md:overflow-visible pl-4 sm:pl-8 md:pl-14 pr-4 sm:pr-8"
        >
          <div
            ref={trackRef}
            className="flex flex-nowrap items-stretch gap-4 sm:gap-8 will-change-transform pb-2"
          >
            {VENUES.map((venue, idx) => (
              <div
                key={venue.slug}
                className="carousel-card snap-center group relative flex-none w-[88vw] sm:w-[500px] lg:w-[580px] h-[60vh] min-h-[420px] max-h-[540px] rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-2xl bg-[#2A1C16] transition-all duration-500 hover:border-[#C5A880]"
              >
                {/* 100% Edge-to-edge Dominant Visual Canvas */}
                <img
                  src={venue.heroImage}
                  alt={venue.name}
                  className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/95 via-[#2A1C16]/35 to-[#2A1C16]/15" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-[#2A1C16]/80 backdrop-blur-md border border-[#C5A880]/40 text-[#D4AF37] font-serif text-xs tracking-widest">
                    REALM {venue.numeral}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#721B24]/90 backdrop-blur-md border border-[#C5A880]/30 text-[#FAF7F2] text-[10px] tracking-widest uppercase font-mono">
                    {venue.areaSqFt.toLocaleString()} SQ. FT.
                  </span>
                </div>

                {/* Editorial Bottom: One-liner Heading + One-liner Para + Link Buttons */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 pb-6 sm:pb-7 z-10 flex flex-col justify-end space-y-3">
                  {/* One-liner Heading */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#FAF7F2] font-normal leading-tight truncate drop-shadow-md">
                    {venue.name}
                  </h3>

                  {/* One-liner Para - no ugly character truncation */}
                  <p className="text-xs sm:text-sm text-[#F3EDE2]/95 font-sans font-light line-clamp-2 leading-relaxed max-w-lg">
                    {venue.subtitle} • Up to {venue.capacityFloating.toLocaleString()} celebration guests.
                  </p>

                  {/* Clean Link Buttons - guaranteed single-line on mobile */}
                  <div className="pt-1.5 grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => onSelectVenue ? onSelectVenue(venue.slug) : undefined}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#F3EDE2] text-[#2A1C16] text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg whitespace-nowrap text-center"
                    >
                      <span>Explore Realm</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#721B24] flex-none" />
                    </button>

                    <button
                      onClick={() => onOpenInquiry ? onOpenInquiry(venue.name) : undefined}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-full bg-[#721B24]/90 hover:bg-[#721B24] border border-[#C5A880]/50 text-[#FAF7F2] text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-medium transition-all duration-300 hover:scale-[1.02] cursor-pointer whitespace-nowrap text-center shadow-md"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37] flex-none" />
                      <span>Reserve Dates</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* End Cap Card: Bespoke Buyout */}
            <div className="carousel-card snap-center flex-none w-[85vw] sm:w-[360px] h-[60vh] min-h-[420px] max-h-[540px] rounded-3xl bg-[#721B24] border border-[#C5A880]/50 p-6 sm:p-7 flex flex-col justify-between text-[#FAF7F2] shadow-2xl relative overflow-hidden">
              <div className="space-y-4">
                <span className="w-10 h-10 rounded-full border border-[#C5A880]/50 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
                  BESPOKE PROPERTY BUYOUT
                </div>
                {/* One liner heading */}
                <h3 className="text-2xl sm:text-3xl font-serif font-light leading-snug">
                  Concurrent Multi-Day Access
                </h3>
                {/* One liner para */}
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-sans">
                  Reserve all three realms simultaneously for grand weddings accommodating over 3,500 guests.
                </p>
              </div>

              {/* Link button */}
              <button
                onClick={() => onOpenInquiry ? onOpenInquiry('Full Estate Buyout (All Three Realms)') : undefined}
                className="w-full py-3 rounded-full bg-[#FAF7F2] text-[#721B24] hover:bg-[#F3EDE2] text-xs font-medium uppercase tracking-widest transition-all cursor-pointer shadow-lg"
              >
                Consult Estate Concierge
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Pagination Dots & Controls */}
        <div className="sm:hidden px-4 mt-6 flex items-center justify-between">
          {/* Realm indicator dots */}
          <div className="flex items-center gap-2">
            {['I', 'II', 'III', 'BUYOUT'].map((label, idx) => (
              <button
                key={label}
                onClick={() => scrollToCard(idx)}
                aria-label={`Jump to Realm ${label}`}
                className={`transition-all duration-300 font-mono text-[10px] tracking-wider rounded-full px-2.5 py-1 border ${
                  activeMobileIndex === idx
                    ? 'bg-[#721B24] text-[#FAF7F2] border-[#C5A880]/60 font-bold shadow-sm'
                    : 'bg-[#F3EDE2] text-[#5C3D2E] border-[#C5A880]/30 hover:border-[#C5A880]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Quick touch buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollStep('left')}
              disabled={activeMobileIndex === 0}
              aria-label="Previous realm card"
              className="w-9 h-9 rounded-full border border-[#C5A880]/40 bg-[#F3EDE2] text-[#2A1C16] disabled:opacity-40 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollStep('right')}
              disabled={activeMobileIndex === totalItems - 1}
              aria-label="Next realm card"
              className="w-9 h-9 rounded-full border border-[#C5A880]/40 bg-[#F3EDE2] text-[#2A1C16] disabled:opacity-40 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedSpaces;
