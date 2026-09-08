import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onGoToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onGoToCheckout,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cart-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0E0D0D]/45 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 max-w-md w-full bg-[#FAF9F5] shadow-2xl flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="p-6 md:p-8 border-b border-[#0E0D0D]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#0E0D0D]" />
                <h2 className="font-serif text-xl tracking-wider text-[#0E0D0D] uppercase">
                  Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>
              <button
                id="close-cart-drawer"
                type="button"
                onClick={onClose}
                aria-label="Close bag"
                className="p-1.5 text-[#0E0D0D] hover:opacity-60 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-[#F3F0EA] flex items-center justify-center text-[#0E0D0D]/40">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#0E0D0D]">Your bag is empty</h3>
                  <p className="text-xs font-sans text-[#0E0D0D]/60 max-w-xs leading-relaxed">
                    Discover our architectural leather silhouettes and curated textile editions.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D] underline underline-offset-4"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 border-b border-[#0E0D0D]/10 pb-6"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-28 bg-[#F3F0EA] overflow-hidden shrink-0">
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-lg text-[#0E0D0D] leading-tight">
                            {item.product.name}
                          </h4>
                          <p className="text-xs font-sans text-[#0E0D0D]/60 mt-1">
                            Color: {item.selectedColor}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label="Remove item"
                          className="text-[#0E0D0D]/40 hover:text-[#0E0D0D] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#0E0D0D]/20 bg-[#FAF9F5]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-[#0E0D0D]/70 hover:text-[#0E0D0D]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-sans font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-[#0E0D0D]/70 hover:text-[#0E0D0D]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif text-base text-[#0E0D0D]">
                          PKR {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-[#0E0D0D]/10 bg-[#F3F0EA] space-y-4">
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between text-[#0E0D0D]/70">
                    <span>Subtotal</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#0E0D0D]/70">
                    <span>Delivery (Pakistan)</span>
                    <span className="text-[#0E0D0D] font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans font-medium text-[#0E0D0D] pt-2 border-t border-[#0E0D0D]/10">
                    <span>Total</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  id="checkout-cta-button"
                  type="button"
                  onClick={onGoToCheckout}
                  className="w-full py-4 bg-[#0E0D0D] text-[#FAF9F5] text-xs tracking-[0.22em] uppercase font-sans font-medium transition-colors hover:bg-[#232220] flex items-center justify-center gap-3"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] tracking-wider uppercase font-sans text-[#0E0D0D]/50 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0E0D0D]" />
                  <span>Secure SSL White-Glove Encrypted Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
