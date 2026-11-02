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
    subtitle: '9,000 Sq. Ft. • 750 Spacious Banquet Seating',
    ambianceSubtitle: 'Pillarless Indoor Banquet Hall',
    celebrationStyle: 'Grand Receptions, Sangeets & Royal Banquets',
    editorialQuote: 'A grand pillarless banquet hall with 28-foot soaring ceilings, central air-conditioning, and clear stage sightlines from every corner.',
    tagline: 'Vadodara’s flagship climate-controlled pillarless banquet hall.',
    description: 'An elegant pillarless indoor banquet hall designed for grand wedding receptions, sangeets, and celebrations. Features high ceilings, powerful central air-conditioning, and seamless stage views from every table.',
    capacityFloating: 1200,
    capacitySeated: 750,
    areaSqFt: 9000,
    heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85',
    diptych: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85',
    ],
    essencePoints: [
      'Expansive 9,000 sq. ft. clear-span layout with zero pillars for 100% open views',
      'High-capacity central air-conditioning engineered for all-season comfort',
      'Spacious indoor dining area designed for smooth buffet and live counter flow',
      '10 private luxury en-suite rooms for family preparation and rest',
      'Covered porch drop-off with dedicated valet parking and ample on-site guest parking',
    ],
    hospitalityHighlights: [
      { title: 'Pillarless Clear Sightlines', description: 'Zero interior pillars ensure uninterrupted stage visibility from every guest table.' },
      { title: 'Central High-Volume AC', description: 'Multi-zone climate control maintaining cool, comfortable temperatures even during peak wedding celebrations.' },
      { title: 'Dedicated Dining Area', description: 'Wide indoor buffet corridors designed for smooth guest circulation and uninterrupted live counter dining.' },
      { title: 'Sound & Rigging Support', description: 'High-load ceiling rigging points and acoustic wall design for concert-quality sound and custom lighting.' },
      { title: 'Bridal & Family En-Suite Rooms', description: '10 private luxury air-conditioned rooms with full mirrors, vanities, and convenient hall access.' },
      { title: 'Covered Drop-Off Portico', description: 'Sheltered porch ensuring smooth, comfortable guest arrivals with on-site valet parking.' },
    ],
    specs: [
      { label: 'Total Footprint', value: '9,000 Sq. Ft.' },
      { label: 'Banquet Seating', value: '750 Spacious Capacity' },
      { label: 'Accommodations', value: '10 Luxury Rooms' },
      { label: 'Parking', value: 'Ample Parking Space' },
      { label: 'Valet Service', value: 'Available in Main Event' },
    ],
    highlights: [
      '9,000 sq. ft. clear-span indoor banquet',
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
    subtitle: '30,000 Sq. Ft. Party Plot • 1,200 Lawn Seating Capacity',
    ambianceSubtitle: 'Lush Open-Air Party Plot for Starlit Weddings',
    celebrationStyle: 'Grand Pheras, Open-Sky Sangeet & Receptions',
    editorialQuote: 'A beautifully manicured open-air party plot framed by lush greenery, perfect for starlit wedding evenings and grand pheras.',
    tagline: 'Vadodara’s premier manicured party plot surrounded by heritage foliage.',
    description: 'A beautifully landscaped open-air party plot featuring natural carpet grass, warm perimeter illumination, and wide paved walkways designed for grand evening weddings and starlit celebrations.',
    capacityFloating: 1500,
    capacitySeated: 1200,
    areaSqFt: 30000,
    heroImage: '/images/Lawn Area Decorations And Stage area.webp',
    secondaryImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=85',
    diptych: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85',
    ],
    essencePoints: [
      '30,000 sq. ft. natural carpet lawn accommodating 1,200 seated guests under the open sky',
      'Grand 60-foot tree-lined avenue designed for royal baraat entries and bridal processions',
      '10 adjacent luxury air-conditioned rooms for family preparation and wardrobe changes',
      'Underground sub-soil drainage ensuring dry, firm footing in all weather conditions',
      'Dedicated on-site parking area with valet service for main celebrations',
    ],
    hospitalityHighlights: [
      { title: 'Natural Carpet Grass Turf', description: 'Fresh, vibrant natural lawn bordered by mature native Asopalav trees and soft warm lighting.' },
      { title: 'Grand Baraat Avenue', description: 'Expansive 60-foot arrival boulevard allowing royal baraat processions, vintage car entries, and brass bands.' },
      { title: 'Open-Air Mandap Setting', description: 'Elevated staging layout with unobstructed 360° sightlines for sacred pheras, drone cinematography, and fireworks.' },
      { title: 'Sub-Soil Drainage System', description: 'Underground drainage system ensuring firm, dry footing with no water accumulation.' },
      { title: '10 Private Luxury Family Rooms', description: 'Air-conditioned rooms situated right beside the lawn for wardrobe changes and family relaxation.' },
      { title: '100% Step-Free Accessibility', description: 'Smooth, wheelchair-friendly paved walkways connecting arrival drop-off, lawns, dining pavilions, and restrooms.' },
    ],
    specs: [
      { label: 'Party Plot Area', value: '30,000 Sq. Ft.' },
      { label: 'Lawn Seating', value: '1,200 Capacity' },
      { label: 'Accommodations', value: '10 Luxury Rooms' },
      { label: 'Parking', value: 'Ample Parking Space' },
      { label: 'Valet Service', value: 'Available in Main Event' },
    ],
    highlights: [
      '30,000 sq. ft. manicured open-air party plot',
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
    title: 'Lawn Area Decorations & Stage',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/Lawn Area Decorations And Stage area.webp',
    image: '/images/GalleryImages/Lawn Area Decorations And Stage area.webp',
  },
  {
    id: 'g2',
    title: 'Decorations & Seating Around Building',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/Decorations and Seating area Around Building.webp',
    image: '/images/GalleryImages/Decorations and Seating area Around Building.webp',
  },
  {
    id: 'g3',
    title: 'Catering in Lawn',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/Catering In lawn.webp',
    image: '/images/GalleryImages/Catering In lawn.webp',
  },
  {
    id: 'g4',
    title: 'Royal Ivory Pavilion',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages1.webp',
    image: '/images/GalleryImages/GalleryImages1.jpeg',
  },
  {
    id: 'g5',
    title: 'Colonnade & Grand Lawn',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages2.webp',
    image: '/images/GalleryImages/GalleryImages2.jpeg',
  },
  {
    id: 'g6',
    title: 'Shrinathji Sacred Mandap',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages3.webp',
    image: '/images/GalleryImages/GalleryImages3.jpeg',
  },
  {
    id: 'g7',
    title: 'Imperial Peach Mandap',
    category: 'banquet',
    venue: 'Banquet',
    venueName: 'The Banquet',
    thumb: '/images/GalleryImages/Thumb/GalleryImages4.webp',
    image: '/images/GalleryImages/GalleryImages4.jpeg',
  },
  {
    id: 'g8',
    title: 'Pastel Blossom Stage',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages5.webp',
    image: '/images/GalleryImages/GalleryImages5.jpeg',
  },
  {
    id: 'g9',
    title: 'Botanical Arch Lounge',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages6.webp',
    image: '/images/GalleryImages/GalleryImages6.jpeg',
  },
  {
    id: 'g10',
    title: 'Starlit Sangeet Arena',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages7.webp',
    image: '/images/GalleryImages/GalleryImages7.jpeg',
  },
  {
    id: 'g11',
    title: 'Crystal Symphony Stage',
    category: 'banquet',
    venue: 'Banquet',
    venueName: 'The Banquet',
    thumb: '/images/GalleryImages/Thumb/GalleryImages8.webp',
    image: '/images/GalleryImages/GalleryImages8.jpeg',
  },
  {
    id: 'g12',
    title: 'Golden Marigold Canopy',
    category: 'lawn',
    venue: 'Lawn',
    venueName: 'The Lawn',
    thumb: '/images/GalleryImages/Thumb/GalleryImages9.webp',
    image: '/images/GalleryImages/GalleryImages9.jpeg',
  },
];
