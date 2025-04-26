"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { fetchProducts } from "@/services/productService";

export default function DashboardPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setFeaturedProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 text-green-900">
      <main className="px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Öne Çıkan Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-4 rounded-xl shadow-md border border-green-100"
                >
                  <div className="relative h-40 w-full mb-3 rounded-md overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-green-700 text-sm mt-1">{product.price}</p>
                  {product.discounted && (
                    <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      İndirimli
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
      </main>
    </div>
  );
}
