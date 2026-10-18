'use client';

import React, { useState } from 'react';
import { GalleryView } from '../../src/views/GalleryView';
import { InquiryModal } from '../../src/components/InquiryModal';

export default function GalleryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('');

  return (
    <>
      <GalleryView
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
