import API from "./api";
import axios from "axios";

export async function registerUser(user) {
  try {
    await API.post("/auth/register", user);
    return true;
  } catch (err) {
    if (axios.isAxiosError(err) && !err.response) {
      throw new Error("SERVER_UNREACHABLE");
    }
    if (axios.isAxiosError(err) && err.response?.status === 409) {
      return false;
    }
    console.error(err);
    return false;
  }
}

export async function loginUser(identifier, password, role) {
  try {
    const res = await API.post("/auth/login", { email: identifier, password: password });
    const user = res.data;
    
    if (user.role && user.role.toUpperCase() !== role.toUpperCase()) {
      return null;
    }
    
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userName", user.name || user.email.split("@")[0] || "Student");
    return user;
  } catch (err) {
    if (axios.isAxiosError(err) && !err.response) {
      throw new Error("SERVER_UNREACHABLE");
    }
    if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
      return null;
    }
    console.error(err);
    return null;
  }
}

export function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

export function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
}
