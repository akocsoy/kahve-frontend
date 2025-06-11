'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Sepetiniz</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Sepetiniz boş.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border rounded-lg p-4 gap-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-gray-500 text-sm">{item.product.price} ₺</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <button
                    onClick={() => addToCart(item.product._id, -1)}
                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-md font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.product._id)}
                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-xl font-bold text-center sm:text-left">
              Toplam: {total.toFixed(2)} ₺
            </div>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
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
