import { useState } from "react";

const categories = [
  "Tüm Ürünler",
  "TÜRK KAHVESİ",
  "KAPSÜL KAHVE",
  "FİLTRE KAHVE",
  "ESPRESSO",
  "SALEP VE SICAK ÇİKOLATA",
  "HAZIR KAHVELER",
  "ŞURUPLAR",
];

export default function CategoryFilter({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
              selected === category
                ? "bg-emerald-100 border-emerald-600 text-emerald-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
