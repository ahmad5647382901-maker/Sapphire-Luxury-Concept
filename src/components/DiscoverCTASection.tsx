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

    const trimmedEmail = email.trim();

    if (!trimmedEmail) return;

    setSubscribed(true);
  };

  return (
    <section
      id="section-discover"
      className="relative py-28 md:py-44 px-6 sm:px-10 md:px-14 bg-[#0B0A0A] border-t border-[#FAF8F5]/10 overflow-hidden text-[#FAF8F5]"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-12">
        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-4"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE]/60 block">
            Chapter 05 — The Epilogue
          </span>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#FAF8F5] font-normal leading-[0.95]">
            Less, but <br />
            <span className="italic font-light text-[#D8CFBE]">
              considered.
            </span>
          </h2>

          <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/70 leading-relaxed max-w-lg mx-auto pt-3">
            A quieter approach to form, proportion, and everyday objects.
            Explore the collection or take a closer look at the Noir Structure
            Bag.
          </p>
        </motion.div>

        {/* Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md pt-2"
        >
          <button
            id="discover-acquire-btn"
            type="button"
            onClick={onAcquireBag}
            className="w-full sm:w-auto px-9 py-3.5 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.28em] uppercase font-sans font-medium transition-all duration-300 hover:bg-[#D8CFBE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70 flex items-center justify-center gap-3"
          >
            <span>Acquire Noir Bag</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="discover-explore-btn"
            type="button"
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#FAF8F5]/30 text-[#FAF8F5] text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-colors hover:bg-[#FAF8F5] hover:text-[#0B0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
          >
            Explore Series
          </button>
        </motion.div>

        {/* Editorial Dispatch */}
        <div className="w-full max-w-sm pt-8 border-t border-[#FAF8F5]/10">
          <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 block mb-3">
            Editorial Dispatch
          </span>

          {subscribed ? (
            <div
              className="flex items-center justify-center gap-2 text-xs font-sans text-[#FAF8F5] py-2"
              aria-live="polite"
            >
              <Check className="w-3.5 h-3.5 text-[#D8CFBE]" />
              <span>You are on the dispatch list.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex border-b border-[#FAF8F5]/30 focus-within:border-[#FAF8F5] transition-colors pb-1"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="w-full min-w-0 py-2 bg-transparent text-xs font-sans placeholder:text-[#FAF8F5]/40 text-[#FAF8F5] focus:outline-none"
              />

              <button
                type="submit"
                className="min-h-[44px] text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5] pl-4 hover:text-[#D8CFBE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
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
