// lib/api.ts
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies()
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // NestJS API adresi
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios request interceptor'ı
api.interceptors.request.use(
  (config) => {
    // localStorage'dan token'ı alıyoruz
    const token = cookie.get("token"); // token'ı localStorage'dan al

    // Token varsa, Authorization header'ına Bearer token'ı ekliyoruz
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
