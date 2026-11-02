import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useWhatsAppUrl, DEFAULT_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface FloatingActionButtonsProps {
  phoneNumber?: string;
  whatsappMessage?: string;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  phoneNumber = '+918155089958',
  whatsappMessage = 'Hello Asopalav Greens, I would like to inquire for a celebration.',
}) => {
  const whatsappUrl = useWhatsAppUrl(whatsappMessage, DEFAULT_WHATSAPP_NUMBER);

  return (
    <aside
      aria-label="Quick contact shortcuts"
      className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-center gap-3 pointer-events-auto"
    >
      {/* WhatsApp FAB Button (Circular) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="set-url-target group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 border-2 border-white/60 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
      >
        <span className="sr-only">Chat on WhatsApp</span>
        {/* Subtle pulsing background ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />

        {/* Hover Tooltip (Desktop) */}
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[#2A1C16] text-[#FAF7F2] text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md hidden sm:block">
          WhatsApp Us
        </span>
      </a>

      {/* Phone Call FAB Button (Circular) */}
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call Asopalav Greens"
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#721B24] hover:bg-[#8A242E] text-[#FAF7F2] flex items-center justify-center shadow-lg shadow-wine-950/40 border-2 border-[#C5A880]/60 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
      >
        <span className="sr-only">Call Phone</span>
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />

        {/* Hover Tooltip (Desktop) */}
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[#2A1C16] text-[#FAF7F2] text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md hidden sm:block">
          Call +91 81550 89958
        </span>
      </a>
    </aside>
  );
};

export default FloatingActionButtons;

