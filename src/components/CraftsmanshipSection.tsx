import React from 'react';
import { motion } from 'motion/react';
import { NOIR_STRUCTURE_BAG } from '../data/product';

export const CraftsmanshipSection: React.FC = () => {
  const craftPoints = [
    {
      num: '01',
      title: 'Full-Grain European Calfskin',
      description:
        'Sourced exclusively from certified ethical tanneries, each hide is drum-dyed through the grain, preserving organic tactile richness that forms a lustrous patina over years of carriage.',
    },
    {
      num: '02',
      title: 'Seven-Pass Edge Lacquering',
      description:
        'Raw leather cuts undergo seven successive iterations of hand-sanding, beveling, pigment application, and heated beeswax sealing to ensure edges never fray or delaminate.',
    },
    {
      num: '03',
      title: 'Custom Forged Satin Brass',
      description:
        'Every stud, clasp, and ring is cast from solid brass alloy with a hand-brushed satin champagne finish, resisting corrosion and fingerprint discoloration.',
    },
  ];

  return (
    <section
      id="section-craftsmanship"
      className="relative py-28 md:py-44 px-6 sm:px-10 md:px-14 bg-[#0B0A0A] border-t border-[#FAF8F5]/10 overflow-hidden text-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 pb-6 border-b border-[#FAF8F5]/10 gap-8">
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE]/60 block">
              Chapter 04 — The Craft
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FAF8F5]">
              Anatomy of <span className="italic font-light text-[#D8CFBE]">Restraint.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/70 leading-relaxed">
            Engineered by master leather artisans in Lahore, harmonizing ancestral artisanal leathercraft
            with uncompromising modern geometry.
          </p>
        </div>

        {/* Visual Craft Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Macro Detail Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative group overflow-hidden bg-[#141312] border border-[#FAF8F5]/10"
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <picture className="w-full h-full block">
                {NOIR_STRUCTURE_BAG.images[3].webpSrcSet ? (
                  <source
                    type="image/webp"
                    srcSet={NOIR_STRUCTURE_BAG.images[3].webpSrcSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                ) : NOIR_STRUCTURE_BAG.images[3].webpUrl ? (
                  <source type="image/webp" srcSet={NOIR_STRUCTURE_BAG.images[3].webpUrl} />
                ) : null}
                {NOIR_STRUCTURE_BAG.images[3].jpgSrcSet ? (
                  <source
                    type="image/jpeg"
                    srcSet={NOIR_STRUCTURE_BAG.images[3].jpgSrcSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                ) : null}
                <img
                  src={NOIR_STRUCTURE_BAG.images[3].webpUrl || NOIR_STRUCTURE_BAG.images[3].url}
                  alt="NOIR STRUCTURE BAG — Macro leather craftsmanship detail"
                  width={896}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-103 filter contrast-[1.03] brightness-[0.92]"
                />
              </picture>
            </div>
            <div className="absolute bottom-6 left-6 bg-[#0B0A0A]/85 backdrop-blur-xs border border-[#FAF8F5]/10 text-[#FAF8F5] px-3.5 py-1.5 text-[8px] tracking-[0.3em] uppercase font-sans">
              Macro Study · Calfskin Texture
            </div>
          </motion.div>

          {/* Craftsmanship Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-10">
            {craftPoints.map((point, index) => (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-[#FAF8F5]/10 pb-8 space-y-2"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] font-sans font-medium text-[#D8CFBE]/70 tracking-widest">
                    {point.num}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-normal">
                    {point.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/70 leading-relaxed pl-8 max-w-md">
                  {point.description}
                </p>
              </motion.div>
            ))}

            <div className="pt-2 flex items-center gap-8 text-[9px] tracking-[0.25em] uppercase font-sans text-[#D8CFBE]/60">
              <span>Serialized Archive Production</span>
              <span>·</span>
              <span>Handmade in Lahore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
