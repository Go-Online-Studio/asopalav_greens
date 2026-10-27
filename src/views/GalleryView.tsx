import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { GALLERY_ITEMS } from '../data/estateData';
import { WordReveal } from '../utils/animations';
import { Maximize2, Sparkles, Phone } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryViewProps {
  onOpenInquiry: (venue?: string) => void;
}

// Compute responsive gutter size based on device viewport space
const getGutterSize = (): number => {
  if (typeof window === 'undefined') return 0;
  const width = window.innerWidth;
  if (width < 640) return 0;       // Mobile: single column, 0px gutter
  if (width < 768) return 16;      // Large mobile / phablet: 16px gutter
  if (width < 1280) return 18;     // Tablet & small desktop: 18px gutter
  if (width < 1600) return 24;     // Standard desktop: 24px gutter
  return 32;                       // Ultra-wide display: 32px gutter
};

export const GalleryView: React.FC<GalleryViewProps> = ({ onOpenInquiry }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'lawn' | 'banquet'>('all');
  const [isMasonryReady, setIsMasonryReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryInstance = useRef<any>(null);

  const filters = [
    { key: 'all', label: 'All Photos' },
    { key: 'lawn', label: 'Lawn' },
    { key: 'banquet', label: 'Banquet' },
  ] as const;

  const filteredItems = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  // 1. Reinitialize Masonry calculation function
  const reinitMasonry = useCallback(() => {
    if (!gridRef.current) return;
    const MasonryClass = (window as any).Masonry || Masonry;
    const gutterSize = getGutterSize();

    if (!masonryInstance.current) {
      masonryInstance.current = new MasonryClass(gridRef.current, {
        itemSelector: '.masonry-grid-item',
        percentPosition: true,
        gutter: gutterSize,
        transitionDuration: '0.35s',
      });
    } else {
      masonryInstance.current.options.gutter = gutterSize;
      masonryInstance.current.reloadItems();
      masonryInstance.current.layout();
    }
    setIsMasonryReady(true);
  }, []);

  // 2. Load images & reinitialize Masonry after all images have loaded
  useEffect(() => {
    if (!gridRef.current) return;
    const imgLoaded = (window as any).imagesLoaded || imagesLoaded;

    // Reset visibility state during filter change
    setIsMasonryReady(false);

    // Initial layout pass
    reinitMasonry();

    // Bind imagesLoaded to track actual asset downloads
    const imgInstance = imgLoaded(gridRef.current);

    // Progressive layout as individual images download
    imgInstance.on('progress', () => {
      if (masonryInstance.current) {
        masonryInstance.current.reloadItems();
        masonryInstance.current.layout();
      }
    });

    // AFTER ALL IMAGES LOADED: Reinitialize Masonry completely with finalized heights
    imgInstance.on('always', () => {
      if (masonryInstance.current) {
        masonryInstance.current.reloadItems();
        masonryInstance.current.layout();
      } else {
        reinitMasonry();
      }
      setIsMasonryReady(true);

      // Secondary microtask frame for flawless coordinate alignment
      requestAnimationFrame(() => {
        if (masonryInstance.current) {
          masonryInstance.current.reloadItems();
          masonryInstance.current.layout();
        }
      });
    });

    return () => {
      try {
        imgInstance.off('progress');
        imgInstance.off('always');
      } catch (e) {
        // cleanup
      }
    };
  }, [filteredItems, reinitMasonry]);

  // 3. Flexible Device Space Adaptability (ResizeObserver + Orientation Change)
  useEffect(() => {
    if (!gridRef.current) return;

    // ResizeObserver tracks dynamic width changes on any device (phone, tablet, foldables, laptops)
    const resizeObserver = new ResizeObserver(() => {
      if (masonryInstance.current) {
        masonryInstance.current.options.gutter = getGutterSize();
        masonryInstance.current.reloadItems();
        masonryInstance.current.layout();
      }
    });

    resizeObserver.observe(gridRef.current);

    const handleWindowLoad = () => {
      reinitMasonry();
    };

    window.addEventListener('load', handleWindowLoad);
    window.addEventListener('orientationchange', handleWindowLoad);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('orientationchange', handleWindowLoad);
      if (masonryInstance.current) {
        try {
          masonryInstance.current.destroy();
        } catch (e) {
          // cleanup
        }
        masonryInstance.current = null;
      }
    };
  }, [reinitMasonry]);

  // 4. Initialize Fancybox for touch, pinch-zoom, and responsive lightbox
  useEffect(() => {
    Fancybox.bind('[data-fancybox="visual-archive"]', {
      closeButton: true,
      dragToClose: true,
    });

    return () => {
      Fancybox.unbind('[data-fancybox="visual-archive"]');
      Fancybox.close();
    };
  }, [filteredItems]);

  // 5. GSAP Text & Header Animations
  useGSAP(
    () => {
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
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full bg-[#FAF7F2] text-[#2A1C16] min-h-screen">
      {/* Editorial Header — Natural Cream bg-[#FAF7F2] */}
      <section className="w-full bg-[#FAF7F2] pt-12 sm:pt-20 pb-12 border-b border-[#C5A880]/30">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl xl:max-w-4xl">
              <div className="gsap-fade-up flex items-center gap-2 text-xs xl:text-sm font-mono text-[#721B24] tracking-[0.25em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#721B24]" />
                VISUAL CHRONICLE
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif text-[#2A1C16] font-light leading-[1.04]">
                <WordReveal text="THE VISUAL" />{' '}
                <span className="italic font-normal"><WordReveal text="ARCHIVE" /></span>
              </h1>
              <p className="gsap-fade-up text-sm sm:text-base xl:text-lg text-[#5C3D2E] font-sans font-light leading-relaxed">
                Moments of grandeur captured across the sprawling lawns, crystal ceilings, and sacred waters of Asopalav Greens.
              </p>
            </div>

            {/* Filter Buttons: All, Lawn, Banquet */}
            <div className="gsap-fade-up flex flex-wrap items-center gap-1.5 sm:gap-2 xl:gap-3">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(f.key)}
                  className={`px-4 py-2 xl:px-5 xl:py-2.5 rounded-full text-xs xl:text-sm font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    selectedFilter === f.key
                      ? 'bg-[#721B24] text-[#FAF7F2] font-semibold border border-[#C5A880]/50 shadow-md'
                      : 'bg-[#F3EDE2] text-[#5C3D2E] hover:text-[#2A1C16] border border-[#C5A880]/30 hover:border-[#C5A880]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Photo Grid — Slightly Darker Cream bg-[#F3EDE2] */}
      <section className="w-full bg-[#F3EDE2] py-14 sm:py-20 xl:py-24 border-b border-[#C5A880]/30">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div
            ref={gridRef}
            className={`masonry-grid relative ${isMasonryReady ? 'masonry-ready' : 'opacity-0'}`}
          >
            {filteredItems.map((item) => {
              const captionHtml = `
                <div class="text-center max-w-md mx-auto py-2">
                  <div class="text-xl sm:text-2xl font-serif text-[#FAF7F2] font-light leading-snug mb-1">
                    ${item.title}
                  </div>
                  <div class="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
                    ${item.venue}
                  </div>
                </div>
              `;

              return (
                <div
                  key={item.id}
                  className="masonry-grid-item"
                >
                  <div className="group relative rounded-2xl overflow-hidden border border-[#C5A880]/30 bg-[#FAF7F2] shadow-md hover:shadow-2xl transition-all duration-500">
                    <a
                      href={item.image}
                      data-fancybox="visual-archive"
                      data-caption={captionHtml}
                      className="block overflow-hidden relative cursor-zoom-in"
                    >
                      <img
                        src={item.thumb}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-auto block object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />

                      {/* Clean Hover Overlay with Zoom Indicator */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C16]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-[#FAF7F2]/90 backdrop-blur-sm flex items-center justify-center text-[#721B24] shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </a>

                    {/* Minimal Gallery Label: Title and Banquet or Lawn only */}
                    <div className="px-4 py-3 bg-[#FAF7F2] border-t border-[#C5A880]/20 flex items-center justify-between gap-3">
                      <h3 className="text-sm sm:text-base font-serif text-[#2A1C16] font-normal tracking-wide truncate">
                        {item.title}
                      </h3>
                      <span className="flex-none px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold bg-[#721B24]/10 text-[#721B24] border border-[#721B24]/25">
                        {item.venue}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Concierge Action Banner — Natural Cream bg-[#FAF7F2] */}
      <section className="w-full bg-[#FAF7F2] py-14 sm:py-20 xl:py-24">
        <div className="px-4 sm:px-8 xl:px-12 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
          <div className="p-8 sm:p-12 xl:p-16 rounded-3xl xl:rounded-[36px] bg-[#721B24] text-[#FAF7F2] border border-[#C5A880]/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 xl:gap-8 text-center md:text-left">
            <div className="space-y-2 xl:space-y-3 max-w-2xl xl:max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs xl:text-sm font-mono text-[#D4AF37] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                BESPOKE WEDDING & EVENT CURATIONS
              </div>
              <h3 className="text-2xl sm:text-4xl xl:text-5xl font-serif font-light leading-snug">
                Envisioning a Similar Theme for Your Celebration?
              </h3>
              <p className="text-xs sm:text-sm xl:text-base text-[#F3EDE2]/90 font-light">
                Connect with our master wedding planners to explore custom floral canopies, crystal chandeliers, and banquet staging.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 xl:gap-4">
              <button
                onClick={() => onOpenInquiry()}
                className="px-7 xl:px-9 py-3.5 xl:py-4 rounded-full bg-[#FAF7F2] text-[#721B24] hover:bg-[#F3EDE2] text-xs xl:text-sm uppercase tracking-widest font-semibold transition-all shadow-xl hover:scale-105 cursor-pointer"
              >
                Request Venue Viewing
              </button>
              <a
                href="tel:+918155089958"
                className="px-5 xl:px-6 py-3.5 xl:py-4 rounded-full border border-[#FAF7F2]/40 hover:border-[#D4AF37] text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-widest font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+91 81550 89958</span>
              </a>
              <a
                href="tel:+919898563788"
                className="px-5 xl:px-6 py-3.5 xl:py-4 rounded-full border border-[#FAF7F2]/40 hover:border-[#D4AF37] text-[#FAF7F2] text-xs xl:text-sm uppercase tracking-widest font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+91 98985 63788</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryView;
