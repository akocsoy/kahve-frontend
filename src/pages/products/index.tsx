import { useEffect, useState } from 'react';
import { getAllProducts } from '@/services/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product._id} className="p-4 border rounded">
            <h2 className="text-xl font-medium">{product.name}</h2>
            <p>₺{product.price}</p>
            {product.images?.[0] && (
              <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}