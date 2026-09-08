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
    'Raw Silk Edition',
    'Architectural Tailoring',
    'Calfskin Leather',
    'Lahore Atelier',
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
            className="absolute inset-0 bg-black/80 backdrop-blur-xs"
          />

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-2xl mx-auto mt-16 md:mt-24 mx-4 bg-[#0E0D0D] text-[#FAF8F5] p-6 sm:p-10 shadow-2xl border border-[#FAF8F5]/10"
          >
            <div className="flex items-center justify-between border-b border-[#FAF8F5]/15 pb-4">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-4 h-4 text-[#D8CFBE] shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search silhouettes, archival pieces, leathercraft..."
                  className="w-full bg-transparent font-serif text-lg sm:text-2xl text-[#FAF8F5] placeholder:text-[#FAF8F5]/40 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1 text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors shrink-0 ml-4"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestions & Featured Result */}
            <div className="pt-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 font-medium">
                  Curated Inquiries
                </span>
                <div className="flex flex-wrap gap-2">
                  {curatedSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-[#141312] border border-[#FAF8F5]/10 text-xs font-sans text-[#FAF8F5]/70 hover:border-[#D8CFBE] hover:text-[#FAF8F5] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Result: NOIR STRUCTURE BAG */}
              <div className="pt-4 border-t border-[#FAF8F5]/10">
                <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 font-medium block mb-3">
                  Archive Masterpiece
                </span>
                <div
                  onClick={() => {
                    onClose();
                    onSelectProduct();
                  }}
                  className="group flex items-center justify-between p-3 bg-[#141312] border border-[#FAF8F5]/10 hover:border-[#D8CFBE]/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 bg-[#141312] border border-[#FAF8F5]/10 overflow-hidden">
                      <img
                        src={NOIR_STRUCTURE_BAG.images[0].url}
                        alt={NOIR_STRUCTURE_BAG.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#FAF8F5]">
                        {NOIR_STRUCTURE_BAG.name}
                      </h4>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#D8CFBE]/70">
                        {NOIR_STRUCTURE_BAG.formattedPrice} · Matte Noir Calfskin
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D8CFBE] transition-transform group-hover:translate-x-1 mr-2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
