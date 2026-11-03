import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowDownRight,
  MapPin,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HeroSlide {
  id: string;
  subtitle: string;
  title: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  isH1: boolean;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-building-lawn',
    subtitle: '10 Luxury En-Suite Rooms & Lawn',
    title: 'Private Family Stays with Lawn Seating & Decor',
    desktopImage: '/images/Banner1.avif',
    mobileImage: '/images/BannerMob1.avif',
    alt: 'Asopalav Greens estate stay building with 10 luxury rooms and decorated lawn seating area',
    isH1: true, // Only one H1 for the entire carousel & page
  },
  {
    id: 'slide-stage-decorations',
    subtitle: 'Lawn Area & Grand Stage',
    title: 'Exquisite Decor & Illuminated Wedding Stage',
    desktopImage: '/images/Banner2.avif',
    mobileImage: '/images/BannerMob2.avif',
    alt: 'Asopalav Greens illuminated open-air lawn area with decorations and wedding stage',
    isH1: false,
  },
  {
    id: 'slide-catering-lawn',
    subtitle: 'Lawn Dining & Hospitality',
    title: 'Lavish Catering Setup with Open-Air Live Counters',
    desktopImage: '/images/Banner3.avif',
    mobileImage: '/images/BannerMob3.avif',
    alt: 'Asopalav Greens catering and buffet dining setup in the open-air lawn',
    isH1: false,
  },
];

// Unified heading typography class ensuring identical visual size regardless of h1 or h2 tag
const HEADING_TYPOGRAPHY_CLASS =
  'text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#FAF7F2] font-normal leading-[1.14] sm:leading-[1.12] tracking-tight max-w-2xl lg:max-w-3xl drop-shadow-lg';

