import React, { useState, useEffect } from 'react';
import { SmoothScrollProvider } from './components/SmoothScroll';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { HomeView } from './views/HomeView';
import { VenuesView } from './views/VenuesView';
import { VenueDetailView } from './views/VenueDetailView';
import { GalleryView } from './views/GalleryView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySelectedVenue, setInquirySelectedVenue] = useState<string>('');

  // Handle browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = (venueName?: string) => {
    if (venueName) {
      setInquirySelectedVenue(venueName);
    } else {
      setInquirySelectedVenue('The Grand Royal Lawn (45,000 Sq. Ft.)');
    }
    setInquiryModalOpen(true);
  };

  // Route matching logic
  const renderCurrentView = () => {
    if (currentPath.startsWith('/venues/')) {
      const slug = currentPath.replace('/venues/', '').replace(/\/$/, '');
      return (
        <VenueDetailView
          slug={slug}
          onNavigate={handleNavigate}
          onOpenInquiry={handleOpenInquiry}
        />
      );
    }

    if (currentPath === '/venues' || currentPath === '/venues/') {
      return (
        <VenuesView
          onNavigate={handleNavigate}
          onSelectVenue={(slug) => handleNavigate(`/venues/${slug}`)}
          onOpenInquiry={handleOpenInquiry}
        />
      );
    }

    if (currentPath === '/gallery' || currentPath === '/gallery/') {
      return <GalleryView onOpenInquiry={handleOpenInquiry} />;
    }

    if (currentPath === '/contact' || currentPath === '/contact/') {
      return <ContactView onOpenInquiry={handleOpenInquiry} />;
    }

    // Default to HomeView
    return (
      <HomeView
        onNavigate={handleNavigate}
        onOpenInquiry={handleOpenInquiry}
      />
    );
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A1C16] font-sans selection:bg-[#721B24] selection:text-[#FAF7F2]">
        <Header
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        <main className="flex-1 w-full">
          {renderCurrentView()}
        </main>

        <Footer
          onNavigate={handleNavigate}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        <InquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          preselectedVenue={inquirySelectedVenue}
        />
      </div>
    </SmoothScrollProvider>
  );
}
