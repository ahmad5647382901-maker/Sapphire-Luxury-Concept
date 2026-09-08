# SAPPHIRE — Luxury Fashion & Leather Goods Concept

An independent, editorial-grade digital fashion concept for **SAPPHIRE**, crafted with the aesthetic standards of an international digital fashion studio.

> **Disclaimer**: This is an independent, unofficial concept exploration celebrating modern Pakistani craftsmanship, contemporary drapery, and heirloom leathercraft. It is not affiliated with or endorsed by SAPPHIRE.

---

## Visual & Design Philosophy

- **Warm Ivory & Noir Palette**: High-contrast, restrained color architecture (`#FAF9F5`, `#F3F0EA`, `#0E0D0D`) paired with expansive negative space.
- **Editorial Typography Pairing**: Paired the high-contrast display serif *Cormorant Garamond* for editorial headlines with *Plus Jakarta Sans* for clean, modern interface controls and product specifications.
- **Cinematic Motion**: Scroll-linked reveals, entrance staggers, and transitions powered by Motion (Framer Motion v12), respecting `prefers-reduced-motion`.
- **Pure Fashion Editorial Layouts**: Asymmetrical visual balance, full-bleed imagery, and distinct editorial chapters in place of generic card grids.

---

## Architectural Chapters & Features

1. **Hero Campaign Opening**: Minimal header transformation on scroll, editorial manifesto, cinematic photography, and subtle scroll indicators.
2. **Chapter 01 — The New Edition**: Asymmetric campaign visual area featuring the Autumn/Winter limited series.
3. **Chapter 02 — The Series (Anthology)**: Large visual lookbook blocks with an interactive full-screen lookbook viewer (*The Architectural Silhouette*, *The Raw Silk Studio*, *Atelier Craftsmanship*).
4. **Chapter 03 — The Hero Object (Product Story)**: High-fashion campaign introduction of the **NOIR STRUCTURE BAG** (PKR 8,990).
5. **Chapter 04 — The Craft**: Dedicated craftsmanship study analyzing full-grain European calfskin, seven-pass beeswax edge lacquering, and custom-forged satin champagne brass hardware.
6. **Dedicated Product Experience**:
   - **Authentic Four-Image Gallery**: Uses 4 authentic local high-resolution angles (`front.jpg`, `side.jpg`, `back.jpg`, `detail.jpg`).
   - **Interactive Zoom & Swipe**: Cursor-following zoom on desktop, smooth touch swipe gestures on mobile, thumbnail selection tabs, and a dedicated rear elevation inspection button.
   - **Purchase & Information**: Quantity stepper, responsive micro-animated **Add to Bag** state, wishlist toggle, and collapsible accordions for materials, dimensions, and shipping.
7. **Chapter 05 — Discover (Horizon)**: Editorial closing invitation with private archive dispatch subscription.
8. **E-Commerce Concierge**:
   - Slide-over Shopping Bag drawer with live subtotal calculation and free Pakistan delivery indicator.
   - Instant Search overlay with curated search suggestions.
   - Private Wishlist drawer.
   - White-glove Pakistani checkout modal (Lahore, Karachi, Islamabad, etc.) supporting Cash on Delivery and Card payments.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (`motion/react`)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Project Structure

```text
├── public/
│   ├── editorial/            # High-fashion editorial campaign imagery
│   └── products/
│       └── sapphire-bag/     # Authentic 4-angle product imagery (front, side, back, detail)
├── src/
│   ├── components/
│   │   ├── CartDrawer.tsx
│   │   ├── CheckoutModal.tsx
│   │   ├── CollectionEditorial.tsx
│   │   ├── CraftsmanshipSection.tsx
│   │   ├── DiscoverCTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── NewEditionSection.tsx
│   │   ├── ProductDetailSection.tsx
│   │   ├── ProductStorySection.tsx
│   │   ├── SearchModal.tsx
│   │   ├── StoryModal.tsx
│   │   └── WishlistDrawer.tsx
│   ├── data/
│   │   └── product.ts        # Centralized product and collection data
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── App.tsx               # Main application layout & orchestrator
│   ├── index.css             # Tailwind v4 theme & luxury typography tokens
│   └── main.tsx              # React DOM entry point
├── index.html                # Typography imports and SEO metadata
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or bun

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

### Production Build

```bash
# Build optimized static assets for production
npm run build

# Preview production build locally
npm run preview
```

The output will be placed in the `dist/` directory, ready to be hosted on Vercel, Netlify, Cloudflare Pages, AWS S3, or any static hosting service.

---

## License

Private / Concept portfolio showcase.
