import api from '../lib/api';

export const register = async (data: {name:string, email: string; password: string, role:string }) => {
  return api.post('/auth/register', data);
};

export const login = async (data: { email: string; password: string }) => {
  return api.post('/auth/login', data);
};

export const guestLogin = async (guestId:string)=> {
  return api.post('/auth/guest', {guestId})
}
