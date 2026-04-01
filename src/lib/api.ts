import axios from "axios";

const API = axios.create({
  baseURL: "https://student-achievement-backend-production.up.railway.app/api"
});

export default API;