"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

type InfoCardProps = {
  title: string;
  description: string;
  image: string;
  size?: "sm" | "md"; // boyut prop'u
};


export default function InfoCard({
  title,
  description,
  image,
  size = "md",
}: InfoCardProps) {

const [btnHovered, setBtnHovered] = useState(false);
  const sizeClasses = {
    md: "h-[20rem] sm:h-[26rem]",
    sm: "h-[16rem] sm:h-[20rem]",
  };

  const titleSize = {
    md: "text-2xl sm:text-3xl",
    sm: "text-lg sm:text-xl",
  };

  const descTextSize = {
    md: "text-sm sm:text-base",
    sm: "text-xs sm:text-sm",
  };

  return (
    <div
      className={clsx(
        "relative w-full rounded-xl overflow-hidden shadow-md group transition-all duration-300 flex flex-col justify-end",
        sizeClasses[size]
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-all duration-300 group-hover:blur-sm"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center px-4">
        <h2 className={clsx("text-white font-bold", titleSize[size])}>
          {title}
        </h2>
      </div>

      {/* Description + Button */}
      <div
        className={clsx(
          "relative z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-black/60 text-white px-4 py-5 rounded-t-xl flex flex-col justify-between h-1/2",
          size === "sm" && "py-3"
        )}
      >
        <p className={clsx(descTextSize[size], "mb-10")}>{description}</p>

        <div className="flex justify-end relative">
          <button className="group absolute bottom-3 right-4 flex items-center gap-1 text-white font-semibold border border-green-500 rounded-md px-3 py-1 text-sm sm:text-base transition-all duration-300 hover:bg-green-600/10"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}>
            Devamını oku
            <ArrowUpRight
              size={16}
              className={clsx(
                "transition-transform duration-300 translate-y-px",
                btnHovered && "rotate-[45deg]"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
