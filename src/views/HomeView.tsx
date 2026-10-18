import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { HeroParallax } from '../components/HeroParallax';
import { PinnedSpaces } from '../components/PinnedSpaces';
import { WordReveal } from '../utils/animations';
import { FAQSection } from '../components/FAQSection';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Car, UtensilsCrossed, Crown, SlidersHorizontal, MapPin, Accessibility } from 'lucide-react';

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

      {/* 2. Editorial Statement */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-12">
        <div className="gsap-fade-up inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] text-[#5C3D2E] uppercase whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
          ESTATE PHILOSOPHY & MONUMENTAL PROPORTIONS
        </div>

        {/* Word-Reveal Blockquote */}
        <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A1C16] font-light leading-tight tracking-tight italic max-w-5xl mx-auto">
          <WordReveal text={"\u201cForty-five thousand square feet of sculpted greenery, engineered for memories that outlive generations.\u201d"} />
        </blockquote>

        <p className="gsap-fade-up max-w-2xl mx-auto text-xs sm:text-sm text-[#5C3D2E] font-sans font-light tracking-wide uppercase">
          An architectural symphony set amidst the serene botanical corridor of Sevasi, Vadodara.
        </p>

        {/* Metrics with stagger animation */}
        <div className="gsap-stagger pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-[#C5A880]/30 py-10 max-w-4xl mx-auto">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2A1C16] font-light tracking-tight">
              45,000 <span className="text-xl sm:text-2xl text-[#C5A880] font-normal">SQ. FT.</span>
            </div>
            <div className="text-xs font-mono text-[#5C3D2E] tracking-widest uppercase">
              Manicured Grounds
            </div>
          </div>

          <div className="space-y-1 md:border-x md:border-[#C5A880]/30">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2A1C16] font-light tracking-tight">
              3,000 <span className="text-xl sm:text-2xl text-[#C5A880] font-normal">GUESTS</span>
            </div>
            <div className="text-xs font-mono text-[#5C3D2E] tracking-widest uppercase">
              Floating Capacity
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2A1C16] font-light tracking-tight">
              100% <span className="text-xl sm:text-2xl text-[#C5A880] font-normal">DG</span>
            </div>
            <div className="text-xs font-mono text-[#5C3D2E] tracking-widest uppercase">
              Uninterrupted Energy
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Spaces: Horizontal Pinned Card Showcase */}
      <PinnedSpaces
        onSelectVenue={(slug) => onNavigate(`/venues/${slug}`)}
        onOpenInquiry={(venueName) => onOpenInquiry(venueName)}
      />

      {/* 4. Graphic Service Highlights (Bento Grid) */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 space-y-3">
          <div className="gsap-fade-up flex items-center gap-2 text-xs font-mono text-[#5C3D2E] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
            INFRASTRUCTURE & HOSPITALITY CONCIERGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2A1C16] font-light leading-tight">
            <WordReveal text="ENGINEERED FOR" />{' '}
            <span className="italic font-normal"><WordReveal text="FLAWLESS REVELRY" /></span>
          </h2>
          <p className="gsap-fade-up max-w-2xl text-sm sm:text-base text-[#5C3D2E] font-sans font-light">
            Behind the poetic aesthetics lies a heavy-industrial infrastructure designed for frictionless large-scale celebrations.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Card 1: Bridal Suites (7 Cols) — Clip-path image reveal + parallax */}
          <div className="gsap-scale-in md:col-span-7 rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between">
            <div className="p-8 sm:p-10 space-y-4">
              <div className="gsap-fade-up flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] font-mono tracking-widest uppercase">
                  SANCTUARY 01 & 02
                </span>
                <Crown className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16]">
                <WordReveal text="Dedicated Luxury Bridal Suites" />
              </h3>
              <p className="gsap-fade-up text-sm text-[#5C3D2E] font-sans font-light leading-relaxed max-w-lg">
                Twin high-security en-suite sanctuaries featuring private salon vanity stations, Italian marble restrooms, and direct discrete corridors connecting to the stage.
              </p>
            </div>
            <div className="gsap-clip-reveal relative h-64 sm:h-72 w-full overflow-hidden bg-[#2A1C16]">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                alt="Bridal Preparation Suite"
                className="gsap-parallax-img w-full h-full object-cover object-center scale-[1.2] will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 text-xs font-mono text-[#FAF7F2]/90">
                CLIMATE-CONTROLLED • HIGH SECURITY SAFE • PRIVATE SALON LIGHTING
              </div>
            </div>
          </div>

          {/* Card 2: Executive Valet (5 Cols) */}
          <div className="gsap-scale-in md:col-span-5 rounded-3xl bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="gsap-fade-up w-12 h-12 rounded-full border border-[#C5A880]/50 flex items-center justify-center text-[#D4AF37]">
                <Car className="w-5 h-5" />
              </div>
              <div className="gsap-fade-up text-xs font-mono text-[#C5A880] tracking-widest uppercase">
                MOTOR COURT LOGISTICS
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light leading-tight">
                <WordReveal text="Executive Valet Concierge" /><br />
                <span className="italic font-normal text-[#C5A880]"><WordReveal text="(500+ Vehicles)" /></span>
              </h3>
              <p className="gsap-fade-up text-xs sm:text-sm text-[#FAF7F2]/80 font-sans font-light leading-relaxed">
                Paved arterial ingress and egress loops completely isolated from through-traffic, staffed by uniformed valet chauffeurs and digital automated key registry.
              </p>
            </div>

            <div className="gsap-fade-up pt-8 border-t border-[#C5A880]/30 space-y-2 text-xs font-mono text-[#FAF7F2]/70">
              <div className="flex justify-between">
                <span>PAVED MOTOR COURT:</span>
                <span className="text-[#C5A880]">100% ASPHALT & INTERLOCK</span>
              </div>
              <div className="flex justify-between">
                <span>BARAAT ENTRY LANE:</span>
                <span className="text-[#C5A880]">60 FT. WIDE ARTERIAL</span>
              </div>
            </div>
          </div>

          {/* Card 3: Heavy Rigging (5 Cols) */}
          <div className="gsap-scale-in md:col-span-5 rounded-3xl bg-[#FAF7F2] border border-[#C5A880]/50 p-8 sm:p-10 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="gsap-fade-up w-12 h-12 rounded-full bg-[#F3EDE2] border border-[#C5A880]/50 flex items-center justify-center text-[#721B24]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="gsap-fade-up text-xs font-mono text-[#721B24] tracking-widest uppercase">
                CONCERT SPECIFICATION
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] font-light">
                <WordReveal text="Heavy Rigging &" /><br />
                <span className="italic font-normal"><WordReveal text="3-Phase Energy Grid" /></span>
              </h3>
              <p className="gsap-fade-up text-xs sm:text-sm text-[#5C3D2E] font-sans font-light leading-relaxed">
                Dual 500 kVA synchronized generator backups deliver uninterrupted zero-flicker power. Engineered ground load ratings support monumental LED walls and hydraulic stages.
              </p>
            </div>

            <div className="gsap-stagger pt-6 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#F3EDE2] p-3 rounded-xl border border-[#C5A880]/30">
                <div className="text-[10px] text-[#5C3D2E]">POWER RATING</div>
                <div className="font-bold text-[#2A1C16]">1,000 kVA</div>
              </div>
              <div className="bg-[#F3EDE2] p-3 rounded-xl border border-[#C5A880]/30">
                <div className="text-[10px] text-[#5C3D2E]">TRUSS HEIGHT</div>
                <div className="font-bold text-[#2A1C16]">UP TO 28 FT</div>
              </div>
            </div>
          </div>

          {/* Card 4: Catering Plazas (7 Cols) — Clip-path reveal + parallax */}
          <div className="gsap-scale-in md:col-span-7 rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg shadow-espresso-950/5 flex flex-col justify-between">
            <div className="p-8 sm:p-10 space-y-4">
              <div className="gsap-fade-up flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#2F3E34] text-[#FAF7F2] text-[10px] font-mono tracking-widest uppercase">
                  CULINARY THEATER
                </span>
                <UtensilsCrossed className="w-5 h-5 text-[#5C3D2E]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16]">
                <WordReveal text="Chef-Curated Catering Plazas" />
              </h3>
              <p className="gsap-fade-up text-sm text-[#5C3D2E] font-sans font-light leading-relaxed max-w-lg">
                Independent 6,000 sq. ft. commercial commissary yard with dedicated commercial water lines, gas manifold bays, cold storage hookups, and discrete waiter service tunnels.
              </p>
            </div>
            <div className="gsap-clip-reveal relative h-64 sm:h-72 w-full overflow-hidden bg-[#2A1C16]">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85"
                alt="Opulent Tablescape"
                className="gsap-parallax-img w-full h-full object-cover object-center scale-[1.2] will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 text-xs font-mono text-[#FAF7F2]/90">
                COMMERCIAL UTILITY MANIFOLDS • DISCRETE WAITSTAFF LANES • ZERO CONFLICT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (from Official Reference) */}
      <FAQSection onOpenInquiry={() => onOpenInquiry()} />

      {/* 6. The Final Invitation: Deep Wine-Red Banner */}
      <section className="px-3 sm:px-6 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#721B24] border border-[#C5A880]/50 p-8 sm:p-16 text-center text-[#FAF7F2] shadow-2xl relative overflow-hidden">
          {/* Subtle Monogram Watermark */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="gsap-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A0E17] border border-[#C5A880]/40 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PATRON'S PRIVILEGE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light leading-tight tracking-tight">
              <WordReveal text="BEGIN THE ARCHITECTURE" /><br />
              <span className="italic font-normal"><WordReveal text="OF YOUR CELEBRATION" /></span>
            </h2>

            <p className="gsap-fade-up text-sm sm:text-base text-[#F3EDE2]/90 font-sans font-light leading-relaxed max-w-xl mx-auto">
              Private estate walk-throughs and auspicious date reservations for the 2026–2027 wedding seasons are now accepting patron inscriptions. Open daily until 7:00 PM.
            </p>

            <div className="gsap-fade-up pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenInquiry()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF7F2] text-[#721B24] hover:bg-[#F3EDE2] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:scale-105 cursor-pointer"
              >
                Request Private Viewing
              </button>

              <button
                onClick={() => onNavigate('/venues')}
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-[#FAF7F2]/40 hover:border-[#D4AF37] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer"
              >
                Inspect All Three Venues
              </button>
            </div>

            <div className="gsap-fade-up pt-6 text-xs font-mono text-[#D4AF37]/80">
              Sevasi - Canal Rd, opp. Athletes Arena, near Jalsa Apartment, Vadodara • Concierge: +91 81550 89958 (081550 89958)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
