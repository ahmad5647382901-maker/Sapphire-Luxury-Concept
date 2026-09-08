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
            className="absolute inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 max-w-md w-full bg-[#0B0A0A] text-[#FAF8F5] border-l border-[#FAF8F5]/10 shadow-2xl flex flex-col justify-between"
          >
            <div className="p-6 sm:p-8 border-b border-[#FAF8F5]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#D8CFBE]" />
                <h2 className="font-serif text-xl tracking-[0.1em] text-[#FAF8F5] uppercase font-light">
                  Wishlist ({isInWishlist ? 1 : 0})
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="p-1 text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {!isInWishlist ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-12 h-12 rounded-full bg-[#141312] border border-[#FAF8F5]/10 flex items-center justify-center text-[#D8CFBE]">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">No Saved Silhouettes</h3>
                  <p className="text-xs font-sans font-light text-[#FAF8F5]/60 max-w-xs leading-relaxed">
                    Save desired creations and limited editions to your private salon curation.
                  </p>
                </div>
              ) : (
                <div className="flex gap-4 border-b border-[#FAF8F5]/10 pb-6">
                  <div className="w-20 h-24 bg-[#141312] border border-[#FAF8F5]/10 overflow-hidden shrink-0">
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
                        <h4 className="font-serif text-base text-[#FAF8F5] leading-tight">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={onToggleWishlist}
                          className="text-[#FAF8F5]/40 hover:text-[#FAF8F5] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#D8CFBE] mt-1">
                        {product.formattedPrice}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart();
                        onClose();
                      }}
                      className="mt-3 py-2.5 px-3 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.22em] uppercase font-sans font-medium flex items-center justify-center gap-2 hover:bg-[#D8CFBE] transition-colors"
                    >
                      <span>Move to Bag</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#FAF8F5]/10 bg-[#100F0F] text-center">
              <span className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#D8CFBE]/60">
                Atelier Archive Concierge
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
