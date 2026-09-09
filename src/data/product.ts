import { Product, EditorialStory } from '../types';

/* =========================================================
   PRODUCT CATALOG
========================================================= */

export const NOIR_STRUCTURE_BAG: Product = {
  id: 'noir-structure-bag',
  name: 'NOIR STRUCTURE BAG',
  tagline: 'A study in architectural restraint.',
  price: 8990,
  currency: 'PKR',
  formattedPrice: 'PKR 8,990',
  color: 'Noir Black',
  colorHex: '#111111',
  description:
    'A structured leather silhouette designed around quiet geometry, refined proportions, and everyday restraint.',

  category: 'Bags',
  collection: 'Atelier Objects',
  type: 'Structured Bag',
  featured: true,
  badge: 'Signature Edition',

  images: [
    {
      id: 'noir-front',
      label: 'Front',
      viewName: 'Front View',
      url: '/products/sapphire-bag/front.jpg',
      webpUrl: '/products/sapphire-bag/front.webp',
      alt: 'SAPPHIRE Noir Structure Bag front view',
      thumbnailUrl: '/products/sapphire-bag/front.jpg',
      thumbnailWebpUrl: '/products/sapphire-bag/front.webp',
    },
    {
      id: 'noir-side',
      label: 'Side',
      viewName: 'Side View',
      url: '/products/sapphire-bag/side.jpg',
      webpUrl: '/products/sapphire-bag/side.webp',
      alt: 'SAPPHIRE Noir Structure Bag side view',
      thumbnailUrl: '/products/sapphire-bag/side.jpg',
      thumbnailWebpUrl: '/products/sapphire-bag/side.webp',
    },
    {
      id: 'noir-back',
      label: 'Back',
      viewName: 'Back View',
      url: '/products/sapphire-bag/back.jpg',
      webpUrl: '/products/sapphire-bag/back.webp',
      alt: 'SAPPHIRE Noir Structure Bag back view',
      thumbnailUrl: '/products/sapphire-bag/back.jpg',
      thumbnailWebpUrl: '/products/sapphire-bag/back.webp',
    },
    {
      id: 'noir-detail',
      label: 'Detail',
      viewName: 'Detail View',
      url: '/products/sapphire-bag/detail.jpg',
      webpUrl: '/products/sapphire-bag/detail.webp',
      alt: 'SAPPHIRE Noir Structure Bag craftsmanship detail',
      thumbnailUrl: '/products/sapphire-bag/detail.jpg',
      thumbnailWebpUrl: '/products/sapphire-bag/detail.webp',
    },
  ],

  details: [
    'Structured everyday silhouette',
    'Adjustable shoulder strap',
    'Minimal architectural construction',
    'Signature SAPPHIRE hardware',
  ],

  materials: [
    'Premium structured leather',
    'Refined metal hardware',
    'Textile interior lining',
  ],

  dimensions: {
    height: '22 cm / 8.6 in',
    width:
      '28 cm / 11.0 in (base) · 24 cm / 9.4 in (top)',
    depth: '11.5 cm / 4.5 in',
    strapDrop:
      '48 cm – 56 cm / 18.9 – 22.0 in (adjustable)',
  },

  shippingInfo:
    'Nationwide delivery across Pakistan. Carefully packed for dispatch.',

  returnsInfo:
    'Returns accepted according to the SAPPHIRE concept return policy.',
};

/* =========================================================
   ADDITIONAL CATALOG OBJECTS
========================================================= */

export const SILK_FORM_SCARF: Product = {
  id: 'silk-form-scarf',
  name: 'SILK FORM SCARF',
  tagline: 'Soft geometry in motion.',
  price: 4290,
  currency: 'PKR',
  formattedPrice: 'PKR 4,290',
  color: 'Raw Ivory',
  colorHex: '#e8e1d5',
  description:
    'A fluid silk study balancing soft movement with the precise visual language of the SAPPHIRE anthology.',

  category: 'Accessories',
  collection: 'The Raw Silk Studio',
  type: 'Silk Scarf',
  featured: true,
  badge: 'Edition II',

  images: [
    {
      id: 'silk-form-main',
      label: 'Main',
      viewName: 'Editorial View',
      url: '/editorial/silk.jpg',
      webpUrl: '/editorial/silk.webp',
      alt: 'SAPPHIRE Silk Form Scarf',
      thumbnailUrl: '/editorial/silk.jpg',
      thumbnailWebpUrl: '/editorial/silk.webp',
    },
  ],

  details: [
    'Fluid lightweight silhouette',
    'Minimal tonal finish',
    'Designed for layered styling',
  ],

  materials: [
    'Fine silk textile',
    'Soft hand-finished edges',
  ],

  dimensions: {
    height: '70 cm',
    width: '70 cm',
    length: '70 cm',
  },

  shippingInfo:
    'Nationwide delivery across Pakistan. Carefully packed for dispatch.',

  returnsInfo:
    'Returns accepted according to the SAPPHIRE concept return policy.',
};

