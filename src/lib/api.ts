import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://student-achievement-backend-production.up.railway.app/api/",
});

export default API;