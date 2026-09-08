import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
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
      className="relative py-28 md:py-44 px-6 sm:px-10 md:px-14 bg-[#0B0A0A] text-[#FAF8F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#FAF8F5]/15 pb-5 mb-16 md:mb-28">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#FAF8F5]/50">
              Chapter 04
            </span>
            <span className="w-6 h-[1px] bg-[#FAF8F5]/20" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#FAF8F5]">
              The Hero Object
            </span>
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#FAF8F5]/50 hidden sm:inline">
            Sculpted Leatherwork
          </span>
        </div>

        {/* Campaign Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Main Visual Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative group cursor-pointer overflow-hidden bg-[#141312]"
            onClick={onGoToProduct}
          >
            <div className="aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden">
              <img
                src={NOIR_STRUCTURE_BAG.images[0].url}
                alt={NOIR_STRUCTURE_BAG.images[0].alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-103"
              />
            </div>

            {/* Editorial Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none text-[9px] tracking-[0.3em] uppercase font-sans text-[#FAF8F5]/70">
              <span>Front Elevation · Architectural Silhouette</span>
              <span>Plate 01 / 04</span>
            </div>
          </motion.div>

          {/* Editorial Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#D8CFBE] block">
                The Masterpiece
              </span>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF8F5] font-normal leading-[0.98]">
                NOIR STRUCTURE
                <br />
                <span className="italic font-light text-[#D8CFBE]">BAG</span>
              </h2>

              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-serif text-2xl md:text-3xl text-[#FAF8F5]">
                  {NOIR_STRUCTURE_BAG.formattedPrice}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#FAF8F5]/40">
                  Taxes Included
                </span>
              </div>
            </div>

            <p className="border-l border-[#D8CFBE]/40 pl-5 text-[#FAF8F5]/85 text-base sm:text-lg font-serif italic leading-relaxed">
              "{NOIR_STRUCTURE_BAG.description}"
            </p>

            <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/70 leading-relaxed max-w-md">
              Engineered with rigid geometry yet sculpted to sit effortlessly in the crook of the arm
              or across the body. Every edge is bevelled by hand and burnished with natural beeswax.
            </p>

            {/* Restrained Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="story-inspect-product-btn"
                type="button"
                onClick={onGoToProduct}
                className="group inline-flex items-center justify-between gap-6 px-7 py-3.5 bg-[#FAF8F5] text-[#0B0A0A] text-[11px] tracking-[0.22em] uppercase font-sans font-medium transition-all duration-300 hover:bg-[#D8CFBE]"
              >
                <span>Inspect Object</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="story-quick-add-btn"
                type="button"
                onClick={onQuickAdd}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#FAF8F5]/30 text-[#FAF8F5] text-[11px] tracking-[0.22em] uppercase font-sans font-medium transition-colors hover:border-[#FAF8F5] hover:bg-[#FAF8F5]/10"
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
