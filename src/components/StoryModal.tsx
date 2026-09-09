import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { EDITORIAL_COLLECTIONS } from '../data/product';

interface StoryModalProps {
  storyId: string | null;
  onClose: () => void;
  onGoToBag: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  storyId,
  onClose,
  onGoToBag,
}) => {
  const currentStory = EDITORIAL_COLLECTIONS.find((story) => story.id === storyId);

  useEffect(() => {
    if (!storyId || !currentStory) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [storyId, currentStory, onClose]);

  return (
    <AnimatePresence>
      {storyId && currentStory && (
        <div
          id="story-modal-container"
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-[3px]"
            aria-hidden="true"
          />

          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 md:p-10 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.985, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden bg-[#0E0D0D] text-[#FAF8F5] shadow-2xl border border-[#FAF8F5]/10"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close lookbook"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 flex items-center justify-center text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Image */}
                <div className="md:col-span-6 bg-[#141312] aspect-[3/4] overflow-hidden">
                  <picture className="w-full h-full block">
                    {currentStory.webpSrcSet ? (
                      <source
                        type="image/webp"
                        srcSet={currentStory.webpSrcSet}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : currentStory.webpUrl ? (
                      <source
                        type="image/webp"
                        srcSet={currentStory.webpUrl}
                      />
                    ) : null}

                    {currentStory.jpgSrcSet ? (
                      <source
                        type="image/jpeg"
                        srcSet={currentStory.jpgSrcSet}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : null}

                    <img
                      src={currentStory.webpUrl || currentStory.image}
                      alt={currentStory.title}
                      width={currentStory.width || 896}
                      height={currentStory.height || 1200}
                      decoding="async"
                      className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.92]"
                    />
                  </picture>
                </div>

                {/* Content */}
                <div className="md:col-span-6 flex flex-col justify-center p-7 sm:p-10 md:p-12">
                  <div className="space-y-3">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/65 font-medium block">
                      {currentStory.edition} · {currentStory.category}
                    </span>

                    <h3
                      id="story-modal-title"
                      className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal leading-tight pr-8"
                    >
                      {currentStory.title}
                    </h3>
                  </div>

                  <div className="w-10 h-px bg-[#D8CFBE]/50 my-6" />

                  <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/72 leading-relaxed max-w-md">
                    {currentStory.description}
                  </p>

                  <div className="mt-7 pt-5 border-t border-[#FAF8F5]/10">
                    <span className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#D8CFBE]/70 block mb-2">
                      Editorial Note
                    </span>

                    <p className="text-xs font-sans font-light text-[#FAF8F5]/55 leading-relaxed max-w-md">
                      A considered styling study built around proportion, texture,
                      and the quiet contrast of the collection.
                    </p>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onGoToBag();
                      }}
                      className="min-h-11 px-5 sm:px-6 py-3 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.22em] uppercase font-sans font-medium inline-flex items-center gap-2.5 hover:bg-[#D8CFBE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8CFBE]/70"
                    >
                      <span>Examine Hero Object</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
