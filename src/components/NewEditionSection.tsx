import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface NewEditionSectionProps {
onExplore: () => void;
}

export const NewEditionSection: React.FC<NewEditionSectionProps> = ({
onExplore,
}) => {
return (
<section
id="section-new-edition"
className="relative overflow-hidden border-t border-[#0B0A0A]/10 bg-[#FAF8F5] px-6 py-24 text-[#0B0A0A] sm:px-10 md:px-14 md:py-36"
>
<div className="mx-auto max-w-7xl">
{/* Editorial chapter marker */}
<div className="mb-16 flex items-center justify-between border-b border-[#0B0A0A]/10 pb-5 md:mb-24">
<div className="flex items-center gap-4">
<span className="text-[9px] tracking-[0.34em] uppercase font-sans text-[#8A857D]">
Chapter 02
</span>

        <span className="h-px w-6 bg-[#0B0A0A]/20" />

        <span className="text-[9px] tracking-[0.34em] uppercase font-sans text-[#0B0A0A]">
          Anthology
        </span>
      </div>

      <span className="hidden text-[9px] tracking-[0.28em] uppercase font-sans text-[#8A857D] sm:inline">
        Autumn / Winter 2026
      </span>
    </div>

    {/* Editorial composition */}
    <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-20">
      {/* Narrative */}
      <div className="lg:col-span-5 lg:sticky lg:top-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="mb-4 block text-[9px] tracking-[0.38em] uppercase font-sans text-[#8A857D]">
            Curated Series
          </span>

          <h2 className="font-serif text-5xl font-normal leading-[0.94] tracking-[-0.025em] text-[#0B0A0A] sm:text-6xl md:text-7xl lg:text-[78px]">
            The Curated
            <br />
            <span className="font-light italic text-[#8A857D]">
              Series.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 max-w-md"
        >
          <p className="text-xs font-sans font-light leading-[1.8] text-[#1E1D1C]/75 sm:text-sm">
            Rejecting transient fashion cycles in pursuit of sculpted
            silhouettes, tactile textiles, and forms designed to endure.
          </p>

          <button
            id="new-edition-explore-cta"
            type="button"
            onClick={onExplore}
            className="group mt-8 inline-flex items-center gap-3 border-b border-[#0B0A0A]/70 pb-1.5 text-[10px] font-sans font-medium tracking-[0.24em] uppercase text-[#0B0A0A] transition-colors duration-300 hover:border-[#8A857D]"
          >
            <span>Explore Series</span>

            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>

      {/* Editorial image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{
          duration: 1.25,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="lg:col-span-7"
      >
        <div className="group relative aspect-[4/5] w-full overflow-hidden bg-[#ECE7DE]">
          <img
            src="/editorial/edition.jpg"
            alt="SAPPHIRE editorial fashion campaign"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center contrast-[1.03] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
          />
        </div>

        <div className="flex items-start justify-between gap-6 pt-4">
          <span className="text-[8px] leading-relaxed tracking-[0.25em] uppercase font-sans text-[#8A857D] sm:text-[9px]">
            Sculpted silhouettes · Tactile textiles
          </span>

          <span className="text-right text-[8px] leading-relaxed tracking-[0.25em] uppercase font-sans text-[#8A857D] sm:text-[9px]">
            Edition 01
          </span>
        </div>
      </motion.div>
    </div>
  </div>
</section>

);
};
