"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/productService";
import { ChevronDown, SortAsc } from "lucide-react"; // << İkonları aldık
import { IconCurrencyLira } from "@tabler/icons-react";
import { ProductCard } from "@/components/ProductCard";

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
  const [filters, setFilters] = useState({
    discounted: false,
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts({ ...filters, sort });
      setProducts(data);
    }
    loadProducts();
  }, [filters, sort]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f9f9f9] p-4 border-r border-gray-200">
        <div className="space-y-6 text-sm text-gray-700">
          {/* Fiyat Aralığı */}
          <div>
            <label className="block mb-1 font-medium">Fiyat Aralığı</label>
            <div className="flex gap-2">
              {/* Min Fiyat */}
              <div className="relative w-1/2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full border rounded p-1 pr-7 text-xs"
                />
                <IconCurrencyLira className="absolute right-0 top-1 w-4 h-4 text-gray-400" />
              </div>
              {/* Max Fiyat */}
              <div className="relative w-1/2">
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full border rounded p-1 pr-7 text-xs"
                />
                <IconCurrencyLira className="absolute right-0 top-1 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* İndirim */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="discounted"
              checked={filters.discounted}
              onChange={handleFilterChange}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">İndirimli Ürünler</label>
          </div>
        </div>
      </aside>

      {/* Ana içerik */}
      <main className="flex-1 p-6">
        {/* Sort Input */}
        <div className="flex justify-end mb-4">
          <div className="relative w-64">
            {/* Soluna Sort İkonu */}
            <SortAsc className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 text-sm text-gray-700 focus:outline-none"
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

        {/* Ürünler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
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
                <ProductCard key={product._id} id={product._id} name={product.name} imageUrl={product.imageUrl} price={product.price} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
