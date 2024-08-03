'use client'
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = '/auth/signin?expired=true'; 
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config :any) => {
  debugger
  if ( document.cookie != "") {
    const cookieValue = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${cookieValue}`;
    return config;
  }
  return config;
});

export default api; 
