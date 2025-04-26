"use client"

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { fetchCart } from '../services/cartService'
interface CartItem {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
}

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const getCart = async () => {
      try {
        const res = await fetchCart();
        const data = await res.data
        setCartItems(data.items || []);
      } catch (err) {
        console.error('Sepet alınamadı:', err);
      }
    };
    getCart();
  }, [isOpen]);

  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Sepetim</h2>
        <button onClick={onClose}><X /></button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-60px)]">
        {cartItems.length === 0 && <p>Sepetiniz boş</p>}
        {cartItems.map(({ product, quantity }) => (
          <div key={product._id} className="flex items-center space-x-3">
            <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded" />
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">x{quantity} — ₺{product.price * quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}