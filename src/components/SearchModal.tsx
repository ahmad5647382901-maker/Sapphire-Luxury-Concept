import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  NOIR_STRUCTURE_BAG,
  EDITORIAL_COLLECTIONS,
} from '../data/product';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectStory?: (storyId: string) => void;
  products?: Product[];
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectStory,
  products = [NOIR_STRUCTURE_BAG],
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  /*
   * Keep only one copy of each product.
   * Product ID is the canonical unique identifier.
   */
  const uniqueProducts = useMemo(() => {
    const seen = new Set<string>();

    return products.filter((product) => {
      if (!product?.id || seen.has(product.id)) {
        return false;
      }

      seen.add(product.id);
      return true;
    });
  }, [products]);

  const trimmedQuery = query.trim().toLowerCase();

  const productMatches = useMemo(() => {
    if (!trimmedQuery) return [];

    return uniqueProducts.filter((product) => {
      const searchableText = [
        product.name,
        product.tagline,
        product.description,
        product.color,
        product.category,
        product.collection,
        product.type,
        product.badge,
        product.currency,
        product.formattedPrice,
        ...product.materials,
        ...product.details,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(trimmedQuery);
    });
  }, [uniqueProducts, trimmedQuery]);

  const storyMatches = useMemo(() => {
    if (!trimmedQuery) return [];

    return EDITORIAL_COLLECTIONS.filter((story) => {
      const searchableText = [
        story.title,
        story.subtitle,
        story.edition,
        story.category,
        story.description,
        story.label,
        story.year,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(trimmedQuery);
    });
  }, [trimmedQuery]);

  const featuredProducts = useMemo(
    () => uniqueProducts.filter((product) => product.featured),
    [uniqueProducts]
  );

  const handleProductSelect = (product: Product) => {
    onClose();
    onSelectProduct(product);
  };

  const handleStorySelect = (storyId: string) => {
    onClose();
    onSelectStory?.(storyId);
  };

  const displayedProducts = trimmedQuery
    ? productMatches
    : featuredProducts;

  const hasResults =
    productMatches.length > 0 || storyMatches.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-6 backdrop-blur-md sm:pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden border border-black/10 bg-[#f3f0e9] shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-8">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-black/45">
                  SAPPHIRE
                </p>
                <h2 className="mt-1 font-serif text-2xl tracking-[-0.02em] text-black sm:text-3xl">
                  Search the Collection
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="flex h-10 w-10 items-center justify-center border border-black/10 text-black/60 transition-colors hover:bg-black hover:text-white"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Search field */}
            <div className="border-b border-black/10 px-5 py-5 sm:px-8">
              <div className="flex items-center gap-4 border-b border-black/25 pb-3">
                <Search
                  size={20}
                  strokeWidth={1.4}
                  className="shrink-0 text-black/45"
                />

                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products, collections, materials..."
                  className="w-full bg-transparent font-sans text-sm tracking-wide text-black outline-none placeholder:text-black/35"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="shrink-0 text-black/40 transition-colors hover:text-black"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              {!trimmedQuery ? (
                <>
                  <div className="mb-6 flex items-end justify-between">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-black/40">
                        Curated Objects
                      </p>
                      <h3 className="mt-2 font-serif text-2xl text-black">
                        Featured Pieces
                      </h3>
                    </div>

                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40">
                      {String(featuredProducts.length).padStart(2, '0')} Objects
                    </span>
                  </div>

                  {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                      {featuredProducts.map((product) => (
                        <button
                          type="button"
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="group bg-[#f3f0e9] text-left"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3da]">
                            <img
                              src={
                                product.images[0]?.webpUrl ||
                                product.images[0]?.url
                              }
                              alt={product.images[0]?.alt || product.name}
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />

                            {product.badge && (
                              <span className="absolute left-4 top-4 bg-[#f3f0e9] px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.18em] text-black/65">
                                {product.badge}
                              </span>
                            )}

                            <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center bg-[#f3f0e9] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <ArrowUpRight
                                size={15}
                                strokeWidth={1.4}
                              />
                            </div>
                          </div>

                          <div className="px-4 py-4">
                            <p className="font-sans text-[9px] uppercase tracking-[0.22em] text-black/40">
                              {product.category}
                            </p>

                            <div className="mt-2 flex items-start justify-between gap-4">
                              <h4 className="font-serif text-lg leading-tight text-black">
                                {product.name}
                              </h4>

                              <span className="whitespace-nowrap font-sans text-[10px] tracking-wide text-black/55">
                                {product.formattedPrice}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-black/10 py-16 text-center">
                      <p className="font-serif text-xl text-black/60">
                        No featured objects yet.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-7">
                    <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-black/40">
                      Search Results
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-black">
                      Results for “{query.trim()}”
                    </h3>
                  </div>

                  {!hasResults ? (
                    <div className="border border-black/10 py-20 text-center">
                      <Search
                        size={26}
                        strokeWidth={1}
                        className="mx-auto text-black/30"
                      />

                      <p className="mt-5 font-serif text-2xl text-black/70">
                        Nothing found
                      </p>

                      <p className="mx-auto mt-2 max-w-md font-sans text-xs leading-6 text-black/45">
                        Try another product name, category, material,
                        collection, or keyword.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      {/* Products */}
                      {displayedProducts.length > 0 && (
                        <section>
                          <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-3">
                            <h4 className="font-sans text-[10px] uppercase tracking-[0.24em] text-black/55">
                              Products
                            </h4>

                            <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-black/35">
                              {String(displayedProducts.length).padStart(2, '0')}
                            </span>
                          </div>

                          <div className="divide-y divide-black/10">
                            {displayedProducts.map((product) => (
                              <button
                                type="button"
                                key={product.id}
                                onClick={() => handleProductSelect(product)}
                                className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-black/[0.025] sm:gap-6"
                              >
                                <div className="h-20 w-16 shrink-0 overflow-hidden bg-[#e8e3da] sm:h-24 sm:w-20">
                                  <img
                                    src={
                                      product.images[0]?.webpUrl ||
                                      product.images[0]?.url
                                    }
                                    alt={
                                      product.images[0]?.alt ||
                                      product.name
                                    }
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-black/35">
                                    {product.category}
                                  </p>

                                  <h5 className="mt-1 truncate font-serif text-lg text-black sm:text-xl">
                                    {product.name}
                                  </h5>

                                  <p className="mt-1 truncate font-sans text-[10px] tracking-wide text-black/45">
                                    {product.tagline}
                                  </p>
                                </div>

                                <div className="hidden shrink-0 text-right sm:block">
                                  <p className="font-sans text-[10px] tracking-wide text-black/55">
                                    {product.formattedPrice}
                                  </p>

                                  <ArrowUpRight
                                    size={16}
                                    strokeWidth={1.3}
                                    className="ml-auto mt-3 text-black/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                                  />
                                </div>
                              </button>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Editorial stories */}
                      {storyMatches.length > 0 && (
                        <section>
                          <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-3">
                            <h4 className="font-sans text-[10px] uppercase tracking-[0.24em] text-black/55">
                              Editorial
                            </h4>

                            <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-black/35">
                              {String(storyMatches.length).padStart(2, '0')}
                            </span>
                          </div>

                          <div className="divide-y divide-black/10">
                            {storyMatches.map((story) => (
                              <button
                                type="button"
                                key={story.id}
                                onClick={() => handleStorySelect(story.id)}
                                className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-black/[0.025] sm:gap-6"
                              >
                                <div className="h-20 w-16 shrink-0 overflow-hidden bg-[#e8e3da] sm:h-24 sm:w-20">
                                  <img
                                    src={story.webpUrl || story.image}
                                    alt={story.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-black/35">
                                    {story.edition || story.category}
                                  </p>

                                  <h5 className="mt-1 font-serif text-lg leading-tight text-black sm:text-xl">
                                    {story.title}
                                  </h5>

                                  <p className="mt-1 line-clamp-1 font-sans text-[10px] tracking-wide text-black/45">
                                    {story.description}
                                  </p>
                                </div>

                                <ArrowUpRight
                                  size={17}
                                  strokeWidth={1.3}
                                  className="mr-1 shrink-0 text-black/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                                />
                              </button>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-black/10 px-5 py-4 sm:px-8">
              <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-black/35">
                SAPPHIRE · Anthology 01
              </p>

              <p className="hidden font-sans text-[9px] uppercase tracking-[0.18em] text-black/30 sm:block">
                ESC to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
