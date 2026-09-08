import React from 'react';
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
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="wishlist-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0E0D0D]/45 backdrop-blur-xs"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 max-w-md w-full bg-[#FAF9F5] shadow-2xl flex flex-col justify-between"
          >
            <div className="p-6 md:p-8 border-b border-[#0E0D0D]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#0E0D0D]" />
                <h2 className="font-serif text-xl tracking-wider text-[#0E0D0D] uppercase">
                  Wishlist ({isInWishlist ? 1 : 0})
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="p-1.5 text-[#0E0D0D] hover:opacity-60 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {!isInWishlist ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-[#F3F0EA] flex items-center justify-center text-[#0E0D0D]/40">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#0E0D0D]">No Saved Pieces</h3>
                  <p className="text-xs font-sans text-[#0E0D0D]/60 max-w-xs leading-relaxed">
                    Save desired silhouettes and limited editions to your private curation list.
                  </p>
                </div>
              ) : (
                <div className="flex gap-4 border-b border-[#0E0D0D]/10 pb-6">
                  <div className="w-24 h-28 bg-[#F3F0EA] overflow-hidden shrink-0">
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-lg text-[#0E0D0D] leading-tight">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={onToggleWishlist}
                          className="text-[#0E0D0D]/40 hover:text-[#0E0D0D] p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-sans text-[#0E0D0D]/60 mt-1">
                        {product.formattedPrice}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart();
                        onClose();
                      }}
                      className="mt-3 py-2 px-3 bg-[#0E0D0D] text-[#FAF9F5] text-[11px] tracking-[0.2em] uppercase font-sans font-medium flex items-center justify-center gap-2 hover:bg-[#232220] transition-colors"
                    >
                      <span>Move to Bag</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#0E0D0D]/10 bg-[#F3F0EA] text-center">
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#0E0D0D]/60">
                Atelier Archive Concierge
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
