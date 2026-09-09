import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';

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
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Edition', target: 'section-edition' },
    { name: 'Anthology', target: 'section-collections' },
    { name: 'Hero Object', target: 'section-hero-object' },
    { name: 'Craft', target: 'section-craftsmanship' },
    { name: 'Acquire', target: 'section-acquire' },
  ];

  const handleNavigate = (target: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(target);
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-[#0B0A0A]/95 backdrop-blur-md py-4 border-b border-[#FAF8F5]/10'
            : 'bg-transparent py-7 md:py-8'
        } text-[#FAF8F5]`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <button
              id="mobile-menu-trigger"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden min-w-11 min-h-11 -ml-2 flex items-center justify-center text-[#FAF8F5] hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
              aria-label="Return to top"
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
            >
              <span className="font-serif text-xl sm:text-2xl tracking-[0.24em] font-normal uppercase text-[#FAF8F5] block">
                SAPPHIRE
              </span>

              <span className="text-[8px] tracking-[0.36em] uppercase text-[#D8CFBE]/65 font-sans block -mt-0.5">
                Editorial Study
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center space-x-10 text-[11px] tracking-[0.22em] uppercase font-sans font-medium text-[#FAF8F5]/65"
          >
            {navLinks.map((item) => (
              <button
                key={item.name}
                id={`nav-link-${item.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => onNavigateSection(item.target)}
                className="relative py-2 group transition-colors duration-300 hover:text-[#FAF8F5] focus:outline-none focus-visible:text-[#FAF8F5]"
              >
                <span>{item.name}</span>

                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FAF8F5] transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full" />
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <button
              id="search-button-trigger"
              type="button"
              onClick={onOpenSearch}
              aria-label="Search collection"
              className="min-w-11 min-h-11 flex items-center justify-center text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
            >
              <Search className="w-[17px] h-[17px] stroke-[1.5]" />
            </button>

            <button
              id="wishlist-button-trigger"
              type="button"
              onClick={onOpenWishlist}
              aria-label={`View wishlist, ${wishlistCount} ${
                wishlistCount === 1 ? 'item' : 'items'
              }`}
              className="group min-w-11 min-h-11 flex items-center justify-center gap-2 text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
            >
              <div className="relative">
                <Heart
                  className={`w-[17px] h-[17px] stroke-[1.5] ${
                    wishlistCount > 0
                      ? 'fill-[#D8CFBE] text-[#D8CFBE]'
                      : ''
                  }`}
                />

                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-3.5 h-3.5 px-1 rounded-full bg-[#D8CFBE] text-[#0B0A0A] text-[8px] font-sans font-medium flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>

              <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-[#FAF8F5]/65 group-hover:text-[#FAF8F5]">
                Wishlist
              </span>
            </button>

            <button
              id="bag-button-trigger"
              type="button"
              onClick={onOpenCart}
              aria-label={`View shopping bag, ${cartCount} ${
                cartCount === 1 ? 'item' : 'items'
              }`}
              className="group min-w-11 min-h-11 flex items-center justify-center gap-2 text-[#FAF8F5]/85 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
            >
              <div className="relative">
                <ShoppingBag className="w-[17px] h-[17px] stroke-[1.5]" />

                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-1 rounded-full bg-[#D8CFBE] text-[#0B0A0A] text-[8px] font-sans font-medium flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              <span className="hidden lg:inline text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-[#FAF8F5]/65 group-hover:text-[#FAF8F5]">
                Bag
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-50 bg-[#0B0A0A] flex flex-col justify-between p-6 sm:p-10 text-[#FAF8F5]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#FAF8F5]/10 pb-5">
              <span className="font-serif text-xl tracking-[0.25em] uppercase text-[#FAF8F5]">
                SAPPHIRE
              </span>

              <button
                id="close-mobile-menu"
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="min-w-11 min-h-11 flex items-center justify-center text-[#FAF8F5] hover:opacity-50 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation */}
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col space-y-5 my-auto py-8"
            >
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#D8CFBE]/60 font-sans">
                Curated Navigation
              </span>

              {navLinks.map((item, idx) => (
                <button
                  key={item.name}
                  id={`mobile-nav-link-${item.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => handleNavigate(item.target)}
                  className="group flex items-center justify-between text-left py-3 border-b border-[#FAF8F5]/10 text-2xl font-serif text-[#FAF8F5] focus:outline-none focus-visible:text-[#D8CFBE]"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] font-sans text-[#D8CFBE]/60 tracking-widest">
                      0{idx + 1}
                    </span>

                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-[#FAF8F5]/40 group-hover:text-[#FAF8F5] transition-colors" />
                </button>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-[#FAF8F5]/10 pt-5 grid grid-cols-3 gap-2 text-[10px] font-sans text-[#FAF8F5]/60 tracking-[0.12em] uppercase">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="min-h-11 text-left hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:text-[#FAF8F5]"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWishlist();
                }}
                className="min-h-11 text-center hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:text-[#FAF8F5]"
              >
                Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="min-h-11 text-right text-[#FAF8F5] font-medium hover:text-[#D8CFBE] transition-colors focus:outline-none focus-visible:text-[#D8CFBE]"
              >
                Bag {cartCount > 0 ? `(${cartCount})` : ''}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
