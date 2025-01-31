import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3334',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@rpg:token');

  if (token && config.url !== '/users/authentication') {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
