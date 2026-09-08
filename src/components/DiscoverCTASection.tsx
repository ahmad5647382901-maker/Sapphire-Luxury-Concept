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
      className="relative py-28 md:py-44 px-6 sm:px-8 md:px-12 bg-[#F3F0EA] border-t border-[#0E0D0D]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center space-y-10 md:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-2xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase font-sans text-[#0E0D0D]/50 font-medium block">
            Chapter 05 — The Horizon
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0E0D0D] font-normal leading-[0.98]">
            DISCOVER THE <br />
            <span className="italic font-light">COLLECTION</span>
          </h2>
          <p className="text-[#232220]/75 text-base md:text-lg font-sans font-light leading-relaxed pt-2">
            Experience the confluence of Pakistani heritage textiles and disciplined modern
            sculpture. An invitation to redefine your wardrobe with lasting intentionality.
          </p>
        </motion.div>

        {/* Primary Editorial Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md"
        >
          <button
            id="discover-acquire-btn"
            type="button"
            onClick={onAcquireBag}
            className="w-full sm:w-auto px-10 py-4 bg-[#0E0D0D] text-[#FAF9F5] text-xs tracking-[0.22em] uppercase font-sans font-medium transition-all duration-300 hover:bg-[#232220] flex items-center justify-center gap-3"
          >
            <span>Acquire Noir Bag</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="discover-explore-btn"
            type="button"
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-8 py-4 border border-[#0E0D0D] text-[#0E0D0D] text-xs tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 hover:bg-[#0E0D0D]/5"
          >
            Explore Lookbook
          </button>
        </motion.div>

        {/* Private Atelier Dispatch */}
        <div className="w-full max-w-md pt-8 border-t border-[#0E0D0D]/10">
          <span className="text-[11px] tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/60 block mb-4">
            Private Atelier Dispatches
          </span>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-xs font-sans text-[#0E0D0D] p-3 bg-[#FAF9F5] border border-[#0E0D0D]/10">
              <Check className="w-4 h-4 text-[#1C3B2B]" />
              <span>You have been registered for private archive access.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex border-b border-[#0E0D0D]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full py-3 bg-transparent text-xs font-sans placeholder:text-[#0E0D0D]/40 text-[#0E0D0D] focus:outline-none"
              />
              <button
                type="submit"
                className="text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D] pl-4 hover:opacity-70 transition-opacity"
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
