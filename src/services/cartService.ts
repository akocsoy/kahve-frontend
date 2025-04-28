import api from "@/lib/api";

export interface AddToCartDto {
  productId: string;
  quantity: number;
}

export async function fetchCart() {
  try {
    const response = await api.get('/cart');
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Sepet verisi alınırken hata oluştu:', error);
    return null;
  }
}

export async function addToCart(dto: AddToCartDto) {
  try {
    const response = await api.post('/cart/add', dto);
    return response.data;
  } catch (error) {
    console.error('Sepete eklenirken hata oluştu:', error);
    throw error;
  }
}

export async function clearCart() {
  try {
    const response = await api.delete('/cart/clear');
    return response.data;
  } catch (error) {
    console.error('Sepet temizlenirken hata oluştu:', error);
    throw error;
  }
}
export async function removeItem(productId: string){
  try {
    await api.delete(`/cart/remove/${productId}`);
  } catch (error) {
    console.error('Sepet temizlenirken hata oluştu:', error);
    throw error;
  }
};