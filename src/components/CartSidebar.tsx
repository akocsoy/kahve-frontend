"use client";

import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
interface CartItem {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
}

export default function CartSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter()
  const { addToCart, removeFromCart, clearCart, cartItems, refreshCart } = useCart();
  useEffect(() => {
    if (!isOpen) return;

    const getCart = async () => {
      try {
        await refreshCart()
      } catch (err) {
        console.error("Sepet alınamadı:", err);
      }
    };
    getCart();
  }, [isOpen]);

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      toast.error("Sepet temizlenirken bir hata oluştu.");
    }
  };
  const goToCartPage = () => {
    onClose(); // sidebar'ı kapat
    router.push("/cart"); // sepete yönlendir
  };
  const handleIncreaseQuantity = async (product: any) => {
    try {
      await addToCart(product._id,1);
      await refreshCart(); // Sepeti güncelle
      toast.success("Ürün adeti artırıldı!");
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu.");
    }
  };

  const handleDecreaseQuantity = async (product: any) => {
    try {
      await addToCart(product._id, -1);
      await refreshCart(); // Sepeti güncelle
      toast.success("Ürün adeti azaltıldı!");
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu.");
    }
  };

  const handleRemoveItem = async (product: any) => {
    try {
      await removeFromCart(product._id);
      await refreshCart()
      toast.success("Ürün sepetten çıkarıldı.");
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Sepetim</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-60px)]">
        {cartItems.length == 0 ? (
          <p>
            Sepetiniz boş <br /> Hemen alışverişe başlayalım
          </p>
        ) : (
          cartItems?.map(({ product, quantity }) => (
            <div
              key={product?._id}
              className="flex items-center justify-between p-2"
            >
              <div>
                <p className="font-semibold">{product?.name}</p>
                <p className="text-sm text-gray-600">{quantity} adet</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecreaseQuantity(product)}
                  className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl"
                >
                  -
                </button>

                <span className="w-6 text-center">{quantity}</span>

                <button
                  onClick={() => handleIncreaseQuantity(product)}
                  className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl"
                >
                  +
                </button>

                {/* Çöp Kutusu */}
                <button
                  onClick={() => handleRemoveItem(product)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div className="p-4 border-t mt-auto">
            <Button onClick={goToCartPage} className="w-full" variant="default">
              Sepete Git
            </Button>
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md mt-4"
              onClick={handleClearCart}
            >
              Sepeti Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
