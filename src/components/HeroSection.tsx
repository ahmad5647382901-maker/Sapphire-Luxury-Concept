import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onHeroProductClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onHeroProductClick,
}) => {
  return (
    <section
      id="section-hero"
      className="relative h-screen min-h-[720px] w-full flex flex-col justify-between overflow-hidden bg-[#0B0A0A] text-[#FAF8F5] scroll-mt-20"
    >
      {/* Target anchors for Curated Navigation */}
      <div id="section-edition" className="absolute top-0 left-0 scroll-mt-20 pointer-events-none" />
      <div id="section-new-edition" className="absolute top-0 left-0 scroll-mt-20 pointer-events-none" />

      {/* Cinematic Background Image dominating the entire screen */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <picture className="w-full h-full block">
            <source
              type="image/webp"
              srcSet="/editorial/hero-750.webp 750w, /editorial/hero-1100.webp 1100w, /editorial/hero.webp 1376w"
              sizes="100vw"
            />
            <source
              type="image/jpeg"
              srcSet="/editorial/hero-750.jpg 750w, /editorial/hero.jpg 1376w"
              sizes="100vw"
            />
            <img
              src="/editorial/hero.webp"
              alt="SAPPHIRE Haute Couture Campaign — Architectural drape in travertine light"
              width={1376}
              height={768}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
            />
          </picture>
        </motion.div>
        {/* Subtle vignette and gradient for extreme typographic legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0A]/85 via-black/25 to-black/30 pointer-events-none" />
      </div>

      {/* Desktop: Empty upper-left travertine side wall, strictly away from the center subject */}
      <div className="hidden lg:block relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pt-28 sm:pt-32">
        <div className="max-w-[260px] space-y-2">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#FAF8F5]/60 block"
          >
            Anthology 01 · Autumn / Winter 2026
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-[10px] tracking-[0.38em] uppercase font-sans text-[#D8CFBE] font-medium block"
          >
            Modern Pakistani Couture
          </motion.span>
        </div>
      </div>

      {/* Main Campaign Typography at Lower Center/Left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pb-14 sm:pb-20 mt-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Headline */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Mobile / Tablet (< lg): Responsively positioned in clean lower negative space away from the face */}
              <div className="lg:hidden space-y-1.5 mb-4">
                <span className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase font-sans text-[#FAF8F5]/60 block">
                  Anthology 01 · Autumn / Winter 2026
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.38em] uppercase font-sans text-[#D8CFBE] font-medium block">
                  Modern Pakistani Couture
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[104px] leading-[0.92] tracking-tight font-normal text-[#FAF8F5]">
                Quiet <span className="italic font-light text-[#D8CFBE]">Form.</span>
                <br />
                Pure Restraint.
              </h1>
            </motion.div>
          </div>

          {/* Editorial Copy & Restrained CTAs */}
          <div className="lg:col-span-4 space-y-6 lg:pb-3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/80 leading-relaxed max-w-sm"
            >
              A study in architectural drape, sculpted silhouette, and heirloom leathercraft.
              Crafted in limited numbers at the Lahore atelier.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6 pt-2"
            >
              <button
                id="hero-explore-cta"
                type="button"
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-sans text-[#FAF8F5] pb-1 border-b border-[#FAF8F5]/40 hover:border-[#FAF8F5] transition-colors"
              >
                <span>Discover Edition</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>

              <button
                id="hero-product-cta"
                type="button"
                onClick={onHeroProductClick}
                className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase font-sans text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors"
              >
                <span>The Bag (PKR 8,990)</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Subtle Editorial Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-12 sm:pt-16 border-t border-[#FAF8F5]/15 mt-10 sm:mt-14 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase font-sans text-[#FAF8F5]/50"
        >
          <span>Chapter 01 — Overview</span>

          <button
            type="button"
            onClick={onExploreClick}
            className="flex items-center gap-2.5 hover:text-[#FAF8F5] transition-colors group cursor-pointer"
          >
            <span>Scroll</span>
            <ArrowDown className="w-3 h-3 text-[#FAF8F5]/60 group-hover:text-[#FAF8F5] transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
