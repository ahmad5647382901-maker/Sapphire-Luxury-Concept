import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  NOIR_STRUCTURE_BAG,
  EDITORIAL_COLLECTIONS,
} from '../data/product';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectStory?: (storyId: string) => void;
  products?: Product[];
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectStory,
  products = [NOIR_STRUCTURE_BAG],
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const trimmedQuery = query.trim().toLowerCase();

  const productMatches = useMemo(() => {
    if (!trimmedQuery) return [];

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.tagline,
        product.description,
        product.color,
        product.category,
        product.collection,
        product.type,
        product.badge,
        ...product.materials,
        ...product.details,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(trimmedQuery);
    });
  }, [products, trimmedQuery]);

  const storyMatches = useMemo(() => {
    if (!trimmedQuery) return [];

    return EDITORIAL_COLLECTIONS.filter((story) => {
      const searchableText = [
        story.title,
        story.subtitle,
        story.edition,
        story.category,
        story.description,
        story.label,
        story.year,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(trimmedQuery);
    });
  }, [trimmedQuery]);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured),
    [products]
  );

  const handleProductSelect = (product: Product) => {
    onClose();
    onSelectProduct(product);
  };

  const handleStorySelect = (storyId: string) => {
    onClose();
    onSelectStory?.(storyId);
  };

  const displayedProducts = trimmedQuery
    ? productMatches
    : featuredProducts;

  const hasResults =
    productMatches.length > 0 || storyMatches.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion
