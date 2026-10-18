import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, Instagram, Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#2A1C16] text-[#FAF7F2] border-t border-[#C5A880]/30 pt-16 sm:pt-24 pb-12 overflow-hidden">
      {/* Delicate Gold Grid Accent Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#C5A880 1px, transparent 1px), linear-gradient(90deg, #C5A880 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Header Row with Back-to-Top (Centered on Mobile) */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-10 sm:pb-12 border-b border-[#C5A880]/20 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-3">
            <button
              onClick={() => {
                onNavigate('/');
                scrollToTop();
              }}
              className="group cursor-pointer focus:outline-none"
            >
              <img
                src="/images/LOGO_Asopalav.webp"
                alt="Asopalav Greens"
                className="h-12 sm:h-18 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <p className="text-xs text-[#FAF7F2]/60 font-sans tracking-widest uppercase">
              SEVASI-BHIMPURA ROAD, VADODARA, GUJARAT
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 w-full md:w-auto">
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded-full bg-[#721B24] hover:bg-[#8A242E] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium border border-[#C5A880]/40 transition-all cursor-pointer shadow-md"
            >
              Inquire For 2026–2027
            </button>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group w-11 h-11 rounded-full border border-[#C5A880]/40 hover:border-[#D4AF37] bg-[#2A1C16] flex items-center justify-center text-[#C5A880] hover:text-[#FAF7F2] transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Oversized Serif Address & Spatial Block (Centered on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 py-12 sm:py-16 border-b border-[#C5A880]/20 text-center md:text-left">
          {/* Col 1-6: Oversized Address Block */}
          <div className="lg:col-span-6 space-y-5 flex flex-col items-center md:items-start">
            <div className="text-xs font-mono text-[#C5A880] tracking-widest uppercase">
              LOCATION & COORDINATES
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#FAF7F2] font-light leading-snug max-w-xl">
              Sevasi - Canal Rd, opp. Athletes Arena, near Jalsa Apartment, <br className="hidden sm:inline" />
              Sevasi, Vadodara, Gujarat 391101, India.
            </h3>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs font-mono text-[#FAF7F2]/70">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C5A880]" />
                PLUS CODE: 845F+J3 Vadodara
              </span>
              <span>•</span>
              <span>15 MIN FROM ALKAPURI</span>
              <span>•</span>
              <span>25 MIN FROM BDQ AIRPORT</span>
            </div>
            <div className="text-xs font-mono text-[#D4AF37] pt-1">
              ✓ Wheelchair Accessible Parking & Entrances/Exits
            </div>
          </div>

          {/* Col 7-9: Navigation */}
          <div className="lg:col-span-3 space-y-4 flex flex-col items-center md:items-start">
            <div className="text-xs font-mono text-[#C5A880] tracking-widest uppercase">
              THE PORTFOLIO
            </div>
            <ul className="space-y-3 text-sm font-sans font-light text-[#FAF7F2]/80 flex flex-col items-center md:items-start">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  The Grounds (Overview)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/venues')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  The Grand Royal Lawn (45,000 Sq. Ft.)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/venues')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  The Crystal Pillarless Hall
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/venues')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  The Courtyard & Mandap Grove
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/gallery')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  Visual Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Col 10-12: Private Concierge */}
          <div className="lg:col-span-3 space-y-4 flex flex-col items-center md:items-start">
            <div className="text-xs font-mono text-[#C5A880] tracking-widest uppercase">
              PRIVATE CONCIERGE
            </div>
            <div className="space-y-3 text-sm font-sans font-light text-[#FAF7F2]/80 flex flex-col items-center md:items-start">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <a href="tel:+918155089958" className="hover:text-[#C5A880] transition-colors">
                  +91 81550 89958 (081550 89958)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <a href="mailto:concierge@asopalavgrens.com" className="hover:text-[#C5A880] transition-colors">
                  concierge@asopalavgrens.com
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-xs text-[#FAF7F2]/60 pt-2 font-mono text-center md:text-left">
                VISITING HOURS: OPEN DAILY (CLOSES 7:00 PM IST)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright (Centered on Mobile) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#FAF7F2]/50 gap-4 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} ASOPALAV GREENS BANQUET & PARTY PLOT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
            <span className="hover:text-[#FAF7F2] transition-colors">PRIVACY CODE</span>
            <span>•</span>
            <span className="hover:text-[#FAF7F2] transition-colors">TERMS OF PATRONAGE</span>
            <span>•</span>
            <span className="text-[#C5A880]">ARCHITECTURAL PREVIEW</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
