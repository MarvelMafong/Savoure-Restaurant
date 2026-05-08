// ============================================
//  SAVOURE — SITE CONSTANTS
//  All data lives here. Edit freely.
// ============================================

export const SITE = {
  name:    'Savoure',
  tagline: 'Where the world sits at one table.',
  address: '142 West Ember Lane, Tribeca, New York, NY 10013',
  phone:   '+1 (212) 555-0194',
  email:   'reservations@savoure-nyc.com',
  hours: [
    { day: 'Tue – Thu', time: '5:00 – 10:00 PM', closed: false },
    { day: 'Fri – Sat', time: '5:00 – 11:00 PM', closed: false },
    { day: 'Sunday',    time: '5:00 – 9:00 PM',  closed: false },
    { day: 'Monday',    time: 'Closed',           closed: true  },
  ],
  socials: [
    { label: 'in', href: 'https://linkedin.com/in/marvel-mafong' },
    { label: 'ig', href: 'https://instagram.com' },
    { label: 'tw', href: 'https://twitter.com' },
    { label: 'fb', href: 'https://facebook.com' },
    { label: 'tt', href: 'https://tiktok.com' },
  ],
}

export const NAV_LINKS = [
  { label: 'Menu',      href: '#menu' },
  { label: 'Our Story', href: '#about' },
  { label: 'Gallery',   href: '#gallery' },
  { label: 'Reserve',   href: '#reservation' },
  { label: 'Contact',   href: '#contact' },
]

// ── MENU DATA ──
export const MENU_CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks'] as const
export type MenuCategory = typeof MENU_CATEGORIES[number]

export interface Dish {
  id: string
  name: string
  description: string
  price: string
  origin: string
  tag: string
  image: string
  category: MenuCategory
  spotlight?: boolean
}

export const DISHES: Dish[] = [
  // STARTERS
  {
    id: 's1',
    name: 'Citrus Tataki',
    description: 'Seared yellowfin tuna, yuzu ponzu, shiso leaf, black sesame oil drops. Clean heat. Ocean depth.',
    price: '$24',
    origin: 'Japan × Peru',
    tag: 'Signature',
    image: '/images/starter.png',
    category: 'Starters',
    spotlight: true,
  },
  {
    id: 's2',
    name: 'Ember Beet',
    description: 'Slow-roasted beet carpaccio, whipped chèvre, candied walnut, orange zest. Earthy, sweet, sharp.',
    price: '$19',
    origin: 'France × Morocco',
    tag: 'Vegetarian',
    image: '/images/plate-art-1.png',
    category: 'Starters',
  },
  {
    id: 's3',
    name: 'Bouillabaisse Velouté',
    description: 'Silken saffron broth, fennel cream poured tableside, sourdough crisp. The south of France, reimagined.',
    price: '$22',
    origin: 'Provence × New York',
    tag: "Chef's Pick",
    image: '/images/plate-art-2.png',
    category: 'Starters',
  },
  // MAINS
  {
    id: 'm1',
    name: 'The Cartographer',
    description: 'Seared duck breast & hand-dived scallops, beet reduction painted across white ceramic, asparagus, heirloom tomato.',
    price: '$58',
    origin: 'France × Brittany',
    tag: "Tonight's Special",
    image: '/images/main-scallops.png',
    category: 'Mains',
    spotlight: true,
  },
  {
    id: 'm2',
    name: 'Miso Noir',
    description: 'Miso-glazed tofu, purple yam purée, charred bok choy, black sesame, berry jus. Dark, complex, alive.',
    price: '$44',
    origin: 'Japan × West Africa',
    tag: 'Plant-Based',
    image: '/images/hero-dish.png',
    category: 'Mains',
  },
  {
    id: 'm3',
    name: 'Côte Sauvage',
    description: 'Herb-crusted lamb rack, green chimichurri, charred leek, pomme purée. Argentina meets Paris.',
    price: '$67',
    origin: 'Argentina × France',
    tag: 'Signature',
    image: '/images/chef.png',
    category: 'Mains',
  },
  // DESSERTS
  {
    id: 'd1',
    name: 'Lumière',
    description: 'Vanilla bean parfait, raspberry coulis spiral, edible gold leaf, wild berry medley. Light as an evening in June.',
    price: '$18',
    origin: 'France × Nordic',
    tag: 'Signature',
    image: '/images/dessert.png',
    category: 'Desserts',
    spotlight: true,
  },
  {
    id: 'd2',
    name: 'Noir et Rouge',
    description: 'Dark chocolate ganache, chili-orange caramel, fleur de sel. Bitter, sweet, heat — all at once.',
    price: '$16',
    origin: 'Mexico × Belgium',
    tag: "Chef's Pick",
    image: '/images/plate-art-1.png',
    category: 'Desserts',
  },
  {
    id: 'd3',
    name: 'Petite Île',
    description: 'Coconut panna cotta, passion fruit curd, toasted coconut snow. The tropics, distilled.',
    price: '$15',
    origin: 'Thailand × Caribbean',
    tag: 'Gluten Free',
    image: '/images/plate-art-2.png',
    category: 'Desserts',
  },
  // DRINKS
  {
    id: 'dr1',
    name: 'Burgundy Reserve',
    description: 'Pinot Noir, Côte de Nuits 2019. Cherry, earth, silk. Paired with The Cartographer or Côte Sauvage.',
    price: '$22',
    origin: 'Burgundy, France',
    tag: "Sommelier's Pick",
    image: '/images/wine.png',
    category: 'Drinks',
    spotlight: true,
  },
  {
    id: 'dr2',
    name: 'Ember Old Fashioned',
    description: 'Bourbon, smoked orange peel, house bitters, torched rosemary. The Savoure welcome drink since 2019.',
    price: '$18',
    origin: 'House Cocktail',
    tag: 'House Special',
    image: '/images/ambiance.png',
    category: 'Drinks',
  },
  {
    id: 'dr3',
    name: 'Garden Spritz',
    description: 'Citrus, fresh herbs, elderflower, sparkling water. Crisp, aromatic. Zero proof, full experience.',
    price: '$12',
    origin: 'Non-Alcoholic',
    tag: 'Zero Proof',
    image: '/images/ingredients.png',
    category: 'Drinks',
  },
]

