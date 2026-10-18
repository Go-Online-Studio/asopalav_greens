import React from 'react';
import { VENUES, Venue } from '../data/estateData';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

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
  // Normalize slug
  const normalizedSlug =
    slug === 'royal-lawn' ? 'lawn' : slug === 'crystal-hall' ? 'crystal-banquet' : slug;

  const venueIndex = VENUES.findIndex((v) => v.slug === normalizedSlug);
  const venue: Venue = VENUES[venueIndex >= 0 ? venueIndex : 0];

  const prevVenue = VENUES[(venueIndex - 1 + VENUES.length) % VENUES.length];
  const nextVenue = VENUES[(venueIndex + 1) % VENUES.length];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2A1C16] min-h-screen">
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#5C3D2E]">
        <button
          onClick={() => onNavigate('/venues')}
          className="inline-flex items-center gap-2 hover:text-[#721B24] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Spatial Portfolio</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[#C5A880]">
          <span>REALM NO. {venue.numeral}</span>
          <span>•</span>
          <span>VADODARA, GUJARAT</span>
        </div>
      </div>

      {/* 1. Fullscreen Hero Photo */}
      <section className="px-3 sm:px-6 pt-6 pb-12">
        <div className="max-w-7xl mx-auto relative h-[70vh] sm:h-[82vh] rounded-3xl overflow-hidden border border-[#C5A880]/40 shadow-2xl bg-[#2A1C16]">
          <img
            src={venue.heroImage}
            alt={venue.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/95 via-[#2A1C16]/40 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-[#FAF7F2]">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#721B24] border border-[#C5A880]/30 text-[#FAF7F2] text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                REALM {venue.numeral}
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light leading-none">
                {venue.name}
              </h1>
              <p className="text-base sm:text-xl text-[#F3EDE2]/90 font-light font-sans">
                {venue.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenInquiry(venue.name)}
                className="px-8 py-3.5 rounded-full bg-[#721B24] hover:bg-[#5a151c] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold border border-[#C5A880]/40 transition-all cursor-pointer shadow-xl hover:scale-105"
              >
                Inquire For This Venue
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Architecture Overview */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-[#C5A880]/30 pb-12">
          <div className="md:col-span-5 space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#721B24] uppercase">
              ARCHITECTURAL BRIEF
            </span>
            <h2 className="text-3xl font-serif text-[#2A1C16] font-light">
              Atmosphere & Intent
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-[#5C3D2E] text-base font-sans font-light leading-relaxed">
            <p>{venue.description}</p>
            <p className="italic text-sm text-[#2A1C16]">
              "{venue.tagline}"
            </p>
          </div>
        </div>

        {/* 3. Dual-Photo Architectural Diptych */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#5C3D2E] uppercase tracking-widest">
            <span>ARCHITECTURAL DIPTYCH STUDY</span>
            <span className="text-[#721B24]">FIGURES 01 & 02</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="group rounded-2xl overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-xl relative h-[360px] sm:h-[440px]">
              <img
                src={venue.diptych[0]}
                alt={`${venue.name} Diptych View 01`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-[#FAF7F2] space-y-1">
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">PERSPECTIVE 01</div>
                <div className="text-lg font-serif">Structural Framing & Natural Horizon</div>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-[#C5A880]/40 bg-[#2A1C16] shadow-xl relative h-[360px] sm:h-[440px]">
              <img
                src={venue.diptych[1]}
                alt={`${venue.name} Diptych View 02`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-[#FAF7F2] space-y-1">
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">PERSPECTIVE 02</div>
                <div className="text-lg font-serif">Illumination & Ceremonial Staging</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Amenities & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8">
          {/* Curated Inclusions (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#F3EDE2] border border-[#C5A880]/40 space-y-6">
            <div className="space-y-1">
              <div className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                ESTATE INCLUSIONS
              </div>
              <h3 className="text-2xl font-serif text-[#2A1C16]">
                Sanctuary Amenities
              </h3>
            </div>

            <ul className="space-y-3">
              {venue.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#5C3D2E]">
                  <CheckCircle2 className="w-4 h-4 text-[#721B24] flex-none mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#C5A880]/30">
              <button
                onClick={() => onOpenInquiry(venue.name)}
                className="w-full py-3.5 rounded-xl bg-[#2A1C16] hover:bg-[#721B24] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Reserve Auspicious Dates</span>
              </button>
            </div>
          </div>

          {/* Detailed Specs (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono text-[#5C3D2E] tracking-widest uppercase">
              CERTIFIED SPECIFICATIONS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {venue.specs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-white border border-[#C5A880]/30 shadow-sm space-y-1"
                >
                  <div className="text-[10px] font-mono text-[#5C3D2E]/70 uppercase tracking-wider">
                    {spec.label}
                  </div>
                  <div className="text-base font-serif font-bold text-[#2A1C16]">
                    {spec.value}
                  </div>
                  {spec.note && (
                    <div className="text-xs text-[#721B24] font-sans">{spec.note}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pagination Between Realms */}
      <section className="border-t border-[#C5A880]/30 py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => onNavigate(`/venues/${prevVenue.slug}`)}
            className="flex items-center gap-4 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-[#C5A880]/40 flex items-center justify-center group-hover:bg-[#F3EDE2] transition-colors">
              <ArrowLeft className="w-4 h-4 text-[#721B24]" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#5C3D2E]">
                PREVIOUS REALM {prevVenue.numeral}
              </div>
              <div className="font-serif text-lg text-[#2A1C16] group-hover:text-[#721B24] transition-colors">
                {prevVenue.name}
              </div>
            </div>
          </button>

          <button
            onClick={() => onOpenInquiry(venue.name)}
            className="px-8 py-3.5 rounded-full bg-[#721B24] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#58151C] transition-all cursor-pointer shadow-lg"
          >
            Reserve {venue.name}
          </button>

          <button
            onClick={() => onNavigate(`/venues/${nextVenue.slug}`)}
            className="flex items-center gap-4 text-right group cursor-pointer"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#5C3D2E]">
                NEXT REALM {nextVenue.numeral}
              </div>
              <div className="font-serif text-lg text-[#2A1C16] group-hover:text-[#721B24] transition-colors">
                {nextVenue.name}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#C5A880]/40 flex items-center justify-center group-hover:bg-[#F3EDE2] transition-colors">
              <ArrowRight className="w-4 h-4 text-[#721B24]" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default VenueDetailView;
