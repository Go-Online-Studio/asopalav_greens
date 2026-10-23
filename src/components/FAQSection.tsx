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
      'Asopalav Greens features two distinct event spaces: The Banquet spans 30,000 sq. ft. with 750 spacious seating capacity, while The Lawn party plot covers 9,000 sq. ft. with 1,200 lawn seating capacity. Both spaces feature 10 luxury air-conditioned rooms, ample on-site guest parking, and dedicated valet service during main events. Venues can be reserved independently or together for multi-day weddings.',
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
  bg?: 'natural' | 'darker';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenInquiry, className = '', bg = 'natural' }) => {
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

  const isDarker = bg === 'darker';

  return (
    <section
      ref={containerRef}
      className={`w-full py-16 sm:py-24 xl:py-28 transition-colors ${
        isDarker ? 'bg-[#F3EDE2] border-y border-[#C5A880]/30' : 'bg-[#FAF7F2]'
      } ${className}`}
    >
      <div className="max-w-5xl xl:max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12">
        {/* Editorial Header */}
        <div className="text-center space-y-4 xl:space-y-5 mb-12 sm:mb-16 xl:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 xl:px-4 xl:py-2 rounded-full bg-[#FAF7F2] border border-[#C5A880]/40 text-[#721B24] text-xs xl:text-sm font-mono tracking-widest uppercase shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ESTATE PROTOCOLS & INQUIRIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-serif text-[#2A1C16] font-light leading-tight">
            <WordReveal text="FREQUENTLY ASKED" />{' '}
            <span className="italic font-normal"><WordReveal text="QUESTIONS" /></span>
          </h2>

          <p className="max-w-2xl xl:max-w-3xl mx-auto text-sm sm:text-base xl:text-lg text-[#5C3D2E] font-sans font-light leading-relaxed">
            Essential information regarding bookings, spatial capacities, wheelchair accessibility, and custom event curation at Asopalav Greens.
          </p>

          {/* Accessibility badge */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs xl:text-sm font-mono text-[#5C3D2E]">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-[#C5A880]/30 shadow-xs text-center">
              <Accessibility className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#721B24] flex-none" />
              <span>Wheelchair Accessible Parking &amp; Entrances</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-[#C5A880]/30 shadow-xs text-center">
              <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#D4AF37] flex-none" />
              <span>Open Air &amp; Pre-Decorated Banquet Halls</span>
            </span>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 xl:space-y-5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`faq-card rounded-2xl xl:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#721B24]/40 shadow-lg ring-1 ring-[#721B24]/20'
                    : isDarker
                    ? 'bg-[#FAF7F2] hover:bg-white border-[#C5A880]/35 shadow-xs'
                    : 'bg-[#F3EDE2]/70 hover:bg-[#F3EDE2] border-[#C5A880]/30 shadow-xs'
                }`}
              >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-4 sm:p-6 xl:p-8 text-left flex items-start justify-between gap-3 sm:gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3 sm:gap-4 xl:gap-5">
                  <span className="text-xs xl:text-sm font-mono font-bold text-[#721B24] pt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="font-serif text-lg sm:text-xl xl:text-2xl text-[#2A1C16] font-medium leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 xl:w-10 xl:h-10 rounded-full border border-[#C5A880]/40 flex items-center justify-center flex-none text-[#721B24] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#721B24] text-white' : 'bg-white'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 xl:px-8 xl:pb-8 pt-0 text-sm sm:text-base xl:text-lg text-[#5C3D2E] font-sans font-light leading-relaxed border-t border-[#C5A880]/20 mt-2 pt-4 xl:pt-5">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Contact Help Strip */}
      <div className="mt-12 xl:mt-16 p-6 sm:p-8 xl:p-10 rounded-3xl xl:rounded-[36px] bg-[#2A1C16] text-[#FAF7F2] border border-[#C5A880]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="text-xs xl:text-sm font-mono text-[#D4AF37] tracking-widest uppercase">
            HAVE ADDITIONAL QUESTIONS?
          </div>
          <div className="font-serif text-lg sm:text-xl xl:text-2xl font-light">
            Speak directly with our senior estate curators
          </div>
          <div className="text-xs xl:text-sm font-mono text-[#FAF7F2]/70">
            Sevasi - Canal Rd, opp. Athletes Arena, Vadodara • Daily 9:30 AM – 7:00 PM
          </div>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 xl:gap-4">
          <a
            href="tel:+918155089958"
            className="px-4 sm:px-5 xl:px-6 py-3 xl:py-3.5 rounded-full bg-[#FAF7F2] text-[#2A1C16] hover:bg-[#F3EDE2] text-xs xl:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-[#721B24]" />
            <span>+91 81550 89958</span>
          </a>

          <a
            href="tel:+919898563788"
            className="px-4 sm:px-5 xl:px-6 py-3 xl:py-3.5 rounded-full bg-[#FAF7F2] text-[#2A1C16] hover:bg-[#F3EDE2] text-xs xl:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-[#721B24]" />
            <span>+91 98985 63788</span>
          </a>

          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="px-5 xl:px-6 py-3 xl:py-3.5 rounded-full border border-[#C5A880] text-[#D4AF37] hover:bg-[#721B24] hover:text-[#FAF7F2] text-xs xl:text-sm font-medium uppercase tracking-wider transition-all cursor-pointer"
            >
              Inquire Online
            </button>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};

export default FAQSection;
