import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NOIR_STRUCTURE_BAG } from '../data/product';

interface ProductStorySectionProps {
  onGoToProduct: () => void;
  onQuickAdd: () => void;
}

export const ProductStorySection: React.FC<ProductStorySectionProps> = ({
  onGoToProduct,
  onQuickAdd,
}) => {
  return (
    <section
      id="section-product-story"
      className="relative py-28 md:py-40 px-6 sm:px-8 md:px-12 bg-[#0E0D0D] text-[#FAF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#FAF9F5]/15 pb-4 mb-16 md:mb-24">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FAF9F5]" />
            <span className="text-xs tracking-[0.3em] uppercase font-sans text-[#FAF9F5]/60">
              Chapter 03 — The Hero Object
            </span>
          </div>
          <span className="text-xs tracking-[0.25em] uppercase font-sans text-[#FAF9F5]/40 hidden sm:inline">
            Sculpted Leatherwork
          </span>
        </div>

        {/* Campaign Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Visual Campaign Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative group cursor-pointer overflow-hidden bg-[#161616]"
            onClick={onGoToProduct}
          >
            <div className="aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden">
              <img
                src={NOIR_STRUCTURE_BAG.images[0].url}
                alt={NOIR_STRUCTURE_BAG.images[0].alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-white/70">
                Front Elevation · Architectural Silhouette
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-white/70">
                01 / 04
              </span>
            </div>
          </motion.div>

          {/* Typography & Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase font-sans text-[#FAF9F5]/50">
                <Sparkles className="w-3 h-3 text-[#FAF9F5]/70" />
                <span>Featured Masterpiece</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF9F5] font-normal leading-[1.05]">
                NOIR STRUCTURE <br />
                <span className="italic font-light">BAG</span>
              </h2>
              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-serif text-2xl md:text-3xl text-[#FAF9F5]">
                  {NOIR_STRUCTURE_BAG.formattedPrice}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase font-sans text-[#FAF9F5]/45">
                  Taxes Included
                </span>
              </div>
            </div>

            <blockquote className="border-l border-[#FAF9F5]/20 pl-5 text-[#FAF9F5]/85 text-base md:text-lg font-serif italic leading-relaxed">
              "{NOIR_STRUCTURE_BAG.description}"
            </blockquote>

            <p className="text-[#FAF9F5]/70 text-sm sm:text-base font-sans font-light leading-relaxed">
              Engineered with rigid geometry yet sculpted to sit gently in the crook of the arm or
              across the torso. Every edge is bevelled by hand and burnished with natural beeswax for
              unflinching durability.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="story-inspect-product-btn"
                type="button"
                onClick={onGoToProduct}
                className="group relative inline-flex items-center justify-between gap-6 px-8 py-4 bg-[#FAF9F5] text-[#0E0D0D] text-[12px] tracking-[0.2em] uppercase font-sans font-medium transition-all duration-500 hover:bg-[#EAE6DF]"
              >
                <span>Examine Gallery & Details</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="story-quick-add-btn"
                type="button"
                onClick={onQuickAdd}
                className="inline-flex items-center justify-center px-6 py-4 border border-[#FAF9F5]/30 text-[#FAF9F5] text-[12px] tracking-[0.18em] uppercase font-sans font-medium transition-all duration-300 hover:border-[#FAF9F5] hover:bg-[#FAF9F5]/10"
              >
                <span>Add to Bag</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
