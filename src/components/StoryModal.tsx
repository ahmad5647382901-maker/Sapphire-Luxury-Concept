import React from 'react';
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
  const currentStory = EDITORIAL_COLLECTIONS.find((s) => s.id === storyId);

  return (
    <AnimatePresence>
      {storyId && currentStory && (
        <div id="story-modal-container" className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 md:p-10 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#0E0D0D] text-[#FAF8F5] shadow-2xl p-6 sm:p-10 md:p-12 border border-[#FAF8F5]/10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close lookbook"
                className="absolute top-6 right-6 p-1.5 text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Image */}
                <div className="md:col-span-6 bg-[#141312] border border-[#FAF8F5]/10 overflow-hidden aspect-[3/4]">
                  <picture className="w-full h-full block">
                    {currentStory.webpSrcSet ? (
                      <source
                        type="image/webp"
                        srcSet={currentStory.webpSrcSet}
                        sizes="(max-width: 768px) 100vw, 450px"
                      />
                    ) : currentStory.webpUrl ? (
                      <source type="image/webp" srcSet={currentStory.webpUrl} />
                    ) : null}
                    {currentStory.jpgSrcSet ? (
                      <source
                        type="image/jpeg"
                        srcSet={currentStory.jpgSrcSet}
                        sizes="(max-width: 768px) 100vw, 450px"
                      />
                    ) : null}
                    <img
                      src={currentStory.webpUrl || currentStory.image}
                      alt={currentStory.title}
                      width={currentStory.width || 896}
                      height={currentStory.height || 1200}
                      decoding="async"
                      className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.9]"
                    />
                  </picture>
                </div>

                {/* Content */}
                <div className="md:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/70 font-medium block">
                      {currentStory.edition} · {currentStory.category}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal leading-tight">
                      {currentStory.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/75 leading-relaxed">
                    {currentStory.description}
                  </p>

                  <div className="p-4 bg-[#141312] border-l border-[#D8CFBE] space-y-1 text-xs font-sans">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#D8CFBE] block">
                      Archival Harmony
                    </span>
                    <p className="text-[#FAF8F5]/70 text-xs font-light">
                      Designed to be styled with the NOIR STRUCTURE BAG for a cohesive
                      monochromatic day-to-gala presence.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onGoToBag();
                      }}
                      className="px-6 py-3 bg-[#FAF8F5] text-[#0B0A0A] text-[10px] tracking-[0.22em] uppercase font-sans font-medium flex items-center gap-2.5 hover:bg-[#D8CFBE] transition-colors"
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
