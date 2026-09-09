import React, { useEffect, useRef, useState } from 'react';
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

const CART_STORAGE_KEY = 'sapphire_bag_cart';
const WISHLIST_STORAGE_KEY = 'sapphire_bag_wishlist';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) return [];

      return parsed.filter(
        (item): item is CartItem =>
          item &&
          typeof item === 'object' &&
          item.product &&
          typeof item.product.id === 'string' &&
          typeof item.quantity === 'number' &&
          item.quantity > 0
      );
    } catch {
      return [];
    }
  });

  const [isInWishlist, setIsInWishlist] = useState<boolean>(() => {
    try {
      return localStorage.getItem(WISHLIST_STORAGE_KEY) === 'true';
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

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Unable to save cart:', error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, String(isInWishlist));
    } catch (error) {
      console.error('Unable to save wishlist:', error);
    }
  }, [isInWishlist]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToastMessage(message);

    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3000);
  };

  const handleAddToCart = (quantity: number = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === NOIR_STRUCTURE_BAG.id
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === NOIR_STRUCTURE_BAG.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      }

      return [
        ...prev,
        {
          product: NOIR_STRUCTURE_BAG,
          quantity: safeQuantity,
          selectedColor: NOIR_STRUCTURE_BAG.color,
        },
      ];
    });

    showToast(
      `${safeQuantity} × ${NOIR_STRUCTURE_BAG.name} added to your bag`
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const safeQuantity = Math.floor(quantity);

    if (safeQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: safeQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );

    showToast('Item removed from bag');
  };

  const handleToggleWishlist = () => {
    setIsInWishlist((prev) => {
      const next = !prev;

      showToast(
        next ? 'Saved to wishlist' : 'Removed from wishlist'
      );

      return next;
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const cartTotalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleOpenCheckout = () => {
    if (cart.length === 0) {
      showToast('Your bag is empty');
      return;
    }

    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0A0A] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#FAF8F5] selection:text-[#0B0A0A]">
      <Navbar
        cartCount={cartTotalItems}
        wishlistCount={isInWishlist ? 1 : 0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1 w-full">
        <HeroSection
          onExploreClick={() => scrollToSection('section-collections')}
          onHeroProductClick={() =>
            scrollToSection('section-product-detail')
          }
        />

        <CollectionEditorial
          onSelectStory={(storyId) => setActiveStoryId(storyId)}
        />

        <ProductDetailSection
          product={NOIR_STRUCTURE_BAG}
          isInWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />

        <CraftsmanshipSection />

        <DiscoverCTASection
          onExploreCollection={() =>
            scrollToSection('section-collections')
          }
          onAcquireBag={() =>
            scrollToSection('section-product-detail')
          }
        />
      </main>

      <Footer onNavigateSection={scrollToSection} />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onGoToCheckout={handleOpenCheckout}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={() => {
          setIsSearchOpen(false);
          scrollToSection('section-product-detail');
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        isInWishlist={isInWishlist}
        product={NOIR_STRUCTURE_BAG}
        onClose={() => setIsWishlistOpen(false)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={() => {
          handleAddToCart(1);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={() => {
          setCart([]);
          setIsCheckoutOpen(false);
        }}
      />

      <StoryModal
        storyId={activeStoryId}
        onClose={() => setActiveStoryId(null)}
        onGoToBag={() => {
          setActiveStoryId(null);
          scrollToSection('section-product-detail');
        }}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)] px-5 py-2.5 bg-[#141312] text-[#FAF8F5] text-[10px] font-sans tracking-[0.2em] uppercase shadow-2xl border border-[#FAF8F5]/20 flex items-center gap-2.5"
        >
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-[#D8CFBE] shrink-0"
          />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
