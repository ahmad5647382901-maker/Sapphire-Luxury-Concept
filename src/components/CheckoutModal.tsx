import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
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
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderRef(`SPH-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderSuccess(true);
      onOrderComplete();
    }, 900);
  };

  const handleFinish = () => {
    setOrderSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="checkout-modal-container" className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0E0D0D]/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#FAF9F5] shadow-2xl p-6 sm:p-10 border border-[#0E0D0D]/10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close checkout"
                className="absolute top-6 right-6 p-2 text-[#0E0D0D] hover:opacity-60 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>

              {orderSuccess ? (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#1C3B2B] text-[#FAF9F5] flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#0E0D0D]/50">
                      Order Confirmed
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#0E0D0D]">
                      Thank You, {fullName || 'Valued Client'}
                    </h3>
                    <p className="text-xs tracking-widest font-sans text-[#0E0D0D]/70">
                      Reference Code: <strong className="text-[#0E0D0D]">{orderRef}</strong>
                    </p>
                  </div>

                  <p className="text-sm font-sans text-[#232220]/75 max-w-md mx-auto leading-relaxed">
                    Your bespoke shipment has been registered at our Lahore atelier. A personal
                    concierge has dispatched confirmation details and live courier tracking.
                  </p>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleFinish}
                      className="px-8 py-3.5 bg-[#0E0D0D] text-[#FAF9F5] text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-[#232220] transition-colors"
                    >
                      Return to Journal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#0E0D0D]/50">
                      White-Glove Service
                    </span>
                    <h3 className="font-serif text-3xl text-[#0E0D0D]">
                      Acquire Archive Pieces
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Items brief */}
                    <div className="bg-[#F3F0EA] p-4 text-xs font-sans flex justify-between items-center">
                      <div>
                        <span className="font-medium text-[#0E0D0D]">
                          {items.reduce((sum, i) => sum + i.quantity, 0)} Archive Selection(s)
                        </span>
                        <p className="text-[#0E0D0D]/60 mt-0.5">Complimentary Insured Delivery</p>
                      </div>
                      <span className="font-serif text-lg text-[#0E0D0D]">
                        PKR {subtotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0E0D0D]/60 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ayla Khan"
                          className="w-full p-3 bg-transparent border border-[#0E0D0D]/20 focus:border-[#0E0D0D] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0E0D0D]/60 mb-1">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+92 300 1234567"
                          className="w-full p-3 bg-transparent border border-[#0E0D0D]/20 focus:border-[#0E0D0D] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0E0D0D]/60 mb-1">
                          City
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full p-3 bg-transparent border border-[#0E0D0D]/20 focus:border-[#0E0D0D] outline-none text-[#0E0D0D]"
                        >
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Peshawar">Peshawar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0E0D0D]/60 mb-1">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-2 h-[46px]">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`px-2 text-[10px] tracking-wider uppercase border transition-colors ${
                              paymentMethod === 'card'
                                ? 'bg-[#0E0D0D] text-[#FAF9F5] border-[#0E0D0D]'
                                : 'border-[#0E0D0D]/20 text-[#0E0D0D]'
                            }`}
                          >
                            Card / Online
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cod')}
                            className={`px-2 text-[10px] tracking-wider uppercase border transition-colors ${
                              paymentMethod === 'cod'
                                ? 'bg-[#0E0D0D] text-[#FAF9F5] border-[#0E0D0D]'
                                : 'border-[#0E0D0D]/20 text-[#0E0D0D]'
                            }`}
                          >
                            White Glove COD
                          </button>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0E0D0D]/60 mb-1">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House / Apartment, Street, Phase / Sector"
                          className="w-full p-3 bg-transparent border border-[#0E0D0D]/20 focus:border-[#0E0D0D] outline-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="submit-order-btn"
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 bg-[#0E0D0D] text-[#FAF9F5] text-xs tracking-[0.22em] uppercase font-sans font-medium transition-all hover:bg-[#232220] flex items-center justify-center gap-3"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Authorizing Order...</span>
                        </div>
                      ) : (
                        <>
                          <span>Complete Order · PKR {subtotal.toLocaleString()}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-6 text-[10px] tracking-wider uppercase font-sans text-[#0E0D0D]/50 pt-2">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Insured Courier</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Dispatched from Lahore</span>
                      </div>
                    </div>
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
