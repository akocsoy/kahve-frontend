// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // NestJS API adresi
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
  (config) => {
    // Cookie'den token'ı alıyoruz
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

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