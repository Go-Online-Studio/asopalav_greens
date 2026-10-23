import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { HeroParallax } from '../components/HeroParallax';
import { PinnedSpaces } from '../components/PinnedSpaces';
import { WordReveal } from '../utils/animations';
import { FAQSection } from '../components/FAQSection';
import { Sparkles, Zap, Car, UtensilsCrossed, Crown } from 'lucide-react';

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
            <span>ESTATE PHILOSOPHY &amp; MONUMENTAL PROPORTIONS</span>
          </div>

          {/* Word-Reveal Blockquote */}
          <blockquote className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-[#2A1C16] font-light leading-tight tracking-tight italic max-w-5xl xl:max-w-6xl mx-auto">
            <WordReveal text={"\u201cCurated architectural sanctuaries engineered for memories that outlive generations.\u201d"} />
          </blockquote>

          <p className="gsap-fade-up max-w-2xl xl:max-w-3xl mx-auto text-xs sm:text-sm xl:text-base text-[#5C3D2E] font-sans font-light tracking-wide uppercase">
            An architectural symphony set amidst the serene botanical corridor of Sevasi, Vadodara.
          </p>

          {/* Metrics with stagger animation: Estate Proportions */}
          <div className="gsap-stagger pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 border-y border-[#C5A880]/30 py-10 xl:py-14 max-w-4xl xl:max-w-6xl mx-auto">
            <div className="space-y-1 xl:space-y-2">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#2A1C16] font-light tracking-tight">
                39,000+ <span className="text-xl sm:text-2xl xl:text-3xl text-[#C5A880] font-normal">SQ. FT.</span>
              </div>
              <div className="text-xs xl:text-sm font-mono text-[#5C3D2E] tracking-widest uppercase">
                Total Estate Grounds
              </div>
            </div>

            <div className="space-y-1 xl:space-y-2 md:border-x md:border-[#C5A880]/30">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#2A1C16] font-light tracking-tight">
                1,950+ <span className="text-xl sm:text-2xl xl:text-3xl text-[#C5A880] font-normal">GUESTS</span>
              </div>
              <div className="text-xs xl:text-sm font-mono text-[#5C3D2E] tracking-widest uppercase">
                Combined Hospitality Scale
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

      {/* 4. Infrastructure & Hospitality Concierge — Natural Cream bg-[#FAF7F2] */}
      <section className="w-full bg-[#FAF7F2] py-16 sm:py-24 xl:py-28">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="mb-12 sm:mb-16 space-y-3 xl:space-y-4">
            <div className="gsap-fade-up flex items-center gap-2 text-xs xl:text-sm font-mono text-[#5C3D2E] tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
              INFRASTRUCTURE & HOSPITALITY CONCIERGE
            </div>
            <h2 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-serif text-[#2A1C16] font-light leading-tight">
              <WordReveal text="ENGINEERED FOR" />{' '}
              <span className="italic font-normal"><WordReveal text="FLAWLESS REVELRY" /></span>
            </h2>
            <p className="gsap-fade-up max-w-2xl xl:max-w-3xl text-sm sm:text-base xl:text-lg text-[#5C3D2E] font-sans font-light">
              Behind the poetic aesthetics lies a heavy-industrial infrastructure designed for frictionless large-scale celebrations.
            </p>
          </div>

          {/* Balanced 2x2 Infrastructure Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
          {/* Card 1: Bridal Suites */}
          <div className="gsap-scale-in rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between hover:shadow-2xl hover:border-[#721B24]/40 transition-all duration-500">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
                alt="Bridal Preparation Suite"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-md">
                SANCTUARY 01 & 02
              </div>
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors duration-300">
                <Crown className="w-5 h-5" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-[10px] sm:text-xs font-mono text-[#FAF7F2]/90 tracking-wider">
                CLIMATE-CONTROLLED • HIGH SECURITY SAFE • PRIVATE SALON LIGHTING
              </div>
            </div>

            <div className="p-6 sm:p-8 xl:p-9 flex flex-col justify-between flex-1 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                  PRIVATE BRIDAL HAVEN
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] leading-tight">
                  <WordReveal text="Dedicated Luxury Bridal Suites" />
                </h3>
                <p className="gsap-fade-up text-sm sm:text-base text-[#5C3D2E] font-sans font-light leading-relaxed">
                  Twin high-security en-suite sanctuaries featuring private salon vanity stations, Italian marble restrooms, and direct discrete corridors connecting to the stage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-5 border-t border-[#C5A880]/30 text-xs font-mono">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">UNITS</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">Twin Suites</div>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">VANITY</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0.5">Private Salon</div>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">CORRIDOR</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">Stage Direct</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Executive Valet */}
          <div className="gsap-scale-in rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between hover:shadow-2xl hover:border-[#721B24]/40 transition-all duration-500">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85"
                alt="Executive Valet Arrival Motor Court"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#2A1C16] text-[#D4AF37] border border-[#C5A880]/40 text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-md">
                MOTOR COURT LOGISTICS
              </div>
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors duration-300">
                <Car className="w-5 h-5" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-[10px] sm:text-xs font-mono text-[#FAF7F2]/90 tracking-wider">
                100% ASPHALT & INTERLOCK • DIGITAL KEY REGISTRY • UNIFORMED CHAUFFEURS
              </div>
            </div>

            <div className="p-6 sm:p-8 xl:p-9 flex flex-col justify-between flex-1 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                  EFFORTLESS ARRIVALS
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] leading-tight">
                  <WordReveal text="Executive Valet Concierge" /><br />
                  <span className="italic font-normal text-[#C5A880]"><WordReveal text="(500+ Vehicles)" /></span>
                </h3>
                <p className="gsap-fade-up text-sm sm:text-base text-[#5C3D2E] font-sans font-light leading-relaxed">
                  Paved arterial ingress and egress loops completely isolated from through-traffic, staffed by uniformed valet chauffeurs and digital automated key registry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-5 border-t border-[#C5A880]/30 text-xs font-mono">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">CAPACITY</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">500+ Cars</div>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">BARAAT LANE</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">60 Ft. Wide</div>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">PAVING</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">Interlock</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Heavy Rigging */}
          <div className="gsap-scale-in rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between hover:shadow-2xl hover:border-[#721B24]/40 transition-all duration-500">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85"
                alt="Concert Staging and Rigging"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-md">
                CONCERT SPECIFICATION
              </div>
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors duration-300">
                <Zap className="w-5 h-5" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-[10px] sm:text-xs font-mono text-[#FAF7F2]/90 tracking-wider">
                SYNCHRONIZED ZERO-FLICKER • DUAL 500 kVA GENERATORS • HYDRAULIC READY
              </div>
            </div>

            <div className="p-6 sm:p-8 xl:p-9 flex flex-col justify-between flex-1 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                  PRODUCTION INFRASTRUCTURE
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] leading-tight">
                  <WordReveal text="Heavy Rigging &" />{' '}
                  <span className="italic font-normal"><WordReveal text="3-Phase Energy Grid" /></span>
                </h3>
                <p className="gsap-fade-up text-sm sm:text-base text-[#5C3D2E] font-sans font-light leading-relaxed">
                  Dual 500 kVA synchronized generator backups deliver uninterrupted zero-flicker power. Engineered ground load ratings support monumental LED walls and hydraulic stages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-5 border-t border-[#C5A880]/30 text-xs font-mono">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">POWER</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">1,000 kVA</div>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">TRUSS</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">Up to 28 Ft</div>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">BACKUP</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">Zero Flicker</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Catering Plazas */}
          <div className="gsap-scale-in rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between hover:shadow-2xl hover:border-[#721B24]/40 transition-all duration-500">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2A1C16]">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85"
                alt="Chef Curated Catering and Dining Experience"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/85 via-transparent to-black/20" />
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#2F3E34] text-[#FAF7F2] text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-md">
                CULINARY THEATER
              </div>
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/50 flex items-center justify-center text-[#721B24] shadow-md group-hover:bg-[#721B24] group-hover:text-[#FAF7F2] transition-colors duration-300">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-[10px] sm:text-xs font-mono text-[#FAF7F2]/90 tracking-wider">
                COMMERCIAL UTILITY MANIFOLDS • DISCRETE WAITSTAFF LANES • ZERO CONFLICT
              </div>
            </div>

            <div className="p-6 sm:p-8 xl:p-9 flex flex-col justify-between flex-1 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#721B24] tracking-[0.2em] uppercase font-semibold">
                  GASTRONOMIC LOGISTICS
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] leading-tight">
                  <WordReveal text="Chef-Curated Catering Plazas" />
                </h3>
                <p className="gsap-fade-up text-sm sm:text-base text-[#5C3D2E] font-sans font-light leading-relaxed">
                  Independent 6,000 sq. ft. commercial commissary yard with dedicated commercial water lines, gas manifold bays, cold storage hookups, and discrete waiter service tunnels.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-5 border-t border-[#C5A880]/30 text-xs font-mono">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">COMMISSARY</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">6,000 Sq. Ft.</div>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">MANIFOLDS</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">Gas & Water</div>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C5A880]/30 flex items-center justify-between sm:block">
                  <div className="text-[10px] text-[#5C3D2E] tracking-wider">LANES</div>
                  <div className="font-bold text-[#2A1C16] text-xs sm:text-sm mt-0 sm:mt-0.5">Discrete Tunnels</div>
                </div>
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
                <span>THE PATRON&apos;S PRIVILEGE</span>
              </div>

              <h2 className="text-2xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-light leading-tight tracking-tight">
                <WordReveal text="BEGIN THE ARCHITECTURE" /><br />
                <span className="italic font-normal"><WordReveal text="OF YOUR CELEBRATION" /></span>
              </h2>

              <p className="gsap-fade-up text-sm sm:text-base xl:text-lg text-[#F3EDE2]/90 font-sans font-light leading-relaxed max-w-xl xl:max-w-3xl mx-auto">
                Private estate walk-throughs and auspicious date reservations for the 2026–2027 wedding seasons are now accepting patron inscriptions. Office hours: 9:30 AM – 7:00 PM (Daily).
              </p>

              <div className="gsap-fade-up pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 xl:gap-6">
                <button
                  onClick={() => onOpenInquiry()}
                  className="w-full sm:w-auto px-8 py-4 xl:px-10 xl:py-4.5 rounded-full bg-[#FAF7F2] text-[#721B24] hover:bg-[#F3EDE2] text-xs xl:text-sm uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  Request Private Viewing
                </button>

                <button
                  onClick={() => onNavigate('/venues')}
                  className="w-full sm:w-auto px-7 py-4 xl:px-9 xl:py-4.5 rounded-full border border-[#FAF7F2]/40 hover:border-[#D4AF37] text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-[0.2em] font-medium transition-all cursor-pointer"
                >
                  Inspect Both Spaces
                </button>
              </div>

              <div className="gsap-fade-up pt-6 text-xs xl:text-sm font-mono text-[#D4AF37]/80">
                Sevasi - Canal Rd, opp. Athletes Arena, near Jalsa Apartment, Vadodara • Concierge: <a href="tel:+918155089958" className="hover:underline text-[#FAF7F2]">+91&nbsp;81550&nbsp;89958</a>&nbsp;/&nbsp;<a href="tel:+919898563788" className="hover:underline text-[#FAF7F2]">+91&nbsp;98985&nbsp;63788</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
