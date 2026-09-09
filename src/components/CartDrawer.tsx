import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
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

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="cart-drawer-container"
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col justify-between border-l border-[#FAF8F5]/10 bg-[#0B0A0A] text-[#FAF8F5] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#FAF8F5]/10 px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <ShoppingBag
                  className="h-4 w-4 text-[#D8CFBE]"
                  aria-hidden="true"
                />

                <h2
                  id="cart-drawer-title"
                  className="font-serif text-xl font-light uppercase tracking-[0.1em]"
                >
                  Bag
                  <span className="ml-2 text-sm text-[#FAF8F5]/45">
                    {itemCount.toString().padStart(2, '0')}
                  </span>
                </h2>
              </div>

              <button
                id="close-cart-drawer"
                type="button"
                onClick={onClose}
                aria-label="Close bag"
                className="flex min-h-11 min-w-11 items-center justify-center text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-20 text-center">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#FAF8F5]/10 bg-[#141312] text-[#D8CFBE]">
                    <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#FAF8F5]">
                    Your bag is empty
                  </h3>

                  <p className="mt-3 max-w-xs text-xs font-light leading-relaxed text-[#FAF8F5]/55">
                    Explore the collection and select an object to add to your bag.
                  </p>

                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 min-h-11 border-b border-[#FAF8F5]/35 pb-1 text-[10px] font-medium uppercase tracking-[0.25em] text-[#FAF8F5] transition-colors hover:border-[#FAF8F5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
                  >
                    Return to Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 border-b border-[#FAF8F5]/10 pb-6"
                    >
                      {/* Image */}
                      <div className="h-24 w-20 shrink-0 overflow-hidden border border-[#FAF8F5]/10 bg-[#141312]">
                        <picture className="block h-full w-full">
                          {item.product.images[0].thumbnailWebpUrl && (
                            <source
                              type="image/webp"
                              srcSet={item.product.images[0].thumbnailWebpUrl}
                            />
                          )}

                          <img
                            src={
                              item.product.images[0].thumbnailUrl ||
                              item.product.images[0].url
                            }
                            alt={item.product.name}
                            width={80}
                            height={96}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-center"
                          />
                        </picture>
                      </div>

                      {/* Details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-serif text-base leading-tight text-[#FAF8F5]">
                              {item.product.name}
                            </h3>

                            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#D8CFBE]">
                              {item.selectedColor}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            aria-label={`Remove ${item.product.name} from bag`}
                            className="flex min-h-10 min-w-10 shrink-0 items-center justify-center text-[#FAF8F5]/35 transition-colors hover:text-[#FAF8F5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
                          >
                            <Trash2
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-3">
                          {/* Quantity */}
                          <div className="flex items-center border border-[#FAF8F5]/20 bg-[#141312]">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              aria-label={`Decrease quantity of ${item.product.name}`}
                              className="flex min-h-11 min-w-10 items-center justify-center text-[#FAF8F5]/60 transition-colors hover:bg-[#FAF8F5]/5 hover:text-[#FAF8F5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#FAF8F5]/60"
                            >
                              <Minus
                                className="h-2.5 w-2.5"
                                aria-hidden="true"
                              />
                            </button>

                            <span
                              aria-label={`Quantity ${item.quantity}`}
                              className="w-7 text-center text-xs font-medium text-[#FAF8F5]"
                            >
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              aria-label={`Increase quantity of ${item.product.name}`}
                              className="flex min-h-11 min-w-10 items-center justify-center text-[#FAF8F5]/60 transition-colors hover:bg-[#FAF8F5]/5 hover:text-[#FAF8F5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#FAF8F5]/60"
                            >
                              <Plus
                                className="h-2.5 w-2.5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>

                          <span className="font-serif text-sm text-[#FAF8F5]">
                            PKR{' '}
                            {(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="space-y-5 border-t border-[#FAF8F5]/10 bg-[#100F0F] px-6 py-6 sm:px-8">
                <div className="space-y-3 text-xs font-light">
                  <div className="flex items-center justify-between text-[#FAF8F5]/65">
                    <span>Subtotal</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-[#FAF8F5]/45">
                    <span>Delivery</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#FAF8F5]/10 pt-3 text-[#FAF8F5]">
                    <span className="text-xs font-medium">
                      Total Order
                    </span>

                    <span className="font-serif text-base">
                      PKR {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  id="checkout-cta-button"
                  type="button"
                  onClick={onGoToCheckout}
                  className="flex min-h-12 w-full items-center justify-center gap-3 bg-[#FAF8F5] px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#0B0A0A] transition-colors hover:bg-[#D8CFBE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F5]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100F0F]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>

                <p className="text-center text-[9px] font-light uppercase tracking-[0.18em] text-[#FAF8F5]/35">
                  Delivery details confirmed at checkout
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
