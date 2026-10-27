export interface Venue {
  slug: string;
  numeral: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  capacityFloating: number;
  capacitySeated: number;
  areaSqFt: number;
  heroImage: string;
  secondaryImage: string;
  diptych: [string, string];
  specs: {
    label: string;
    value: string;
    note?: string;
  }[];
  highlights: string[];
  floorplanPdfName: string;
  // Editorial & Magazine additions
  ambianceSubtitle?: string;
  celebrationStyle?: string;
  editorialQuote?: string;
  essencePoints?: string[];
  dayToNightPhases?: {
    time: string;
    title: string;
    description: string;
  }[];
  hospitalityHighlights?: {
    title: string;
    description: string;
  }[];
}

export const VENUES: Venue[] = [
  {
    slug: 'banquet',
    numeral: 'I.',
    name: 'The Banquet',
    subtitle: '30,000 Sq. Ft. • 750 Spacious Banquet Seating',
    ambianceSubtitle: 'Pillarless Indoor Architectural Sanctuary',
    celebrationStyle: 'Grand Receptions, Sangeets & Royal Banquets',
    editorialQuote: 'A monumental pillarless sanctuary engineered with 28-foot soaring ceilings, centralized climate control, and uninterrupted stage sightlines.',
    tagline: 'Vadodara’s flagship climate-controlled pillarless banquet hall.',
    description: 'An awe-inspiring pillarless indoor sanctuary designed for regal wedding receptions, sangeets, and formal banquets with soaring ceilings, precision climate control, and seamless staging.',
    capacityFloating: 1200,
    capacitySeated: 750,
    areaSqFt: 30000,
    heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85',
    diptych: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85',
    ],
    essencePoints: [
      'Expansive 30,000 sq. ft. clear-span layout with zero internal load-bearing pillars',
      'High-capacity centralized air-conditioning calibrated for all-season comfort',
      'Dedicated indoor dining promenade designed for smooth buffet and live counter flow',
      'Integrated 10 luxury en-suite rooms for host families with discreet backstage access',
      'Weather-shielded motor court with ample on-site parking and valet service',
    ],
    hospitalityHighlights: [
      { title: 'Pillarless Clear Sightlines', description: 'Zero interior pillars ensure uninterrupted panoramic visibility of the primary stage from every table.' },
      { title: 'Central High-Volume AC', description: 'Precision multi-zone climate control maintaining ideal temperatures even during peak capacity celebrations.' },
      { title: 'Dedicated Dining Promenade', description: 'Wide indoor buffet corridors designed for smooth guest circulation and uninterrupted live counter dining.' },
      { title: 'Acoustic & Rigging Engineering', description: 'High-load ceiling rigging points and acoustic wall paneling for concert-grade sound and custom lighting.' },
      { title: 'Bridal & Groom Dressing Suites', description: '10 private luxury en-suite rooms with professional salon vanities and discreet stage entryways.' },
      { title: 'Weather-Shielded Portico', description: 'Covered drop-off court ensuring elegant guest arrivals protected from weather, with valet service.' },
    ],
    specs: [
      { label: 'Total Footprint', value: '30,000 Sq. Ft.' },
      { label: 'Banquet Seating', value: '750 Spacious Capacity' },
      { label: 'Accommodations', value: '10 Luxury Rooms' },
      { label: 'Parking', value: 'Ample Parking Space' },
      { label: 'Valet Service', value: 'Available in Main Event' },
    ],
    highlights: [
      '30,000 sq. ft. clear-span indoor banquet',
      '750 spacious banquet seating capacity',
      '10 luxury air-conditioned en-suite rooms',
      'Ample dedicated on-site parking',
      'Valet parking service available for main events',
    ],
    floorplanPdfName: 'Asopalav-Banquet-Spatial-Layout.pdf',
  },
  {
    slug: 'lawn',
    numeral: 'II.',
    name: 'The Lawn',
    subtitle: '9,000 Sq. Ft. Party Plot • 1,200 Lawn Seating Capacity',
    ambianceSubtitle: 'Manicured Open-Air Party Plot & Starlit Canopy',
    celebrationStyle: 'Monumental Pheras, Open-Sky Sangeet & Receptions',
    editorialQuote: 'A lush botanical sanctuary where Gujarat’s starlit sky creates a majestic open-air ceiling for unforgettable celebrations.',
    tagline: 'Vadodara’s premier manicured party plot surrounded by heritage foliage.',
    description: 'A beautifully landscaped open-air venue featuring natural carpet grass, architectural perimeter lighting, and wide processional pathways designed for monumental evening weddings and starlit celebrations.',
    capacityFloating: 1500,
    capacitySeated: 1200,
    areaSqFt: 9000,
    heroImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=2000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=85',
    diptych: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85',
    ],
    essencePoints: [
      '9,000 sq. ft. natural velvet lawn engineered for 1,200 seated guests under the open sky',
      'Majestic tree-lined processional avenue designed for grand baraat arrivals and floral entries',
      '10 adjacent luxury air-conditioned en-suite suites for host family convenience and preparation',
      'Sub-soil drainage infrastructure ensuring pristine, firm footing in any weather',
      'Dedicated on-site motor court with ample parking and valet service for main events',
    ],
    hospitalityHighlights: [
      { title: 'Sculpted Velvet Carpet Turf', description: 'Deep-rooted natural Bermuda turf framed by mature native Asopalav trees and ambient warm illumination.' },
      { title: 'Grand Baraat Procession Avenue', description: 'Expansive 60-foot arrival boulevard allowing royal baraat processions, vintage entries, and wedding bands.' },
      { title: 'Celestial Open-Sky Mandap', description: 'Elevated staging layout with unobstructed 360° sightlines for sacred pheras, drone cinematography, and fireworks.' },
      { title: 'Sub-Soil Drainage Infrastructure', description: 'Advanced underground drainage ensuring pristine, firm footing and zero water retention in any season.' },
      { title: '10 Private Luxury Host Enclaves', description: 'Air-conditioned luxury suites situated directly beside the grounds for wardrobe changes and family relaxation.' },
      { title: '100% Step-Free Accessibility', description: 'Smooth, barrier-free paved pathways connecting arrival drop-off, lawns, dining pavilions, and restrooms.' },
    ],
    specs: [
      { label: 'Party Plot Area', value: '9,000 Sq. Ft.' },
      { label: 'Lawn Seating', value: '1,200 Capacity' },
      { label: 'Accommodations', value: '10 Luxury Rooms' },
      { label: 'Parking', value: 'Ample Parking Space' },
      { label: 'Valet Service', value: 'Available in Main Event' },
    ],
    highlights: [
      '9,000 sq. ft. manicured open-air party plot',
      '1,200 lawn seating capacity',
      '10 luxury air-conditioned en-suite rooms',
      'Ample dedicated on-site parking',
      'Valet parking service available for main events',
    ],
    floorplanPdfName: 'Asopalav-Lawn-Spatial-Layout.pdf',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'lawn' | 'banquet';
  venue: 'Lawn' | 'Banquet';
  venueName: string;
  thumb: string;
  image: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Royal Ivory Pavilion',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages1.webp',
    image: '/images/GalleryImages/GalleryImages1.jpeg',
  },
  {
    id: 'g2',
    title: 'Colonnade & Grand Lawn',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages2.webp',
    image: '/images/GalleryImages/GalleryImages2.jpeg',
  },
  {
    id: 'g3',
    title: 'Shrinathji Sacred Mandap',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages3.webp',
    image: '/images/GalleryImages/GalleryImages3.jpeg',
  },
  {
    id: 'g4',
    title: 'Imperial Peach Mandap',
    category: 'banquet',
    venue: 'Banquet',
    venueName: 'The Banquet',
    thumb: '/images/GalleryImages/Thumb/GalleryImages4.webp',
    image: '/images/GalleryImages/GalleryImages4.jpeg',
  },
  {
    id: 'g5',
    title: 'Pastel Blossom Stage',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages5.webp',
    image: '/images/GalleryImages/GalleryImages5.jpeg',
  },
  {
    id: 'g6',
    title: 'Botanical Arch Lounge',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages6.webp',
    image: '/images/GalleryImages/GalleryImages6.jpeg',
  },
  {
    id: 'g7',
    title: 'Starlit Sangeet Arena',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages7.webp',
    image: '/images/GalleryImages/GalleryImages7.jpeg',
  },
  {
    id: 'g8',
    title: 'Crystal Symphony Stage',
    category: 'banquet',
    venue: 'Banquet',
    venueName: 'The Banquet',
    thumb: '/images/GalleryImages/Thumb/GalleryImages8.webp',
    image: '/images/GalleryImages/GalleryImages8.jpeg',
  },
  {
    id: 'g9',
    title: 'Golden Marigold Canopy',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages9.webp',
    image: '/images/GalleryImages/GalleryImages9.jpeg',
  },
];
