import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  timeout: 1000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
