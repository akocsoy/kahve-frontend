'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button'; // Eğer button kullanıyorsan, yoksa tailwind btn yap
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Sepetiniz</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Sepetiniz boş.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product._id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-medium">{item.product.name}</h2>
                    <p className="text-gray-500">{item.product.price}₺</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => addToCart(item.product._id, -1)}
                    className="p-1 bg-gray-200 rounded-full"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-md font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.product._id)}
                    className="p-1 bg-gray-200 rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <div className="text-xl font-semibold">Toplam: {total.toFixed(2)} ₺</div>
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="outline">Alışverişe Devam Et</Button>
              </Link>
              <Button onClick={() => clearCart()} variant="destructive">
                Sepeti Temizle
              </Button>
              <Button>Satın Al</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
