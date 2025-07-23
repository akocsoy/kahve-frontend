"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchProducts } from "@/services/productService";
import HeroSlider from "@/components/HeroSlider";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import InfoCard from "@/components/ui/InfoCard";
import Slider from "react-slick";
import useWindowSize from "@/lib/hooks/useWindowSize";

export default function DashboardPage() {
  interface Product {
    name: string;
    _id: string;
    image: string;
    price: number;
  }

  const { width } = useWindowSize();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const router = useRouter();
  const cardSize = width < 640 ? "sm" : "md";

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setFeaturedProducts(data);
    }
    loadProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: featuredProducts.length > 3,
    speed: 500,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="min-h-screen text-[#4b2e2e] font-sans px-4 sm:px-8 lg:px-16">
      {/* Info Cards */}
      <div className="flex flex-col sm:flex-row gap-6 mt-7">
        <InfoCard
          title="Yeni Ürünler Geldi!"
          description="Kahve dünyamızda yepyeni tatlar sizleri bekliyor. Denemek ister misiniz?"
          image="/images/kahve.jpg"
          size={cardSize}
        />
        <InfoCard
          title="Yeni Ürünler Geldi!"
          description="Kahve dünyamızda yepyeni tatlar sizleri bekliyor. Denemek ister misiniz?"
          image="/images/kahve.jpg"
          size={cardSize}
        />
        <InfoCard
          title="Yeni Ürünler Geldi!"
          description="Kahve dünyamızda yepyeni tatlar sizleri bekliyor. Denemek ister misiniz?"
          image="/images/kahve.jpg"
          size={cardSize}
        />
      </div>

      {/* Featured Products */}
      <main className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-left sm:text-center mb-6 sm:mb-8">
            Öne Çıkan Ürünler
          </h2>
          <Slider {...settings}>
            {featuredProducts.map((product) => (
              <div key={product._id} className="px-1 sm:px-2">
                <ProductCard
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.image}
                  size={cardSize}
                />
              </div>
            ))}
          </Slider>
        </motion.div>
      </main>
    </div>
  );
}