export const ARCHITECT_TOTE: Product = {
  id: 'architect-tote',
  name: 'ARCHITECT TOTE',
  tagline: 'Volume, proportion, restraint.',
  price: 7490,
  currency: 'PKR',
  formattedPrice: 'PKR 7,490',
  color: 'Stone',
  colorHex: '#aaa296',
  description:
    'A spacious architectural tote inspired by the clean proportions of the SAPPHIRE tailoring studies.',

  category: 'Bags',
  collection: 'The Architectural Silhouette',
  type: 'Structured Tote',
  featured: true,
  badge: 'Edition I',

  images: [
    {
      id: 'architect-main',
      label: 'Main',
      viewName: 'Editorial View',
      url: '/editorial/edition.jpg',
      webpUrl: '/editorial/edition.webp',
      alt: 'SAPPHIRE Architect Tote',
      thumbnailUrl: '/editorial/edition.jpg',
      thumbnailWebpUrl: '/editorial/edition.webp',
    },
  ],

  details: [
    'Generous everyday capacity',
    'Structured rectangular profile',
    'Minimal exterior detailing',
  ],

  materials: [
    'Structured textile body',
    'Reinforced handles',
    'Metal hardware',
  ],

  dimensions: {
    height: '31 cm',
    width: '38 cm',
    depth: '13 cm',
  },

  shippingInfo:
    'Nationwide delivery across Pakistan. Carefully packed for dispatch.',

  returnsInfo:
    'Returns accepted according to the SAPPHIRE concept return policy.',
};

export const ATELIER_METAL_CUFF: Product = {
  id: 'atelier-metal-cuff',
  name: 'ATELIER METAL CUFF',
  tagline: 'Quiet hardware. Sculptural presence.',
  price: 3290,
  currency: 'PKR',
  formattedPrice: 'PKR 3,290',
  color: 'Brushed Silver',
  colorHex: '#aaa9a5',
  description:
    'A restrained metal form inspired by the hardware language of the SAPPHIRE atelier.',

  category: 'Jewellery',
  collection: 'Atelier Craftsmanship',
  type: 'Metal Cuff',
  featured: false,
  badge: 'Atelier Object',

  images: [
    {
      id: 'cuff-main',
      label: 'Main',
      viewName: 'Editorial View',
      url: '/editorial/craft.jpg',
      webpUrl: '/editorial/craft.webp',
      alt: 'SAPPHIRE Atelier Metal Cuff',
      thumbnailUrl: '/editorial/craft.jpg',
      thumbnailWebpUrl: '/editorial/craft.webp',
    },
  ],

  details: [
    'Minimal sculptural profile',
    'Polished architectural finish',
    'Designed as a standalone object',
  ],

  materials: [
    'Metal alloy',
    'Brushed surface finish',
  ],

  dimensions: {
    height: '5.5 cm',
    width: '6.5 cm',
    depth: '0.5 cm',
    fit: 'Adjustable open cuff',
  },

  shippingInfo:
    'Nationwide delivery across Pakistan. Carefully packed for dispatch.',

  returnsInfo:
    'Returns accepted according to the SAPPHIRE concept return policy.',
};

/* =========================================================
   COMPLETE PRODUCT LIST
========================================================= */

export const PRODUCTS: Product[] = [
  NOIR_STRUCTURE_BAG,
  SILK_FORM_SCARF,
  ARCHITECT_TOTE,
  ATELIER_METAL_CUFF,
];

/* =========================================================
   EDITORIAL COLLECTIONS
========================================================= */

export const EDITORIAL_COLLECTIONS: EditorialStory[] = [
  {
    id: 'col-01',
    title: 'THE ARCHITECTURAL SILHOUETTE',
    subtitle: 'Edition I',
    edition: 'EDITION I',
    category: 'Couture Tailoring',
    description:
      'A study in proportion, structure, and quiet architectural form.',
    image: '/editorial/edition.jpg',
    webpUrl: '/editorial/edition.webp',
    year: '2026',
    label: '01 / ARCHITECTURE',
  },

  {
    id: 'col-02',
    title: 'THE RAW SILK STUDIO',
    subtitle: 'Edition II',
    edition: 'EDITION II',
    category: 'Artisanal Weaves',
    description:
      'Soft movement, natural texture, and the restrained language of raw silk.',
    image: '/editorial/silk.jpg',
    webpUrl: '/editorial/silk.webp',
    year: '2026',
    label: '02 / TEXTURE',
  },

  {
    id: 'col-03',
    title: 'ATELIER CRAFTSMANSHIP',
    subtitle: 'Edition III',
    edition: 'EDITION III',
    category: 'Leather & Metalwork',
    description:
      'Material, hardware, and hand-finished details brought into balance.',
    image: '/editorial/craft.jpg',
    webpUrl: '/editorial/craft.webp',
    year: '2026',
    label: '03 / CRAFT',
  },
];
