// Shared Axios instance:
// all frontend API files import this so base URL and auth headers stay consistent.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  // Automatically attach the saved JWT to every request after login.
  const token = localStorage.getItem("habitquest_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
