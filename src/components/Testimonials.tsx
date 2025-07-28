"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    comment: "Kahveler gerçekten harika. Tazelik ve aroma mükemmeldi. Tekrar sipariş vereceğim!",
  },
  {
    name: "Zeynep Koç",
    comment: "Sunum kalitesi ve müşteri hizmetleri çok iyiydi. Teslimat hızlı ve sorunsuzdu.",
  },
  {
    name: "Mehmet Demir",
    comment: "Bu kadar kaliteli bir ürün beklemiyordum. Ürün açıklamaları birebir doğruydu.",
  },
];

export default function Testimonials() {
  return (
    <section className=" py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-900 mb-8">
          Müşteri Yorumları
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 text-left hover:shadow-md transition-shadow border border-gray-100"
            >
              <Quote className="text-green-500 w-6 h-6 mb-4" />
              <p className="text-sm text-muted-foreground italic mb-4">
                "{testimonial.comment}"
              </p>
              <p className="font-semibold text-green-800">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
