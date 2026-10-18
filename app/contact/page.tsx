'use client';

import React, { useState } from 'react';
import { ContactView } from '../../src/views/ContactView';
import { InquiryModal } from '../../src/components/InquiryModal';

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('');

  return (
    <>
      <ContactView
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
