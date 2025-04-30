'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchCart,
  addToCart as addToCartService,
  removeItem as removeFromCartService,
  clearCart as clearCartService,
} from '@/services/cartService';

type CartItem = {
  product: any; // Tipi özelleştirebilirsin
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string, quantity?: number) => Promise<void>;
  clearCart: () => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = async () => {
    try {
      const cart = await fetchCart();
      setCartItems(cart.items || []);
    } catch (error) {
      console.error('Sepet verisi alınamadı:', error);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      await addToCartService({ productId, quantity });
      await refreshCart();
    } catch (error) {
      console.error('Ürün sepete eklenemedi:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await removeFromCartService(productId);
      await refreshCart();
    } catch (error) {
      console.error('Ürün sepetten silinemedi:', error);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartService();
      await refreshCart();
    } catch (error) {
      console.error('Sepet temizlenemedi:', error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        refreshCart,
        addToCart,
        removeFromCart,
        clearCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
