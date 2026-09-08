import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
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

  // Mobile touch swipe
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
    if (distance > 40) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    } else if (distance < -40) {
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
      setTimeout(() => setAddedSuccess(false), 2400);
    }, 350);
  };

  const currentImage = product.images[selectedImageIndex];

  // Prefetch secondary full-res perspective on demand (hover or idle) without blocking initial page load
  const handleThumbnailHover = (idx: number) => {
    const target = product.images[idx];
    if (target?.webpUrl && typeof window !== 'undefined') {
      const img = new Image();
      img.src = target.webpUrl;
    }
  };

  // Idle prefetch: When user reaches this section, gently prefetch the next perspective during browser idle time
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const el = imageContainerRef.current;
    if (!el) return;

    let timeoutId: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          // Preload secondary perspective when idle
          timeoutId = window.setTimeout(() => {
            const nextImg = product.images[1];
            if (nextImg?.webpUrl) {
              const pre = new Image();
              pre.src = nextImg.webpUrl;
            }
          }, 1500);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [product.images]);

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  // Descriptive editorial perspective titles (strictly no cheap marketplace 1/2/3/4 numbers)
  const perspectiveTitles = [
    { name: 'Front Elevation', short: 'Front', subtitle: 'Architectural Silhouette' },
    { name: 'Side Profile', short: 'Side', subtitle: 'Tapered Geometric Gusset' },
    { name: 'Rear Elevation', short: 'Back View', subtitle: 'Flush Slip Pocket & Saddle Stitching' },
    { name: 'Atelier Detail', short: 'Craft Detail', subtitle: 'Full-Grain Calfskin & Satin Brass' },
  ];

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if this element or its children have focus or image container is active
      const container = imageContainerRef.current;
      if (!container) return;
      if (document.activeElement && container.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product.images.length]);

  return (
    <section
      id="section-product-detail"
      className="relative py-28 md:py-40 px-6 sm:px-10 md:px-14 bg-[#0E0D0D] border-t border-[#FAF8F5]/10 text-[#FAF8F5] scroll-mt-20"
    >
      {/* Navigation Target Anchors */}
      <div id="section-hero-object" className="absolute top-0 left-0 scroll-mt-20 pointer-events-none" />
      <div id="section-product-story" className="absolute top-0 left-0 scroll-mt-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#FAF8F5]/10 mb-14 md:mb-20 gap-4 text-[10px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60">
          <div className="flex items-center gap-3">
            <span>Chapter 03</span>
            <span>·</span>
            <span className="text-[#FAF8F5]">The Masterwork Object</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-[#FAF8F5]/40">Complimentary Insured Courier</span>
            {/* Direct Rear Elevation Quick Switcher */}
            <button
              type="button"
              id="inspect-rear-view-btn"
              onClick={() => setSelectedImageIndex(2)}
              onMouseEnter={() => handleThumbnailHover(2)}
              aria-label="Directly switch to rear elevation view"
              className={`pb-1 border-b transition-all duration-300 ${
                selectedImageIndex === 2
                  ? 'border-[#D8CFBE] text-[#FAF8F5]'
                  : 'border-[#FAF8F5]/30 text-[#FAF8F5]/70 hover:text-[#FAF8F5] hover:border-[#FAF8F5]'
              }`}
            >
              Direct Rear Elevation →
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Large Visually Dominant Product Gallery */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Main Image Stage */}
            <div
              ref={imageContainerRef}
              id="main-product-image-container"
              tabIndex={0}
              aria-label="Product image gallery stage. Use left and right arrow keys to switch perspectives."
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden bg-[#141312] border border-[#FAF8F5]/10 select-none cursor-crosshair group touch-pan-y focus:outline-hidden focus:border-[#D8CFBE]/60"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <picture className="w-full h-full block">
                    {currentImage.webpSrcSet ? (
                      <source
                        type="image/webp"
                        srcSet={currentImage.webpSrcSet}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 58vw, 680px"
                      />
                    ) : currentImage.webpUrl ? (
                      <source type="image/webp" srcSet={currentImage.webpUrl} />
                    ) : null}
                    {currentImage.jpgSrcSet ? (
                      <source
                        type="image/jpeg"
                        srcSet={currentImage.jpgSrcSet}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 58vw, 680px"
                      />
                    ) : null}
                    <img
                      src={currentImage.webpUrl || currentImage.url}
                      alt={currentImage.alt}
                      width={896}
                      height={1200}
                      loading={selectedImageIndex === 0 ? 'lazy' : 'eager'}
                      decoding="async"
                      style={{
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                      }}
                      className="w-full h-full object-cover object-center pointer-events-none filter contrast-[1.02]"
                    />
                  </picture>
                </motion.div>
              </AnimatePresence>

              {/* Refined Perspective Tag (No Cheap Numbers) */}
              <div className="absolute top-5 left-5 pointer-events-none z-10 flex flex-col items-start gap-1">
                <div className="bg-[#0B0A0A]/85 backdrop-blur-xs border border-[#FAF8F5]/10 px-3 py-1 text-[9px] tracking-[0.25em] uppercase font-sans text-[#FAF8F5]">
                  {perspectiveTitles[selectedImageIndex]?.name || currentImage.viewName}
                </div>
                <div className="text-[8px] tracking-[0.2em] font-sans text-[#FAF8F5]/50 px-1">
                  {perspectiveTitles[selectedImageIndex]?.subtitle}
                </div>
              </div>

              {/* Minimal Slender Navigation Arrows */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
                  }}
                  onMouseEnter={() => handleThumbnailHover((selectedImageIndex - 1 + product.images.length) % product.images.length)}
                  aria-label="Previous perspective"
                  className="pointer-events-auto p-2.5 bg-[#0B0A0A]/60 backdrop-blur-xs text-[#FAF8F5] border border-[#FAF8F5]/10 opacity-70 hover:opacity-100 hover:bg-[#0B0A0A] transition-all"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
                  }}
                  onMouseEnter={() => handleThumbnailHover((selectedImageIndex + 1) % product.images.length)}
                  aria-label="Next perspective"
                  className="pointer-events-auto p-2.5 bg-[#0B0A0A]/60 backdrop-blur-xs text-[#FAF8F5] border border-[#FAF8F5]/10 opacity-70 hover:opacity-100 hover:bg-[#0B0A0A] transition-all"
                >
                  <ChevronRight className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              {/* Desktop Zoom Indicator */}
              <div className="absolute bottom-5 right-5 hidden md:flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase font-sans text-[#FAF8F5]/60 bg-[#0B0A0A]/80 border border-[#FAF8F5]/10 px-3 py-1 pointer-events-none">
                <Maximize2 className="w-3 h-3 text-[#D8CFBE]" />
                <span>Hover to inspect leather</span>
              </div>
            </div>

            {/* Editorial Perspective Index Navigation Bar (Zero numbers or cheap dots) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.map((img, idx) => {
                const isActive = selectedImageIndex === idx;
                const perspective = perspectiveTitles[idx];

                return (
                  <button
                    key={img.id}
                    id={`gallery-perspective-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    onMouseEnter={() => handleThumbnailHover(idx)}
                    onFocus={() => handleThumbnailHover(idx)}
                    aria-label={`Switch to ${perspective.name}: ${perspective.subtitle}`}
                    aria-pressed={isActive}
                    className={`group text-left transition-all duration-300 flex flex-col space-y-2 pb-2 border-b-2 cursor-pointer ${
                      isActive
                        ? 'border-[#D8CFBE] opacity-100'
                        : 'border-transparent opacity-40 hover:opacity-80'
                    }`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#141312] border border-[#FAF8F5]/10">
                      <picture className="w-full h-full block">
                        {img.thumbnailWebpUrl && (
                          <source
                            type="image/webp"
                            srcSet={`${img.thumbnailWebpUrl} 1x, ${img.webpUrl || img.url} 2x`}
                          />
                        )}
                        <img
                          src={img.thumbnailWebpUrl || img.thumbnailUrl || img.url}
                          alt={img.alt}
                          width={200}
                          height={150}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                        />
                      </picture>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] uppercase text-[#FAF8F5] font-medium">
                        {perspective.short}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Product Information & Restrained Purchase Panel */}
          <div id="section-acquire" className="scroll-mt-24 lg:col-span-5 flex flex-col space-y-8">
            {/* Header Titles */}
            <div className="space-y-3">
              <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE] block">
                Atelier Leather Collection
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF8F5] font-normal leading-[0.98]">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 pt-2">
                <span className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">
                  {product.formattedPrice}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#FAF8F5]/40">
                  Taxes & Insured Courier Included
                </span>
              </div>
            </div>

            {/* Description Statement */}
            <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/80 leading-relaxed border-l border-[#D8CFBE]/40 pl-4">
              {product.description}
            </p>

            {/* Colorway Indicator */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase font-sans">
                <span className="font-medium text-[#FAF8F5]">Colorway</span>
                <span className="text-[#D8CFBE]">{product.color}</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  aria-label="Noir Black"
                  className="w-5 h-5 rounded-full bg-[#050505] ring-1 ring-offset-2 ring-offset-[#0E0D0D] ring-[#D8CFBE]"
                />
                <span className="text-xs font-sans text-[#FAF8F5]/60">
                  European Drum-Dyed Noir Calfskin
                </span>
              </div>
            </div>

            {/* Quantity Selector & Action Controls */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5]/70">
                  Quantity
                </span>
                <div className="flex items-center border border-[#FAF8F5]/20 bg-[#141312]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-3 py-2 text-[#FAF8F5]/70 hover:text-[#FAF8F5] hover:bg-[#FAF8F5]/5 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-sans font-medium text-[#FAF8F5]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                    aria-label="Increase quantity"
                    className="px-3 py-2 text-[#FAF8F5]/70 hover:text-[#FAF8F5] hover:bg-[#FAF8F5]/5 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Slim, Refined Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  id="add-to-bag-button"
                  type="button"
                  onClick={handleAdd}
                  disabled={isAdding}
                  className={`flex-1 relative overflow-hidden h-12 flex items-center justify-center text-[10px] tracking-[0.28em] uppercase font-sans font-medium transition-all duration-300 ${
                    addedSuccess
                      ? 'bg-[#1C3B2B] text-[#FAF8F5]'
                      : 'bg-[#FAF8F5] text-[#0B0A0A] hover:bg-[#D8CFBE]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {addedSuccess ? (
                      <motion.div
                        key="added"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Secured to Bag</span>
                      </motion.div>
                    ) : isAdding ? (
                      <motion.div
                        key="adding"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="animate-pulse">Securing...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <span>Add to Bag</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <button
                  id="wishlist-toggle-button"
                  type="button"
                  onClick={onToggleWishlist}
                  aria-label={isInWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`h-12 w-12 flex items-center justify-center border transition-colors ${
                    isInWishlist
                      ? 'border-[#D8CFBE] bg-[#FAF8F5]/10 text-[#D8CFBE]'
                      : 'border-[#FAF8F5]/20 text-[#FAF8F5]/70 hover:text-[#FAF8F5] hover:border-[#FAF8F5]/50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Atelier Accordions */}
            <div className="border-t border-[#FAF8F5]/10 pt-4 divide-y divide-[#FAF8F5]/10">
              {/* Product Details */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between text-left text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5]"
                >
                  <span>Product Details</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#FAF8F5]/60 transition-transform duration-300 ${
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="pt-3 space-y-2 text-xs font-sans font-light text-[#FAF8F5]/70 leading-relaxed list-disc list-inside">
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
                  className="w-full flex items-center justify-between text-left text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5]"
                >
                  <span>Materials & Origins</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#FAF8F5]/60 transition-transform duration-300 ${
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="pt-3 space-y-2 text-xs font-sans font-light text-[#FAF8F5]/70 leading-relaxed list-disc list-inside">
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
                  className="w-full flex items-center justify-between text-left text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5]"
                >
                  <span>Dimensions & Fit</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#FAF8F5]/60 transition-transform duration-300 ${
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-2 text-xs font-sans font-light text-[#FAF8F5]/70">
                        <p><strong className="text-[#FAF8F5] font-medium">Height:</strong> {product.dimensions.height}</p>
                        <p><strong className="text-[#FAF8F5] font-medium">Width:</strong> {product.dimensions.width}</p>
                        <p><strong className="text-[#FAF8F5] font-medium">Depth:</strong> {product.dimensions.depth}</p>
                        <p><strong className="text-[#FAF8F5] font-medium">Strap Drop:</strong> {product.dimensions.strapDrop}</p>
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
                  className="w-full flex items-center justify-between text-left text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5]"
                >
                  <span>Shipping & Courier</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#FAF8F5]/60 transition-transform duration-300 ${
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-xs font-sans font-light text-[#FAF8F5]/70 leading-relaxed">
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
                  className="w-full flex items-center justify-between text-left text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5]"
                >
                  <span>Exchange & Archive Policy</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#FAF8F5]/60 transition-transform duration-300 ${
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-xs font-sans font-light text-[#FAF8F5]/70 leading-relaxed">
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
