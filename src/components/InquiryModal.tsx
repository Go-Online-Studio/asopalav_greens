import React, { useState } from 'react';
import { X, Check, Calendar, Users, Sparkles, Phone, Clock, ArrowRight } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVenue?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedVenue = '',
}) => {
  const [step, setStep] = useState(1);
  const [celebrationType, setCelebrationType] = useState('Royal Wedding & Reception');
  const [venuePreference, setVenuePreference] = useState(preselectedVenue || 'The Banquet (30,000 Sq. Ft.)');
  const [guestCount, setGuestCount] = useState(1200);
  const [preferredDate, setPreferredDate] = useState('2026-11-20');
  const [timeSlot, setTimeSlot] = useState('Evening & Starlit Reception (06:00 PM onwards)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Asopalav Greens Concierge,\n\nI wish to inquire about booking the estate.\n• Name: ${name || 'Prospective Patron'}\n• Celebration: ${celebrationType}\n• Preferred Venue: ${venuePreference}\n• Est. Guests: ${guestCount}\n• Preferred Date: ${preferredDate}\n• Time Slot: ${timeSlot}\n\nPlease share the private prospectus and date availability.`
    );
    window.open(`https://wa.me/918155089958?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Darkened Silk Backdrop */}
      <div
        className="fixed inset-0 bg-[#2A1C16]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl xl:max-w-3xl bg-[#FAF7F2] rounded-3xl border border-[#C5A880]/50 shadow-2xl p-4 sm:p-10 xl:p-12 my-8 z-10 text-[#2A1C16]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C5A880]/40 flex items-center justify-center text-[#2A1C16] hover:bg-[#F3EDE2] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#721B24] border border-[#C5A880] mx-auto flex items-center justify-center text-[#D4AF37]">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                ESTATE DIARY RECORDED
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#2A1C16]">
                Invitation Inscribed
              </h3>
              <p className="max-w-md mx-auto text-sm text-[#5C3D2E] font-light leading-relaxed">
                Thank you, <span className="font-semibold">{name || 'Patron'}</span>. Our Senior Estate Curator will review diary dates for <span className="font-semibold">{preferredDate}</span> and contact you within 4 business hours.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F3EDE2] border border-[#C5A880]/30 max-w-md mx-auto text-left text-xs font-mono space-y-1.5 text-[#5C3D2E]">
              <div>• VENUE: {venuePreference}</div>
              <div>• ESTIMATED GUESTS: {guestCount.toLocaleString()}</div>
              <div>• CELEBRATION: {celebrationType}</div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2F3E34] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium hover:bg-[#233027] transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                Direct WhatsApp Dispatch
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-[#C5A880]/60 text-[#2A1C16] text-xs uppercase tracking-widest font-medium hover:bg-[#F3EDE2] transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="space-y-1.5 mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#721B24] tracking-[0.25em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                PRIVATE ESTATE PROSPECTUS
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] font-light">
                Reserve Your Celebratory Date
              </h2>
              <p className="text-xs sm:text-sm text-[#5C3D2E] font-light">
                Dates for 2026–2027 are released on a curated rolling calendar.
              </p>
            </div>

            {/* Stepper Tabs */}
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#C5A880]/30 text-xs font-mono">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 pb-1 cursor-pointer transition-colors ${
                  step === 1 ? 'text-[#721B24] font-bold border-b-2 border-[#721B24]' : 'text-[#5C3D2E]/60'
                }`}
              >
                <span>01</span>
                <span className="hidden sm:inline">CELEBRATION & REALM</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className={`flex items-center gap-2 pb-1 cursor-pointer transition-colors ${
                  step === 2 ? 'text-[#721B24] font-bold border-b-2 border-[#721B24]' : 'text-[#5C3D2E]/60'
                }`}
              >
                <span>02</span>
                <span className="hidden sm:inline">CALENDAR & CAPACITY</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className={`flex items-center gap-2 pb-1 cursor-pointer transition-colors ${
                  step === 3 ? 'text-[#721B24] font-bold border-b-2 border-[#721B24]' : 'text-[#5C3D2E]/60'
                }`}
              >
                <span>03</span>
                <span className="hidden sm:inline">PATRON DETAILS</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Celebration & Venue Realm */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Select Type of Celebration
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Royal Wedding & Reception',
                        'Grand Sangeet & Musical Eve',
                        'Sacred Pheras & Mandap Ritual',
                        'High-Echelon Corporate Gala',
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setCelebrationType(item)}
                          className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer ${
                            celebrationType === item
                              ? 'bg-[#F3EDE2] border-[#721B24] text-[#721B24] font-semibold ring-1 ring-[#721B24]'
                              : 'border-[#C5A880]/30 hover:border-[#C5A880] text-[#2A1C16] bg-white'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Preferred Venue Space
                    </label>
                    <select
                      value={venuePreference}
                      onChange={(e) => setVenuePreference(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    >
                      <option value="The Banquet (30,000 Sq. Ft.)">The Banquet (30,000 Sq. Ft. • 750 Seating)</option>
                      <option value="The Lawn (9,000 Sq. Ft.)">The Lawn (9,000 Sq. Ft. Party Plot • 1,200 Seating)</option>
                      <option value="Combined Estate (Both Spaces)">Combined Estate Booking (Banquet & Lawn)</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium transition-all cursor-pointer"
                    >
                      <span>Proceed to Dates</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Calendar & Capacity Slider */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Guest Slider */}
                  <div className="space-y-3 bg-[#F3EDE2] p-4 sm:p-5 rounded-2xl border border-[#C5A880]/30">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="uppercase text-[#5C3D2E] tracking-wider">Estimated Guest Count</span>
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

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-mono text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                        Time Preference
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                      >
                        <option value="Evening & Starlit Reception (06:00 PM onwards)">Evening & Starlit Reception (06:00 PM onwards)</option>
                        <option value="Auspicious Daytime / Twilight Pheras (10:00 AM – 04:00 PM)">Auspicious Daytime / Twilight Pheras (10:00 AM – 04:00 PM)</option>
                        <option value="All-Day Double Shift (10:00 AM to Midnight)">All-Day Double Shift (10:00 AM to Midnight)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs uppercase tracking-widest text-[#5C3D2E] hover:text-[#2A1C16] underline cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium transition-all cursor-pointer"
                    >
                      <span>Provide Patron Info</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Patron Details */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Full Name of Host / Family Representative *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Seth Harshvardhan Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-1.5 p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full mt-1.5 p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-mono text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="patel@familyoffice.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1.5 p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Special Architectural or Rigging Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Traditional shehnai courtyard requirement, 2-day wedding setup, live celebrity stage..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full mt-1.5 p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs uppercase tracking-widest text-[#5C3D2E] hover:text-[#2A1C16] underline cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold border border-[#C5A880]/50 shadow-xl shadow-wine-900/30 transition-all cursor-pointer"
                    >
                      Transmit Inscription
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
