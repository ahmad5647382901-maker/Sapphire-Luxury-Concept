import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface NewEditionSectionProps {
  onExplore: () => void;
}

export const NewEditionSection: React.FC<NewEditionSectionProps> = ({ onExplore }) => {
  return (
    <section
      id="section-new-edition"
      className="relative py-24 md:py-36 px-6 sm:px-8 md:px-12 bg-[#FAF9F5] border-t border-[#0E0D0D]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Track */}
        <div className="flex items-baseline justify-between mb-10 md:mb-16 border-b border-[#0E0D0D]/10 pb-4">
          <span className="text-xs tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/50 font-medium">
            Chapter 01 — The New Edition
          </span>
          <span className="text-xs tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/40 hidden sm:inline">
            Limited Release · Series No. 26
          </span>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Editorial Image Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative group overflow-hidden bg-[#EAE6DF]"
          >
            <div className="aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden">
              <img
                src="/editorial/edition.jpg"
                alt="SAPPHIRE — The New Edition sculpted tailoring presentation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
            {/* Subtle floating editorial label */}
            <div className="absolute top-6 left-6 bg-[#FAF9F5]/90 backdrop-blur-xs px-3.5 py-1.5 text-[10px] tracking-[0.22em] uppercase font-sans font-medium text-[#0E0D0D]">
              Look 04 · Edition Atelier
            </div>
          </motion.div>

          {/* Right Text & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-[#0E0D0D]/50 font-sans font-medium block">
                Autumn Winter Collection
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0E0D0D] font-normal leading-[1.05]">
                THE NEW <br />
                <span className="italic font-light">EDITION</span>
              </h2>
            </div>

            <p className="text-[#232220]/80 text-base md:text-lg leading-relaxed font-sans font-light">
              Crafted in limited numbers, this release marries heritage Pakistani textile
              structures with sharp contemporary tailoring. Each piece exists at the intersection
              of quiet restraint and dramatic proportion.
            </p>

            <div className="pt-2">
              <button
                id="new-edition-explore-cta"
                type="button"
                onClick={onExplore}
                className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#0E0D0D] py-2 border-b-2 border-[#0E0D0D] transition-all hover:gap-6"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
