import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { NOIR_STRUCTURE_BAG } from '../data/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const curatedSearches = [
    'Noir Structure Bag',
    'Raw Silk Studio',
    'Architectural Tailoring',
    'Calfskin Leather',
    'Limited Editions',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="search-modal-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0E0D0D]/50 backdrop-blur-sm"
          />

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl mx-auto mt-16 md:mt-24 mx-4 bg-[#FAF9F5] p-6 sm:p-10 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#0E0D0D]/15 pb-4">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-5 h-5 text-[#0E0D0D]/50 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search silhouettes, archival pieces, leathercraft..."
                  className="w-full bg-transparent font-serif text-lg sm:text-2xl text-[#0E0D0D] placeholder:text-[#0E0D0D]/30 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 text-[#0E0D0D] hover:opacity-60 transition-opacity shrink-0 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions & Featured Result */}
            <div className="pt-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/40 font-medium">
                  Curated Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {curatedSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-[#F3F0EA] text-xs font-sans text-[#0E0D0D]/80 hover:bg-[#0E0D0D] hover:text-[#FAF9F5] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Result: NOIR STRUCTURE BAG */}
              <div className="pt-4 border-t border-[#0E0D0D]/10">
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/40 font-medium block mb-4">
                  Archive Showcase
                </span>
                <div
                  onClick={() => {
                    onClose();
                    onSelectProduct();
                  }}
                  className="group flex items-center justify-between p-3 bg-[#F3F0EA] hover:bg-[#EAE6DF] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 bg-[#FAF9F5] overflow-hidden">
                      <img
                        src={NOIR_STRUCTURE_BAG.images[0].url}
                        alt={NOIR_STRUCTURE_BAG.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#0E0D0D]">
                        {NOIR_STRUCTURE_BAG.name}
                      </h4>
                      <p className="text-xs font-sans text-[#0E0D0D]/60">
                        {NOIR_STRUCTURE_BAG.formattedPrice} · Matte Noir Calfskin
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0E0D0D] transition-transform group-hover:translate-x-1 mr-2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
