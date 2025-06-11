// app/products/ProductModal.tsx

'use client';

import { useEffect } from 'react';

export default function ProductModal({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  // Escape tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">{product.name}</h2>

        <p className="text-gray-600 mb-4 text-center">{product.description}</p>

        <p className="text-xl font-semibold text-blue-600 text-center mb-6">
          {product.price} ₺
        </p>

        {product.images?.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img: string, idx: number) => (
              <img
                key={idx}
                src={`/slider/${img}`}
                alt={product.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-200 shadow"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
