import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';

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
      className="relative min-h-[95vh] md:min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 px-6 sm:px-8 md:px-12 overflow-hidden bg-[#FAF9F5]"
    >
      {/* Top Editorial Subtext */}
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#0E0D0D]/10 pb-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] md:text-xs tracking-[0.26em] uppercase text-[#0E0D0D]/65 font-sans font-medium"
        >
          AUTUMN / WINTER 2026 ARCHIVE
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] md:text-xs tracking-[0.24em] uppercase text-[#0E0D0D]/65 font-sans"
        >
          CONTEMPORARY SILHOUETTES · LAHORE ATELIER
        </motion.span>
      </div>

      {/* Main Editorial Composition */}
      <div className="max-w-7xl w-full mx-auto my-auto py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Headlines & Editorial Statement */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <span className="inline-block text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#0E0D0D]/50 font-sans font-medium">
              Modern Pakistani Fashion
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.98] tracking-[-0.01em] text-[#0E0D0D] font-normal">
              Sculpted <br />
              <span className="italic font-light">Elegance</span> & <br />
              Quiet Power.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[#232220]/80 text-base md:text-lg leading-relaxed font-sans font-light"
          >
            An independent concept reinterpreting luxury through architectural drapery,
            artisan-tanned leather, and unyielding confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <button
              id="hero-explore-cta"
              type="button"
              onClick={onExploreClick}
              className="group relative inline-flex items-center justify-between gap-6 px-8 py-4 bg-[#0E0D0D] text-[#FAF9F5] text-[12px] tracking-[0.2em] uppercase font-sans font-medium overflow-hidden transition-all duration-500 hover:bg-[#232220] shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              <span>Explore The Campaign</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              id="hero-product-cta"
              type="button"
              onClick={onHeroProductClick}
              className="group inline-flex items-center justify-between sm:justify-start gap-3 px-6 py-4 border border-[#0E0D0D]/20 text-[#0E0D0D] text-[12px] tracking-[0.18em] uppercase font-sans font-medium transition-all duration-300 hover:border-[#0E0D0D] hover:bg-[#0E0D0D]/5"
            >
              <span>View Noir Bag</span>
              <span className="text-[11px] text-[#0E0D0D]/50 font-normal">PKR 8,990</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Hero Visual Artwork */}
        <div className="lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] sm:aspect-[3/4] max-h-[640px] w-full overflow-hidden bg-[#EAE6DF]"
          >
            <img
              src="/editorial/hero.jpg"
              alt="SAPPHIRE Haute Couture Campaign — Modern Pakistani luxury fashion in warm travertine architectural light"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
            />
            {/* Subtle editorial watermark badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#FAF9F5] p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-white/80 block">
                  Campaign Visual
                </span>
                <span className="font-serif text-lg tracking-wide text-white">
                  The Modern Silhouette
                </span>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-white/70">
                Lahore, 2026
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Sub-bar & Scroll Indicator */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between pt-6 border-t border-[#0E0D0D]/10">
        <div className="flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-sans text-[#0E0D0D]/50">
          <span>01 / 05 Editorial Chapters</span>
          <span className="hidden md:inline">Curated by Atelier Sapphire</span>
        </div>

        <button
          type="button"
          onClick={onExploreClick}
          className="group flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-sans text-[#0E0D0D]/70 hover:text-[#0E0D0D] transition-colors"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#0E0D0D]" />
        </button>
      </div>
    </section>
  );
};