interface HeroParallaxProps {
  onExploreSpaces?: () => void;
  onOpenInquiry?: () => void;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  onExploreSpaces,
  onOpenInquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    if (!swiperRef.current) return;
    swiperRef.current.slideToLoop(index);
    if (!swiperRef.current.autoplay?.running) {
      swiperRef.current.autoplay?.start();
    }
  };

  const nextSlide = () => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
    if (!swiperRef.current.autoplay?.running) {
      swiperRef.current.autoplay?.start();
    }
  };

  const prevSlide = () => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
    if (!swiperRef.current.autoplay?.running) {
      swiperRef.current.autoplay?.start();
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  // Pause on tab hidden, resume when visible; respect reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && swiperRef.current) {
      swiperRef.current.autoplay?.stop();
    }

    const handleVisibility = () => {
      if (document.hidden) {
        swiperRef.current?.autoplay?.stop();
      } else {
        if (!mediaQuery.matches) {
          swiperRef.current?.autoplay?.start();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Subtle GSAP scroll parallax on the framed container
  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      className="relative w-full px-3 sm:px-6 pt-3 sm:pt-4 pb-8 sm:pb-12 bg-[#FAF7F2] flex flex-col"
      aria-label="Hero Banner"
    >
      {/* Luxury Estate Framed Card with Gold Border */}
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Asopalav Greens Venue Showcase Carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{
          minHeight: 'calc(100vh - var(--nav-height) - 1.25rem)',
        }}
        className="group relative w-full h-[620px] sm:h-[700px] md:h-[760px] lg:h-[840px] rounded-2xl overflow-hidden border border-[#C5A880]/40 shadow-2xl shadow-espresso-950/10 flex flex-col focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
      >
        {/* Swiper Carousel with Full Touch & Mouse Dragging + Automatic Autoplay Pause/Resume */}
        <Swiper
          modules={[Autoplay, Keyboard, A11y]}
          loop={true}
          speed={750}
          grabCursor={true}
          touchEventsTarget="container"
          simulateTouch={true}
          touchRatio={1}
          resistance={true}
          resistanceRatio={0.85}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false, // Automatically resumes after touch or drag interaction is over
            pauseOnMouseEnter: true,      // Automatically pauses on mouse hover, resumes on mouse leave
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          a11y={{
            enabled: true,
            prevSlideMessage: 'Previous venue showcase slide',
            nextSlideMessage: 'Next venue showcase slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          onTouchEnd={(swiper) => {
            // Guarantee autoplay resumes after touch interaction is completed
            if (!swiper.autoplay?.running) {
              swiper.autoplay?.start();
            }
          }}
          className="w-full h-full"
        >
          {HERO_SLIDES.map((slide, index) => (
            <SwiperSlide
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${HERO_SLIDES.length}: ${slide.title}`}
              className="relative w-full h-full overflow-hidden bg-[#1A110D]"
            >
              {/* Responsive Art-Directed Imagery (Desktop & Mobile) */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <picture className="w-full h-full block">
                  {/* Mobile & Tablet Portrait view */}
                  <source
                    media="(orientation: portrait) and (max-width: 1024px)"
                    srcSet={slide.mobileImage}
                  />
                  {/* Desktop & Landscape view */}
                  <source
                    media="(orientation: landscape)"
                    srcSet={slide.desktopImage}
                  />
                  {/* Fallback & Primary img */}
                  <img
                    src={slide.desktopImage}
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out scale-100 group-hover:scale-[1.02]"
                  />
                </picture>

                {/* Minimal Luxury Gradient Overlays: keeps center bright and bottom text crisp */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A110D]/95 via-[#1A110D]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A110D]/75 via-[#1A110D]/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1A110D]/60 to-transparent pointer-events-none" />
              </div>

              {/* Minimal Bottom-Left Content (Aligned with reference design) */}
              <div className="absolute bottom-6 sm:bottom-10 md:bottom-14 left-5 sm:left-10 md:left-14 right-5 sm:right-14 z-10 max-w-3xl space-y-2 sm:space-y-3 pointer-events-auto">
                {/* Subtitle / Eyebrow */}
                <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#D4AF37] font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                  <span>{slide.subtitle}</span>
                </p>

                {/* Heading: Single H1 on page, H2 on others with matching visual typography */}
                {slide.isH1 ? (
                  <h1 className={HEADING_TYPOGRAPHY_CLASS}>{slide.title}</h1>
                ) : (
                  <h2 className={HEADING_TYPOGRAPHY_CLASS}>{slide.title}</h2>
                )}

                {/* Minimal Action CTAs */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2 sm:pt-3">
                  {onOpenInquiry && (
                    <button
                      onClick={onOpenInquiry}
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#721B24] hover:bg-[#5a151c] text-[#FAF7F2] tracking-[0.16em] text-[10px] sm:text-xs uppercase font-medium border border-[#C5A880]/40 shadow-lg shadow-wine-950/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Inquire Dates</span>
                    </button>
                  )}
                  {onExploreSpaces && (
                    <button
                      onClick={onExploreSpaces}
                      className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#1A110D]/60 hover:bg-[#1A110D]/90 backdrop-blur-md text-[#FAF7F2] tracking-[0.16em] text-[10px] sm:text-xs uppercase font-medium border border-[#C5A880]/30 hover:border-[#C5A880] transition-all duration-300 cursor-pointer"
                    >
                      <span>Explore Venues</span>
                      <ArrowDownRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Top Monogram and Location Badges */}
        <div className="absolute top-5 left-5 hidden sm:flex items-center gap-2 text-[#C5A880]/90 tracking-widest text-[10px] uppercase font-mono z-20 bg-[#1A110D]/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A880]/30 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          ESTATE NO. 01 — SEVASI ROAD
        </div>
        <div className="absolute top-5 right-5 hidden sm:flex items-center gap-2 text-[#FAF7F2]/80 tracking-widest text-[10px] uppercase font-mono z-20 bg-[#1A110D]/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A880]/30 shadow-md">
          <MapPin className="w-3 h-3 text-[#C5A880]" />
          VADODARA, GUJARAT
        </div>

        {/* Desktop Prev / Next Nav Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#1A110D]/50 hover:bg-[#1A110D]/85 backdrop-blur-md border border-[#C5A880]/30 text-[#FAF7F2] hover:text-[#D4AF37] items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#1A110D]/50 hover:bg-[#1A110D]/85 backdrop-blur-md border border-[#C5A880]/30 text-[#FAF7F2] hover:text-[#D4AF37] items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Center Pagination Dots (Exact reference style: dots only, no buttons) */}
        <div
          role="tablist"
          aria-label="Carousel slide pagination"
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#1A110D]/65 backdrop-blur-md border border-[#C5A880]/30 shadow-xl"
        >
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              role="tab"
              id={`carousel-tab-${idx}`}
              aria-controls={`carousel-slide-${idx}`}
              aria-selected={activeIndex === idx}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                activeIndex === idx
                  ? 'w-6 sm:w-8 h-2 bg-[#D4AF37]'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroParallax;
