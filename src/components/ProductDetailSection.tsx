import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Shield,
  Truck,
  RotateCcw,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailSectionProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  onAddToCart: (quantity: number) => void;
}

export const ProductDetailSection: React.FC<ProductDetailSectionProps> = ({
  product,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  // Desktop hover zoom state
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Mobile touch swipe handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    } else if (isRightSwipe) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(quantity);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2600);
    }, 450);
  };

  const currentImage = product.images[selectedImageIndex];

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="section-product-detail"
      className="relative py-24 md:py-36 px-6 sm:px-8 md:px-12 bg-[#FAF9F5] border-t border-[#0E0D0D]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0E0D0D]/10 mb-12 md:mb-16 gap-4">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/50 font-medium">
            <span>Product Page</span>
            <span>·</span>
            <span>Archive No. SAP-2026-N01</span>
          </div>

          <div className="flex items-center gap-4 text-xs tracking-[0.18em] uppercase font-sans text-[#0E0D0D]/60">
            <span className="hidden sm:inline">Complimentary Pakistan Delivery</span>
            <button
              type="button"
              onClick={() => setSelectedImageIndex(2)}
              className="text-[#0E0D0D] underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              Direct Rear Elevation
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Product Image Gallery */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Cinematic Main Image Stage */}
            <div
              ref={imageContainerRef}
              id="main-product-image-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden bg-[#F3F0EA] select-none cursor-crosshair group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <img
                    src={currentImage.url}
                    alt={currentImage.alt}
                    referrerPolicy="no-referrer"
                    style={{
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      transform: isHovered ? 'scale(1.22)' : 'scale(1)',
                      transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                    }}
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* View Label & Counter Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-3 pointer-events-none z-10">
                <div className="bg-[#FAF9F5]/90 backdrop-blur-xs px-3.5 py-1.5 text-[10px] tracking-[0.22em] uppercase font-sans font-medium text-[#0E0D0D] border border-[#0E0D0D]/5">
                  {currentImage.viewName}
                </div>
                <div className="bg-[#0E0D0D] text-[#FAF9F5] px-2.5 py-1 text-[10px] tracking-[0.2em] font-sans font-medium">
                  {currentImage.label}
                </div>
              </div>

              {/* Back View Quick Feature Callout */}
              {selectedImageIndex === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-6 bg-[#0E0D0D]/80 backdrop-blur-xs text-[#FAF9F5] px-3.5 py-1.5 text-[10px] tracking-[0.2em] uppercase font-sans pointer-events-none z-10"
                >
                  Rear Profile · Slip Pocket & Saddle Stitching
                </motion.div>
              )}

              {/* Mobile Arrows for quick swipe alternative */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none sm:hidden z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
                  }}
                  aria-label="Previous image"
                  className="pointer-events-auto p-2 bg-[#FAF9F5]/80 rounded-full text-[#0E0D0D] shadow-xs hover:bg-[#FAF9F5]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
                  }}
                  aria-label="Next image"
                  className="pointer-events-auto p-2 bg-[#FAF9F5]/80 rounded-full text-[#0E0D0D] shadow-xs hover:bg-[#FAF9F5]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Desktop Hover Zoom Hint */}
              <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-sans text-[#0E0D0D]/40 bg-[#FAF9F5]/75 px-2.5 py-1 pointer-events-none">
                <Maximize2 className="w-3 h-3" />
                <span>Hover to inspect grain</span>
              </div>
            </div>

            {/* Four Elegant Thumbnails */}
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {product.images.map((img, idx) => {
                const isActive = selectedImageIndex === idx;

                return (
                  <button
                    key={img.id}
                    id={`gallery-thumb-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative group flex flex-col text-left transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-65 hover:opacity-90'
                    }`}
                  >
                    <div
                      className={`relative aspect-[1/1] w-full overflow-hidden bg-[#F3F0EA] transition-all duration-300 ${
                        isActive ? 'ring-2 ring-[#0E0D0D] ring-offset-2 ring-offset-[#FAF9F5]' : 'ring-0'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-sans tracking-[0.14em] uppercase text-[#0E0D0D]">
                      <span className="truncate font-medium">{img.viewName.split(' ')[0]}</span>
                      <span className="text-[#0E0D0D]/40">{img.label.split(' / ')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explicit Back Perspective Bar */}
            <div className="pt-2 flex items-center justify-between bg-[#F3F0EA] p-4 text-xs font-sans text-[#0E0D0D]">
              <div>
                <p className="font-medium tracking-wide">360° Studio Photography Standard</p>
                <p className="text-[#0E0D0D]/60 text-[11px]">
                  All angles photographed in natural daylight. Rear elevation highlights flush pocket tailoring.
                </p>
              </div>
              <button
                type="button"
                id="inspect-rear-view-btn"
                onClick={() => setSelectedImageIndex(2)}
                className={`px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase font-medium border transition-colors ${
                  selectedImageIndex === 2
                    ? 'bg-[#0E0D0D] text-[#FAF9F5] border-[#0E0D0D]'
                    : 'border-[#0E0D0D]/30 hover:border-[#0E0D0D] text-[#0E0D0D]'
                }`}
              >
                Inspect Rear (03)
              </button>
            </div>
          </div>

          {/* RIGHT: Product Information & Purchase */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            {/* Header Titles */}
            <div className="space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase font-sans text-[#0E0D0D]/50 font-medium block">
                Permanent Collection
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#0E0D0D] font-normal leading-[1.05]">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-serif text-3xl text-[#0E0D0D]">
                  {product.formattedPrice}
                </span>
                <span className="text-xs tracking-[0.18em] uppercase font-sans text-[#0E0D0D]/50">
                  Import Duties & GST Included
                </span>
              </div>
            </div>

            {/* Description Statement */}
            <p className="text-[#232220]/85 text-base leading-relaxed font-sans font-light border-l-2 border-[#0E0D0D] pl-4">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase font-sans">
                <span className="font-medium text-[#0E0D0D]">Color</span>
                <span className="text-[#0E0D0D]/70">{product.color}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Noir Black"
                  className="w-8 h-8 rounded-full bg-[#121212] ring-2 ring-offset-2 ring-offset-[#FAF9F5] ring-[#0E0D0D] transition-transform hover:scale-105"
                />
                <span className="text-xs font-sans text-[#0E0D0D]/60 tracking-wider">
                  Signature Matte Noir Calfskin
                </span>
              </div>
            </div>

            {/* Quantity Selector & Action Controls */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#0E0D0D]/20 bg-[#FAF9F5]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-2 text-[#0E0D0D]/70 hover:text-[#0E0D0D] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-sans font-medium text-[#0E0D0D]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                    aria-label="Increase quantity"
                    className="p-2 text-[#0E0D0D]/70 hover:text-[#0E0D0D] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to Bag & Wishlist Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  id="add-to-bag-button"
                  type="button"
                  onClick={handleAdd}
                  disabled={isAdding}
                  className={`flex-1 relative overflow-hidden h-14 flex items-center justify-center text-[12px] tracking-[0.22em] uppercase font-sans font-medium transition-all duration-500 ${
                    addedSuccess
                      ? 'bg-[#1C3B2B] text-[#FAF9F5]'
                      : 'bg-[#0E0D0D] text-[#FAF9F5] hover:bg-[#232220]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {addedSuccess ? (
                      <motion.div
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </motion.div>
                    ) : isAdding ? (
                      <motion.div
                        key="adding"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Securing Item...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span>Add to Bag</span>
                        <span className="text-[#FAF9F5]/50">·</span>
                        <span>PKR {(product.price * quantity).toLocaleString()}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <button
                  id="wishlist-toggle-btn"
                  type="button"
                  onClick={onToggleWishlist}
                  aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  className={`h-14 w-14 flex items-center justify-center border transition-all duration-300 ${
                    isInWishlist
                      ? 'border-[#0E0D0D] bg-[#0E0D0D] text-[#FAF9F5]'
                      : 'border-[#0E0D0D]/20 text-[#0E0D0D] hover:border-[#0E0D0D] bg-transparent'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#0E0D0D]/10 text-xs font-sans text-[#0E0D0D]/70">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#0E0D0D]" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#0E0D0D]" />
                <span>14-Day Returns</span>
              </div>
            </div>

            {/* Editorial Accordions */}
            <div className="border-t border-[#0E0D0D]/10 divide-y divide-[#0E0D0D]/10">
              {/* Product Details */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D]"
                >
                  <span>Product Details</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openAccordion === 'details' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'details' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="pt-4 space-y-2 text-xs font-sans text-[#232220]/80 leading-relaxed list-disc list-inside">
                        {product.details.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Materials */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('materials')}
                  className="w-full flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D]"
                >
                  <span>Materials & Origins</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openAccordion === 'materials' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'materials' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="pt-4 space-y-2 text-xs font-sans text-[#232220]/80 leading-relaxed list-disc list-inside">
                        {product.materials.map((mat, idx) => (
                          <li key={idx}>{mat}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dimensions */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('dimensions')}
                  className="w-full flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D]"
                >
                  <span>Dimensions & Fit</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openAccordion === 'dimensions' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'dimensions' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-2 text-xs font-sans text-[#232220]/80">
                        <p><strong className="text-[#0E0D0D]">Height:</strong> {product.dimensions.height}</p>
                        <p><strong className="text-[#0E0D0D]">Width:</strong> {product.dimensions.width}</p>
                        <p><strong className="text-[#0E0D0D]">Depth:</strong> {product.dimensions.depth}</p>
                        <p><strong className="text-[#0E0D0D]">Strap Drop:</strong> {product.dimensions.strapDrop}</p>
                        <p className="text-[#0E0D0D]/60 pt-1">
                          Comfortably accommodates an iPhone Pro Max, cardholder, cosmetics pouch, and keys.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D]"
                >
                  <span>Shipping & Packaging</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-xs font-sans text-[#232220]/80 leading-relaxed">
                        {product.shippingInfo}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Returns */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('returns')}
                  className="w-full flex items-center justify-between text-left text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#0E0D0D]"
                >
                  <span>Returns & Guarantee</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openAccordion === 'returns' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'returns' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-xs font-sans text-[#232220]/80 leading-relaxed">
                        {product.returnsInfo}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
