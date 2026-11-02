import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { WordReveal } from '../utils/animations';
import { FAQSection } from '../components/FAQSection';
import { Phone, Mail, MapPin, Compass, Clock, Check, Sparkles, ArrowRight, MessageCircle, Accessibility } from 'lucide-react';
import { openWhatsApp, useWhatsAppUrl } from '../utils/whatsapp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactViewProps {
  onOpenInquiry: (venue?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenInquiry }) => {
  const [celebrationType, setCelebrationType] = useState('Wedding & Reception');
  const [preferredVenue, setPreferredVenue] = useState('The Banquet (9,000 Sq. Ft.)');
  const [guestCount, setGuestCount] = useState(1200);
  const [preferredDate, setPreferredDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('Evening Celebration (05:00 PM – Midnight)');
  const [patronName, setPatronName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [specialRemarks, setSpecialRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!celebrationType.trim()) {
      errs.celebrationType = 'Please select a type of celebration.';
    }
    if (!preferredVenue.trim()) {
      errs.preferredVenue = 'Please select your preferred venue space.';
    }
    if (!preferredDate) {
      errs.preferredDate = 'Please select your preferred date.';
    }
    if (!timeSlot.trim()) {
      errs.timeSlot = 'Please select an event timing.';
    }
    if (!patronName.trim()) {
      errs.patronName = 'Please enter your full name.';
    }
    const cleanPhone = contactNumber.replace(/[\s\-()]/g, '');
    if (!cleanPhone) {
      errs.contactNumber = 'Please enter your phone / WhatsApp number.';
    } else if (!/^(?:\+?91)?[6789]\d{9}$/.test(cleanPhone)) {
      errs.contactNumber = 'Please enter a valid 10-digit mobile number.';
    }
    if (patronEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patronEmail.trim())) {
      errs.patronEmail = 'Please enter a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Direct WhatsApp dispatch with structured message (dynamically mobile vs desktop)
    const msg = `Hello Asopalav Greens team,\n\nI wish to inquire about booking the venue.\n• Name: ${patronName.trim()}\n• Phone: ${contactNumber.trim()}\n• Email: ${patronEmail.trim() || 'Not provided'}\n• Celebration: ${celebrationType}\n• Venue: ${preferredVenue}\n• Guests: ${guestCount}\n• Preferred Date: ${preferredDate}\n• Timing: ${timeSlot}${specialRemarks.trim() ? `\n• Notes: ${specialRemarks.trim()}` : ''}\n\nPlease share venue details and date availability.`;
    openWhatsApp(msg);

    setSubmitted(true);
  };

  const handleWhatsAppChat = () => {
    const msg = `Hello Asopalav Greens team,\n\nI wish to arrange a venue visit.\n• Name: ${patronName || 'Prospective Host'}\n• Celebration: ${celebrationType}\n• Venue: ${preferredVenue}\n• Guests: ${guestCount}\n• Preferred Date: ${preferredDate}\n\nPlease let me know the available time slots.`;
    openWhatsApp(msg);
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
              BOOKINGS &amp; INQUIRIES
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif text-[#2A1C16] font-light leading-[1.04]">
              <WordReveal text="CONTACT &" />{' '}
              <span className="italic font-normal"><WordReveal text="BOOKINGS" /></span>
            </h1>
            <p className="gsap-fade-up text-sm sm:text-base xl:text-lg text-[#5C3D2E] font-sans font-light leading-relaxed">
              We look forward to helping you plan your special day. Book an in-person venue visit or get in touch with our team to check auspicious date availability.
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
                  LOCATION &amp; ACCESSIBILITY
                </span>
                <h2 className="text-3xl font-serif text-[#2A1C16] font-light">
                  <WordReveal text="Convenient Sevasi Location" />
                </h2>
                <p className="gsap-fade-up text-sm text-[#5C3D2E] font-sans font-light leading-relaxed">
                  Located along Sevasi-Bhimpura Main Road in Vadodara, offering a peaceful green setting that is easily accessible for your guests, baraat processions, and event vehicles.
                </p>
              </div>

              {/* Address Card (bg-[#FAF7F2] stands out crisply on darker cream) */}
              <div className="gsap-scale-in p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#C5A880]/40 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#721B24] flex-none mt-1" />
                <div className="space-y-1">
                  <div className="text-base font-serif text-[#2A1C16] font-medium leading-snug">
                    <a href="https://maps.app.goo.gl/7GF5DqUVsYPV5fwn7" target="_blank" rel="noopener noreferrer" className="text-[#2A1C16] hover:text-[#721B24] transition-colors">Asopalav Greens Banquet & Party Plot <br />
                    Sevasi - Canal Rd, opp. Athletes Arena, near Jalsa Apartment, <br />
                    Sevasi, Vadodara, Gujarat 391101, India.</a>
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
                  <div className="text-sm sm:text-xl font-serif font-bold text-[#721B24]">20 MIN</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#5C3D2E] uppercase mt-0.5 sm:mt-1">Alkapuri</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#C5A880]/30">
                  <div className="text-sm sm:text-xl font-serif font-bold text-[#721B24]">32 MIN</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#5C3D2E] uppercase mt-0.5 sm:mt-1">BDQ Airport</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#C5A880]/30">
                  <div className="text-sm sm:text-xl font-serif font-bold text-[#721B24]">22 MIN</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#5C3D2E] uppercase mt-0.5 sm:mt-1">Vadodara Rly</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Support Button */}
            <div className="gsap-scale-in p-5 sm:p-6 rounded-3xl bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
                <MessageCircle className="w-4 h-4" />
                INSTANT WHATSAPP SUPPORT
              </div>
              <div className="text-base sm:text-lg font-serif">
                Prefer to chat directly with our team?
              </div>
              <button
                onClick={handleWhatsAppChat}
                className="w-full py-3 sm:py-3.5 rounded-full bg-[#FAF7F2] text-[#2A1C16] hover:bg-[#F3EDE2] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Phone className="w-4 h-4 text-[#721B24]" />
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="gsap-scale-in lg:col-span-7 bg-[#FAF7F2] rounded-3xl border border-[#C5A880]/40 p-4 sm:p-12 shadow-xl relative">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#721B24] border border-[#C5A880] mx-auto flex items-center justify-center text-[#D4AF37]">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                    INQUIRY RECEIVED
                  </div>
                  <h3 className="text-3xl font-serif text-[#2A1C16]">
                    Thank You For Reaching Out
                  </h3>
                  <p className="max-w-md mx-auto text-sm text-[#5C3D2E] font-light leading-relaxed">
                    Thank you, <span className="font-semibold">{patronName}</span>. We have received your inquiry for <span className="font-semibold">{preferredDate}</span>. Our event coordinator will get in touch with you shortly.
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
                    EVENT INQUIRY &amp; DATE CHECK
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] font-light">
                    <WordReveal text="Check Auspicious Dates" />
                  </h3>
                  <p className="gsap-fade-up text-xs text-[#5C3D2E] font-light">
                    Fill in your celebration details below and our team will get in touch promptly.
                  </p>
                </div>

                {/* Celebration Type */}
                <div className="gsap-fade-up space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                    Type of Celebration *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Wedding & Reception',
                      'Sangeet & Musical Night',
                      'Sacred Pheras & Mandap Ceremony',
                      'Corporate Gala & Annual Event',
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setCelebrationType(type);
                          if (errors.celebrationType) {
                            setErrors((prev) => ({ ...prev, celebrationType: '' }));
                          }
                        }}
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
                  {errors.celebrationType && (
                    <p className="text-xs text-red-600 font-sans mt-1">{errors.celebrationType}</p>
                  )}
                </div>

                {/* Preferred Venue Space */}
                <div className="gsap-fade-up space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                    Preferred Space *
                  </label>
                  <select
                    value={preferredVenue}
                    onChange={(e) => {
                      setPreferredVenue(e.target.value);
                      if (errors.preferredVenue) {
                        setErrors((prev) => ({ ...prev, preferredVenue: '' }));
                      }
                    }}
                    className={`w-full p-3 rounded-xl border bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                      errors.preferredVenue ? 'border-red-500' : 'border-[#C5A880]/50'
                    }`}
                  >
                    <option value="The Banquet (9,000 Sq. Ft.)">The Banquet (9,000 Sq. Ft. • 750 Seating)</option>
                    <option value="The Lawn (30,000 Sq. Ft.)">The Lawn (Party Plot 30,000 Sq. Ft. • 1,200 Seating)</option>
                    <option value="Combined Venue (Both Spaces)">Combined Venue Booking (Banquet & Lawn)</option>
                  </select>
                  {errors.preferredVenue && (
                    <p className="text-xs text-red-600 font-sans mt-1">{errors.preferredVenue}</p>
                  )}
                </div>

                {/* Guest Count Slider */}
                <div className="gsap-fade-up space-y-3 bg-white p-4 rounded-2xl border border-[#C5A880]/30">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="uppercase text-[#5C3D2E] tracking-wider">Estimated Guests</span>
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
                    <span>1,500 (Grand)</span>
                    <span>3,500 (Mega Celebration)</span>
                  </div>
                </div>

                {/* Date & Time Preference */}
                <div className="gsap-fade-up grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => {
                        setPreferredDate(e.target.value);
                        if (errors.preferredDate) {
                          setErrors((prev) => ({ ...prev, preferredDate: '' }));
                        }
                      }}
                      className={`w-full p-3 rounded-xl border bg-white text-xs font-mono text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                        errors.preferredDate ? 'border-red-500' : 'border-[#C5A880]/50'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="text-xs text-red-600 font-sans mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Event Timing *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => {
                        setTimeSlot(e.target.value);
                        if (errors.timeSlot) {
                          setErrors((prev) => ({ ...prev, timeSlot: '' }));
                        }
                      }}
                      className={`w-full p-3 rounded-xl border bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                        errors.timeSlot ? 'border-red-500' : 'border-[#C5A880]/50'
                      }`}
                    >
                      <option value="Evening Celebration (05:00 PM – Midnight)">Evening Celebration (05:00 PM – Midnight)</option>
                      <option value="Morning / Afternoon Ceremony (10:00 AM – 04:00 PM)">Morning / Afternoon Ceremony (10:00 AM – 04:00 PM)</option>
                      <option value="Full Day Event (10:00 AM to Midnight)">Full Day Event (10:00 AM to Midnight)</option>
                    </select>
                    {errors.timeSlot && (
                      <p className="text-xs text-red-600 font-sans mt-1">{errors.timeSlot}</p>
                    )}
                  </div>
                </div>

                {/* Host Details */}
                <div className="gsap-fade-up grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Patel"
                      value={patronName}
                      onChange={(e) => {
                        setPatronName(e.target.value);
                        if (errors.patronName) {
                          setErrors((prev) => ({ ...prev, patronName: '' }));
                        }
                      }}
                      className={`w-full p-3 rounded-xl border bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                        errors.patronName ? 'border-red-500' : 'border-[#C5A880]/50'
                      }`}
                    />
                    {errors.patronName && (
                      <p className="text-xs text-red-600 font-sans mt-1">{errors.patronName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={contactNumber}
                      onChange={(e) => {
                        setContactNumber(e.target.value);
                        if (errors.contactNumber) {
                          setErrors((prev) => ({ ...prev, contactNumber: '' }));
                        }
                      }}
                      className={`w-full p-3 rounded-xl border bg-white text-xs font-mono text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                        errors.contactNumber ? 'border-red-500' : 'border-[#C5A880]/50'
                      }`}
                    />
                    {errors.contactNumber && (
                      <p className="text-xs text-red-600 font-sans mt-1">{errors.contactNumber}</p>
                    )}
                  </div>
                </div>

                <div className="gsap-fade-up space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={patronEmail}
                    onChange={(e) => {
                      setPatronEmail(e.target.value);
                      if (errors.patronEmail) {
                        setErrors((prev) => ({ ...prev, patronEmail: '' }));
                      }
                    }}
                    className={`w-full p-3 rounded-xl border bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                      errors.patronEmail ? 'border-red-500' : 'border-[#C5A880]/50'
                    }`}
                  />
                  {errors.patronEmail && (
                    <p className="text-xs text-red-600 font-sans mt-1">{errors.patronEmail}</p>
                  )}
                </div>

                <div className="gsap-fade-up space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                    Special Requirements &amp; Setup Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Shehnai entrance, 2-day wedding setup, special food counters..."
                    value={specialRemarks}
                    onChange={(e) => setSpecialRemarks(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                  />
                </div>

                <button
                  type="submit"
                  className="gsap-fade-up w-full py-4 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold border border-[#C5A880]/50 shadow-xl shadow-wine-900/30 transition-all cursor-pointer"
                >
                  Submit &amp; Open WhatsApp
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
