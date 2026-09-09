import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { Product, EditorialStory } from '../types';
import { NOIR_STRUCTURE_BAG, EDITORIAL_COLLECTIONS } from '../data/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products?: Product[];
  stories?: EditorialStory[];
  onSelectProduct: (product: Product) => void;
  onSelectStory?: (story: EditorialStory) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products = [NOIR_STRUCTURE_BAG],
  stories = EDITORIAL_COLLECTIONS,
  onSelectProduct,
  onSelectStory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const uniqueProducts = useMemo(() => {
    const map = new Map<string, Product>();

    products.forEach((product) => {
      if (product?.id) {
        map.set(product.id, product);
      }
    });

    return Array.from(map.values());
  }, [products]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return uniqueProducts;

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

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery, uniqueProducts]);

  const filteredStories = useMemo(() => {
    if (!normalizedQuery) return stories;

    return stories.filter((story) => {
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

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery, stories]);

  const featuredProducts = uniqueProducts.slice(0, 4);

  const handleProductSelect = (product: Product) => {
    onClose();
    onSelectProduct(product);
  };

  const handleStorySelect = (story: EditorialStory) => {
    onClose();
    onSelectStory?.(story);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#11110f]/95 text-[#f3eee5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 overflow-y-auto"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto min-h-screen w-full max-w-[1400px] px-5 py-6 sm:px-8 lg:px-12">
              <header className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                    SAPPHIRE
                  </p>
                  <p className="mt-1 font-serif text-2xl">
                    Search the collection
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="flex h-11 w-11 items-center justify-center border border-white/10 transition hover:bg-white/10"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </header>

              <div className="mx-auto mt-10 max-w-4xl">
                <div className="flex items-center border-b border-white/25 pb-4">
                  <Search
                    size={22}
                    strokeWidth={1.3}
                    className="mr-4 shrink-0 text-white/50"
                  />

                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search products, collections, materials..."
                    className="w-full bg-transparent font-serif text-2xl outline-none placeholder:text-white/25 sm:text-4xl"
                    autoComplete="off"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="ml-3 text-white/40 transition hover:text-white"
                      aria-label="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/35">
                  <span>
                    {normalizedQuery
                      ? `${filteredProducts.length + filteredStories.length} results`
                      : 'Explore SAPPHIRE'}
                  </span>

                  <span>ESC to close</span>
                </div>
              </div>

              <main className="mx-auto mt-14 max-w-6xl pb-20">
                {!normalizedQuery ? (
                  <>
                    <section>
                      <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Featured
                          </p>
                          <h2 className="mt-2 font-serif text-3xl">
                            Selected Objects
                          </h2>
                        </div>

                        <span className="text-xs text-white/35">
                          {featuredProducts.length
                            .toString()
                            .padStart(2, '0')}
                        </span>
                      </div>

                      {featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                          {featuredProducts.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => handleProductSelect(product)}
                              className="group bg-[#11110f] text-left"
                            >
                              <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e1d6]">
                                <picture>
                                  {product.images[0]?.webpUrl && (
                                    <source
                                      srcSet={product.images[0].webpUrl}
                                      type="image/webp"
                                    />
                                  )}

                                  <img
                                    src={
                                      product.images[0]?.url ||
                                      '/editorial/edition.jpg'
                                    }
                                    alt={product.images[0]?.alt || product.name}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                  />
                                </picture>

                                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                                  <ArrowUpRight size={15} strokeWidth={1.5} />
                                </div>
                              </div>

                              <div className="px-1 py-5">
                                <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                                  {product.category}
                                </p>

                                <h3 className="mt-2 font-serif text-xl">
                                  {product.name}
                                </h3>

                                <p className="mt-2 text-xs text-white/45">
                                  {product.formattedPrice}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="py-10 text-sm text-white/40">
                          No products available.
                        </p>
                      )}
                    </section>

                    {stories.length > 0 && (
                      <section className="mt-20">
                        <div className="mb-6 border-b border-white/10 pb-3">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Anthology
                          </p>
                          <h2 className="mt-2 font-serif text-3xl">
                            Editorial Collections
                          </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                          {stories.map((story) => (
                            <button
                              key={story.id}
                              type="button"
                              onClick={() => handleStorySelect(story)}
                              className="group text-left"
                            >
                              <div className="aspect-[4/5] overflow-hidden bg-[#e8e1d6]">
                                <picture>
                                  {story.webpUrl && (
                                    <source
                                      srcSet={story.webpUrl}
                                      type="image/webp"
                                    />
                                  )}

                                  <img
                                    src={story.image}
                                    alt={story.title}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                  />
                                </picture>
                              </div>

                              <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-white/35">
                                {story.label || story.edition || 'Collection'}
                              </p>

                              <h3 className="mt-2 font-serif text-2xl">
                                {story.title}
                              </h3>
                            </button>
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                ) : (
                  <>
                    {filteredProducts.length === 0 &&
                    filteredStories.length === 0 ? (
                      <div className="py-24 text-center">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                          No results
                        </p>

                        <h2 className="mt-4 font-serif text-3xl">
                          Nothing found for “{query}”
                        </h2>

                        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/40">
                          Try another product name, material, category, or
                          collection.
                        </p>
                      </div>
                    ) : (
                      <>
                        {filteredProducts.length > 0 && (
                          <section>
                            <div className="mb-6 border-b border-white/10 pb-3">
                              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                                Products
                              </p>
                              <h2 className="mt-2 font-serif text-3xl">
                                Objects
                              </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                              {filteredProducts.map((product) => (
                                <button
                                  key={product.id}
                                  type="button"
                                  onClick={() => handleProductSelect(product)}
                                  className="group text-left"
                                >
                                  <div className="aspect-[4/5] overflow-hidden bg-[#e8e1d6]">
                                    <picture>
                                      {product.images[0]?.webpUrl && (
                                        <source
                                          srcSet={product.images[0].webpUrl}
                                          type="image/webp"
                                        />
                                      )}

                                      <img
                                        src={product.images[0]?.url}
                                        alt={
                                          product.images[0]?.alt || product.name
                                        }
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                      />
                                    </picture>
                                  </div>

                                  <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-white/35">
                                    {product.category}
                                  </p>

                                  <h3 className="mt-2 font-serif text-2xl">
                                    {product.name}
                                  </h3>

                                  <p className="mt-2 text-xs text-white/45">
                                    {product.formattedPrice}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </section>
                        )}

                        {filteredStories.length > 0 && (
                          <section className="mt-20">
                            <div className="mb-6 border-b border-white/10 pb-3">
                              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                                Editorial
                              </p>
                              <h2 className="mt-2 font-serif text-3xl">
                                Collections
                              </h2>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                              {filteredStories.map((story) => (
                                <button
                                  key={story.id}
                                  type="button"
                                  onClick={() => handleStorySelect(story)}
                                  className="group text-left"
                                >
                                  <div className="aspect-[4/5] overflow-hidden bg-[#e8e1d6]">
                                    <picture>
                                      {story.webpUrl && (
                                        <source
                                          srcSet={story.webpUrl}
                                          type="image/webp"
                                        />
                                      )}

                                      <img
                                        src={story.image}
                                        alt={story.title}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                      />
                                    </picture>
                                  </div>

                                  <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-white/35">
                                    {story.label ||
                                      story.edition ||
                                      'Collection'}
                                  </p>

                                  <h3 className="mt-2 font-serif text-2xl">
                                    {story.title}
                                  </h3>
                                </button>
                              ))}
                            </div>
                          </section>
                        )}
                      </>
                    )}
                  </>
                )}
              </main>

              <footer className="border-t border-white/10 py-8 text-center">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/30">
                  SAPPHIRE · MODERN PAKISTANI COUTURE
                </p>
              </footer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
