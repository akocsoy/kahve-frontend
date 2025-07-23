"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  id: string;
};

export function ProductCard({ name, price, image, id }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleViewDetails = () => {
      router.push(`/products/${id}`)
  };

  return (
    <div
      className="relative w-full h-[18rem] sm:h-[20rem] rounded-xl overflow-hidden shadow-md group transition-all duration-300 flex flex-col justify-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center transition-all duration-300 group-hover:blur-sm"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Ürün adı ve fiyat */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-center px-4">
        <h2 className="text-white font-bold text-lg sm:text-xl">{name}</h2>
        <p className="text-white text-sm sm:text-base font-semibold mt-1">
          {price.toFixed(2)} ₺
        </p>
      </div>

      {/* Hover olduğunda ortada açılan overlay */}
      <div
        className={clsx(
          "absolute inset-0 z-20 flex items-center justify-center",
          "transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={clsx(
            "bg-black/60 rounded-full p-4 sm:p-5",
            "transition-transform duration-500 ease-in-out",
            hovered ? "scale-100" : "scale-0"
          )}
        >
          <button
            onClick={handleViewDetails}
            className="group flex items-center gap-1 text-white font-semibold border border-white/40 rounded-full px-4 py-2 text-xs sm:text-sm transition-all duration-300 hover:bg-white/10"
          >
            Detaylar
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 translate-y-px group-hover:rotate-45"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
