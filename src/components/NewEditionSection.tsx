import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface NewEditionSectionProps {
  onExplore: () => void;
}

export const NewEditionSection: React.FC<NewEditionSectionProps> = ({ onExplore }) => {
  return (
    <section
      id="section-new-edition"
      className="relative py-28 md:py-44 px-6 sm:px-10 md:px-14 bg-[#FAF8F5] border-t border-[#0B0A0A]/10 overflow-hidden text-[#0B0A0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Chapter Header */}
        <div className="flex items-center justify-between border-b border-[#0B0A0A]/10 pb-5 mb-14 md:mb-24">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#8A857D]">
              Chapter 02
            </span>
            <span className="w-6 h-[1px] bg-[#0B0A0A]/20" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#0B0A0A]">
              The New Edition
            </span>
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#8A857D] hidden sm:inline">
            Limited Series · 2026 Archive
          </span>
        </div>

        {/* Asymmetric Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Oversized Typography & Narrow Narrative Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <span className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#8A857D] block">
                Autumn Winter Series
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.94] tracking-tight font-normal text-[#0B0A0A]">
                The New
                <br />
                <span className="italic font-light text-[#8A857D]">Edition.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 max-w-md"
            >
              <p className="text-xs sm:text-sm font-sans font-light text-[#1E1D1C]/80 leading-relaxed">
                Produced in strictly numbered quantities, this release fuses ancestral Pakistani
                textile geometry with razor-sharp architectural tailoring. Each silhouette is
                conceived to exist between quiet discipline and sculptural power.
              </p>

              <div className="pt-4 flex items-center gap-8">
                <button
                  id="new-edition-explore-cta"
                  type="button"
                  onClick={onExplore}
                  className="group inline-flex items-center gap-2.5 text-[11px] tracking-[0.25em] uppercase font-sans font-medium text-[#0B0A0A] pb-1 border-b border-[#0B0A0A] hover:border-[#8A857D] transition-colors"
                >
                  <span>Explore Series</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <span className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#8A857D]">
                  Edition of 50
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Full-Bleed Editorial Visual with Vertical Accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#ECE7DE]">
              <img
                src="/editorial/edition.jpg"
                alt="SAPPHIRE The New Edition presentation — Sculpted tailoring in natural light"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105 filter contrast-[1.03]"
              />

              {/* Minimalist Corner Annotation */}
              <div className="absolute bottom-6 left-6 text-[#FAF8F5] text-[9px] tracking-[0.3em] uppercase font-sans bg-black/40 backdrop-blur-xs px-3 py-1.5">
                Plates 01–04 · Lahore Studio
              </div>
            </div>

            {/* Asymmetric metadata note below image */}
            <div className="flex justify-between items-baseline pt-4 text-[9px] tracking-[0.25em] uppercase font-sans text-[#8A857D]">
              <span>Look 04 · Raw Silk & Wool Cashmere</span>
              <span>Model Reference 26-B</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
