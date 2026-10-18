'use client';

import React, { useState } from 'react';
import { HeroParallax } from '../src/components/HeroParallax';
import { PinnedSpaces } from '../src/components/PinnedSpaces';
import { InquiryModal } from '../src/components/InquiryModal';
import { Crown, Car, Zap, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('The Grand Royal Lawn (45,000 Sq. Ft.)');

  const openInquiry = (venueName?: string) => {
    if (venueName) setSelectedVenue(venueName);
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2A1C16]">
      {/* 1. Hero Section with GSAP Parallax */}
      <HeroParallax
        onExploreSpaces={() => {
          const el = document.getElementById('spaces-showcase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInquiry={() => openInquiry()}
      />

      {/* 2. Editorial Statement (20% Text / 80% Visual Presence) */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-12">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] text-[#5C3D2E] uppercase whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
          ESTATE PHILOSOPHY & MONUMENTAL PROPORTIONS
        </div>

        <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A1C16] font-light leading-tight tracking-tight italic max-w-5xl mx-auto">
          “Forty-five thousand square feet of sculpted greenery, engineered for memories that outlive generations.”
        </blockquote>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#5C3D2E] font-sans font-light tracking-wide uppercase">
          An architectural symphony set amidst the serene botanical corridor of Sevasi, Vadodara.
        </p>

        {/* Three Key Metric Markers */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-[#C5A880]/30 py-10 max-w-4xl mx-auto">
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

      {/* 3. The Spaces: Horizontal Pinned Card Showcase (GSAP ScrollTrigger) */}
      <PinnedSpaces
        onSelectVenue={(slug) => {
          if (typeof window !== 'undefined') {
            window.location.href = `/venues/${slug}`;
          }
        }}
        onOpenInquiry={(venueName) => openInquiry(venueName)}
      />

      {/* 4. Graphic Service Highlights (Bento Grid with Hairline Gold Borders) */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5C3D2E] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
            INFRASTRUCTURE & HOSPITALITY CONCIERGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2A1C16] font-light leading-tight">
            ENGINEERED FOR <span className="italic font-normal">FLAWLESS REVELRY</span>
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-[#5C3D2E] font-sans font-light">
            Behind the poetic aesthetics lies a heavy-industrial infrastructure designed for frictionless large-scale celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Card 1: Dedicated Luxury Bridal Suites */}
          <div className="md:col-span-7 rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg flex flex-col justify-between">
            <div className="p-8 sm:p-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] text-[10px] font-mono tracking-widest uppercase">
                  SANCTUARY 01 & 02
                </span>
                <Crown className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16]">
                Dedicated Luxury Bridal Suites
              </h3>
              <p className="text-sm text-[#5C3D2E] font-sans font-light leading-relaxed max-w-lg">
                Twin high-security en-suite sanctuaries featuring private salon vanity stations, Italian marble restrooms, and direct discrete corridors connecting to the stage.
              </p>
            </div>
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#2A1C16]">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                alt="Bridal Preparation Suite"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Card 2: Executive Valet Concierge */}
          <div className="md:col-span-5 rounded-3xl bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#C5A880]/50 flex items-center justify-center text-[#D4AF37]">
                <Car className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#C5A880] tracking-widest uppercase">
                MOTOR COURT LOGISTICS
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light leading-tight">
                Executive Valet Concierge <br />
                <span className="italic font-normal text-[#C5A880]">(500+ Vehicles)</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-sans font-light leading-relaxed">
                Paved arterial ingress and egress loops completely isolated from through-traffic, staffed by uniformed valet chauffeurs.
              </p>
            </div>
            <div className="pt-8 border-t border-[#C5A880]/30 space-y-2 text-xs font-mono text-[#FAF7F2]/70">
              <div className="flex justify-between">
                <span>PAVED MOTOR COURT:</span>
                <span className="text-[#C5A880]">100% ASPHALT & INTERLOCK</span>
              </div>
            </div>
          </div>

          {/* Card 3: Heavy Rigging */}
          <div className="md:col-span-5 rounded-3xl bg-[#FAF7F2] border border-[#C5A880]/50 p-8 sm:p-10 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F3EDE2] border border-[#C5A880]/50 flex items-center justify-center text-[#721B24]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                CONCERT SPECIFICATION
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] font-light">
                Heavy Rigging & <br />
                <span className="italic font-normal">3-Phase Energy Grid</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#5C3D2E] font-sans font-light leading-relaxed">
                Dual 500 kVA synchronized generator backups deliver uninterrupted zero-flicker power.
              </p>
            </div>
          </div>

          {/* Card 4: Chef-Curated Catering Plazas */}
          <div className="md:col-span-7 rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 overflow-hidden group shadow-lg flex flex-col justify-between">
            <div className="p-8 sm:p-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#2F3E34] text-[#FAF7F2] text-[10px] font-mono tracking-widest uppercase">
                  CULINARY THEATER
                </span>
                <UtensilsCrossed className="w-5 h-5 text-[#5C3D2E]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16]">
                Chef-Curated Catering Plazas
              </h3>
              <p className="text-sm text-[#5C3D2E] font-sans font-light leading-relaxed max-w-lg">
                Independent commercial commissary yard with dedicated commercial water lines, gas manifold bays, and discrete waiter service tunnels.
              </p>
            </div>
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#2A1C16]">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85"
                alt="Opulent Tablescape"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Final Invitation */}
      <section className="px-3 sm:px-6 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#721B24] border border-[#C5A880]/50 p-8 sm:p-16 text-center text-[#FAF7F2] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A0E17] border border-[#C5A880]/40 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PATRON’S PRIVILEGE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light leading-tight tracking-tight">
              BEGIN THE ARCHITECTURE <br />
              <span className="italic font-normal">OF YOUR CELEBRATION</span>
            </h2>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openInquiry()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF7F2] text-[#721B24] hover:bg-[#F3EDE2] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:scale-105 cursor-pointer"
              >
                Request Private Viewing
              </button>
            </div>
          </div>
        </div>
      </section>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedVenue={selectedVenue}
      />
    </div>
  );
}
