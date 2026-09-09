import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  isInWishlist: boolean;
  product: Product;
  onClose: () => void;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  isInWishlist,
  product,
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

  const handleMoveToBag = () => {
    onAddToCart();
    onClose();
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
            className="absolute inset-y-0 right-0 w-full max-w-md bg-[#0B0A0A] text-[#FAF8F5] border-l border-[#FAF8F5]/10 shadow-2xl flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <header className="p-6 sm:p-8 border-b border-[#FAF8F5]/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#D8CFBE]" />

                <h2
                  id="wishlist-title"
                  className="font-serif text-xl tracking-[0.08em] text-[#FAF8F5] uppercase font-light"
                >
                  Wishlist
                  <span className="text-[#FAF8F5]/40 ml-2 text-sm tracking-normal">
                    {isInWishlist ? '01' : '00'}
                  </span>
                </h2>
              </div>

              <button
                id="close-wishlist-button"
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="min-w-10 min-h-10 flex items-center justify-center text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/70"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {!isInWishlist ? (
                <div className="min-h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-12 h-12 rounded-full bg-[#141312] border border-[#FAF8F5]/10 flex items-center justify-center text-[#D8CFBE]">
                    <Heart className="w-5 h-5" />
                  </div>

                  <h3 className="mt-5 font-serif text-2xl text-[#FAF8F5] font-normal">
                    Nothing saved
                  </h3>

                  <p className="mt-3 text-xs font-sans font-light text-[#FAF8F5]/50 max-w-xs leading-relaxed">
                    Save pieces you want to revisit while exploring the editorial study.
                  </p>
                </div>
              ) : (
                <article className="border-b border-[#FAF8F5]/10 pb-7">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-24 bg-[#141312] border border-[#FAF8F5]/10 overflow-hidden shrink-0">
                      <picture className="w-full h-full block">
                        {product.images[0].thumbnailWebpUrl && (
                          <source
                            type="image/webp"
                            srcSet={product.images[0].thumbnailWebpUrl}
                          />
                        )}

                        <img
                          src={
                            product.images[0].thumbnailUrl ||
                            product.images[0].url
                          }
                          alt={product.name}
                          width={80}
                          height={96}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center"
                        />
                      </picture>
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[8px] tracking-[0.25em] uppercase font-sans text-[#D8CFBE]/65 block mb-1.5">
                            Saved Object
                          </span>

                          <h4 className="font-serif text-base text-[#FAF8F5] leading-tight">
                            {product.name}
                          </h4>

                          <p className="mt-1 text-[10px] tracking-[0.16em] uppercase font-sans text-[#D8CFBE]/75">
                            {product.formattedPrice}
                          </p>
                        </div>

                        <button
                          id="remove-from-wishlist-button"
                          type="button"
                          onClick={onToggleWishlist}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="min-w-10 min-h-10 flex items-center justify-center shrink-0 text-[#FAF8F5]/35 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/70"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Move to Bag */}
                  <button
                    id="move-to-bag-from-wishlist-button"
                    type="button"
                    onClick={handleMoveToBag}
                    className="mt-6 w-full min-h-11 py-3 px-4 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.22em] uppercase font-sans font-medium flex items-center justify-center gap-2.5 hover:bg-[#D8CFBE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
                  >
                    <span>Move to Bag</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </article>
              )}
            </div>

            {/* Footer */}
            <footer className="p-6 border-t border-[#FAF8F5]/10 bg-[#100F0F] shrink-0">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#D8CFBE]/55">
                  Editorial Selection
                </span>

                <span className="text-[9px] tracking-[0.18em] uppercase font-sans text-[#FAF8F5]/30">
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
