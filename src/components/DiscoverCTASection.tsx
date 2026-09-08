import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

interface DiscoverCTASectionProps {
  onExploreCollection: () => void;
  onAcquireBag: () => void;
}

export const DiscoverCTASection: React.FC<DiscoverCTASectionProps> = ({
  onExploreCollection,
  onAcquireBag,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section
      id="section-discover"
      className="relative py-28 md:py-44 px-6 sm:px-10 md:px-14 bg-[#0B0A0A] border-t border-[#FAF8F5]/10 overflow-hidden text-[#FAF8F5]"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE]/60 block">
            Chapter 05 — The Epilogue
          </span>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#FAF8F5] font-normal leading-[0.95]">
            The Discipline of <br />
            <span className="italic font-light text-[#D8CFBE]">Restraint.</span>
          </h2>

          <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/70 leading-relaxed max-w-lg mx-auto pt-3">
            An invitation to experience modern Pakistani couture through pure architectural silhouettes,
            tactile raw silks, and heirloom leathercraft built to outlive seasons.
          </p>
        </motion.div>

        {/* Restrained Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md pt-2"
        >
          <button
            id="discover-acquire-btn"
            type="button"
            onClick={onAcquireBag}
            className="w-full sm:w-auto px-9 py-3.5 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.28em] uppercase font-sans font-medium transition-all duration-300 hover:bg-[#D8CFBE] flex items-center justify-center gap-3"
          >
            <span>Acquire Noir Bag</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="discover-explore-btn"
            type="button"
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#FAF8F5]/30 text-[#FAF8F5] text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-colors hover:bg-[#FAF8F5] hover:text-[#0B0A0A]"
          >
            Read Lookbook
          </button>
        </motion.div>

        {/* Private Atelier Dispatches */}
        <div className="w-full max-w-sm pt-8 border-t border-[#FAF8F5]/10">
          <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 block mb-3">
            Private Salon & Archive Inquiries
          </span>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-xs font-sans text-[#FAF8F5] py-2">
              <Check className="w-3.5 h-3.5 text-[#D8CFBE]" />
              <span>You have been registered for private archive access.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex border-b border-[#FAF8F5]/30 focus-within:border-[#FAF8F5] transition-colors pb-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client email"
                className="w-full py-2 bg-transparent text-xs font-sans placeholder:text-[#FAF8F5]/40 text-[#FAF8F5] focus:outline-none"
              />
              <button
                type="submit"
                className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5] pl-4 hover:text-[#D8CFBE] transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
