"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type GalleryProps = {
  images: string[];
  productName: string;
};

export default function Gallery({ images, productName }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getValidImage = (src: string) => {
    const decoded = decodeURIComponent(src ?? "");
    return decoded?.trim() !== ""
      ? decoded
      : "/images/placeholder/placeholder.jpeg";
  };

  if (!images || images.length === 0) {
    images = ["/images/placeholder/placeholder.jpeg"];
  }

  return (
    <div className="w-full">
      {/* Büyük görsel */}
      <div className="w-full aspect-[4/3] relative mb-4 rounded-xl overflow-hidden">
        <Image
          src={getValidImage(images[activeIndex])}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail'lar */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className={cn(
              "relative w-20 h-20 rounded-md overflow-hidden border-2 cursor-pointer",
              index === activeIndex
                ? "border-green-600"
                : "border-transparent hover:border-gray-300"
            )}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={getValidImage(img)}
              alt={`${productName} preview ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
