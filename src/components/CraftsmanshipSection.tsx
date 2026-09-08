import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { NOIR_STRUCTURE_BAG } from '../data/product';

export const CraftsmanshipSection: React.FC = () => {
  const craftPoints = [
    {
      num: '01',
      title: 'Full-Grain European Calfskin',
      description:
        'Sourced from certified ethical tanneries, each hide is drum-dyed through the grain, preserving organic tactile richness that forms a lustrous patina over years of carriage.',
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
      className="relative py-28 md:py-40 px-6 sm:px-8 md:px-12 bg-[#FAF9F5] border-t border-[#0E0D0D]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/50 font-medium block">
              Chapter 04 — The Craft
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0E0D0D] font-normal leading-[1.05]">
              Anatomy of <br />
              <span className="italic font-light">Perfection</span>
            </h2>
          </div>
          <p className="max-w-md text-[#232220]/75 text-sm sm:text-base font-sans font-light leading-relaxed">
            Constructed by master leather artisans in Lahore, bridging four decades of artisanal
            leathercraft with disciplined contemporary geometry.
          </p>
        </div>

        {/* Visual Craft Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Macro Detail Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative group overflow-hidden bg-[#EAE6DF]"
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={NOIR_STRUCTURE_BAG.images[3].url}
                alt="NOIR STRUCTURE BAG — Macro leather craftsmanship detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-6 left-6 bg-[#0E0D0D]/80 backdrop-blur-xs text-[#FAF9F5] px-4 py-2 text-[10px] tracking-[0.25em] uppercase font-sans">
              Macro Study · 04 / 04 Grain & Stitch
            </div>
          </motion.div>

          {/* Craftsmanship Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-10">
            {craftPoints.map((point, index) => (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-[#0E0D0D]/10 pb-8 space-y-3"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-sans font-medium text-[#0E0D0D]/40 tracking-widest">
                    {point.num}
                  </span>
                  <h3 className="font-serif text-2xl text-[#0E0D0D] font-normal">
                    {point.title}
                  </h3>
                </div>
                <p className="text-[#232220]/75 text-sm sm:text-base font-sans font-light leading-relaxed pl-8">
                  {point.description}
                </p>
              </motion.div>
            ))}

            <div className="pt-2 flex items-center gap-6 text-xs tracking-[0.2em] uppercase font-sans text-[#0E0D0D]/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E0D0D]" />
                <span>Individually Serialized</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0E0D0D]" />
                <span>Hand-Built in Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
