import React, { useState, useEffect } from 'react';
import { PAGE_CONTENTS, PageContent } from '../pageContent';

interface PageModalProps {
  isOpen: boolean;
  pageName: string | null;
  onClose: () => void;
}

const PageModal: React.FC<PageModalProps> = ({ isOpen, pageName, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, onClose]);
  
  if (!isOpen && !isVisible) {
    return null;
  }

  if (!pageName || !PAGE_CONTENTS[pageName]) {
    return null;
  }

  const content: PageContent = PAGE_CONTENTS[pageName];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % content.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + content.images.length) % content.images.length);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      {/* Close Button - Outside modal for better z-index control */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-[9999] pointer-events-auto text-black/60 hover:text-black text-3xl font-light transition-colors hover:scale-110"
        aria-label="Close"
        style={{ cursor: 'pointer' }}
      >
        ✕
      </button>

      <div
        className={`relative w-11/12 h-5/6 bg-white/95 rounded-lg shadow-2xl overflow-hidden flex transition-all duration-700 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Content Section */}
        <div className="flex-1 p-12 overflow-y-auto flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl font-light text-black mb-2">{content.title}</h1>
            <h2 className="text-sm font-light text-black/60 tracking-widest">{content.subtitle}</h2>
          </div>

          <div className="flex-1">
            <p className="text-sm font-light leading-relaxed text-black/80 mb-8">
              {content.description}
            </p>
          </div>

          <div className="text-xs text-black/40 font-light tracking-wide">
            Press ESC to close
          </div>
        </div>

        {/* Right Gallery Section */}
        <div className="w-1/2 bg-black/5 relative flex flex-col items-center justify-center p-8 pt-16">
          <div className="relative w-full h-full flex items-center justify-center group">
            <img
              src={`${content.images[currentImageIndex]}?w=800&q=80`}
              alt={`${content.title} - Image ${currentImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />

            {/* Navigation Arrows */}
            {content.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 text-black/40 hover:text-black text-2xl font-light transition-all opacity-0 group-hover:opacity-100"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 text-black/40 hover:text-black text-2xl font-light transition-all opacity-0 group-hover:opacity-100"
                >
                  →
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 text-xs text-black/40 font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                  {currentImageIndex + 1} / {content.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageModal;
