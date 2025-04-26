import api from '../lib/api';

export async function fetchProducts(filters?: Record<string, any>) {
  try {
    const response = await api.get('/products', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Ürünler alınırken hata oluştu:', error);
    return [];
  }
}

export const createProduct = async (data: {
  name: string;
  price: number;
  images: string[];
}) => {
  const response = await api.post('/products', data);
  return response.data;
};