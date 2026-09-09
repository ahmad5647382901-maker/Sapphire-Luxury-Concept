import { Product, EditorialStory } from '../types';

/* =========================================================
   PRIMARY PRODUCT
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
    width: '28 cm / 11.0 in (base) · 24 cm / 9.4 in (top)',
    depth: '11.5 cm / 4.5 in',
    strapDrop: '48 cm – 56 cm / 18.9 – 22.0 in (adjustable)',
  },

  shippingInfo:
    'Nationwide delivery across Pakistan. Carefully packed for dispatch.',

  returnsInfo:
    'Returns accepted according to the SAPPHIRE concept return policy.',
};

/* =========================================================
   PRODUCT LIST
   Only the original Black SAPPHIRE product is active.
========================================================= */

export const PRODUCTS: Product[] = [
  NOIR_STRUCTURE_BAG,
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
