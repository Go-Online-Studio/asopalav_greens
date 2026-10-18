'use client';

import React, { useState } from 'react';
import { VenuesView } from '../../src/views/VenuesView';
import { InquiryModal } from '../../src/components/InquiryModal';

export default function VenuesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('');

  return (
    <>
      <VenuesView
        onNavigate={(path) => {
          if (typeof window !== 'undefined') window.location.href = path;
        }}
        onSelectVenue={(slug) => {
          if (typeof window !== 'undefined') window.location.href = `/venues/${slug}`;
        }}
        onOpenInquiry={(v) => {
          if (v) setSelectedVenue(v);
          setModalOpen(true);
        }}
      />
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedVenue={selectedVenue}
      />
    </>
  );
}
