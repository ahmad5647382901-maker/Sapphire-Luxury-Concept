import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'New In', target: 'section-new-edition' },
    { name: 'Collections', target: 'section-collections' },
    { name: 'Hero Piece', target: 'section-product-story' },
    { name: 'Craftsmanship', target: 'section-craftsmanship' },
    { name: 'Acquire', target: 'section-product-detail' },
  ];

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-out ${
          isScrolled
            ? 'bg-[#FAF9F5]/90 backdrop-blur-md py-3.5 border-b border-[#0E0D0D]/8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-[#0E0D0D]'
            : 'bg-transparent py-6 md:py-8 text-[#0E0D0D]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Toggle & Brand Left */}
          <div className="flex items-center gap-6">
            <button
              id="mobile-menu-trigger"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-1.5 -ml-1.5 text-[#0E0D0D] hover:opacity-70 transition-opacity"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-[13px] tracking-[0.14em] uppercase font-sans font-medium text-[#0E0D0D]/85">
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  id={`nav-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => onNavigateSection(item.target)}
                  className="relative py-1 group transition-colors hover:text-[#0E0D0D]"
                >
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#0E0D0D] transition-all duration-300 ease-out group-hover:w-full" />
                </button>
              ))}
            </nav>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.28em] font-normal uppercase text-[#0E0D0D]">
                SAPPHIRE
              </span>
              <span className="text-[8px] tracking-[0.38em] uppercase text-[#0E0D0D]/50 -mt-1 font-sans hidden sm:block">
                Editorial Concept
              </span>
            </div>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center space-x-5 md:space-x-7">
            <button
              id="search-button-trigger"
              type="button"
              onClick={onOpenSearch}
              aria-label="Search catalog"
              className="p-1.5 text-[#0E0D0D]/85 hover:text-[#0E0D0D] transition-all hover:scale-105"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button
              id="wishlist-button-trigger"
              type="button"
              onClick={onOpenWishlist}
              aria-label="View wishlist"
              className="relative p-1.5 text-[#0E0D0D]/85 hover:text-[#0E0D0D] transition-all hover:scale-105"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0E0D0D] text-[#FAF9F5] text-[9px] font-sans font-medium flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              id="bag-button-trigger"
              type="button"
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="group relative flex items-center gap-2 p-1.5 text-[#0E0D0D] hover:opacity-85 transition-all"
            >
              <div className="relative">
                <ShoppingBag className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#0E0D0D] text-[#FAF9F5] text-[9px] font-sans font-medium flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-[11px] tracking-[0.16em] uppercase font-sans font-medium text-[#0E0D0D]/80 group-hover:text-[#0E0D0D]">
                Bag
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Editorial Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#FAF9F5] flex flex-col justify-between p-8 sm:p-12 text-[#0E0D0D]"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-[#0E0D0D]/10 pb-6">
              <span className="font-serif text-xl tracking-[0.25em] uppercase">SAPPHIRE</span>
              <button
                id="close-mobile-menu"
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2 text-[#0E0D0D] hover:opacity-60 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Editorial Nav Items */}
            <div className="flex flex-col space-y-6 my-auto">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#0E0D0D]/40 font-sans">
                Curated Navigation
              </span>
              {navLinks.map((item, idx) => (
                <button
                  key={item.name}
                  id={`mobile-nav-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateSection(item.target);
                  }}
                  className="group flex items-center justify-between text-left py-2 border-b border-[#0E0D0D]/5 text-2xl sm:text-3xl font-serif text-[#0E0D0D] hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-sans text-[#0E0D0D]/40 tracking-wider">
                      0{idx + 1}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#0E0D0D]/30 group-hover:text-[#0E0D0D] transition-colors" />
                </button>
              ))}
            </div>

            {/* Bottom Details */}
            <div className="border-t border-[#0E0D0D]/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#0E0D0D]/60 tracking-wider gap-4">
              <div>
                <p className="font-medium text-[#0E0D0D]">Independent Fashion Concept</p>
                <p>Lahore · Karachi · Islamabad</p>
              </div>
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="hover:text-[#0E0D0D]"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWishlist();
                  }}
                  className="hover:text-[#0E0D0D]"
                >
                  Wishlist ({wishlistCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="hover:text-[#0E0D0D]"
                >
                  Bag ({cartCount})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
