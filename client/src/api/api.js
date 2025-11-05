import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "https://mern-stack-oauth-image-search.onrender.com";

const api = axios.create({
  baseURL: BACKEND + "/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
