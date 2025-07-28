"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import StrengthIndicator from "@/components/products/StrengthIndicator";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/productService";
import Gallery from "@/components/products/Gallery";
import { Skeleton } from "@/components/ui/skeleton";

const ProductPage = () => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>(); // İlk başta null
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(params.id as string); // id parametresini al
        setProduct(productData);
      } catch (error) {
        console.error("Ürün verisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);
  if (loading || !product) {
    return (
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-6">
            <Skeleton className="w-full h-[400px]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-4 border border-gray-100"
              >
                <Skeleton className="w-3/4 h-4 mb-2" />
                <Skeleton className="w-full h-3" />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Skeleton className="w-1/3 h-4 mb-4" />
            <Skeleton className="w-full h-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
          <div className="space-y-2">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-2/3 h-6" />
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-full h-4" />
          </div>
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-full h-6" />
          <div className="flex justify-between">
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-24 h-6" />
          </div>
          <Skeleton className="w-full h-12 rounded-xl" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sol taraf: Ürün görseli ve detaylar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-6">
            <Gallery images={product.images} productName={product.name} />
          </div>

          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-900">
              İçindekiler
            </h3>

            <ul className="list-none space-y-2">
              {product?.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-[2px]">✔</span>
                  <span className="text-sm text-gray-800">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sağ taraf: Ürün adı, açıklama, sertlik ve fiyat */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between gap-6 ">
          <div className="space-y-2">
            {product?.discount && (
              <Badge
                variant="promo"
                text={`%${product?.discount.toString()} indirim`}
              />
            )}
            <h1 className="text-2xl font-bold text-green-900">
              {product?.name}
            </h1>
            <Badge
              variant="stock"
              text={`Stokta ${product?.stock} tane`}
              stockLevel={product?.stock}
            />
            <p className="text-muted-foreground mt-5 text-sm">
              {product?.description}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="mb-10">
              <h3 className="text-sm font-semibold mb-1 text-[#333]">
                Sertlik Derecesi:
              </h3>
              <StrengthIndicator value={product?.strength ?? 0} />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <label htmlFor="qty" className="text-sm text-muted-foreground">
                  Miktar:
                </label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-16 border rounded-md px-2 py-1 text-center"
                />
              </div>
              <div className="text-2xl font-bold text-green-800">
                {product?.price.toFixed(2)} TL
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => addToCart(product._id, quantity)}
              className="bg-green-700 text-white hover:bg-green-800 rounded-xl"
            >
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
