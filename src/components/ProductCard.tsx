'use client';

import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition">
      {/* Ürün Resmi */}
      <img
        src={imageUrl}
        alt={name}
        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover olduğunda blur efekti */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all" />

      {/* Hover'da çıkacak buton */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <button className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-2 text-white hover:bg-green-700">
          <ShoppingCart size={20} />
          Sepete Ekle
        </button>
      </div>

      {/* Ürün Bilgileri */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-green-700 font-bold text-xl">{price.toFixed(2)} ₺</p>
      </div>
    </div>
  );
}
