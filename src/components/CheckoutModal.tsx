import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Truck, Check, ArrowRight } from 'lucide-react';
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

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomCode = 'SPH-' + Math.floor(100000 + Math.random() * 900000);
      setOrderRef(randomCode);
      setOrderSuccess(true);
      onOrderComplete();
    }, 800);
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
            className="fixed inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Content */}
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#0E0D0D] text-[#FAF8F5] shadow-2xl p-6 sm:p-10 border border-[#FAF8F5]/10"
            >
              {/* Close Button */}
              <button
                id="close-checkout-modal"
                type="button"
                onClick={onClose}
                aria-label="Close checkout"
                className="absolute top-6 right-6 p-1.5 text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {orderSuccess ? (
                <div className="py-8 text-center space-y-6">
                  <div className="w-12 h-12 rounded-full bg-[#141312] border border-[#FAF8F5]/20 text-[#D8CFBE] flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE]/70">
                      Acquisition Confirmed
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">
                      Thank You, {fullName || 'Valued Patron'}
                    </h3>
                    <p className="text-xs tracking-widest font-sans text-[#D8CFBE]/80">
                      Reference Code: <strong className="text-[#FAF8F5]">{orderRef}</strong>
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/70 max-w-md mx-auto leading-relaxed">
                    Your bespoke shipment has been registered at our Lahore atelier. A private
                    concierge has dispatched confirmation details and secure courier tracking.
                  </p>

                  <div className="pt-3">
                    <button
                      id="return-to-lookbook-btn"
                      type="button"
                      onClick={handleFinish}
                      className="px-8 py-3 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-[#D8CFBE] transition-colors cursor-pointer"
                    >
                      Return to Lookbook
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE]/60">
                      Private Atelier Concierge
                    </span>
                    <h3 className="font-serif text-3xl text-[#FAF8F5] pt-1">
                      Complete Acquisition
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Items brief */}
                    <div className="bg-[#141312] border border-[#FAF8F5]/10 p-4 text-xs font-sans flex justify-between items-center">
                      <div>
                        <span className="font-medium text-[#FAF8F5]">
                          {items.reduce((sum, i) => sum + i.quantity, 0)} Archive Selection(s)
                        </span>
                        <p className="text-[10px] text-[#D8CFBE]/70 mt-0.5">Complimentary Insured Courier</p>
                      </div>
                      <span className="font-serif text-lg text-[#FAF8F5]">
                        PKR {subtotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <label className="block text-[9px] tracking-[0.25em] uppercase text-[#D8CFBE]/70 mb-1">
                          Full Name
                        </label>
                        <input
                          id="checkout-full-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ayla Khan"
                          className="w-full p-2.5 bg-transparent border border-[#FAF8F5]/20 focus:border-[#FAF8F5] text-[#FAF8F5] placeholder:text-[#FAF8F5]/30 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] tracking-[0.25em] uppercase text-[#D8CFBE]/70 mb-1">
                          Contact Phone
                        </label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+92 300 1234567"
                          className="w-full p-2.5 bg-transparent border border-[#FAF8F5]/20 focus:border-[#FAF8F5] text-[#FAF8F5] placeholder:text-[#FAF8F5]/30 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] tracking-[0.25em] uppercase text-[#D8CFBE]/70 mb-1">
                          City
                        </label>
                        <select
                          id="checkout-city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full p-2.5 bg-[#141312] border border-[#FAF8F5]/20 focus:border-[#FAF8F5] outline-none text-[#FAF8F5]"
                        >
                          <option value="Lahore" className="bg-[#141312] text-[#FAF8F5]">Lahore</option>
                          <option value="Karachi" className="bg-[#141312] text-[#FAF8F5]">Karachi</option>
                          <option value="Islamabad" className="bg-[#141312] text-[#FAF8F5]">Islamabad</option>
                          <option value="Rawalpindi" className="bg-[#141312] text-[#FAF8F5]">Rawalpindi</option>
                          <option value="Faisalabad" className="bg-[#141312] text-[#FAF8F5]">Faisalabad</option>
                          <option value="Peshawar" className="bg-[#141312] text-[#FAF8F5]">Peshawar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] tracking-[0.25em] uppercase text-[#D8CFBE]/70 mb-1">
                          Payment Mode
                        </label>
                        <div className="grid grid-cols-2 gap-2 h-[41px]">
                          <button
                            id="payment-mode-card"
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`px-2 text-[9px] tracking-wider uppercase border transition-colors cursor-pointer ${
                              paymentMethod === 'card'
                                ? 'bg-[#FAF8F5] text-[#0B0A0A] border-[#FAF8F5]'
                                : 'border-[#FAF8F5]/20 text-[#FAF8F5]/70 hover:text-[#FAF8F5]'
                            }`}
                          >
                            Card / Online
                          </button>
                          <button
                            id="payment-mode-cod"
                            type="button"
                            onClick={() => setPaymentMethod('cod')}
                            className={`px-2 text-[9px] tracking-wider uppercase border transition-colors cursor-pointer ${
                              paymentMethod === 'cod'
                                ? 'bg-[#FAF8F5] text-[#0B0A0A] border-[#FAF8F5]'
                                : 'border-[#FAF8F5]/20 text-[#FAF8F5]/70 hover:text-[#FAF8F5]'
                            }`}
                          >
                            White Glove COD
                          </button>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[9px] tracking-[0.25em] uppercase text-[#D8CFBE]/70 mb-1">
                          Delivery Address
                        </label>
                        <input
                          id="checkout-address"
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House / Apartment, Street, Phase / Sector"
                          className="w-full p-2.5 bg-transparent border border-[#FAF8F5]/20 focus:border-[#FAF8F5] text-[#FAF8F5] placeholder:text-[#FAF8F5]/30 outline-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="submit-order-btn"
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.25em] uppercase font-sans font-medium transition-colors hover:bg-[#D8CFBE] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-[#0B0A0A]/30 border-t-[#0B0A0A] rounded-full animate-spin" />
                          <span>Authorizing Order...</span>
                        </div>
                      ) : (
                        <>
                          <span>Authorize Acquisition · PKR {subtotal.toLocaleString()}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-6 text-[9px] tracking-wider uppercase font-sans text-[#D8CFBE]/60 pt-2">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-[#D8CFBE]" />
                        <span>Insured Delivery</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3 h-3 text-[#D8CFBE]" />
                        <span>Dispatched from Lahore Atelier</span>
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