// ── HERO ORBIT DISHES ──
export const ORBIT_DISHES = [
  { src: '/images/hero-dish.png',     name: 'Miso Noir',        cat: 'Signature Main'  },
  { src: '/images/starter.png',       name: 'Citrus Tataki',    cat: 'Starter'         },
  { src: '/images/main-scallops.png', name: 'The Cartographer', cat: 'Main Course'     },
  { src: '/images/dessert.png',       name: 'Lumière',          cat: 'Dessert'         },
  { src: '/images/wine.png',          name: 'Côte Sauvage',     cat: 'Mains'           },
  { src: '/images/chef.png',          name: "Chef's Selection", cat: "Chef's Table"    },
  { src: '/images/ingredients.png',   name: 'Garden Origins',   cat: 'From the Market' },
]

// ── GALLERY FRAMES ──
export const GALLERY_FRAMES = [
  { src: '/images/ambiance.png',      num: '001', caption: 'The Dining Room',   location: 'Tribeca, New York',  date: 'Mar 2024', orient: 'landscape' as const },
  { src: '/images/chef.png',          num: '002', caption: 'The Kitchen',       location: 'Behind the Pass',    date: 'Jan 2024', orient: 'portrait'  as const },
  { src: '/images/hero-dish.png',     num: '003', caption: 'Miso Noir',         location: 'Plate No. 001',      date: 'Feb 2024', orient: 'square'    as const },
  { src: '/images/wine.png',          num: '004', caption: 'The Wine Service',  location: 'Table 7, Saturday',  date: 'Apr 2024', orient: 'landscape' as const },
  { src: '/images/main-scallops.png', num: '005', caption: 'The Cartographer', location: 'Plate No. 002',      date: 'Feb 2024', orient: 'square'    as const },
  { src: '/images/dessert.png',       num: '006', caption: 'Lumière',           location: 'Plate No. 005',      date: 'Mar 2024', orient: 'portrait'  as const },
  { src: '/images/starter.png',       num: '007', caption: 'Citrus Tataki',     location: 'Plate No. 003',      date: 'Jan 2024', orient: 'square'    as const },
  { src: '/images/ingredients.png',   num: '008', caption: 'From the Market',   location: 'Union Square, 6AM',  date: 'Apr 2024', orient: 'landscape' as const },
  { src: '/images/plate-art-1.png',   num: '009', caption: 'Sauce Study I',     location: 'The Prep Kitchen',   date: 'Mar 2024', orient: 'square'    as const },
  { src: '/images/plate-art-2.png',   num: '010', caption: 'Sauce Study II',    location: 'The Prep Kitchen',   date: 'Mar 2024', orient: 'square'    as const },
]

