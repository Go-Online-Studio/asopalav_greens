import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Phone, Compass, MapPin } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenInquiry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Grounds', path: '/' },
    { label: 'Spaces', path: '/venues' },
    { label: 'Visual Archive', path: '/gallery' },
    { label: 'Concierge & Dates', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 transition-all duration-300">
      <div
        className={`max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto rounded-full px-3.5 sm:px-8 xl:px-10 py-2.5 sm:py-3 xl:py-3.5 flex items-center justify-between transition-all duration-300 border ${
          scrolled
            ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-[#C5A880]/40 shadow-lg shadow-espresso-950/5'
            : 'bg-[#FAF7F2]/80 backdrop-blur-sm border-[#C5A880]/20'
        }`}
      >
        {/* Left: Image Logo */}
        <button
          onClick={() => {
            onNavigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center group cursor-pointer focus:outline-none"
        >
          <img
            src="/images/LOGO_Asopalav.webp"
            alt="Asopalav Greens"
            style={{ height: 'var(--nav-logo-h)' }}
            className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Center: Minimal Editorial Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12 text-xs xl:text-sm uppercase tracking-[0.2em] font-sans text-[#5C3D2E]">
          {navLinks.map((item) => {
            const isActive =
              currentPath === item.path ||
              (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`relative py-1 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#721B24] font-semibold'
                    : 'hover:text-[#2A1C16]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#721B24] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Wine-red pill CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center gap-2 bg-[#721B24] hover:bg-[#58151C] text-[#FAF7F2] tracking-[0.18em] text-xs xl:text-sm uppercase px-5 sm:px-6 xl:px-7 py-2.5 xl:py-3 rounded-full border border-[#C5A880]/30 shadow-md shadow-wine-900/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Inquire for 2026–2027</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden w-9 h-9 rounded-full border border-[#C5A880]/40 flex items-center justify-center text-[#2A1C16] hover:bg-[#F3EDE2] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu & Frosted Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#2A1C16]/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl bg-[#FAF7F2] border border-[#C5A880]/40 p-6 shadow-2xl space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-base font-serif tracking-wider text-[#2A1C16] hover:text-[#721B24] py-2 border-b border-[#C5A880]/20 flex items-center justify-between cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-[#721B24]">→</span>
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 rounded-full bg-[#721B24] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Inquire for 2026–2027
              </button>

              <a
                href="https://wa.me/918155089958?text=Hello%20Asopalav%20Greens%2C%20I%20would%20like%20to%20inquire%20for%20a%20wedding%20celebration."
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full border border-[#C5A880]/50 text-[#2A1C16] text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 bg-[#F3EDE2] hover:bg-[#FAF7F2] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#5C3D2E]" />
                WhatsApp Concierge
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
