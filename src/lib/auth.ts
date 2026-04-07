export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: "student" | "admin" | "teacher";
  class?: string;
  userClass?: string;
  department?: string;
}

import API from "./api";
import axios from "axios";

export async function registerUser(user: User): Promise<boolean> {
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

export async function loginUser(identifier: string, password: string, role: string): Promise<User | null> {
  try {
    const res = await API.post("/auth/login", {
      email: identifier,
      password,
    });
    const user: User = res.data;
    
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

export function getCurrentUser(): User | null {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

export function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
}
