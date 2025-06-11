"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/productService";
import { ChevronDown, SortAsc } from "lucide-react";
import { IconCurrencyLira } from "@tabler/icons-react";
import { ProductCard } from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";

const sortOptions = [
  { label: "Fiyata Göre (Artan)", value: "price_asc" },
  { label: "Fiyata Göre (Azalan)", value: "price_desc" },
  { label: "İsme Göre (A-Z)", value: "name_asc" },
  { label: "İsme Göre (Z-A)", value: "name_desc" },
  { label: "En Çok Satanlar", value: "popular" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [sort, setSort] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("Tüm Ürünler");

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts({ selectedCategory, sort });
      setProducts(data);
    }
    loadProducts();
  }, [selectedCategory, sort]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f9f9f9]">
      {/* Ana içerik */}
      <main className="flex-1 p-6">
        <CategoryFilter
          selected={selectedCategory}
          onChange={(cat) => setSelectedCategory(cat)}
        />
        {/* Sort Input */}
        <div className="flex justify-end mb-6">
          <div className="relative w-64">
            <SortAsc className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sıralama Seçin</option>
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Ürünler Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <img
                src="/no-products.svg"
                alt="Ürün bulunamadı"
                className="w-40 h-40 mb-6"
              />
              <h2 className="text-2xl font-semibold text-gray-700">
                Bu özelliklerde ürün bulunamadı...
              </h2>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                imageUrl={product.imageUrl}
                price={product.price}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
