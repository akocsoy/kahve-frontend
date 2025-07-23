interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  discount: number | null;
  strength: number; // 1 to 5
}