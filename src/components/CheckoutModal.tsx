import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  onClose,
  onOrderComplete,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isProcessing) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isProcessing]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || items.length === 0) {
      return;
    }

    setIsProcessing(true);

    window.setTimeout(() => {
      const randomCode = `SPH-${Math.floor(100000 + Math.random() * 900000)}`;

      setIsProcessing(false);
      setOrderRef(randomCode);
      setOrderSuccess(true);
      onOrderComplete();
    }, 800);
  };

  const handleFinish = () => {
    setOrderSuccess(false);
    setOrderRef('');
    setFullName('');
    setPhone('');
    setAddress('');
    setPaymentMethod('card');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="checkout-modal-container"
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isProcessing) onClose();
            }}
            aria-hidden="true"
            className="fixed inset-0 bg-black/80 backdrop-blur-[2px]"
          />

          {/* Modal */}
          <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-w-xl border border-[#FAF8F5]/10 bg-[#0E0D0D] p-6 text-[#FAF8F5] shadow-2xl sm:p-10"
            >
              {/* Close */}
              <button
                id="close-checkout-modal"
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                aria-label="Close checkout"
                className="absolute right-5 top-5 flex min-h-11 min-w-11 items-center justify-center text-[#FAF8F5]/55 transition-colors hover:text-[#FAF8F5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60 disabled:pointer-events-none disabled:opacity-30 sm:right-6 sm:top-6"
              >
                <X className="h-4 w-4" />
              </button>

              {orderSuccess ? (
                /* Success */
                <div className="space-y-7 py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#FAF8F5]/20 bg-[#141312] text-[#D8CFBE]">
                    <Check className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.35em] text-[#D8CFBE]/65">
                      Order Confirmed
                    </span>

                    <h2
                      id="checkout-modal-title"
                      className="font-serif text-3xl font-normal text-[#FAF8F5] sm:text-4xl"
                    >
                      Thank You, {fullName || 'Guest'}
                    </h2>

                    <p className="text-xs tracking-widest text-[#D8CFBE]/75">
                      Reference:{' '}
                      <strong className="text-[#FAF8F5]">{orderRef}</strong>
                    </p>
                  </div>

                  <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-[#FAF8F5]/65 sm:text-sm">
                    Your order has been recorded as part of this concept experience.
                    The details shown here are a confirmation of the submitted order.
                  </p>

                  <button
                    id="return-to-lookbook-btn"
                    type="button"
                    onClick={handleFinish}
                    className="min-h-11 bg-[#FAF8F5] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#0B0A0A] transition-colors hover:bg-[#D8CFBE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F5]/60"
                  >
                    Return to Lookbook
                  </button>
                </div>
              ) : (
                /* Form */
                <div className="space-y-8">
                  <div className="pr-10">
                    <span className="text-[9px] uppercase tracking-[0.35em] text-[#D8CFBE]/60">
                      Order Details
                    </span>

                    <h2
                      id="checkout-modal-title"
                      className="pt-1 font-serif text-3xl text-[#FAF8F5]"
                    >
                      Complete Order
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Order Summary */}
                    <div className="flex items-center justify-between gap-4 border border-[#FAF8F5]/10 bg-[#141312] p-4">
                      <div>
                        <span className="text-xs font-medium text-[#FAF8F5]">
                          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                        </span>

                        <p className="mt-1 text-[10px] text-[#FAF8F5]/45">
                          Order summary
                        </p>
                      </div>

                      <span className="font-serif text-lg text-[#FAF8F5]">
                        PKR {subtotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Customer Details */}
                    <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="checkout-full-name"
                          className="mb-1 block text-[9px] uppercase tracking-[0.25em] text-[#D8CFBE]/70"
                        >
                          Full Name
                        </label>

                        <input
                          id="checkout-full-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                          placeholder="Your full name"
                          className="min-h-11 w-full border border-[#FAF8F5]/20 bg-transparent px-3 py-2.5 text-[#FAF8F5] outline-none placeholder:text-[#FAF8F5]/25 focus:border-[#FAF8F5]/70 focus:ring-1 focus:ring-[#FAF8F5]/30"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="checkout-phone"
                          className="mb-1 block text-[9px] uppercase tracking-[0.25em] text-[#D8CFBE]/70"
                        >
                          Contact Phone
                        </label>

                        <input
                          id="checkout-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="+92 300 1234567"
                          className="min-h-11 w-full border border-[#FAF8F5]/20 bg-transparent px-3 py-2.5 text-[#FAF8F5] outline-none placeholder:text-[#FAF8F5]/25 focus:border-[#FAF8F5]/70 focus:ring-1 focus:ring-[#FAF8F5]/30"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="checkout-city"
                          className="mb-1 block text-[9px] uppercase tracking-[0.25em] text-[#D8CFBE]/70"
                        >
                          City
                        </label>

                        <select
                          id="checkout-city"
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          className="min-h-11 w-full border border-[#FAF8F5]/20 bg-[#141312] px-3 py-2.5 text-[#FAF8F5] outline-none focus:border-[#FAF8F5]/70 focus:ring-1 focus:ring-[#FAF8F5]/30"
                        >
                          <option value="Karachi">Karachi</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <fieldset>
                        <legend className="mb-1 block text-[9px] uppercase tracking-[0.25em] text-[#D8CFBE]/70">
                          Payment Method
                        </legend>

                        <div className="grid min-h-11 grid-cols-2 gap-2">
                          <button
                            id="payment-mode-card"
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            aria-pressed={paymentMethod === 'card'}
                            className={`min-h-11 border px-2 text-[9px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60 ${
                              paymentMethod === 'card'
                                ? 'border-[#FAF8F5] bg-[#FAF8F5] text-[#0B0A0A]'
                                : 'border-[#FAF8F5]/20 text-[#FAF8F5]/65 hover:border-[#FAF8F5]/45 hover:text-[#FAF8F5]'
                            }`}
                          >
                            Card / Online
                          </button>

                          <button
                            id="payment-mode-cod"
                            type="button"
                            onClick={() => setPaymentMethod('cod')}
                            aria-pressed={paymentMethod === 'cod'}
                            className={`min-h-11 border px-2 text-[9px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60 ${
                              paymentMethod === 'cod'
                                ? 'border-[#FAF8F5] bg-[#FAF8F5] text-[#0B0A0A]'
                                : 'border-[#FAF8F5]/20 text-[#FAF8F5]/65 hover:border-[#FAF8F5]/45 hover:text-[#FAF8F5]'
                            }`}
                          >
                            Cash on Delivery
                          </button>
                        </div>
                      </fieldset>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="checkout-address"
                          className="mb-1 block text-[9px] uppercase tracking-[0.25em] text-[#D8CFBE]/70"
                        >
                          Delivery Address
                        </label>

                        <textarea
                          id="checkout-address"
                          required
                          autoComplete="street-address"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          placeholder="House / Apartment, Street, Area"
                          rows={3}
                          className="w-full resize-none border border-[#FAF8F5]/20 bg-transparent px-3 py-2.5 text-[#FAF8F5] outline-none placeholder:text-[#FAF8F5]/25 focus:border-[#FAF8F5]/70 focus:ring-1 focus:ring-[#FAF8F5]/30"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      id="submit-order-btn"
                      type="submit"
                      disabled={isProcessing || items.length === 0}
                      className="flex min-h-12 w-full items-center justify-center gap-3 bg-[#FAF8F5] px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#0B0A0A] transition-colors hover:bg-[#D8CFBE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F5]/60 disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0B0A0A]/30 border-t-[#0B0A0A]"
                          />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>
                            Place Order · PKR {subtotal.toLocaleString()}
                          </span>
                          <ArrowRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[9px] font-light leading-relaxed tracking-[0.08em] text-[#FAF8F5]/35">
                      This is an unofficial concept experience. No real payment
                      is processed through this interface.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
