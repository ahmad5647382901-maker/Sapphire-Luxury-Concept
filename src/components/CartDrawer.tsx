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
            className="absolute inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 max-w-md w-full bg-[#0B0A0A] text-[#FAF8F5] border-l border-[#FAF8F5]/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="p-6 sm:p-8 border-b border-[#FAF8F5]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#D8CFBE]" />
                <h2 className="font-serif text-xl tracking-[0.1em] text-[#FAF8F5] uppercase font-light">
                  Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>
              <button
                id="close-cart-drawer"
                type="button"
                onClick={onClose}
                aria-label="Close bag"
                className="p-1 text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-12 h-12 rounded-full bg-[#141312] border border-[#FAF8F5]/10 flex items-center justify-center text-[#D8CFBE]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">Your bag is empty</h3>
                  <p className="text-xs font-sans font-light text-[#FAF8F5]/60 max-w-xs leading-relaxed">
                    Explore our architectural leather silhouettes and curated series.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5] border-b border-[#FAF8F5]/40 pb-0.5 hover:border-[#FAF8F5]"
                  >
                    Return to Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 border-b border-[#FAF8F5]/10 pb-6"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-[#141312] border border-[#FAF8F5]/10 overflow-hidden shrink-0">
                      <picture className="w-full h-full block">
                        {item.product.images[0].thumbnailWebpUrl && (
                          <source type="image/webp" srcSet={item.product.images[0].thumbnailWebpUrl} />
                        )}
                        <img
                          src={item.product.images[0].thumbnailUrl || item.product.images[0].url}
                          alt={item.product.name}
                          width={80}
                          height={96}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center"
                        />
                      </picture>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-base text-[#FAF8F5] leading-tight">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#D8CFBE] mt-1">
                            {item.selectedColor}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label="Remove item"
                          className="text-[#FAF8F5]/40 hover:text-[#FAF8F5] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#FAF8F5]/20 bg-[#141312]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-1 text-[#FAF8F5]/70 hover:text-[#FAF8F5] hover:bg-[#FAF8F5]/5"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-sans font-medium text-[#FAF8F5]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 text-[#FAF8F5]/70 hover:text-[#FAF8F5] hover:bg-[#FAF8F5]/5"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif text-sm text-[#FAF8F5]">
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
              <div className="p-6 sm:p-8 border-t border-[#FAF8F5]/10 bg-[#100F0F] space-y-4">
                <div className="space-y-2 text-xs font-sans font-light">
                  <div className="flex justify-between text-[#FAF8F5]/70">
                    <span>Subtotal</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#FAF8F5]/70">
                    <span>Delivery (Pakistan)</span>
                    <span className="text-[#D8CFBE] font-normal">Complimentary Insured</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans font-medium text-[#FAF8F5] pt-2 border-t border-[#FAF8F5]/10">
                    <span>Total Order</span>
                    <span className="font-serif text-base">PKR {subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  id="checkout-cta-button"
                  type="button"
                  onClick={onGoToCheckout}
                  className="w-full py-3.5 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-colors hover:bg-[#D8CFBE] flex items-center justify-center gap-3"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[9px] tracking-[0.2em] uppercase font-sans text-[#FAF8F5]/50 text-center">
                  <ShieldCheck className="w-3 h-3 text-[#D8CFBE]" />
                  <span>Insured White-Glove Courier Delivery</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
