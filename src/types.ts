interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  discount: number | null;
  strength: number; // 1 to 5
  ingredients: string[];
  category: string;
}