// ── TESTIMONIALS ──
export const TESTIMONIALS = [
  {
    id: 't1',
    quote: 'I have dined in Paris, Tokyo, and Lima. Savoure made me feel like I had never truly eaten before.',
    name: 'Alexandra M.',
    meta: 'New York · 12 visits',
    date: 'Mar 12, 2024',
    dish: 'The Cartographer',
    avatar: '/images/wine.png',
    tilt: -2.2,
    marginTop: 0,
  },
  {
    id: 't2',
    quote: 'Proposed to my partner here. When Lumière arrived, she cried. The chef came out personally. I will never forget it.',
    name: 'James & Priya R.',
    meta: 'Brooklyn · 3 visits',
    date: 'Jan 28, 2024',
    dish: 'Lumière',
    avatar: '/images/ambiance.png',
    tilt: 0.8,
    marginTop: 18,
  },
  {
    id: 't3',
    quote: 'The Miso Noir stopped me mid-sentence. I put down my fork and just looked at the plate. Pure art.',
    name: 'David K.',
    meta: 'Food Critic · NYT',
    date: 'Apr 5, 2024',
    dish: 'Miso Noir',
    avatar: '/images/chef.png',
    tilt: -1.4,
    marginTop: -10,
  },
  {
    id: 't4',
    quote: "Valentine's dinner. Table by the window. The Côte Sauvage arrived and neither of us spoke for a full minute.",
    name: 'Sofia & Marcus T.',
    meta: 'Manhattan · 7 visits',
    date: 'Feb 14, 2024',
    dish: 'Côte Sauvage',
    avatar: '/images/dessert.png',
    tilt: 1.8,
    marginTop: 8,
  },
  {
    id: 't5',
    quote: 'The Citrus Tataki is the reason I came back four times in one month. I am not exaggerating.',
    name: 'Nina W.',
    meta: 'SoHo · 4 visits',
    date: 'Mar 30, 2024',
    dish: 'Citrus Tataki',
    avatar: '/images/starter.png',
    tilt: -0.6,
    marginTop: 0,
  },
  {
    id: 't6',
    quote: 'I brought our entire team here after closing a deal. This is not a restaurant — it is a memory machine.',
    name: 'Robert C.',
    meta: 'CEO · First visit',
    date: 'Apr 18, 2024',
    dish: 'Tasting Menu',
    avatar: '/images/ambiance.png',
    tilt: 2.1,
    marginTop: 14,
  },
]

// ── BRAND STORY CHAPTERS ──
export const STORY_CHAPTERS = [
  {
    year: '2019',
    num: '01',
    title: 'The First Night',
    heading: 'The night that changed everything.',
    body: 'March 14, 2019. Forty covers. A kitchen of eight. The Cartographer was served for the first time to a table of four from Brooklyn who stayed until midnight asking questions about every ingredient. We knew then — this was not just a restaurant.',
    quote: '"We were fully booked within three days of opening."',
    tags: ['Tribeca, New York', '40 covers', '8 kitchen staff'],
    image: '/images/ambiance.png',
  },
  {
    year: '2020',
    num: '02',
    title: 'The Recognition',
    heading: 'New York Times called us remarkable.',
    body: 'In February 2020, the review ran on a Wednesday. By Thursday we were booked solid for six months. The world had discovered Savoure.',
    quote: '"Courage on a plate. Precision in every drop."',
    tags: ['NYT Feature', '6-month waitlist', 'Best New Restaurant'],
    image: '/images/hero-dish.png',
  },
  {
    year: '2022',
    num: '03',
    title: 'The Expansion',
    heading: 'We grew the team. Not the menu.',
    body: '2022 brought us 14 new kitchen staff from four continents — a sous chef from Osaka, a pastry chef from Lyon, a grill master from Buenos Aires. More voices. One vision.',
    quote: '"More voices. One vision."',
    tags: ['14 new chefs', '4 continents', '32 rotating dishes'],
    image: '/images/ingredients.png',
  },
  {
    year: '2024',
    num: '04',
    title: 'Today',
    heading: 'Still the same obsession. Always.',
    body: 'Five years in. 3,200+ guests served. Michelin recommended. And we still argue about every sauce, every plating angle, every ingredient origin. That argument is what ends up on your plate.',
    quote: '"The best meal of my life. Every single time."',
    tags: ['3,200+ guests', 'Michelin 2024', '★ 4.9 rating'],
    image: '/images/main-scallops.png',
  },
]

// ── SIGNATURE DISH HOTSPOTS ──
export const SIGNATURE_HOTSPOTS = [
  { id: 'hs0', top: '28%', left: '42%', num: '01', category: 'PROTEIN',   name: 'Duck Breast',         origin: 'Gascony, France'     },
  { id: 'hs1', top: '55%', left: '62%', num: '02', category: 'SEAFOOD',   name: 'Hand-Dived Scallops', origin: 'Brittany, Day-boat'  },
  { id: 'hs2', top: '68%', left: '32%', num: '03', category: 'SAUCE',     name: 'Beet Reduction',      origin: 'Local Farm, Pressed' },
  { id: 'hs3', top: '38%', left: '72%', num: '04', category: 'HERB',      name: 'Green Herb Oil',      origin: 'House Garden, AM'    },
  { id: 'hs4', top: '72%', left: '58%', num: '05', category: 'VEGETABLE', name: 'Heirloom Tomato',     origin: 'Upstate New York'    },
]

export const SIGNATURE_INGREDIENTS = [
  'Duck Breast · France',
  'Scallops · Brittany',
  'Beet Reduction · Local',
  'Asparagus · Hudson Valley',
  'Herb Oil · House Garden',
  'Heirloom Tomato · Upstate NY',
  'Micro Greens · Daily Harvest',
]