import API from "./api";

export async function registerUser(user) {
  try {
    await API.post("/auth/register", user);
    return true;
  } catch (err) {
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
