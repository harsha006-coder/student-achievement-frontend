import axios from "axios";

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "/api/";
  if (!url.endsWith("/")) {
    url += "/";
  }
  return url;
};

const API = axios.create({
  baseURL: getBaseURL(),
});

export default API;
