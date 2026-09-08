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
            className="fixed inset-0 bg-[#0E0D0D]/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 md:p-10 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#FAF9F5] shadow-2xl p-6 sm:p-10 md:p-12 border border-[#0E0D0D]/10 text-[#0E0D0D]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close lookbook"
                className="absolute top-6 right-6 p-2 text-[#0E0D0D] hover:opacity-60 transition-opacity z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Image */}
                <div className="md:col-span-6 bg-[#EAE6DF] overflow-hidden aspect-[3/4]">
                  <img
                    src={currentStory.image}
                    alt={currentStory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs tracking-[0.25em] uppercase font-sans text-[#0E0D0D]/50 font-medium block">
                      {currentStory.edition} · {currentStory.category}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#0E0D0D] font-normal leading-tight">
                      {currentStory.title}
                    </h3>
                  </div>

                  <p className="text-[#232220]/80 text-sm sm:text-base font-sans font-light leading-relaxed">
                    {currentStory.description}
                  </p>

                  <div className="p-4 bg-[#F3F0EA] border-l-2 border-[#0E0D0D] space-y-1 text-xs font-sans">
                    <span className="font-medium text-[#0E0D0D] tracking-wide block">
                      Archival Note
                    </span>
                    <p className="text-[#0E0D0D]/70">
                      Designed to be paired alongside the NOIR STRUCTURE BAG for a seamless
                      sculptural daytime-to-evening aesthetic.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onGoToBag();
                      }}
                      className="px-6 py-3.5 bg-[#0E0D0D] text-[#FAF9F5] text-xs tracking-[0.2em] uppercase font-sans font-medium flex items-center gap-3 hover:bg-[#232220] transition-colors"
                    >
                      <span>Examine Hero Piece</span>
                      <ArrowRight className="w-4 h-4" />
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
