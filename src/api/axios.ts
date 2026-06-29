import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:5000/api' 
});

// Automatically inject JWT admin token if it exists in local storage
API.interceptors.request.use(config => {
  const token = localStorage.getItem('asif_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default API;
