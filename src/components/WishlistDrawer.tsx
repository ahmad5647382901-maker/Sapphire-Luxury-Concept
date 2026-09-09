import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlist: Product[];
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  wishlist,
  onClose,
  onToggleWishlist,
  onAddToCart,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleMoveToBag = (product: Product) => {
    onAddToCart(product);
    onToggleWishlist(product);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="wishlist-drawer-container"
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wishlist-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-[3px]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-[#FAF8F5]/10 bg-[#0B0A0A] text-[#FAF8F5] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <header className="flex shrink-0 items-center justify-between border-b border-[#FAF8F5]/10 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Heart className="h-4 w-4 text-[#D8CFBE]" />

                <h2
                  id="wishlist-title"
                  className="font-serif text-xl font-light uppercase tracking-[0.08em] text-[#FAF8F5]"
                >
                  Wishlist

                  <span className="ml-2 text-sm tracking-normal text-[#FAF8F5]/40">
                    {wishlist.length.toString().padStart(2, '0')}
                  </span>
                </h2>
              </div>

              <button
                id="close-wishlist-button"
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="flex min-h-10 min-w-10 items-center justify-center text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/70"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {wishlist.length === 0 ? (
                <div className="flex min-h-full flex-col items-center justify-center py-20 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FAF8F5]/10 bg-[#141312] text-[#D8CFBE]">
                    <Heart className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-normal text-[#FAF8F5]">
                    Nothing saved
                  </h3>

                  <p className="mt-3 max-w-xs text-xs font-sans font-light leading-relaxed text-[#FAF8F5]/50">
                    Save pieces you want to revisit while exploring the editorial study.
                  </p>
                </div>
              ) : (
                <div className="space-y-7">
                  {wishlist.map((product) => {
                    const image = product.images?.[0];

                    return (
                      <article
                        key={product.id}
                        className="border-b border-[#FAF8F5]/10 pb-7"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="h-24 w-20 shrink-0 overflow-hidden border border-[#FAF8F5]/10 bg-[#141312]">
                            {image && (
                              <picture className="block h-full w-full">
                                {image.thumbnailWebpUrl && (
                                  <source
                                    type="image/webp"
                                    srcSet={image.thumbnailWebpUrl}
                                  />
                                )}

                                <img
                                  src={
                                    image.thumbnailUrl ||
                                    image.webpUrl ||
                                    image.url
                                  }
                                  alt={image.alt || product.name}
                                  width={80}
                                  height={96}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-cover object-center"
                                />
                              </picture>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <span className="mb-1.5 block text-[8px] font-sans uppercase tracking-[0.25em] text-[#D8CFBE]/65">
                                  {product.badge || product.category || 'Saved Object'}
                                </span>

                                <h4 className="font-serif text-base leading-tight text-[#FAF8F5]">
                                  {product.name}
                                </h4>

                                <p className="mt-1 text-[10px] font-sans uppercase tracking-[0.16em] text-[#D8CFBE]/75">
                                  {product.formattedPrice}
                                </p>

                                <p className="mt-1 text-[9px] font-sans uppercase tracking-[0.14em] text-[#FAF8F5]/35">
                                  {product.color}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => onToggleWishlist(product)}
                                aria-label={`Remove ${product.name} from wishlist`}
                                className="flex min-h-10 min-w-10 shrink-0 items-center justify-center text-[#FAF8F5]/35 transition-colors hover:text-[#FAF8F5] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/70"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Move to Bag */}
                        <button
                          type="button"
                          onClick={() => handleMoveToBag(product)}
                          className="mt-6 flex min-h-11 w-full items-center justify-center gap-2.5 bg-[#FAF8F5] px-4 py-3 text-[10px] font-sans font-medium uppercase tracking-[0.22em] text-[#0B0A0A] transition-colors hover:bg-[#D8CFBE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
                        >
                          <span>Move to Bag</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="shrink-0 border-t border-[#FAF8F5]/10 bg-[#100F0F] p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#D8CFBE]/55">
                  Editorial Selection
                </span>

                <span className="text-[9px] font-sans uppercase tracking-[0.18em] text-[#FAF8F5]/30">
                  SAPPHIRE CONCEPT
                </span>
              </div>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
