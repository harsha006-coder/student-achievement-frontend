import axios from "axios";

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "https://student-achievement-backend-production.up.railway.app/api/";
  if (!url.endsWith("/")) {
    url += "/";
  }
  return url;
};

const API = axios.create({
  baseURL: getBaseURL(),
});

export default API;
