'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const {addToCart} = useCart()

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(id, quantity);
      toast.success('Ürün sepete eklendi!');
      setQuantity(1); // Ekleme sonrası tekrar 1 yap
    } catch (error) {
      console.error(error);
      toast.error('Ürün sepete eklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={name}
        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hoverda gösterilecek alan */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
        {/* Quantity selector */}
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full p-2">
          <button
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <Minus size={18} />
          </button>
          <span className="font-bold text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Sepete Ekle butonu */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          <ShoppingCart size={20} />
          {loading ? 'Ekleniyor...' : 'Sepete Ekle'}
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-green-700 font-bold text-xl">{price.toFixed(2)} ₺</p>
      </div>
    </div>
  );
}
