import api from '../lib/api';

export const register = async (data: { email: string; password: string }) => {
  return api.post('/auth/register', data);
};

export const login = async (data: { email: string; password: string }) => {
  return api.post('/auth/login', data);
};