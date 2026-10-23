import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown, HelpCircle, Phone, MapPin, Sparkles, Accessibility } from 'lucide-react';
import { WordReveal } from '../utils/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'How can I book a banquet hall or lawn at Asopalav Greens?',
    answer:
      'You can get in touch with our estate concierge directly by calling +91 81550 89958 / +91 98985 63788, sending a WhatsApp message, or completing the online inquiry dossier. Our booking concierge is available daily during office hours (9:30 AM – 7:00 PM, with 24/7 digital and phone inquiry support) to check auspicious dates and reserve your celebration.',
    category: 'Reservations',
  },
  {
    question: 'What are the key amenities available at Asopalav Greens Banquet & Party Plot?',
    answer:
      'The estate provides world-class amenities including Wheelchair Accessible In-Car Parking, Wheelchair Accessible Entrances and Exits, twin luxury en-suite Bridal Sanctuaries with private vanity salons, 100% dual 500 kVA synchronized DG power backup, 500+ vehicle paved valet motor court, 6,000 sq. ft. commercial catering commissary yard, and 28-foot heavy rigging truss infrastructure.',
    category: 'Amenities',
  },
  {
    question: 'What is the typical size and capacity of the event spaces?',
    answer:
      'Asopalav Greens features three distinct architectural realms: The Grand Royal Lawn spans 45,000 sq. ft. (floating capacity up to 3,000 guests), The Crystal Pillarless Hall spans 18,000 sq. ft. (up to 1,200 guests with 28 ft. clear ceiling height), and The Courtyard & Mandap Grove spans 12,000 sq. ft. (up to 600 guests). Spaces can be booked individually or as a concurrent full estate buyout.',
    category: 'Venues',
  },
  {
    question: 'Can I personally visit Asopalav Greens Banquet & Party Plot before booking?',
    answer:
      'Yes, absolutely. We warmly welcome prospective couples, families, and wedding planners for private curated walk-throughs to personally inspect the grounds, lighting infrastructure, banquet halls, and backstage amenities. Walk-throughs are hosted daily from 9:30 AM to 7:00 PM by prior appointment.',
    category: 'Visits',
  },
  {
    question: 'Can I customise the decoration, mandap, and catering setup?',
    answer:
      'Yes. Asopalav Greens allows complete customization of event decor, floral architecture, concert lighting, and themed mandaps. We provide pre-decorated setup options as well as full freedom to collaborate with your chosen luxury wedding decorators and caterers.',
    category: 'Customization',
  },
  {
    question: 'How can I contact Asopalav Greens Banquet & Party Plot in Vadodara?',
    answer:
      'You can reach our team via telephone at +91 81550 89958 / +91 98985 63788 or WhatsApp, or visit us in person at Sevasi - Canal Rd, opp. Athletes Arena, near Jalsa Apartment, Sevasi, Vadodara, Gujarat 391101 (Google Plus Code: 845F+J3 Vadodara).',
    category: 'Contact',
  },
];

interface FAQSectionProps {
  onOpenInquiry?: () => void;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenInquiry, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.faq-card');
      items.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} className={`py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto ${className}`}>
      {/* Editorial Header */}
      <div className="text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EDE2] border border-[#C5A880]/40 text-[#721B24] text-xs font-mono tracking-widest uppercase">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>ESTATE PROTOCOLS & INQUIRIES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#2A1C16] font-light leading-tight">
          <WordReveal text="FREQUENTLY ASKED" />{' '}
          <span className="italic font-normal"><WordReveal text="QUESTIONS" /></span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5C3D2E] font-sans font-light">
          Essential information regarding bookings, spatial capacities, wheelchair accessibility, and custom event curation at Asopalav Greens.
        </p>

        {/* Accessibility badge */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#5C3D2E]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#C5A880]/30 shadow-xs">
            <Accessibility className="w-3.5 h-3.5 text-[#721B24]" />
            Wheelchair Accessible Parking & Entrances
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#C5A880]/30 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Open Air & Pre-Decorated Banquet Halls
          </span>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`faq-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#721B24]/40 shadow-lg ring-1 ring-[#721B24]/20'
                  : 'bg-[#F3EDE2]/60 hover:bg-[#F3EDE2] border-[#C5A880]/30 shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-xs font-mono font-bold text-[#721B24] pt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="font-serif text-lg sm:text-xl text-[#2A1C16] font-medium leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 rounded-full border border-[#C5A880]/40 flex items-center justify-center flex-none text-[#721B24] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#721B24] text-white' : 'bg-white'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-[#5C3D2E] font-sans font-light leading-relaxed border-t border-[#C5A880]/20 mt-2 pt-4">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Contact Help Strip */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
            HAVE ADDITIONAL QUESTIONS?
          </div>
          <div className="font-serif text-lg sm:text-xl font-light">
            Speak directly with our senior estate curators
          </div>
          <div className="text-xs font-mono text-[#FAF7F2]/70">
            Sevasi - Canal Rd, opp. Athletes Arena, Vadodara • Daily 9:30 AM – 7:00 PM
          </div>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
          <a
            href="tel:+918155089958"
            className="px-4 sm:px-5 py-3 rounded-full bg-[#FAF7F2] text-[#2A1C16] hover:bg-[#F3EDE2] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-[#721B24]" />
            <span>+91 81550 89958</span>
          </a>

          <a
            href="tel:+919898563788"
            className="px-4 sm:px-5 py-3 rounded-full bg-[#FAF7F2] text-[#2A1C16] hover:bg-[#F3EDE2] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-[#721B24]" />
            <span>+91 98985 63788</span>
          </a>

          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="px-5 py-3 rounded-full border border-[#C5A880] text-[#D4AF37] hover:bg-[#721B24] hover:text-[#FAF7F2] text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
            >
              Inquire Online
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
