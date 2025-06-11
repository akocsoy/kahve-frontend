"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchProducts } from "@/services/productService";
import HeroSlider from "@/components/HeroSlider";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
export default function DashboardPage() {
  interface Product {
    name:string
    _id:string
    image:string
    price:number
  }
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const router = useRouter()
  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setFeaturedProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#fefcf9] text-[#4b2e2e] font-sans">
      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] sm:h-[75vh] bg-cover bg-center"
        style={{ backgroundImage: `url('/images/hero-coffee.jpg')` }}
      >
        <div className="h-full bg-[#fefcf9] text-[#4b2e2e]">
          <HeroSlider />
          {/* Diğer içerikler */}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-10 px-6 text-center bg-[#fff8f1]">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          Haftanın Kampanyası
        </h2>
        <p className="text-md sm:text-lg mb-4">2 al 1 öde fırsatını kaçırma!</p>
        <button className="bg-[#4b2e2e] text-white px-5 py-2 rounded-full hover:bg-[#3a211f] transition">
          <a href="products">Kampanyaları Gör</a>
        </button>
      </section>

      {/* Featured Products */}
      <main className="px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Öne Çıkan Ürünler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              // <motion.div
              //   key={product.id}
              //   whileHover={{ scale: 1.03 }}
              //   className="bg-white p-4 rounded-2xl shadow-lg border border-[#ebdfd0] transition"
              // >
              //   <div className="relative h-48 w-full mb-3 rounded-md overflow-hidden">
              //     <Image
              //       src={product.image}
              //       alt={product.name}
              //       fill
              //       className="object-cover"
              //     />
              //   </div>
              //   <h3 className="text-xl font-semibold">{product.name}</h3>
              //   <p className="text-[#8a5c2f] mt-1 text-base">{product.price}</p>
              //   {product.discounted && (
              //     <span className="inline-block mt-2 text-xs bg-[#fff3d4] text-[#7c4b17] px-2 py-1 rounded-full">
              //       İndirimli
              //     </span>
              //   )}
              // </motion.div>
              <ProductCard key={product._id} id={product._id} name={product.name} price={product.price} imageUrl={product.image} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
