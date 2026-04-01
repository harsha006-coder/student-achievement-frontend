
export function registerUser(user: User): boolean {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.email === user.email)) return false;
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

export function loginUser(email: string, password: string, role: string): User | null {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password && u.role === role);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userName", user.name || user.email.split("@")[0] || "Student");
    return user;
  }
  return null;
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
