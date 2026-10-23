import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { WordReveal } from '../utils/animations';
import { FAQSection } from '../components/FAQSection';
import { Phone, Mail, MapPin, Compass, Clock, Check, Sparkles, ArrowRight, MessageCircle, Accessibility } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactViewProps {
  onOpenInquiry: (venue?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenInquiry }) => {
  const [celebrationType, setCelebrationType] = useState('Royal Wedding & Reception');
  const [preferredVenue, setPreferredVenue] = useState('The Banquet (30,000 Sq. Ft.)');
  const [guestCount, setGuestCount] = useState(1200);
  const [preferredDate, setPreferredDate] = useState('2026-12-10');
  const [timeSlot, setTimeSlot] = useState('Twilight & Evening Gala (05:00 PM – Midnight)');
  const [patronName, setPatronName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [specialRemarks, setSpecialRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppChat = () => {
    const msg = encodeURIComponent(
      `Hello Concierge at Asopalav Greens,\n\nI wish to arrange a private viewing of the estate.\n• Name: ${patronName || 'Prospective Host'}\n• Celebration: ${celebrationType}\n• Venue: ${preferredVenue}\n• Guests: ${guestCount}\n• Preferred Date: ${preferredDate}\n\nPlease let me know available slots.`
    );
    window.open(`https://wa.me/918155089958?text=${msg}`, '_blank');
  };

  useGSAP(
    () => {
      // ── Word Reveal animations ──
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

      // ── Fade-in-up ──
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

      // ── Scale-in ──
      const scaleIns = gsap.utils.toArray<HTMLElement>('.gsap-scale-in');
      scaleIns.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Stagger children ──
      const staggerGroups = gsap.utils.toArray<HTMLElement>('.gsap-stagger');
      staggerGroups.forEach((group) => {
        const children = group.children;
        gsap.fromTo(
          children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full bg-[#FAF7F2] text-[#2A1C16] min-h-screen">
      {/* Editorial Header — Natural Cream bg-[#FAF7F2] */}
      <section className="w-full bg-[#FAF7F2] pt-12 sm:pt-20 pb-12 border-b border-[#C5A880]/30">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="space-y-4 max-w-3xl xl:max-w-4xl">
            <div className="gsap-fade-up flex items-center gap-2 text-xs xl:text-sm font-mono text-[#721B24] tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
              ESTATE PROTOCOL & DIARY RESERVATIONS
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif text-[#2A1C16] font-light leading-[1.04]">
              <WordReveal text="CONCIERGE &" />{' '}
              <span className="italic font-normal"><WordReveal text="DATES" /></span>
            </h1>
            <p className="gsap-fade-up text-sm sm:text-base xl:text-lg text-[#5C3D2E] font-sans font-light leading-relaxed">
              Inscribe your celebratory vision into our rolling diary. We welcome patrons and bridal architects for private walk-throughs by prior appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Split — Slightly Darker Cream bg-[#F3EDE2] */}
      <section className="w-full bg-[#F3EDE2] py-14 sm:py-20 xl:py-24 border-b border-[#C5A880]/30">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            {/* Left Column: Location & Coordinates */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="gsap-fade-up text-xs font-mono text-[#721B24] tracking-widest uppercase">
                  COORDINATES & REACH
                </span>
                <h2 className="text-3xl font-serif text-[#2A1C16] font-light">
                  <WordReveal text="The Sevasi Sanctuary" />
                </h2>
                <p className="gsap-fade-up text-sm text-[#5C3D2E] font-sans font-light leading-relaxed">
                  Positioned in Vadodara's most distinguished tranquil enclave along Sevasi-Bhimpura Main Road, insulated from city noise while remaining easily accessible for high-profile cortèges.
                </p>
              </div>

              {/* Address Card (bg-[#FAF7F2] stands out crisply on darker cream) */}
              <div className="gsap-scale-in p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#C5A880]/40 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#721B24] flex-none mt-1" />
                <div className="space-y-1">
                  <div className="text-base font-serif text-[#2A1C16] font-medium leading-snug">
                    Asopalav Greens Banquet & Party Plot <br />
                    Sevasi - Canal Rd, opp. Athletes Arena, near Jalsa Apartment, <br />
                    Sevasi, Vadodara, Gujarat 391101, India.
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#C5A880]/30 space-y-2.5 text-xs font-mono text-[#5C3D2E]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C5A880] flex-none" />
                  <span>PLUS CODE: 845F+J3 Vadodara, Gujarat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C5A880] flex-none" />
                  <span>OFFICE HOURS: 9:30 AM – 7:00 PM (OPEN DAILY)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#C5A880] flex-none mt-0.5" />
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-semibold text-[#2A1C16]">TELEPHONE:</span>
                    <a href="tel:+918155089958" className="hover:text-[#721B24] transition-colors">+91 81550 89958</a>
                    <span>/</span>
                    <a href="tel:+919898563788" className="hover:text-[#721B24] transition-colors">+91 98985 63788</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C5A880] flex-none" />
                  <span className="font-semibold text-[#2A1C16]">EMAIL:</span>
                  <a href="mailto:asopalavgreens03@gmail.com" className="hover:text-[#721B24] transition-colors lowercase">asopalavgreens03@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Accessibility className="w-4 h-4 text-[#721B24] flex-none" />
                  <span className="text-[#721B24] font-medium">WHEELCHAIR ACCESSIBLE PARKING & ENTRANCES</span>
                </div>
              </div>
            </div>

            {/* Travel Times Grid */}
            <div className="space-y-3">
              <div className="gsap-fade-up text-xs font-mono text-[#5C3D2E] tracking-widest uppercase">
                TRANSIT TIMELINES
              </div>
              <div className="gsap-stagger grid grid-cols-3 gap-2 sm:gap-3 text-center">
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#C5A880]/30">
                  <div className="text-sm sm:text-xl font-serif font-bold text-[#721B24]">15 MIN</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#5C3D2E] uppercase mt-0.5 sm:mt-1">Alkapuri</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#C5A880]/30">
                  <div className="text-sm sm:text-xl font-serif font-bold text-[#721B24]">25 MIN</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#5C3D2E] uppercase mt-0.5 sm:mt-1">BDQ Airport</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#C5A880]/30">
                  <div className="text-sm sm:text-xl font-serif font-bold text-[#721B24]">20 MIN</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#5C3D2E] uppercase mt-0.5 sm:mt-1">Vadodara Rly</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Concierge Button */}
            <div className="gsap-scale-in p-5 sm:p-6 rounded-3xl bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
                <MessageCircle className="w-4 h-4" />
                INSTANT PRIVATE CHANNEL
              </div>
              <div className="text-base sm:text-lg font-serif">
                Prefer immediate liaison with our Head Curator?
              </div>
              <button
                onClick={handleWhatsAppChat}
                className="w-full py-3 sm:py-3.5 rounded-full bg-[#FAF7F2] text-[#2A1C16] hover:bg-[#F3EDE2] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Phone className="w-4 h-4 text-[#721B24]" />
                Launch WhatsApp Concierge
              </button>
            </div>
          </div>

          {/* Right Column: Booking Form (bg-[#FAF7F2] stands out cleanly against darker cream section) */}
          <div className="gsap-scale-in lg:col-span-7 bg-[#FAF7F2] rounded-3xl border border-[#C5A880]/40 p-4 sm:p-12 shadow-xl relative">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#721B24] border border-[#C5A880] mx-auto flex items-center justify-center text-[#D4AF37]">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                    OFFICIAL INSCRIPTION COMPLETE
                  </div>
                  <h3 className="text-3xl font-serif text-[#2A1C16]">
                    We Await Welcoming You
                  </h3>
                  <p className="max-w-md mx-auto text-sm text-[#5C3D2E] font-light leading-relaxed">
                    Thank you, <span className="font-semibold">{patronName}</span>. Your requested dates for <span className="font-semibold">{preferredDate}</span> have been forwarded directly to our senior estate managers.
                  </p>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-[#721B24] text-[#721B24] text-xs uppercase tracking-widest hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 border-b border-[#C5A880]/30 pb-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#721B24] tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    ESTATE DIARY REGISTRATION
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] font-light">
                    <WordReveal text="Inquire For 2026–2027 Dates" />
                  </h3>
                  <p className="gsap-fade-up text-xs text-[#5C3D2E] font-light">
                    Complete the formal dossier below for priority date allocation.
                  </p>
                </div>

                {/* Celebration Type */}
                <div className="gsap-fade-up space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                    Celebration Format *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Royal Wedding & Reception',
                      'Grand Sangeet & Musical Eve',
                      'Sacred Pheras & Mandap Ritual',
                      'High-Echelon Corporate Gala',
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCelebrationType(type)}
                        className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer ${
                          celebrationType === type
                            ? 'bg-[#FAF7F2] border-[#721B24] text-[#721B24] font-semibold ring-1 ring-[#721B24]'
                            : 'bg-white border-[#C5A880]/30 hover:border-[#C5A880] text-[#2A1C16]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Venue Space */}
                <div className="gsap-fade-up space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                    Preferred Space
                  </label>
                  <select
                    value={preferredVenue}
                    onChange={(e) => setPreferredVenue(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                  >
                    <option value="The Banquet (30,000 Sq. Ft.)">The Banquet (30,000 Sq. Ft. • 750 Seating)</option>
                    <option value="The Lawn (9,000 Sq. Ft.)">The Lawn (9,000 Sq. Ft. Party Plot • 1,200 Seating)</option>
                    <option value="Combined Estate (Both Spaces)">Combined Estate Booking (Banquet & Lawn)</option>
                  </select>
                </div>

                {/* Guest Count Slider */}
                <div className="gsap-fade-up space-y-3 bg-white p-4 rounded-2xl border border-[#C5A880]/30">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="uppercase text-[#5C3D2E] tracking-wider">Estimated Patronage</span>
                    <span className="px-3 py-1 rounded-full bg-[#721B24] text-[#FAF7F2] font-bold">
                      {guestCount.toLocaleString()} GUESTS
                    </span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={3500}
                    step={50}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-[#721B24] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#5C3D2E]/70">
                    <span>150 (Intimate)</span>
                    <span>1,500 (Banqueting)</span>
                    <span>3,500 (Monolithic)</span>
                  </div>
                </div>

                {/* Date & Time Preference */}
                <div className="gsap-fade-up grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Target Calendar Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-mono text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Ritual / Reception Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    >
                      <option value="Twilight & Evening Gala (05:00 PM – Midnight)">Twilight & Evening Gala (05:00 PM – Midnight)</option>
                      <option value="Auspicious Daytime / Twilight Pheras (10:00 AM – 04:00 PM)">Auspicious Daytime / Twilight Pheras (10:00 AM – 04:00 PM)</option>
                      <option value="Full-Day Double Shift (10:00 AM to Midnight)">Full-Day Double Shift (10:00 AM to Midnight)</option>
                    </select>
                  </div>
                </div>

                {/* Host Details */}
                <div className="gsap-fade-up grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Host Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Seth Harshvardhan Patel"
                      value={patronName}
                      onChange={(e) => setPatronName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Contact Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-mono text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    />
                  </div>
                </div>

                <div className="gsap-fade-up space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patel@familyoffice.in"
                    value={patronEmail}
                    onChange={(e) => setPatronEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                  />
                </div>

                <div className="gsap-fade-up space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                    Bespoke Vision / Rigging Needs
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Traditional shehnai courtyard requirement, 2-day wedding setup, multi-tier buffet..."
                    value={specialRemarks}
                    onChange={(e) => setSpecialRemarks(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                  />
                </div>

                <button
                  type="submit"
                  className="gsap-fade-up w-full py-4 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold border border-[#C5A880]/50 shadow-xl shadow-wine-900/30 transition-all cursor-pointer"
                >
                  Submit Official Estate Inscription
                </button>
              </form>
            )}
          </div>
        </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
};

export default ContactView;
