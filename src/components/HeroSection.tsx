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
className="relative min-h-screen h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0B0A0A] text-[#FAF8F5] scroll-mt-20"
>
{/* Curated navigation anchors — preserved */}
<div
id="section-edition"
className="absolute top-0 left-0 pointer-events-none scroll-mt-20"
/>
<div
id="section-new-edition"
className="absolute top-0 left-0 pointer-events-none scroll-mt-20"
/>

  {/* Cinematic campaign image */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    <motion.div
      initial={{ scale: 1.035, opacity: 0.86 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full w-full"
    >
      <picture className="block h-full w-full">
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
          className="h-full w-full object-cover object-center brightness-[0.74] contrast-[1.04]"
        />
      </picture>
    </motion.div>

    {/* Restrained cinematic grading */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0B0A0A]/80 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A0A]/20 via-transparent to-[#0B0A0A]/25 pointer-events-none" />
  </div>

  {/* Quiet campaign metadata */}
  <div className="relative z-10 hidden w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pt-28 sm:pt-32 lg:block">
    <div className="max-w-[280px] space-y-2">
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25 }}
        className="block text-[9px] tracking-[0.34em] uppercase font-sans text-[#FAF8F5]/55"
      >
        Anthology 01 · Autumn / Winter 2026
      </motion.span>

      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.35 }}
        className="block text-[9px] tracking-[0.36em] uppercase font-sans text-[#D8CFBE]/85"
      >
        Modern Pakistani Couture
      </motion.span>
    </div>
  </div>

  {/* Main editorial composition */}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pb-8 sm:pb-12 lg:pb-14 mt-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-end">
      {/* Main statement */}
      <div className="lg:col-span-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.25,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Mobile / tablet metadata */}
          <div className="lg:hidden mb-5 space-y-1.5">
            <span className="block text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-sans text-[#FAF8F5]/55">
              Anthology 01 · Autumn / Winter 2026
            </span>

            <span className="block text-[8px] sm:text-[9px] tracking-[0.34em] uppercase font-sans text-[#D8CFBE]/85">
              Modern Pakistani Couture
            </span>
          </div>

          <h1 className="font-serif text-[3.35rem] leading-[0.91] tracking-[-0.035em] font-normal text-[#FAF8F5] sm:text-7xl md:text-8xl lg:text-[104px]">
            Quiet <span className="italic font-light text-[#D8CFBE]">Form.</span>
            <br />
            Pure Restraint.
          </h1>
        </motion.div>
      </div>

      {/* Supporting editorial copy */}
      <div className="lg:col-span-4 lg:pb-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.15,
            delay: 0.48,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-sm"
        >
          <p className="text-[11px] sm:text-xs md:text-sm font-sans font-light leading-[1.7] text-[#FAF8F5]/72">
            Architectural drape, sculpted silhouette, and heirloom
            leathercraft — composed with restraint.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              id="hero-explore-cta"
              type="button"
              onClick={onExploreClick}
              className="group inline-flex items-center gap-3 border-b border-[#FAF8F5]/35 pb-1.5 text-[10px] sm:text-[11px] tracking-[0.23em] uppercase font-sans text-[#FAF8F5] transition-colors duration-300 hover:border-[#FAF8F5]"
            >
              <span>Discover Edition</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              id="hero-product-cta"
              type="button"
              onClick={onHeroProductClick}
              className="inline-flex items-center text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-sans text-[#FAF8F5]/58 transition-colors duration-300 hover:text-[#FAF8F5]"
            >
              The Bag · PKR 8,990
            </button>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Minimal chapter marker */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.9 }}
      className="mt-9 sm:mt-12 flex items-center justify-between border-t border-[#FAF8F5]/12 pt-4 sm:pt-5"
    >
      <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase font-sans text-[#FAF8F5]/42">
        Chapter 01 — Overview
      </span>

      <button
        type="button"
        onClick={onExploreClick}
        aria-label="Scroll to discover the edition"
        className="group flex items-center gap-2 text-[8px] sm:text-[9px] tracking-[0.28em] uppercase font-sans text-[#FAF8F5]/42 transition-colors duration-300 hover:text-[#FAF8F5]"
      >
        <span>Scroll</span>
        <ArrowDown className="h-3 w-3 text-[#FAF8F5]/50 transition-transform duration-300 group-hover:translate-y-0.5" />
      </button>
    </motion.div>
  </div>
</section>

);
};
