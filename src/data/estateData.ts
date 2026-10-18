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
}

export const VENUES: Venue[] = [
  {
    slug: 'lawn',
    numeral: 'I.',
    name: 'The Grand Royal Lawn',
    subtitle: '45,000 Sq. Ft. of Sculpted Velvet Flora',
    tagline: 'Vadodara’s crown open-air venue engineered for monolithic ceremonies and grand spectacles.',
    description: 'A vast expanse of natural carpeted turf framed by ancient asopalav foliage and architectural perimeter lighting. Designed with a gentle natural slope for panoramic sightlines and heavy stage reinforcement.',
    capacityFloating: 3000,
    capacitySeated: 1400,
    areaSqFt: 45000,
    heroImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=2000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=85',
    diptych: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: [
      { label: 'Ground Footprint', value: '45,000 Sq. Ft.', note: 'Bermuda Hybrid Lawn' },
      { label: 'Floating Guest Capacity', value: '3,000 Guests', note: 'Comfortable flow' },
      { label: 'Banquet Seating', value: '1,400 Guests', note: 'Round tables & lounge pods' },
      { label: 'Sound & Light Rigging', value: 'Ground Trussing Allowed', note: 'Heavy load capacity' },
      { label: 'Dedicated Bridal Pathway', value: 'Direct VIP Access', note: 'En-suite Suite 01' },
      { label: 'Power Infrastructure', value: '2 x 500 kVA 100% DG', note: 'Zero-drop dual failover' },
      { label: 'Dedicated Valet Bay', value: '500+ Vehicles', note: 'Paved ingress & egress' },
      { label: 'Accessibility', value: '100% Accessible', note: 'Wheelchair car parking & gates' },
    ],
    highlights: [
      'Colossal open-air lawn accommodates up to 3,000 guests',
      'Engineered sub-soil drainage guarantees pristine conditions in any season',
      'Wheelchair Accessible In-Car Parking, entrance, and exit corridors',
      'Dedicated 60-foot baraat processional avenue with grand entrance archways',
      'Independent heavy-duty catering courtyard with multi-phase utility docks',
    ],
    floorplanPdfName: 'Asopalav-Royal-Lawn-Spatial-Layout.pdf',
  },
  {
    slug: 'crystal-banquet',
    numeral: 'II.',
    name: 'The Crystal Pillarless Hall',
    subtitle: '18,000 Sq. Ft. of Climate-Controlled Opulence',
    tagline: 'A monumental architectural sanctuary with 28-foot soaring ceilings and Austrian crystal chandeliers.',
    description: 'Completely devoid of internal load-bearing pillars, offering unobstructed sightlines for up to 1,200 celebration guests. Features imported acoustic wall upholstery and Italian botticino marble foyer.',
    capacityFloating: 1200,
    capacitySeated: 750,
    areaSqFt: 18000,
    heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85',
    diptych: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: [
      { label: 'Internal Ceiling Height', value: '28 Ft. Clear Span', note: 'Zero interior pillars' },
      { label: 'Air-Conditioning', value: '120-Ton Daikin VRV', note: 'Micro-climate climate control' },
      { label: 'Guest Capacity', value: '1,200 Floating', note: '750 formal banquet' },
      { label: 'Chandelier Specification', value: '14 Austrian Tiers', note: 'Dimmable mood automation' },
      { label: 'Dressing Salons', value: '2 En-suite Royal Suites', note: 'Private restrooms & makeup stations' },
      { label: 'Acoustic Rating', value: 'STC 48 Wall Paneling', note: 'Concert grade clarity' },
      { label: 'Catering Ingress', value: 'Subterranean Corridor', note: 'Discrete waitstaff service' },
      { label: 'Accessibility', value: 'Step-Free Access', note: 'Elevator & wheelchair ramps' },
    ],
    highlights: [
      'Pillar-free vista ensures every dignitary has an unhindered vantage point',
      'Step-free wheelchair accessible entrance portals and dedicated valet parking',
      'Architectural warm cove lighting calibrated for cinematic photography',
      'Private motor court drop-off portico shielded from weather',
      'Seamless glass portal transitions connecting directly to the central lawn',
    ],
    floorplanPdfName: 'Asopalav-Crystal-Banquet-Spatial-Layout.pdf',
  },
  {
    slug: 'mandap-grove',
    numeral: 'III.',
    name: 'The Courtyard & Mandap Grove',
    subtitle: 'Sacred Water Pavilions & Intimate Twilight Rituals',
    tagline: 'An ethereal ceremonial courtyard designed for Vedic pheras, sunset haldi, and royal twilight soirees.',
    description: 'Surrounded by twin reflection lily pools, handcrafted sandstone jalis, and century-old asopalav trees. The acoustics are engineered so traditional shehnai and Vedic chants resonate with serene majesty.',
    capacityFloating: 600,
    capacitySeated: 350,
    areaSqFt: 12000,
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
    diptych: [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: [
      { label: 'Ceremonial Area', value: '12,000 Sq. Ft.', note: 'Hand-carved sandstone' },
      { label: 'Amphitheater Seating', value: '350 Tiered Seats', note: 'Panoramic mandap view' },
      { label: 'Water Elements', value: 'Twin Reflection Pools', note: 'Floating diya & floral setup' },
      { label: 'Vedic Orientation', value: 'East-Facing Axis', note: 'Strict Vastu compliance' },
      { label: 'Sacred Fire Safety', value: 'Smokeless Havan Ducts', note: 'Engineered air exhaust' },
      { label: 'Flora Sanctuary', value: 'Native Asopalav & Champa', note: 'Preserved 40-year canopy' },
    ],
    highlights: [
      'Naturally insulated botanical enclave providing sanctuary from urban commotion',
      'Floating floral mandap stage suspended over ambient reflection waters',
      'Ideal for sun-drenched daytime pheras or candlelit night ceremonies',
      'Direct covered connectivity to both the bridal suite and grand banquet foyer',
    ],
    floorplanPdfName: 'Asopalav-Mandap-Grove-Spatial-Layout.pdf',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'weddings' | 'galas' | 'decor';
  categoryLabel: string;
  venueName: string;
  season: string;
  image: string;
  aspect: 'tall' | 'wide' | 'square';
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Starlit Sangeet & Grand Pavilion',
    category: 'weddings',
    categoryLabel: 'Royal Weddings',
    venueName: 'The Grand Royal Lawn',
    season: 'Winter 2025',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=2000&q=85',
    aspect: 'wide',
    caption: 'Two thousand guests under custom timber trussing and fairy canopy lighting.',
  },
  {
    id: 'g2',
    title: 'Crystal Chandelier Symphony & Foyer',
    category: 'decor',
    categoryLabel: 'Decor Architecture',
    venueName: 'The Crystal Pillarless Hall',
    season: 'Autumn 2025',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85',
    aspect: 'wide',
    caption: 'Austrian crystal illuminations over mirror-polished Italian marble aisles.',
  },
  {
    id: 'g3',
    title: 'Sacred Floral Mandap by the Waters',
    category: 'weddings',
    categoryLabel: 'Royal Weddings',
    venueName: 'The Courtyard & Mandap Grove',
    season: 'Spring 2026',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
    aspect: 'tall',
    caption: 'Bespoke marigold and mogra floral sanctum framed by twin water pools.',
  },
  {
    id: 'g4',
    title: 'Golden Cutlery & Imperial Tablescape',
    category: 'decor',
    categoryLabel: 'Decor Architecture',
    venueName: 'The Crystal Pillarless Hall',
    season: 'Winter 2025',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85',
    aspect: 'tall',
    caption: 'Brushed gold tableware, crystal stemware, and hand-woven silk runners.',
  },
  {
    id: 'g5',
    title: 'Twilight Champagne Toast & Reception',
    category: 'galas',
    categoryLabel: 'Twilight Galas',
    venueName: 'The Grand Royal Lawn',
    season: 'Winter 2025',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
    caption: 'Sunset celebration overlooking the illuminated perimeter gardens.',
  },
  {
    id: 'g6',
    title: 'Royal Candlelit Intimate Feast',
    category: 'decor',
    categoryLabel: 'Decor Architecture',
    venueName: 'The Courtyard & Mandap Grove',
    season: 'Autumn 2025',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
    aspect: 'square',
    caption: 'Over five hundred artisan wax tapers reflecting off warm brass urns.',
  },
  {
    id: 'g7',
    title: 'Chandelier Canopy & Kinetic Lighting',
    category: 'decor',
    categoryLabel: 'Decor Architecture',
    venueName: 'The Crystal Pillarless Hall',
    season: 'Winter 2025',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85',
    aspect: 'tall',
    caption: '28-foot vertical drop suspended chandeliers with automated warmth dimming.',
  },
  {
    id: 'g8',
    title: 'Midnight Fireworks & Starlit Sendoff',
    category: 'galas',
    categoryLabel: 'Twilight Galas',
    venueName: 'The Grand Royal Lawn',
    season: 'Spring 2026',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
    caption: 'Cold-pyro celebration cascading across the grand lawns during the reception finale.',
  },
];
