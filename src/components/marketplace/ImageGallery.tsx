import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage(prev => (prev === null || prev === images.length - 1) ? 0 : prev + 1);
  const prevImage = () => setSelectedImage(prev => (prev === null || prev === 0) ? images.length - 1 : prev - 1);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openModal(index)}
            className="relative aspect-video rounded-lg overflow-hidden group"
          >
            <img
              src={image}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <img
            src={images[selectedImage]}
            alt={`Screenshot ${selectedImage + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageGallery;