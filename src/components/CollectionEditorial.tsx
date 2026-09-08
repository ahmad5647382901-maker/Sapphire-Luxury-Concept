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
      className="relative py-28 md:py-44 px-6 sm:px-10 md:px-14 bg-[#0B0A0A] border-t border-[#FAF8F5]/10 overflow-hidden text-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 pb-6 border-b border-[#FAF8F5]/10 gap-8">
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE]/60 block">
              Chapter 02 — Anthology
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FAF8F5]">
              The Curated <span className="italic font-light text-[#D8CFBE]">Series.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/70 leading-relaxed">
            Rejecting transient fast-fashion cycles in pursuit of heirloom silhouettes, raw silks,
            and sculpted leathercraft engineered to endure generations.
          </p>
        </div>

        {/* Editorial Story Blocks with High-End Asymmetry */}
        <div className="space-y-32 md:space-y-48">
          {EDITORIAL_COLLECTIONS.map((col, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual Block with Architectural Proportion */}
                <div
                  className={`relative group overflow-hidden bg-[#141312] border border-[#FAF8F5]/10 cursor-pointer ${
                    isEven ? 'lg:col-span-7 lg:col-start-6' : 'lg:col-span-7'
                  }`}
                  onClick={() => onSelectStory(col.id)}
                >
                  <div className="aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden">
                    <picture className="w-full h-full block">
                      {col.webpSrcSet ? (
                        <source
                          type="image/webp"
                          srcSet={col.webpSrcSet}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 720px"
                        />
                      ) : col.webpUrl ? (
                        <source type="image/webp" srcSet={col.webpUrl} />
                      ) : null}
                      {col.jpgSrcSet ? (
                        <source
                          type="image/jpeg"
                          srcSet={col.jpgSrcSet}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 720px"
                        />
                      ) : null}
                      <img
                        src={col.webpUrl || col.image}
                        alt={col.title}
                        width={col.width || 896}
                        height={col.height || 1200}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-103 filter contrast-[1.03] brightness-[0.88]"
                      />
                    </picture>
                  </div>

                  {/* Micro Metadata Tag */}
                  <div className="absolute top-5 left-5 bg-[#0B0A0A]/85 backdrop-blur-xs border border-[#FAF8F5]/10 text-[#FAF8F5] px-3 py-1 text-[8px] tracking-[0.3em] uppercase font-sans">
                    {col.category}
                  </div>
                </div>

                {/* Typography Block */}
                <div
                  className={`flex flex-col justify-center space-y-6 ${
                    isEven ? 'lg:col-span-5 lg:col-start-1' : 'lg:col-span-5'
                  }`}
                >
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/70">
                    <span>Plate 0{idx + 1}</span>
                    <span>·</span>
                    <span>{col.edition}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF8F5] font-normal leading-tight">
                    {col.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/75 leading-relaxed max-w-md">
                    {col.description}
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectStory(col.id)}
                      className="group inline-flex items-center gap-2.5 text-[11px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5] pb-1 border-b border-[#FAF8F5]/30 hover:border-[#FAF8F5] transition-colors"
                    >
                      <span>Read Lookbook</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
