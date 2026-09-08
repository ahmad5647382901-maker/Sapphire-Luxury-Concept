import { Product, EditorialStory } from '../types';

export const NOIR_STRUCTURE_BAG: Product = {
  id: 'noir-structure-bag',
  name: 'NOIR STRUCTURE BAG',
  tagline: 'Modern Pakistani fashion. Luxury. Confidence. Elegance.',
  price: 8990,
  currency: 'PKR',
  formattedPrice: 'PKR 8,990',
  color: 'Noir Black',
  colorHex: '#141414',
  description: 'A sculpted leather silhouette designed for effortless everyday elegance.',
  images: [
    {
      id: 'img-front',
      label: '01 / 04',
      viewName: 'Front View',
      url: '/products/sapphire-bag/front.jpg',
      alt: 'NOIR STRUCTURE BAG — Sculpted front elevation showing clean architectural lines and brushed brass hardware',
    },
    {
      id: 'img-side',
      label: '02 / 04',
      viewName: 'Profile & Side',
      url: '/products/sapphire-bag/side.jpg',
      alt: 'NOIR STRUCTURE BAG — Geometric three-quarter side profile showcasing structured depth and handle curvature',
    },
    {
      id: 'img-back',
      label: '03 / 04',
      viewName: 'Rear Panel',
      url: '/products/sapphire-bag/back.jpg',
      alt: 'NOIR STRUCTURE BAG — Rear leather panel with tailored tonal saddle stitching and seamless slip pocket',
    },
    {
      id: 'img-detail',
      label: '04 / 04',
      viewName: 'Craftsmanship Detail',
      url: '/products/sapphire-bag/detail.jpg',
      alt: 'NOIR STRUCTURE BAG — Close-up macro texture of supple full-grain calfskin and edge-lacquered finishing',
    },
  ],
  details: [
    'Architectural trapezoidal silhouette with reinforced base structure',
    'Concealed double magnetic flap closure with engraved minimalist brass insignia',
    'Hand-lacquered tonal edge burnishing with beeswax coating',
    'Interior partition featuring secure zippered compartment and dual slip pockets',
    'Detachable and adjustable leather shoulder strap with custom forged buckle',
    'Protective custom brass base studs for floor stability',
    'Debossed foil-stamped interior authenticity serial code',
  ],
  materials: [
    '100% Full-grain European calfskin leather, vegetable-tanned and drum-dyed',
    'Interior lined in plush Japanese micro-suede in warm sand tone',
    'Hardware: Custom forged solid brass with brushed satin champagne gold finish',
    'Thread: High-tensile bonded German nylon saddle thread',
  ],
  dimensions: {
    height: '22 cm / 8.6 in',
    width: '28 cm / 11.0 in (base) · 24 cm / 9.4 in (top)',
    depth: '11.5 cm / 4.5 in',
    strapDrop: '48 cm – 56 cm / 18.9 – 22.0 in (adjustable)',
  },
  shippingInfo:
    'Complimentary white-glove courier delivery across Pakistan within 2–4 business days. Securely encased in our signature rigid archive presentation box with dust protective pouch.',
  returnsInfo:
    'We offer 14-day complimentary returns and exchanges for unworn items in their original packaging with security tags intact.',
};

export const EDITORIAL_COLLECTIONS = [
  {
    id: 'col-01',
    edition: 'EDITION I',
    title: 'THE ARCHITECTURAL SILHOUETTE',
    category: 'Couture Tailoring',
    description: 'Precision cutting, sculpted waistlines, and pure proportions that celebrate contemporary Pakistani silhouettes.',
    image: '/editorial/edition.jpg',
    year: '2026',
  },
  {
    id: 'col-02',
    edition: 'EDITION II',
    title: 'THE RAW SILK STUDIO',
    category: 'Artisanal Weaves',
    description: 'Indigenous mulberry silks hand-reeled and woven into fluid, effortless garments designed for movement.',
    image: '/editorial/silk.jpg',
    year: '2026',
  },
  {
    id: 'col-03',
    edition: 'EDITION III',
    title: 'ATELIER CRAFTSMANSHIP',
    category: 'Leather & Metalwork',
    description: 'Meticulous hand-burnished leathers and custom forged metal hardware built to age with graceful character.',
    image: '/editorial/craft.jpg',
    year: '2026',
  },
];
