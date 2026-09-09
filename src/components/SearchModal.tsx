import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const curatedSearches = [
    'Noir Structure Bag',
    'Raw Silk',
    'Architectural Tailoring',
    'Leather',
  ];

  const trimmedQuery = query.trim().toLowerCase();

  const productMatches =
    trimmedQuery.length > 0 &&
    [
      NOIR_STRUCTURE_BAG.name,
      NOIR_STRUCTURE_BAG.tagline,
      NOIR_STRUCTURE_BAG.description,
      NOIR_STRUCTURE_BAG.color,
      ...NOIR_STRUCTURE_BAG.materials,
    ]
      .join(' ')
      .toLowerCase()
      .includes(trimmedQuery);

  const matchingStories =
    trimmedQuery.length > 0
      ? EDITORIAL_COLLECTIONS.filter((collection) =>
          [
            collection.title,
            collection.edition,
            collection.category,
            collection.description,
          ]
            .join(' ')
            .toLowerCase()
            .includes(trimmedQuery)
        )
      : [];

  const resultCount = (productMatches ? 1 : 0) + matchingStories.length;
  const hasQuery = trimmedQuery.length > 0;

  const handleProductSelect = () => {
    onClose();
    onSelectProduct();
  };

  const handleStorySelect = (storyId: string) => {
    onClose();
    onSelectStory?.(storyId);
  };

  const ProductResult = ({ featured = false }: { featured?: boolean }) => (
    <button
      type="button"
      id={featured ? 'search-featured-product' : 'search-result-product'}
      onClick={handleProductSelect}
      className="group w-full flex items-center justify-between gap-4 p-3 text-left bg-[#141312] border border-[#FAF8F5]/10 hover:border-[#D8CFBE]/50 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D8CFBE]"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-14 bg-[#11100F] border border-[#FAF8F5]/10 overflow-hidden shrink-0">
          <picture className="w-full h-full block">
            {NOIR_STRUCTURE_BAG.images[0].thumbnailWebpUrl && (
              <source
                type="image/webp"
                srcSet={NOIR_STRUCTURE_BAG.images[0].thumbnailWebpUrl}
              />
            )}

            <img
              src={
                NOIR_STRUCTURE_BAG.images[0].thumbnailUrl ||
                NOIR_STRUCTURE_BAG.images[0].url
              }
              alt={NOIR_STRUCTURE_BAG.name}
              width={48}
              height={56}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        <div className="min-w-0">
          <span className="text-[8px] tracking-[0.25em] uppercase font-sans text-[#D8CFBE]/70 block mb-1">
            Hero Object
          </span>

          <h4 className="font-serif text-base text-[#FAF8F5] truncate">
            {NOIR_STRUCTURE_BAG.name}
          </h4>

          <p className="text-[10px] tracking-[0.12em] uppercase font-sans text-[#FAF8F5]/50 truncate">
            {NOIR_STRUCTURE_BAG.formattedPrice} · {NOIR_STRUCTURE_BAG.color}
          </p>
        </div>
      </div>

      <ArrowRight className="w-3.5 h-3.5 text-[#D8CFBE] shrink-0 mr-1 transition-transform group-hover:translate-x-1" />
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="search-modal-container"
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-[3px]"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="relative min-h-full flex items-start justify-center px-4 sm:px-6 py-10 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0E0D0D] text-[#FAF8F5] border border-[#FAF8F5]/10 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-[#0E0D0D]/95 backdrop-blur-sm px-6 sm:px-8 pt-6 sm:pt-8">
                <div className="flex items-center gap-3 border-b border-[#FAF8F5]/15 pb-4">
                  <Search className="w-4 h-4 text-[#D8CFBE] shrink-0" />

                  <label htmlFor="search-input-field" className="sr-only">
                    Search the editorial study
                  </label>

                  <input
                    ref={inputRef}
                    id="search-input-field"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search the study..."
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent font-serif text-lg sm:text-2xl text-[#FAF8F5] placeholder:text-[#FAF8F5]/35 focus:outline-none"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        inputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                      className="min-w-10 min-h-10 px-2 text-[9px] tracking-[0.18em] uppercase font-sans text-[#FAF8F5]/45 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
                    >
                      Clear
                    </button>
                  )}

                  <button
                    id="close-search-button"
                    type="button"
                    onClick={onClose}
                    aria-label="Close search"
                    className="min-w-10 min-h-10 flex items-center justify-center text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 sm:px-8 pt-7 pb-8">
                {hasQuery ? (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        id="search-modal-title"
                        className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#D8CFBE]/65 font-medium truncate"
                      >
                        Results
                      </span>

                      <span className="text-[9px] tracking-[0.16em] uppercase font-sans text-[#FAF8F5]/35 shrink-0">
                        {resultCount} {resultCount === 1 ? 'Result' : 'Results'}
                      </span>
                    </div>

                    {resultCount === 0 ? (
                      <div className="py-12 text-center border-t border-[#FAF8F5]/10">
                        <p className="font-serif text-xl text-[#FAF8F5]/65">
                          Nothing matched your search.
                        </p>

                        <p className="mt-2 text-xs font-sans font-light text-[#FAF8F5]/35">
                          Try a different term or explore the curated inquiries.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {productMatches && <ProductResult />}

                        {matchingStories.map((story) => (
                          <button
                            key={story.id}
                            type="button"
                            onClick={() => handleStorySelect(story.id)}
                            className="group w-full flex items-center justify-between gap-4 p-3 text-left bg-[#141312] border border-[#FAF8F5]/10 hover:border-[#D8CFBE]/50 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D8CFBE]"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-12 h-14 bg-[#11100F] border border-[#FAF8F5]/10 overflow-hidden shrink-0">
                                <picture className="w-full h-full block">
                                  {story.imageWebp && (
                                    <source
                                      type="image/webp"
                                      srcSet={story.imageWebp}
                                    />
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

                              <div className="min-w-0">
                                <span className="text-[8px] tracking-[0.25em] uppercase font-sans text-[#D8CFBE]/70 block mb-1">
                                  {story.edition} · {story.category}
                                </span>

                                <h4 className="font-serif text-base text-[#FAF8F5] truncate">
                                  {story.title}
                                </h4>

                                <p className="text-[10px] font-sans text-[#FAF8F5]/45 truncate">
                                  {story.description}
                                </p>
                              </div>
                            </div>

                            <ArrowRight className="w-3.5 h-3.5 text-[#D8CFBE] shrink-0 mr-1 transition-transform group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Curated Inquiries */}
                    <div>
                      <span
                        id="search-modal-title"
                        className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 font-medium block mb-4"
                      >
                        Curated Inquiries
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {curatedSearches.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => {
                              setQuery(term);
                              window.setTimeout(() => {
                                inputRef.current?.focus();
                              }, 0);
                            }}
                            className="min-h-10 px-3 bg-[#141312] border border-[#FAF8F5]/10 text-[10px] sm:text-xs font-sans text-[#FAF8F5]/65 hover:border-[#D8CFBE]/70 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D8CFBE]"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Featured Object */}
                    <div className="pt-6 border-t border-[#FAF8F5]/10">
                      <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 font-medium block mb-4">
                        Hero Object
                      </span>

                      <ProductResult featured />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
