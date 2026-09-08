import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { NOIR_STRUCTURE_BAG, EDITORIAL_COLLECTIONS } from '../data/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: () => void;
  onSelectStory?: (storyId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectStory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const curatedSearches = [
    'Noir Structure Bag',
    'Raw Silk Edition',
    'Architectural Tailoring',
    'Calfskin Leather',
    'Lahore Atelier',
  ];

  // Search filtering logic
  const trimmed = query.trim().toLowerCase();
  const productMatches =
    trimmed.length > 0 &&
    (NOIR_STRUCTURE_BAG.name.toLowerCase().includes(trimmed) ||
      NOIR_STRUCTURE_BAG.tagline.toLowerCase().includes(trimmed) ||
      NOIR_STRUCTURE_BAG.description.toLowerCase().includes(trimmed) ||
      NOIR_STRUCTURE_BAG.color.toLowerCase().includes(trimmed) ||
      NOIR_STRUCTURE_BAG.materials.some((m) => m.toLowerCase().includes(trimmed)));

  const matchingStories = trimmed.length > 0
    ? EDITORIAL_COLLECTIONS.filter(
        (col) =>
          col.title.toLowerCase().includes(trimmed) ||
          col.edition.toLowerCase().includes(trimmed) ||
          col.category.toLowerCase().includes(trimmed) ||
          col.description.toLowerCase().includes(trimmed)
      )
    : [];

  const hasQuery = trimmed.length > 0;
  const hasResults = productMatches || matchingStories.length > 0;

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
            className="absolute inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-2xl mx-auto mt-16 md:mt-24 mx-4 bg-[#0E0D0D] text-[#FAF8F5] p-6 sm:p-10 shadow-2xl border border-[#FAF8F5]/10 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#FAF8F5]/15 pb-4">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-4 h-4 text-[#D8CFBE] shrink-0" />
                <input
                  ref={inputRef}
                  id="search-input-field"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search silhouettes, archival pieces, leathercraft..."
                  className="w-full bg-transparent font-serif text-lg sm:text-2xl text-[#FAF8F5] placeholder:text-[#FAF8F5]/40 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search input"
                    className="text-xs font-sans uppercase tracking-widest text-[#FAF8F5]/50 hover:text-[#FAF8F5] px-2 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                id="close-search-button"
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1 text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors shrink-0 ml-4 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results or Curated Inquiries */}
            <div className="pt-8 space-y-6">
              {hasQuery ? (
                /* LIVE QUERY RESULTS */
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 font-medium">
                      Search Results for &ldquo;{query}&rdquo;
                    </span>
                    <span className="text-[9px] tracking-widest font-sans text-[#FAF8F5]/40">
                      {(productMatches ? 1 : 0) + matchingStories.length} Found
                    </span>
                  </div>

                  {!hasResults && (
                    <div className="py-8 text-center space-y-3">
                      <p className="font-serif text-xl text-[#FAF8F5]/70">
                        No archive pieces or stories match your inquiry.
                      </p>
                      <p className="text-xs font-sans text-[#FAF8F5]/40 max-w-sm mx-auto">
                        Try exploring terms like &ldquo;Noir Structure Bag&rdquo;, &ldquo;Raw Silk&rdquo;, or &ldquo;Calfskin&rdquo;.
                      </p>
                    </div>
                  )}

                  {/* Product Match */}
                  {productMatches && (
                    <div
                      id="search-result-product"
                      onClick={() => {
                        onClose();
                        onSelectProduct();
                      }}
                      className="group flex items-center justify-between p-3 bg-[#141312] border border-[#FAF8F5]/10 hover:border-[#D8CFBE]/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 bg-[#141312] border border-[#FAF8F5]/10 overflow-hidden shrink-0">
                          <picture className="w-full h-full block">
                            {NOIR_STRUCTURE_BAG.images[0].thumbnailWebpUrl && (
                              <source type="image/webp" srcSet={NOIR_STRUCTURE_BAG.images[0].thumbnailWebpUrl} />
                            )}
                            <img
                              src={NOIR_STRUCTURE_BAG.images[0].thumbnailUrl || NOIR_STRUCTURE_BAG.images[0].url}
                              alt={NOIR_STRUCTURE_BAG.name}
                              width={48}
                              height={56}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </picture>
                        </div>
                        <div>
                          <span className="text-[8px] tracking-[0.25em] uppercase font-sans text-[#D8CFBE] block">
                            Central Object · Available to Order
                          </span>
                          <h4 className="font-serif text-base text-[#FAF8F5]">
                            {NOIR_STRUCTURE_BAG.name}
                          </h4>
                          <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#FAF8F5]/60">
                            {NOIR_STRUCTURE_BAG.formattedPrice} · Matte Noir Calfskin
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D8CFBE] transition-transform group-hover:translate-x-1 mr-2" />
                    </div>
                  )}

                  {/* Matching Stories */}
                  {matchingStories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => {
                        onClose();
                        if (onSelectStory) {
                          onSelectStory(story.id);
                        }
                      }}
                      className="group flex items-center justify-between p-3 bg-[#141312] border border-[#FAF8F5]/10 hover:border-[#D8CFBE]/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 bg-[#141312] border border-[#FAF8F5]/10 overflow-hidden shrink-0">
                          <picture className="w-full h-full block">
                            {story.imageWebp && (
                              <source type="image/webp" srcSet={story.imageWebp} />
                            )}
                            <img
                              src={story.imageWebp || story.image}
                              alt={story.title}
                              width={48}
                              height={56}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </picture>
                        </div>
                        <div>
                          <span className="text-[8px] tracking-[0.25em] uppercase font-sans text-[#D8CFBE] block">
                            Editorial Lookbook · {story.edition}
                          </span>
                          <h4 className="font-serif text-base text-[#FAF8F5]">
                            {story.title}
                          </h4>
                          <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#FAF8F5]/60 line-clamp-1">
                            {story.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D8CFBE] transition-transform group-hover:translate-x-1 mr-2" />
                    </div>
                  ))}
                </div>
              ) : (
                /* DEFAULT CURATED INQUIRIES & FEATURED */
                <>
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
                          className="px-3 py-1.5 bg-[#141312] border border-[#FAF8F5]/10 text-xs font-sans text-[#FAF8F5]/70 hover:border-[#D8CFBE] hover:text-[#FAF8F5] transition-colors cursor-pointer"
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
                      id="search-featured-product"
                      onClick={() => {
                        onClose();
                        onSelectProduct();
                      }}
                      className="group flex items-center justify-between p-3 bg-[#141312] border border-[#FAF8F5]/10 hover:border-[#D8CFBE]/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 bg-[#141312] border border-[#FAF8F5]/10 overflow-hidden shrink-0">
                          <picture className="w-full h-full block">
                            {NOIR_STRUCTURE_BAG.images[0].thumbnailWebpUrl && (
                              <source type="image/webp" srcSet={NOIR_STRUCTURE_BAG.images[0].thumbnailWebpUrl} />
                            )}
                            <img
                              src={NOIR_STRUCTURE_BAG.images[0].thumbnailUrl || NOIR_STRUCTURE_BAG.images[0].url}
                              alt={NOIR_STRUCTURE_BAG.name}
                              width={48}
                              height={56}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </picture>
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
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

