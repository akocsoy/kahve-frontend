// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // NestJS API adresi
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;