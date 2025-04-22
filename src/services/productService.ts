import api from '../lib/api';

export const getAllProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (data: {
  name: string;
  price: number;
  images: string[];
}) => {
  const response = await api.post('/products', data);
  return response.data;
};