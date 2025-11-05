import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BACKEND + "/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
