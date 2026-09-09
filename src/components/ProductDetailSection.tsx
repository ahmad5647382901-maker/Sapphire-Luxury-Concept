import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  Minus,
  Plus,
} from 'lucide-react';

interface ProductDetailSectionProps {
  product: any;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  onAddToCart: (quantity?: number) => void;
}

export function ProductDetailSection({
  product,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
}: ProductDetailSectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [openAccordion, setOpenAccordion] =
    useState<string | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const imageContainerRef =
    useRef<HTMLDivElement>(null);

  const touchStartXRef =
    useRef<number | null>(null);

  const touchEndXRef =
    useRef<number | null>(null);

  const addTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const successTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = (
    e: React.TouchEvent
  ) => {
    touchStartXRef.current =
      e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchMove = (
    e: React.TouchEvent
  ) => {
    touchEndXRef.current =
      e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (
      touchStartXRef.current === null ||
      touchEndXRef.current === null
    ) {
      return;
    }

    const distance =
      touchStartXRef.current -
      touchEndXRef.current;

    if (
      Math.abs(distance) > 40 &&
      product.images?.length > 0
    ) {
      setSelectedImageIndex((prev: number) =>
        distance > 0
          ? (prev + 1) % product.images.length
          : (prev - 1 + product.images.length) %
            product.images.length
      );
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!imageContainerRef.current) return;

    const rect =
      imageContainerRef.current.getBoundingClientRect();

    const x = Math.max(
      0,
      Math.min(
        100,
        ((e.clientX - rect.left) /
          rect.width) *
          100
      )
    );

    const y = Math.max(
      0,
      Math.min(
        100,
        ((e.clientY - rect.top) /
          rect.height) *
          100
      )
    );

    setMousePosition({ x, y });
  };

  const handleAdd = () => {
    if (isAdding) return;

    setIsAdding(true);

    if (addTimerRef.current) {
      clearTimeout(addTimerRef.current);
    }

    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }

    addTimerRef.current = setTimeout(() => {
      onAddToCart(quantity);
      setIsAdding(false);
      setAddedSuccess(true);

      successTimerRef.current = setTimeout(() => {
        setAddedSuccess(false);
        successTimerRef.current = null;
      }, 2400);

      addTimerRef.current = null;
    }, 350);
  };

  const currentImage =
    product.images?.[selectedImageIndex] ??
    product.images?.[0];

  const handleThumbnailHover = (
    idx: number
  ) => {
    const target = product.images?.[idx];

    if (
      target?.webpUrl &&
      typeof window !== 'undefined'
    ) {
      const img = new Image();
      img.src = target.webpUrl;
    }
  };

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    const element =
      imageContainerRef.current;

    if (!element) return;

    let timeoutId:
      ReturnType<typeof setTimeout> | null =
      null;

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) {
            return;
          }

          timeoutId = setTimeout(() => {
            const nextImg =
              product.images?.[1];

            if (nextImg?.webpUrl) {
              const preloaded =
                new Image();

              preloaded.src =
                nextImg.webpUrl;
            }
          }, 1500);

          observer.disconnect();
        },
        { rootMargin: '150px' }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [product.images]);

  useEffect(() => {
    return () => {
      if (addTimerRef.current) {
        clearTimeout(addTimerRef.current);
      }

      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const toggleAccordion = (
    id: string
  ) => {
    setOpenAccordion((prev) =>
      prev === id ? null : id
    );
  };

  const perspectiveTitles = [
    {
      name: 'Front Elevation',
      short: 'Front',
      subtitle:
        'Architectural Silhouette',
    },
    {
      name: 'Side Profile',
      short: 'Side',
      subtitle:
        'Tapered Geometric Gusset',
    },
    {
      name: 'Rear Elevation',
      short: 'Back View',
      subtitle:
        'Flush Slip Pocket & Saddle Stitching',
    },
    {
      name: 'Atelier Detail',
      short: 'Craft Detail',
      subtitle:
        'Material & Construction Detail',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      const container =
        imageContainerRef.current;

      if (!container) return;

      if (
        document.activeElement &&
        container.contains(
          document.activeElement
        )
      ) {
        if (
          e.key === 'ArrowLeft' &&
          product.images?.length
        ) {
          e.preventDefault();

          setSelectedImageIndex(
            (prev: number) =>
              (prev -
                1 +
                product.images.length) %
              product.images.length
          );
        }

        if (
          e.key === 'ArrowRight' &&
          product.images?.length
        ) {
          e.preventDefault();

          setSelectedImageIndex(
            (prev: number) =>
              (prev + 1) %
              product.images.length
          );
        }
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [product.images?.length]);

  if (!currentImage) {
    return null;
  }

  return (
    <section
      id="section-product-detail"
      className="relative border-t border-[#FAF8F5]/10 bg-[#0E0D0D] px-6 py-28 text-[#FAF8F5] scroll-mt-20 sm:px-10 md:px-14 md:py-40"
    >
      <div
        id="section-hero-object"
        className="pointer-events-none absolute left-0 top-0 scroll-mt-20"
      />

      <div
        id="section-product-story"
        className="pointer-events-none absolute left-0 top-0 scroll-mt-20"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-4 border-b border-[#FAF8F5]/10 pb-6 text-[10px] font-sans uppercase tracking-[0.3em] text-[#D8CFBE]/60 sm:mb-20 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span>Chapter 03</span>
            <span className="text-[#FAF8F5]/30">
              ·
            </span>
            <span className="text-[#FAF8F5]">
              The Masterwork Object
            </span>
          </div>

          <span className="hidden text-[#FAF8F5]/40 sm:inline">
            The Object · Noir Structure
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col space-y-6 lg:col-span-7">
            <div
              ref={imageContainerRef}
              id="main-product-image-container"
              tabIndex={0}
              aria-label="Product image gallery stage. Use left and right arrow keys to switch perspectives."
              onMouseEnter={() =>
                setIsHovered(true)
              }
              onMouseLeave={() =>
                setIsHovered(false)
              }
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="group relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden border border-[#FAF8F5]/10 bg-[#141312] focus:border-[#D8CFBE]/60 focus:outline-none sm:aspect-square"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="relative h-full w-full"
                >
                  <picture className="block h-full w-full">
                    {currentImage.webpSrcSet ? (
                      <source
                        type="image/webp"
                        srcSet={
                          currentImage.webpSrcSet
                        }
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 58vw, 680px"
                      />
                    ) : currentImage.webpUrl ? (
                      <source
                        type="image/webp"
                        srcSet={
                          currentImage.webpUrl
                        }
                      />
                    ) : null}

                    {currentImage.jpgSrcSet ? (
                      <source
                        type="image/jpeg"
                        srcSet={
                          currentImage.jpgSrcSet
                        }
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 58vw, 680px"
                      />
                    ) : null}

                    <img
                      src={
                        currentImage.webpUrl ||
                        currentImage.url
                      }
                      alt={currentImage.alt}
                      width={896}
                      height={1200}
                      loading={
                        selectedImageIndex ===
                        0
                          ? 'eager'
                          : 'lazy'
                      }
                      decoding="async"
                      style={{
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        transform: isHovered
                          ? 'scale(1.14)'
                          : 'scale(1)',
                        transition: isHovered
                          ? 'transform 0.12s ease-out'
                          : 'transform 0.55s ease-out',
                      }}
                      className="pointer-events-none h-full w-full object-cover object-center contrast-[1.02]"
                    />
                  </picture>
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute left-5 top-5 z-10 flex flex-col items-start gap-1">
                <div className="border border-[#FAF8F5]/10 bg-[#0B0A0A]/80 px-3 py-1.5 text-[9px] font-sans uppercase tracking-[0.25em] text-[#FAF8F5] backdrop-blur-sm">
                  {
                    perspectiveTitles[
                      selectedImageIndex
                    ]?.name
                  }
                </div>

                <div className="px-1 text-[8px] font-sans tracking-[0.2em] text-[#FAF8F5]/45">
                  {
                    perspectiveTitles[
                      selectedImageIndex
                    ]?.subtitle
                  }
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedImageIndex(
                      (prev: number) =>
                        (prev -
                          1 +
                          product.images.length) %
                        product.images.length
                    );
                  }}
                  onMouseEnter={() =>
                    handleThumbnailHover(
                      (selectedImageIndex -
                        1 +
                        product.images.length) %
                        product.images.length
                    )
                  }
                  aria-label="Previous perspective"
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center border border-[#FAF8F5]/10 bg-[#0B0A0A]/55 text-[#FAF8F5] opacity-60 backdrop-blur-sm transition-all duration-300 hover:bg-[#0B0A0A] hover:opacity-100"
                >
                  <ChevronLeft className="h-4 w-4 stroke-[1.5]" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedImageIndex(
                      (prev: number) =>
                        (prev + 1) %
                        product.images.length
                    );
                  }}
                  onMouseEnter={() =>
                    handleThumbnailHover(
                      (selectedImageIndex + 1) %
                        product.images.length
                    )
                  }
                  aria-label="Next perspective"
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center border border-[#FAF8F5]/10 bg-[#0B0A0A]/55 text-[#FAF8F5] opacity-60 backdrop-blur-sm transition-all duration-300 hover:bg-[#0B0A0A] hover:opacity-100"
                >
                  <ChevronRight className="h-4 w-4 stroke-[1.5]" />
                </button>
              </div>

              <div className="pointer-events-none absolute bottom-5 right-5 hidden items-center gap-2 border border-[#FAF8F5]/10 bg-[#0B0A0A]/75 px-3 py-1.5 text-[9px] font-sans uppercase tracking-[0.22em] text-[#FAF8F5]/55 backdrop-blur-sm md:flex">
                <Maximize2 className="h-3 w-3 text-[#D8CFBE]" />
                <span>Inspect detail</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.map(
                (img: any, idx: number) => {
                  const isActive =
                    selectedImageIndex === idx;

                  const perspective =
                    perspectiveTitles[idx] ??
                    perspectiveTitles[0];

                  return (
                    <button
                      key={img.id}
                      id={`gallery-perspective-${idx}`}
                      type="button"
                      onClick={() =>
                        setSelectedImageIndex(
                          idx
                        )
                      }
                      onMouseEnter={() =>
                        handleThumbnailHover(
                          idx
                        )
                      }
                      onFocus={() =>
                        handleThumbnailHover(
                          idx
                        )
                      }
                      aria-label={`Switch to ${perspective.name}: ${perspective.subtitle}`}
                      aria-pressed={isActive}
                      className={`group flex cursor-pointer flex-col space-y-2 border-b pb-2 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-[#D8CFBE] opacity-100'
                          : 'border-transparent opacity-40 hover:opacity-80'
                      }`}
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden border border-[#FAF8F5]/10 bg-[#141312]">
                        <picture className="block h-full w-full">
                          {img.thumbnailWebpUrl && (
                            <source
                              type="image/webp"
                              srcSet={`${img.thumbnailWebpUrl} 1x, ${img.webpUrl || img.url} 2x`}
                            />
                          )}

                          <img
                            src={
                              img.thumbnailWebpUrl ||
                              img.thumbnailUrl ||
                              img.url
                            }
                            alt={img.alt}
                            width={200}
                            height={150}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </picture>
                      </div>

                      <span className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#FAF8F5] sm:text-[10px]">
                        {perspective.short}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div
            id="section-acquire"
            className="flex flex-col space-y-8 scroll-mt-24 lg:col-span-5"
          >
            <div className="space-y-3">
              <span className="block text-[9px] font-sans uppercase tracking-[0.35em] text-[#D8CFBE]">
                Atelier Leather Collection
              </span>

              <h1 className="font-serif text-4xl font-normal leading-[0.98] text-[#FAF8F5] sm:text-5xl md:text-6xl">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-2">
                <span className="font-serif text-3xl text-[#FAF8F5] sm:text-4xl">
                  {product.formattedPrice}
                </span>

                <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#FAF8F5]/40">
                  Noir Black · Signature Edition
                </span>
              </div>
            </div>

            <p className="border-l border-[#D8CFBE]/40 pl-4 text-xs font-sans font-light leading-[1.8] text-[#FAF8F5]/75 sm:text-sm">
              {product.description}
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.25em]">
                <span className="font-medium text-[#FAF8F5]">
                  Colorway
                </span>

                <span className="text-[#D8CFBE]">
                  {product.color}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  aria-label="Noir Black"
                  className="h-5 w-5 rounded-full bg-[#050505] ring-1 ring-[#D8CFBE] ring-offset-2 ring-offset-[#0E0D0D]"
                />

                <span className="text-xs font-sans font-light text-[#FAF8F5]/55">
                  Noir Black
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#FAF8F5]/70">
                  Quantity
                </span>

                <div className="flex items-center border border-[#FAF8F5]/20 bg-[#141312]">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) =>
                        Math.max(1, q - 1)
                      )
                    }
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center text-[#FAF8F5]/65 transition-colors hover:bg-[#FAF8F5]/5 hover:text-[#FAF8F5]"
                  >
                    <Minus className="h-3 w-3" />
                  </button>

                  <span className="w-8 text-center text-xs font-sans font-medium text-[#FAF8F5]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(5, q + 1)
                      )
                    }
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center text-[#FAF8F5]/65 transition-colors hover:bg-[#FAF8F5]/5 hover:text-[#FAF8F5]"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  id="add-to-bag-button"
                  type="button"
                  onClick={handleAdd}
                  disabled={isAdding}
                  className={`relative flex h-12 flex-1 items-center justify-center overflow-hidden text-[10px] font-sans font-medium uppercase tracking-[0.28em] transition-all duration-300 ${
                    addedSuccess
                      ? 'bg-[#1C3B2B] text-[#FAF8F5]'
                      : 'bg-[#FAF8F5] text-[#0B0A0A] hover:bg-[#D8CFBE]'
                  } disabled:cursor-wait`}
                >
                  <AnimatePresence mode="wait">
                    {addedSuccess ? (
                      <motion.div
                        key="added"
                        initial={{
                          opacity: 0,
                          y: 4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -4,
                        }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>
                          Secured to Bag
                        </span>
                      </motion.div>
                    ) : isAdding ? (
                      <motion.div
                        key="adding"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        <span>
                          Securing...
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        <span>
                          Add to Bag
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <button
                  id="wishlist-toggle-button"
                  type="button"
                  onClick={onToggleWishlist}
                  aria-label={
                    isInWishlist
                      ? 'Remove from wishlist'
                      : 'Save to wishlist'
                  }
                  aria-pressed={isInWishlist}
                  className={`flex h-12 w-12 items-center justify-center border transition-colors ${
                    isInWishlist
                      ? 'border-[#D8CFBE] bg-[#FAF8F5]/10 text-[#D8CFBE]'
                      : 'border-[#FAF8F5]/20 text-[#FAF8F5]/70 hover:border-[#FAF8F5]/50 hover:text-[#FAF8F5]'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isInWishlist
                        ? 'fill-current'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="divide-y divide-[#FAF8F5]/10 border-t border-[#FAF8F5]/10 pt-2">
              <div className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    toggleAccordion(
                      'details'
                    )
                  }
                  aria-expanded={
                    openAccordion ===
                    'details'
                  }
                  className="flex min-h-11 w-full items-center justify-between text-left text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#FAF8F5]"
                >
                  <span>
                    Product Details
                  </span>

                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#FAF8F5]/55 transition-transform duration-300 ${
                      openAccordion ===
                      'details'
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openAccordion ===
                    'details' && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 pt-3 text-xs font-sans font-light leading-relaxed text-[#FAF8F5]/65">
                        {product.details?.map(
                          (
                            item: string,
                            idx: number
                          ) => (
                            <li
                              key={idx}
                              className="flex gap-3"
                            >
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#D8CFBE]/60" />
                              <span>
                                {item}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    toggleAccordion(
                      'materials'
                    )
                  }
                  aria-expanded={
                    openAccordion ===
                    'materials'
                  }
                  className="flex min-h-11 w-full items-center justify-between text-left text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#FAF8F5]"
                >
                  <span>
                    Materials & Origins
                  </span>

                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#FAF8F5]/55 transition-transform duration-300 ${
                      openAccordion ===
                      'materials'
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openAccordion ===
                    'materials' && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 pt-3 text-xs font-sans font-light leading-relaxed text-[#FAF8F5]/65">
                        {product.materials?.map(
                          (
                            mat: string,
                            idx: number
                          ) => (
                            <li
                              key={idx}
                              className="flex gap-3"
                            >
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#D8CFBE]/60" />
                              <span>
                                {mat}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    toggleAccordion(
                      'dimensions'
                    )
                  }
                  aria-expanded={
                    openAccordion ===
                    'dimensions'
                  }
                  className="flex min-h-11 w-full items-center justify-between text-left text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#FAF8F5]"
                >
                  <span>
                    Dimensions & Fit
                  </span>

                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#FAF8F5]/55 transition-transform duration-300 ${
                      openAccordion ===
                      'dimensions'
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openAccordion ===
                    'dimensions' && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pt-3 text-xs font-sans font-light text-[#FAF8F5]/65">
                        <p>
                          <strong className="font-medium text-[#FAF8F5]">
                            Height:
                          </strong>{' '}
                          {
                            product
                              .dimensions
                              ?.height
                          }
                        </p>

                        <p>
                          <strong className="font-medium text-[#FAF8F5]">
                            Width:
                          </strong>{' '}
                          {
                            product
                              .dimensions
                              ?.width
                          }
                        </p>

                        <p>
                          <strong className="font-medium text-[#FAF8F5]">
                            Depth:
                          </strong>{' '}
                          {
                            product
                              .dimensions
                              ?.depth
                          }
                        </p>

                        <p>
                          <strong className="font-medium text-[#FAF8F5]">
                            Strap Drop:
                          </strong>{' '}
                          {
                            product
                              .dimensions
                              ?.strapDrop
                          }
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    toggleAccordion(
                      'shipping'
                    )
                  }
                  aria-expanded={
                    openAccordion ===
                    'shipping'
                  }
                  className="flex min-h-11 w-full items-center justify-between text-left text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#FAF8F5]"
                >
                  <span>
                    Shipping & Courier
                  </span>

                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#FAF8F5]/55 transition-transform duration-300 ${
                      openAccordion ===
                      'shipping'
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openAccordion ===
                    'shipping' && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-xs font-sans font-light leading-relaxed text-[#FAF8F5]/65">
                        {
                          product.shippingInfo
                        }
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    toggleAccordion(
                      'returns'
                    )
                  }
                  aria-expanded={
                    openAccordion ===
                    'returns'
                  }
                  className="flex min-h-11 w-full items-center justify-between text-left text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#FAF8F5]"
                >
                  <span>
                    Exchange & Archive Policy
                  </span>

                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#FAF8F5]/55 transition-transform duration-300 ${
                      openAccordion ===
                      'returns'
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openAccordion ===
                    'returns' && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-xs font-sans font-light leading-relaxed text-[#FAF8F5]/65">
                        {
                          product.returnsInfo
                        }
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
      }
