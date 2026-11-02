import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { HeroParallax } from '../components/HeroParallax';
import { PinnedSpaces } from '../components/PinnedSpaces';
import { WordReveal } from '../utils/animations';
import { FAQSection } from '../components/FAQSection';
import { Sparkles, Zap, Car, Crown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (venue?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Word Reveal animations (titles, big text) ──
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

      // ── Fade-in-up for paragraphs, badges, buttons ──
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

      // ── Clip-path reveal for images ──
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

      // ── Scale-in cards ──
      const scaleIns = gsap.utils.toArray<HTMLElement>('.gsap-scale-in');
      scaleIns.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Metric counter stagger ──
      const staggerGroups = gsap.utils.toArray<HTMLElement>('.gsap-stagger');
      staggerGroups.forEach((group) => {
        const children = group.children;
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
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
    <div ref={containerRef} className="w-full bg-[#FAF7F2] text-[#2A1C16]">
      {/* 1. Hero Section with GSAP Parallax */}
      <HeroParallax
        onExploreSpaces={() => {
          const el = document.getElementById('spaces-showcase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else onNavigate('/venues');
        }}
        onOpenInquiry={() => onOpenInquiry()}
      />

      {/* 2. Editorial Statement — Natural Cream */}
      <section className="w-full bg-[#FAF7F2] py-16 sm:py-24 xl:py-28">
        <div className="px-4 sm:px-8 xl:px-12 max-w-6xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto text-center space-y-12 xl:space-y-16">
          <div className="gsap-fade-up inline-flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs xl:text-sm font-mono tracking-[0.14em] sm:tracking-[0.3em] text-[#5C3D2E] uppercase text-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
            <span>OUR VISION &amp; SCALE</span>
          </div>

          {/* Word-Reveal Blockquote */}
          <blockquote className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-[#2A1C16] font-light leading-tight tracking-tight italic max-w-5xl xl:max-w-6xl mx-auto">
            <WordReveal text={"\u201cTimeless wedding venues designed for unforgettable celebrations.\u201d"} />
          </blockquote>

          <p className="gsap-fade-up max-w-2xl xl:max-w-3xl mx-auto text-xs sm:text-sm xl:text-base text-[#5C3D2E] font-sans font-light tracking-wide uppercase">
            A serene green escape set amidst the peaceful surroundings of Sevasi, Vadodara.
          </p>

          {/* Metrics with stagger animation: Estate Proportions */}
          <div className="gsap-stagger pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 border-y border-[#C5A880]/30 py-10 xl:py-14 max-w-4xl xl:max-w-6xl mx-auto">
            <div className="space-y-1 xl:space-y-2">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#2A1C16] font-light tracking-tight">
                39,000+ <span className="text-xl sm:text-2xl xl:text-3xl text-[#C5A880] font-normal">SQ. FT.</span>
              </div>
              <div className="text-xs xl:text-sm font-mono text-[#5C3D2E] tracking-widest uppercase">
                Total Celebration Area
              </div>
            </div>

            <div className="space-y-1 xl:space-y-2 md:border-x md:border-[#C5A880]/30">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#2A1C16] font-light tracking-tight">
                1,950+ <span className="text-xl sm:text-2xl xl:text-3xl text-[#C5A880] font-normal">GUESTS</span>
              </div>
              <div className="text-xs xl:text-sm font-mono text-[#5C3D2E] tracking-widest uppercase">
                Combined Guest Capacity
              </div>
            </div>

            <div className="space-y-1 xl:space-y-2">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#2A1C16] font-light tracking-tight">
                100% <span className="text-xl sm:text-2xl xl:text-3xl text-[#C5A880] font-normal">DG</span>
              </div>
              <div className="text-xs xl:text-sm font-mono text-[#5C3D2E] tracking-widest uppercase">
                Synchronized Dual Backup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Spaces: Two Curated Spaces Showcase (Slightly Darker Cream bg-[#F3EDE2]) */}
      <PinnedSpaces
        onSelectVenue={(slug) => onNavigate(`/venues/${slug}`)}
        onOpenInquiry={(venueName) => onOpenInquiry(venueName)}
      />

      {/* 4. Facilities & Hospitality Support — Natural Cream bg-[#FAF7F2] */}
      <section className="w-full bg-[#FAF7F2] py-16 sm:py-24 xl:py-28">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="mb-12 sm:mb-16 space-y-3 xl:space-y-4">
            <div className="gsap-fade-up flex items-center gap-2 text-xs xl:text-sm font-mono text-[#5C3D2E] tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
              FACILITIES &amp; GUEST HOSPITALITY
            </div>
            <h2 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-serif text-[#2A1C16] font-light leading-tight">
              <WordReveal text="DESIGNED FOR" />{' '}
              <span className="italic font-normal"><WordReveal text="GRAND CELEBRATIONS" /></span>
            </h2>
            <p className="gsap-fade-up max-w-2xl xl:max-w-3xl text-sm sm:text-base xl:text-lg text-[#5C3D2E] font-sans font-light">
              Equipped with heavy-duty power backup, dedicated bridal suites, and seamless valet management for large-scale events.
            </p>
          </div>

          {/* Cards: Desktop 3-in-1 row (md:grid-cols-3) & Mobile Swiper Carousel */}
          {/* Mobile Swiper (hidden on md and up) */}
          <div className="block md:hidden pb-6">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                bulletActiveClass: '!bg-[#721B24] !w-6 !rounded-full',
              }}
              className="pb-10"
            >
              {/* Slide 1: 10 Luxury Rooms */}
              <SwiperSlide>
                <div className="rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden flex flex-col justify-between shadow-lg shadow-espresso-950/5 min-h-[520px]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
                      alt="Luxury Private Suites"
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] font-mono tracking-widest uppercase shadow-md">
                      10 LUXURY ROOMS
                    </div>
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-[10px] font-mono text-[#FAF7F2]/90 tracking-wider">
                      AIR-CONDITIONED • PRIVATE EN-SUITE • FAMILY COMFORT
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                        BRIDAL &amp; FAMILY ROOMS
                      </div>
                      <h3 className="text-2xl font-serif text-[#2A1C16] leading-tight">
                        <WordReveal text="10 Dedicated Luxury Rooms" />
                      </h3>
                      <p className="text-sm text-[#5C3D2E] font-sans font-light leading-relaxed">
                        We provide 10 air-conditioned en-suite rooms for the bride, groom, and immediate family members. Conveniently located near the event spaces, these rooms ensure complete privacy and ease throughout the wedding festivities.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 2: Valet Parking */}
              <SwiperSlide>
                <div className="rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden flex flex-col justify-between shadow-lg shadow-espresso-950/5 min-h-[520px]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
                    <img
                      src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85"
                      alt="Valet Parking and Baraat Entry"
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1C16] text-[#D4AF37] border border-[#C5A880]/40 text-[10px] font-mono tracking-widest uppercase shadow-md">
                      PARKING &amp; ENTRY
                    </div>
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md">
                      <Car className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-[10px] font-mono text-[#FAF7F2]/90 tracking-wider">
                      500+ CARS CAPACITY • 60 FT. BARAAT LANE • VALET PARKING
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                        SMOOTH ARRIVALS
                      </div>
                      <h3 className="text-2xl font-serif text-[#2A1C16] leading-tight">
                        <WordReveal text="Valet Parking" /><br />
                        <span className="italic font-normal text-[#C5A880]"><WordReveal text="(500+ Vehicles)" /></span>
                      </h3>
                      <p className="text-sm text-[#5C3D2E] font-sans font-light leading-relaxed">
                        Dedicated drop-off areas and smooth entry-exit gates managed by professional valet staff. Includes parking for 500+ vehicles and an expansive 60-foot wide avenue for grand baraat processions.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 3: Power & Setup Support */}
              <SwiperSlide>
                <div className="rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden flex flex-col justify-between shadow-lg shadow-espresso-950/5 min-h-[520px]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
                    <img
                      src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85"
                      alt="Concert Staging and High-Capacity Power"
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] font-mono tracking-widest uppercase shadow-md">
                      EVENT SETUP SUPPORT
                    </div>
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-[10px] font-mono text-[#FAF7F2]/90 tracking-wider">
                      1,000 kVA POWER • DUAL GENERATORS • UNINTERRUPTED BACKUP
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                        POWER &amp; STAGING
                      </div>
                      <h3 className="text-2xl font-serif text-[#2A1C16] leading-tight">
                        <WordReveal text="High-Capacity Power &" />{' '}
                        <span className="italic font-normal"><WordReveal text="Setup Support" /></span>
                      </h3>
                      <p className="text-sm text-[#5C3D2E] font-sans font-light leading-relaxed">
                        Reliable 1,000 kVA power supply with dual synchronized DG backup for flawless sound, stage lighting, and climate control. Designed to handle heavy LED walls, hydraulic stages, and full wedding production.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Desktop Grid: 3 Cards in 1 Row (md:grid-cols-3) */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {/* Card 1: 10 Luxury Rooms */}
            <div className="gsap-scale-in rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between hover:shadow-2xl hover:border-[#721B24]/40 transition-all duration-500">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxury Private Suites"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-md">
                  10 LUXURY ROOMS
                </div>
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors duration-300">
                  <Crown className="w-5 h-5" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-[10px] sm:text-xs font-mono text-[#FAF7F2]/90 tracking-wider">
                  AIR-CONDITIONED • PRIVATE EN-SUITE • FAMILY COMFORT
                </div>
              </div>

              <div className="p-6 sm:p-7 xl:p-8 flex flex-col justify-between flex-1">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                    BRIDAL &amp; FAMILY ROOMS
                  </div>
                  <h3 className="text-xl lg:text-2xl xl:text-3xl font-serif text-[#2A1C16] leading-tight">
                    <WordReveal text="10 Dedicated Luxury Rooms" />
                  </h3>
                  <p className="gsap-fade-up text-sm lg:text-base text-[#5C3D2E] font-sans font-light leading-relaxed">
                    We provide 10 air-conditioned en-suite rooms for the bride, groom, and immediate family members. Conveniently located near the event spaces, these rooms ensure complete privacy and ease throughout the wedding festivities.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Valet Parking */}
            <div className="gsap-scale-in rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between hover:shadow-2xl hover:border-[#721B24]/40 transition-all duration-500">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
                <img
                  src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85"
                  alt="Valet Parking and Baraat Entry"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#2A1C16] text-[#D4AF37] border border-[#C5A880]/40 text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-md">
                  PARKING &amp; ENTRY
                </div>
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors duration-300">
                  <Car className="w-5 h-5" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-[10px] sm:text-xs font-mono text-[#FAF7F2]/90 tracking-wider">
                  500+ CARS CAPACITY • 60 FT. BARAAT LANE • VALET PARKING
                </div>
              </div>

              <div className="p-6 sm:p-7 xl:p-8 flex flex-col justify-between flex-1">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                    SMOOTH ARRIVALS
                  </div>
                  <h3 className="text-xl lg:text-2xl xl:text-3xl font-serif text-[#2A1C16] leading-tight">
                    <WordReveal text="Valet Parking" /><br />
                    <span className="italic font-normal text-[#C5A880]"><WordReveal text="(500+ Vehicles)" /></span>
                  </h3>
                  <p className="gsap-fade-up text-sm lg:text-base text-[#5C3D2E] font-sans font-light leading-relaxed">
                    Dedicated drop-off areas and smooth entry-exit gates managed by professional valet staff. Includes parking for 500+ vehicles and an expansive 60-foot wide avenue for grand baraat processions.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Power & Setup Support */}
            <div className="gsap-scale-in rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between hover:shadow-2xl hover:border-[#721B24]/40 transition-all duration-500">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85"
                  alt="Concert Staging and High-Capacity Power"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-md">
                  EVENT SETUP SUPPORT
                </div>
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors duration-300">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-[10px] sm:text-xs font-mono text-[#FAF7F2]/90 tracking-wider">
                  1,000 kVA POWER • DUAL GENERATORS • UNINTERRUPTED BACKUP
                </div>
              </div>

              <div className="p-6 sm:p-7 xl:p-8 flex flex-col justify-between flex-1">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                    POWER &amp; STAGING
                  </div>
                  <h3 className="text-xl lg:text-2xl xl:text-3xl font-serif text-[#2A1C16] leading-tight">
                    <WordReveal text="High-Capacity Power &" />{' '}
                    <span className="italic font-normal"><WordReveal text="Setup Support" /></span>
                  </h3>
                  <p className="gsap-fade-up text-sm lg:text-base text-[#5C3D2E] font-sans font-light leading-relaxed">
                    Reliable 1,000 kVA power supply with dual synchronized DG backup for flawless sound, stage lighting, and climate control. Designed to handle heavy LED walls, hydraulic stages, and full wedding production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions — Slightly Darker Cream bg-[#F3EDE2] */}
      <FAQSection bg="darker" onOpenInquiry={() => onOpenInquiry()} />

      {/* 6. The Final Invitation: Deep Wine-Red Banner — Natural Cream bg-[#FAF7F2] */}
      <section className="w-full bg-[#FAF7F2] py-14 sm:py-20 xl:py-24">
        <div className="px-3 sm:px-6 xl:px-10 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="rounded-3xl xl:rounded-[40px] bg-[#721B24] border border-[#C5A880]/50 p-6 sm:p-16 xl:p-20 text-center text-[#FAF7F2] shadow-2xl relative overflow-hidden">
            {/* Subtle Monogram Watermark */}
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />

            <div className="relative z-10 max-w-3xl xl:max-w-4xl mx-auto space-y-6 xl:space-y-8">
              <div className="gsap-fade-up inline-flex items-center gap-2 px-4 py-1.5 xl:px-5 xl:py-2 rounded-full bg-[#4A0E17] border border-[#C5A880]/40 text-[#D4AF37] text-xs xl:text-sm font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PLAN YOUR CELEBRATION</span>
              </div>

              <h2 className="text-2xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-light leading-tight tracking-tight">
                <WordReveal text="BEGIN PLANNING" /><br />
                <span className="italic font-normal"><WordReveal text="YOUR WEDDING DAY" /></span>
              </h2>

              <p className="gsap-fade-up text-sm sm:text-base xl:text-lg text-[#F3EDE2]/90 font-sans font-light leading-relaxed max-w-xl xl:max-w-3xl mx-auto">
                In-person venue walk-throughs and auspicious date bookings are now open for upcoming wedding seasons. Office hours: 9:30 AM – 7:00 PM (Daily).
              </p>

              <div className="gsap-fade-up pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 xl:gap-6">
                <button
                  onClick={() => onOpenInquiry()}
                  className="w-full sm:w-auto px-8 py-4 xl:px-10 xl:py-4.5 rounded-full bg-[#FAF7F2] text-[#721B24] hover:bg-[#F3EDE2] text-xs xl:text-sm uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  Schedule a Visit
                </button>

                <button
                  onClick={() => onNavigate('/venues')}
                  className="w-full sm:w-auto px-7 py-4 xl:px-9 xl:py-4.5 rounded-full border border-[#FAF7F2]/40 hover:border-[#D4AF37] text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-[0.2em] font-medium transition-all cursor-pointer"
                >
                  View Both Spaces
                </button>
              </div>

              <div className="gsap-fade-up pt-6 text-xs xl:text-sm font-mono text-[#D4AF37]/80">
                Sevasi - Canal Rd, opp. Athletes Arena, near Jalsa Apartment, Vadodara • Booking Desk: <a href="tel:+918155089958" className="hover:underline text-[#FAF7F2]">+91&nbsp;81550&nbsp;89958</a>&nbsp;/&nbsp;<a href="tel:+919898563788" className="hover:underline text-[#FAF7F2]">+91&nbsp;98985&nbsp;63788</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
