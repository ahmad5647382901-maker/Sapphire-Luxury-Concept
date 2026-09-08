import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CollectionEditorial } from './components/CollectionEditorial';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ProductDetailSection } from './components/ProductDetailSection';
import { DiscoverCTASection } from './components/DiscoverCTASection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoryModal } from './components/StoryModal';
import { NOIR_STRUCTURE_BAG } from './data/product';
import { CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sapphire_bag_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isInWishlist, setIsInWishlist] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sapphire_bag_wishlist');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sapphire_bag_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sapphire_bag_wishlist', String(isInWishlist));
    } catch (e) {
      console.error(e);
    }
  }, [isInWishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === NOIR_STRUCTURE_BAG.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === NOIR_STRUCTURE_BAG.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product: NOIR_STRUCTURE_BAG,
          quantity,
          selectedColor: NOIR_STRUCTURE_BAG.color,
        },
      ];
    });

    showToast(`Added ${quantity} × ${NOIR_STRUCTURE_BAG.name} to your bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from shopping bag');
  };

  const handleToggleWishlist = () => {
    setIsInWishlist((prev) => {
      const next = !prev;
      showToast(next ? 'Saved to your private wishlist' : 'Removed from wishlist');
      return next;
    });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#0B0A0A] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#FAF8F5] selection:text-[#0B0A0A]">
      {/* Top Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        wishlistCount={isInWishlist ? 1 : 0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Editorial Chapters */}
      <main className="flex-1 w-full">
        {/* Chapter 01 — Campaign Opening */}
        <HeroSection
          onExploreClick={() => scrollToSection('section-collections')}
          onHeroProductClick={() => scrollToSection('section-product-detail')}
        />

        {/* Chapter 02 — Curated Series / Lookbook */}
        <CollectionEditorial
          onSelectStory={(storyId) => setActiveStoryId(storyId)}
        />

        {/* Chapter 03 — The Central Object Study: NOIR STRUCTURE BAG */}
        <ProductDetailSection
          product={NOIR_STRUCTURE_BAG}
          isInWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />

        {/* Chapter 04 — Atelier Craftsmanship Detail */}
        <CraftsmanshipSection />

        {/* Chapter 05 — The Epilogue & Atelier Dispatch */}
        <DiscoverCTASection
          onExploreCollection={() => scrollToSection('section-collections')}
          onAcquireBag={() => scrollToSection('section-product-detail')}
        />
      </main>

      {/* FOOTER */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onGoToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={() => scrollToSection('section-product-detail')}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        isInWishlist={isInWishlist}
        product={NOIR_STRUCTURE_BAG}
        onClose={() => setIsWishlistOpen(false)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={() => {
          handleAddToCart(1);
          setIsCartOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={() => {
          setCart([]);
        }}
      />

      {/* Story Lookbook Modal */}
      <StoryModal
        storyId={activeStoryId}
        onClose={() => setActiveStoryId(null)}
        onGoToBag={() => scrollToSection('section-product-detail')}
      />

      {/* Floating Direct Project ZIP Download Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          id="direct-zip-download-button"
          href="/sapphire-luxury-concept.zip"
          download="sapphire-luxury-concept.zip"
          className="flex items-center gap-2 px-3.5 py-2 bg-[#141312] text-[#FAF8F5] text-[10px] font-sans tracking-[0.2em] uppercase shadow-2xl border border-[#FAF8F5]/20 hover:bg-[#232220] hover:border-[#D8CFBE]/60 transition-all"
          title="Download complete project source ZIP"
        >
          <svg className="w-3 h-3 text-[#D8CFBE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export ZIP</span>
        </a>
      </div>

      {/* Floating Micro-Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-[#141312] text-[#FAF8F5] text-[10px] font-sans tracking-[0.2em] uppercase shadow-2xl border border-[#FAF8F5]/20 flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D8CFBE]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
