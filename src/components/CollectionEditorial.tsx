import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EDITORIAL_COLLECTIONS } from '../data/product';

interface CollectionEditorialProps {
  onSelectStory: (storyId: string) => void;
}

export const CollectionEditorial: React.FC<CollectionEditorialProps> = ({ onSelectStory }) => {
  return (
    <section
      id="section-collections"
      className="relative py-24 md:py-36 px-6 sm:px-8 md:px-12 bg-[#F6F4EE] border-t border-[#0E0D0D]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/50 font-medium block">
              Chapter 02 — The Series
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0E0D0D] font-normal leading-[1.05]">
              Curated <span className="italic font-light">Anthology</span>
            </h2>
          </div>
          <p className="max-w-md text-[#232220]/75 text-sm sm:text-base font-sans font-light leading-relaxed">
            Rejecting seasonal disposability in favor of timeless heirloom garments and sculpted
            accessories engineered to endure generations.
          </p>
        </div>

        {/* Asymmetrical Editorial Collection Blocks */}
        <div className="space-y-24 md:space-y-36">
          {EDITORIAL_COLLECTIONS.map((col, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual Block */}
                <div
                  className={`relative group overflow-hidden bg-[#EAE6DF] ${
                    isEven ? 'lg:col-span-7 lg:col-start-6' : 'lg:col-span-7'
                  }`}
                >
                  <div className="aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-5 right-5 bg-[#FAF9F5]/90 backdrop-blur-xs px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D]">
                    {col.category}
                  </div>
                </div>

                {/* Typography Block */}
                <div
                  className={`flex flex-col justify-center space-y-6 ${
                    isEven ? 'lg:col-span-5 lg:col-start-1' : 'lg:col-span-5'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/45">
                    <span>{col.edition}</span>
                    <span>·</span>
                    <span>{col.year}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#0E0D0D] font-normal leading-tight">
                    {col.title}
                  </h3>

                  <p className="text-[#232220]/80 text-sm sm:text-base font-sans font-light leading-relaxed">
                    {col.description}
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectStory(col.id)}
                      className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D] hover:opacity-75 transition-opacity"
                    >
                      <span>Explore Lookbook</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
