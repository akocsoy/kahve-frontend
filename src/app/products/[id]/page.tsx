"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Coffee, Leaf, CloudLightning, ShieldCheck } from "lucide-react";
import Badge from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import StrengthIndicator from "@/components/products/StrengthIndicator";

const ProductPage = () => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Dark Roast Kahve",
    description:
      "Yoğun aroma ve yüksek sertlik derecesiyle güne enerjik başlamanızı sağlar.",
    price: 129.99,
    image: "/images/kahve.jpg",
    icons: [
      { icon: Leaf, label: "Doğal içerik" },
      { icon: CloudLightning, label: "Yüksek enerji" },
      { icon: ShieldCheck, label: "Koruyucu içermez" },
      { icon: Coffee, label: "3/3 Sertlik" },
    ],
    features: [
      {
        title: "Günlük Enerji",
        description:
          "Doğal içerikleriyle gün boyu zinde kalmanıza yardımcı olur.",
      },
      {
        title: "Saf ve Temiz",
        description: "Koruyucu ve yapay katkı maddesi içermez.",
      },
      {
        title: "Kolay Sindirim",
        description: "Mide dostu formülüyle sindirim sistemini destekler.",
      },
      {
        title: "Dengeli Kafein",
        description:
          "Yüksek enerji sağlar, ancak ani düşüş veya çarpıntı yapmaz.",
      },
    ],
    content: `Bu kahve, Orta Amerika'nın yüksek rakımlı bölgelerinde yetişen
    Arabica çekirdeklerinden özenle üretilmiştir. Kavurma işlemi esnasında
    karamelize tatlar ve yoğun aroma ön plana çıkarılır. Her fincanda
    denge ve güç hissi verir.`,
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Sol taraf: Ürün görseli ve detaylar */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow p-6">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {product.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 border border-gray-100"
            >
              <p className="font-semibold text-sm mb-1 text-green-800">
                {feature.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-green-900">
            Ürün İçeriği
          </h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {product.content}
          </p>
        </div>
      </div>

      {/* Sağ taraf: Ürün adı, açıklama, sertlik ve fiyat */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6 ">
        <div className="space-y-2">
          <Badge variant="promo" text="Up to 20% off" />
          <h1 className="text-2xl font-bold text-green-900">{product.name}</h1>
          <Badge variant="stock" text="Only 45 left" stockLevel={45} />
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {product.icons.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <item.icon className="text-green-700 w-5 h-5" />
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-semibold mb-1 text-[#333]">
          Sertlik Derecesi:
        </h3>
        <StrengthIndicator value={3} />

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
            {product.price.toFixed(2)} TL
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => addToCart(product, quantity)}
          className="bg-green-700 text-white hover:bg-green-800 rounded-xl"
        >
          Sepete Ekle
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
