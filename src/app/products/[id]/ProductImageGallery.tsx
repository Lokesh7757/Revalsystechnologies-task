'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  image: string;
  title: string;
}

export default function ProductImageGallery({ image, title }: ProductImageGalleryProps) {
  // Since we only have 1 image from the static data, we simulate a gallery
  const [activeImage, setActiveImage] = useState(0);
  
  const images = [
    image,
    // Add slightly different query params to the unsplash URL to get a different image variation or just use the same
    image + '&var=2',
    image + '&var=3',
    image + '&var=4'
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 hide-scrollbar w-full lg:w-24 shrink-0">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative aspect-square w-20 lg:w-full flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
              activeImage === index ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#fbfbfd] border border-gray-100">
        <Image
          src={images[activeImage]}
          alt={title}
          fill
          priority
          className="object-contain p-8 animate-in fade-in duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
