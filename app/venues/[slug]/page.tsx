import React from 'react';
import { VENUES } from '../../../src/data/estateData';
import { VenueDetailView } from '../../../src/views/VenueDetailView';

export async function generateStaticParams() {
  return VENUES.map((venue) => ({
    slug: venue.slug,
  }));
}

export default function VenueSlugPage({ params }: { params: { slug: string } }) {
  return (
    <VenueDetailView
      slug={params.slug}
      onNavigate={(path) => {
        if (typeof window !== 'undefined') window.location.href = path;
      }}
      onOpenInquiry={() => {}}
    />
  );
}
