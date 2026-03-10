import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectImages } from '@/public/utils/getImages';

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when lightbox opens with a specific image
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      // Prevent scrolling on body when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  // Use createPortal to render the lightbox at the end of the document body.
  // This ensures it sits on top of all other content, regardless of parent stacking contexts (z-index) or overflow settings.
  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white hover:scale-110 transition-all p-2 rounded-full bg-black/50 hover:bg-white/20 z-50"
      >
        <X size={32} />
      </button>

      {/* Navigation Buttons (Only if multiple images) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 transition-all p-3 rounded-full bg-black/50 hover:bg-white/20 z-50 group"
          >
            <ChevronLeft size={40} className="group-active:-translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 transition-all p-3 rounded-full bg-black/50 hover:bg-white/20 z-50 group"
          >
            <ChevronRight size={40} className="group-active:translate-x-1 transition-transform" />
          </button>
        </>
      )}

      {/* Image Container */}
      <div 
        className="relative max-w-7xl max-h-[90vh] w-full h-full p-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
      >
        {currentIndex}
        {images[currentIndex]}
        <img 
          src={getProjectImages(images[currentIndex])} 
          alt={`Project view ${currentIndex + 1}`} 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-zoom-in select-none"
        />
        
        {/* Counter */}
        {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm font-bold backdrop-blur-md border border-white/10">
                {currentIndex + 1} / {images.length}
            </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;