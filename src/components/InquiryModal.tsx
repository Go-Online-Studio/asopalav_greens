import React, { useState } from 'react';
import { X, Check, Calendar, Users, Sparkles, Phone, Clock, ArrowRight } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

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
  const [celebrationType, setCelebrationType] = useState('Wedding & Reception');
  const [venuePreference, setVenuePreference] = useState(preselectedVenue || 'The Banquet (9,000 Sq. Ft.)');
  const [guestCount, setGuestCount] = useState(1200);
  const [preferredDate, setPreferredDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('Evening Celebration (06:00 PM onwards)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  // Validation functions
  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!celebrationType.trim()) {
      errs.celebrationType = 'Please select a type of celebration.';
    }
    if (!venuePreference.trim()) {
      errs.venuePreference = 'Please select your preferred venue space.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!preferredDate) {
      errs.preferredDate = 'Please select your preferred date.';
    }
    if (!timeSlot.trim()) {
      errs.timeSlot = 'Please select a time preference.';
    }
    if (!guestCount || guestCount < 50) {
      errs.guestCount = 'Please enter an estimated guest count.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = 'Please enter your full name.';
    }
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please enter your phone / WhatsApp number.';
    } else if (!/^(?:\+?91)?[6789]\d{9}$/.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextFromStep1 = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleNextFromStep2 = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleTabClick = (targetStep: number) => {
    if (targetStep === 1) {
      setErrors({});
      setStep(1);
    } else if (targetStep === 2) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (targetStep === 3) {
      if (step === 1) {
        if (validateStep1()) {
          setStep(2);
        }
      } else if (step === 2) {
        if (validateStep2()) {
          setStep(3);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    // Direct WhatsApp dispatch with pre-filled message (dynamically mobile vs desktop)
    const text = `Hello Asopalav Greens team,\n\nI wish to inquire about booking the venue.\n• Name: ${name.trim()}\n• Phone: ${phone.trim()}\n• Email: ${email.trim() || 'Not provided'}\n• Celebration: ${celebrationType}\n• Preferred Venue: ${venuePreference}\n• Est. Guests: ${guestCount}\n• Preferred Date: ${preferredDate}\n• Time Slot: ${timeSlot}${notes.trim() ? `\n• Notes: ${notes.trim()}` : ''}\n\nPlease share venue details and date availability.`;
    openWhatsApp(text);

    // Show Thank You in popup immediately
    setIsSubmitted(true);
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
          <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#721B24] border border-[#C5A880] mx-auto flex items-center justify-center text-[#D4AF37] shadow-lg">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#721B24] tracking-widest uppercase">
                INQUIRY SENT
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#2A1C16]">
                Thank You!
              </h3>
              <p className="max-w-md mx-auto text-sm text-[#5C3D2E] font-light leading-relaxed">
                Thank you, <span className="font-semibold">{name || 'Guest'}</span>. Your celebration details have been sent to our team via WhatsApp. We will connect with you shortly to assist with dates and venue viewing.
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-all shadow-md cursor-pointer"
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
                VENUE BOOKINGS &amp; INQUIRY
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2A1C16] font-light">
                Check Auspicious Dates
              </h2>
              <p className="text-xs sm:text-sm text-[#5C3D2E] font-light">
                Dates are reserved on a first-come, first-served basis.
              </p>
            </div>

            {/* Stepper Tabs */}
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#C5A880]/30 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleTabClick(1)}
                className={`flex items-center gap-2 pb-1 cursor-pointer transition-colors ${
                  step === 1 ? 'text-[#721B24] font-bold border-b-2 border-[#721B24]' : 'text-[#5C3D2E]/60'
                }`}
              >
                <span>01</span>
                <span className="hidden sm:inline">CELEBRATION &amp; VENUE</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabClick(2)}
                className={`flex items-center gap-2 pb-1 cursor-pointer transition-colors ${
                  step === 2 ? 'text-[#721B24] font-bold border-b-2 border-[#721B24]' : 'text-[#5C3D2E]/60'
                }`}
              >
                <span>02</span>
                <span className="hidden sm:inline">DATE &amp; GUEST COUNT</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabClick(3)}
                className={`flex items-center gap-2 pb-1 cursor-pointer transition-colors ${
                  step === 3 ? 'text-[#721B24] font-bold border-b-2 border-[#721B24]' : 'text-[#5C3D2E]/60'
                }`}
              >
                <span>03</span>
                <span className="hidden sm:inline">CONTACT DETAILS</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Celebration & Venue Realm */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Select Type of Celebration *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Wedding & Reception',
                        'Sangeet & Musical Night',
                        'Sacred Pheras & Mandap Ceremony',
                        'Corporate Gala & Annual Event',
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setCelebrationType(item);
                            if (errors.celebrationType) {
                              setErrors((prev) => ({ ...prev, celebrationType: '' }));
                            }
                          }}
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
                    {errors.celebrationType && (
                      <p className="text-xs text-red-600 font-sans mt-1">{errors.celebrationType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Preferred Venue Space *
                    </label>
                    <select
                      value={venuePreference}
                      onChange={(e) => {
                        setVenuePreference(e.target.value);
                        if (errors.venuePreference) {
                          setErrors((prev) => ({ ...prev, venuePreference: '' }));
                        }
                      }}
                      className="w-full p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    >
                      <option value="The Banquet (9,000 Sq. Ft.)">The Banquet (9,000 Sq. Ft. • 750 Seating)</option>
                      <option value="The Lawn (30,000 Sq. Ft.)">The Lawn (Party Plot 30,000 Sq. Ft. • 1,200 Seating)</option>
                      <option value="Combined Venue (Both Spaces)">Combined Venue Booking (Banquet & Lawn)</option>
                    </select>
                    {errors.venuePreference && (
                      <p className="text-xs text-red-600 font-sans mt-1">{errors.venuePreference}</p>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextFromStep1}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium transition-all cursor-pointer shadow-md"
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
                      <span>1,500 (Grand)</span>
                      <span>3,500 (Mega Celebration)</span>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
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

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                        Time Preference *
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
                        <option value="Evening Celebration (06:00 PM onwards)">Evening Celebration (06:00 PM onwards)</option>
                        <option value="Daytime Ceremony (10:00 AM – 04:00 PM)">Daytime Ceremony (10:00 AM – 04:00 PM)</option>
                        <option value="Full Day Event (10:00 AM to Midnight)">Full Day Event (10:00 AM to Midnight)</option>
                      </select>
                      {errors.timeSlot && (
                        <p className="text-xs text-red-600 font-sans mt-1">{errors.timeSlot}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setErrors({});
                        setStep(1);
                      }}
                      className="text-xs uppercase tracking-widest text-[#5C3D2E] hover:text-[#2A1C16] underline cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromStep2}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium transition-all cursor-pointer shadow-md"
                    >
                      <span>Your Contact Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Details */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Patel"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: '' }));
                        }
                      }}
                      className={`w-full mt-1.5 p-3 rounded-xl border bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                        errors.name ? 'border-red-500' : 'border-[#C5A880]/50'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 font-sans mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: '' }));
                          }
                        }}
                        className={`w-full mt-1.5 p-3 rounded-xl border bg-white text-xs font-mono text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                          errors.phone ? 'border-red-500' : 'border-[#C5A880]/50'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 font-sans mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: '' }));
                          }
                        }}
                        className={`w-full mt-1.5 p-3 rounded-xl border bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24] ${
                          errors.email ? 'border-red-500' : 'border-[#C5A880]/50'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 font-sans mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#5C3D2E]">
                      Special Requests &amp; Setup Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Shehnai entrance, 2-day wedding setup, special food counters..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full mt-1.5 p-3 rounded-xl border border-[#C5A880]/50 bg-white text-xs font-sans text-[#2A1C16] focus:outline-none focus:ring-1 focus:ring-[#721B24]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setErrors({});
                        setStep(2);
                      }}
                      className="text-xs uppercase tracking-widest text-[#5C3D2E] hover:text-[#2A1C16] underline cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-full bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold border border-[#C5A880]/50 shadow-xl shadow-wine-900/30 transition-all cursor-pointer"
                    >
                      Submit &amp; Open WhatsApp
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
