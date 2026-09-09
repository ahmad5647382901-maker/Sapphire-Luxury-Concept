import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NewEditionSection } from './components/NewEditionSection';
import { CollectionEditorial } from './components/CollectionEditorial';
import { ProductDetailSection } from './components/ProductDetailSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ProductStorySection } from './components/ProductStorySection';
import { DiscoverCTASection } from './components/DiscoverCTASection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { StoryModal } from './components/StoryModal';

import {
  NOIR_STRUCTURE_BAG,
  PRODUCTS,
  EDITORIAL_COLLECTIONS,
} from './data/product';

import { CartItem, Product } from './types';

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

  const [selectedProduct, setSelectedProduct] =
    useState<Product>(NOIR_STRUCTURE_BAG);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        String(isInWishlist)
      );
    } catch {
      // Ignore storage errors
    }
  }, [isInWishlist]);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);

    window.requestAnimationFrame(() => {
      const element = document.getElementById(
        'section-product-detail'
      );

      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleAddProductToCart = (
    product: Product,
    quantity: number = 1
  ) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          product,
          quantity,
          selectedColor: product.color,
        },
      ];
    });

    setToast(`${product.name} added to bag`);
  };

  const handleAddToCart = (quantity: number = 1) => {
    handleAddProductToCart(
      selectedProduct,
      quantity
    );
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      setCart((currentCart) =>
        currentCart.filter(
          (item) => item.product.id !== productId
        )
      );

      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const handleRemoveFromCart = (
    productId: string
  ) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.product.id !== productId
      )
    );
  };

  const handleToggleWishlist = () => {
    setIsInWishlist((current) => {
      const next = !current;

      setToast(
        next
          ? `${selectedProduct.name} saved to wishlist`
          : `${selectedProduct.name} removed from wishlist`
      );

      return next;
    });
  };

  const handleNavigateSection = (
    sectionId: string
  ) => {
    const element =
      document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleSelectStory = (
    storyId: string
  ) => {
    setActiveStoryId(storyId);
  };

  const activeStory = EDITORIAL_COLLECTIONS.find(
    (story) => story.id === activeStoryId
  );

  const handleGoToProduct = () => {
    setActiveStoryId(null);

    handleSelectProduct(
      NOIR_STRUCTURE_BAG
    );
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setToast('Order received successfully');
  };

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f2eee7] text-[#171717]">

      <Navbar
        cartCount={cartCount}
        wishlistCount={
          isInWishlist ? 1 : 0
        }
        onOpenCart={() =>
          setIsCartOpen(true)
        }
        onOpenSearch={() =>
          setIsSearchOpen(true)
        }
        onOpenWishlist={() =>
          setIsWishlistOpen(true)
        }
        onNavigateSection={
          handleNavigateSection
        }
      />

      <main>

        <HeroSection
          onExploreClick={() =>
            handleNavigateSection(
              'section-new-edition'
            )
          }
          onHeroProductClick={
            handleGoToProduct
          }
        />

        <NewEditionSection
          onExplore={() =>
            handleNavigateSection(
              'section-collections'
            )
          }
        />

        <CollectionEditorial
          onSelectStory={
            handleSelectStory
          }
        />

        <ProductStorySection
          onGoToProduct={
            handleGoToProduct
          }
          onQuickAdd={() =>
            handleAddProductToCart(
              NOIR_STRUCTURE_BAG
            )
          }
        />

        <ProductDetailSection
          product={selectedProduct}
          onAddToCart={
            handleAddToCart
          }
          onToggleWishlist={
            handleToggleWishlist
          }
          isInWishlist={
            isInWishlist
          }
        />

        <CraftsmanshipSection />

        <DiscoverCTASection
          onExploreCollection={() =>
            handleNavigateSection(
              'section-collections'
            )
          }
          onAcquireBag={
            handleGoToProduct
          }
        />

      </main>

      <Footer
        onNavigateSection={
          handleNavigateSection
        }
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() =>
          setIsCartOpen(false)
        }
        onUpdateQuantity={
          handleUpdateQuantity
        }
        onRemoveItem={
          handleRemoveFromCart
        }
        onGoToCheckout={
          handleGoToCheckout
        }
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() =>
          setIsSearchOpen(false)
        }
        onSelectProduct={
          handleSelectProduct
        }
        onSelectStory={
          handleSelectStory
        }
        products={PRODUCTS}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        isInWishlist={
          isInWishlist
        }
        product={selectedProduct}
        onClose={() =>
          setIsWishlistOpen(false)
        }
        onToggleWishlist={
          handleToggleWishlist
        }
        onAddToCart={() => {
          handleAddProductToCart(
            selectedProduct
          );

          setIsWishlistOpen(false);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart}
        onClose={() =>
          setIsCheckoutOpen(false)
        }
        onOrderComplete={
          handleOrderComplete
        }
      />

      <StoryModal
        story={activeStory}
        onClose={() =>
          setActiveStoryId(null)
        }
        onGoToBag={
          handleGoToProduct
        }
      />

      {toast && (
        <div
          className="
            fixed
            bottom-6
            left-1/2
            z-[100]
            -translate-x-1/2
            rounded-full
            bg-[#171717]
            px-5
            py-3
            text-xs
            tracking-[0.12em]
            text-[#f2eee7]
            shadow-2xl
          "
        >
          {toast}
        </div>
      )}

    </div>
  );
}
