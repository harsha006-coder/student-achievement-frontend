import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { registerUser, loginUser } from "@/lib/auth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }
    const success = registerUser({ name, email, password, role });
    if (success) {
      setMessage("Registration successful! Please sign in.");
      setMessageType("success");
      setIsLogin(true);
      setName("");
      setPassword("");
    } else {
      setMessage("Email already registered");
      setMessageType("error");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginUser(email, password, role);
    if (user) {
      navigate(user.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
    } else {
      setMessage("Invalid credentials or role mismatch");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - 50% */}
      <div className="lg:w-1/2 w-full min-h-[280px] lg:min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, hsl(239 84% 67%) 0%, hsl(270 60% 55%) 50%, hsl(250 70% 50%) 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 text-center text-white px-8">
          <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
            <BookOpen className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tight">Smart Student</h1>
          <p className="text-lg lg:text-xl text-white/70 font-light">Achievement Management System</p>
        </div>
      </div>

      {/* Right Panel - 50% */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Logo for small screens */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Smart Student</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            {isLogin ? "Log In" : "Create Account"}
          </h2>
          <p className="text-gray-500 mb-8">
            {isLogin
              ? "Enter your email and password to login our dashboard."
              : "Fill in your details to create a new account."}
          </p>

          {message && (
            <div className={`mb-6 p-3.5 rounded-xl text-sm font-medium ${messageType === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
              {message}
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                placeholder="info@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all pr-12"
                  placeholder="Enter your Password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Role</label>
              <select
                value={role} onChange={(e) => setRole(e.target.value as "student" | "admin")}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, hsl(239 84% 67%), hsl(270 60% 60%))" }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => { setIsLogin(!isLogin); setMessage(""); }}
                className="text-indigo-600 font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
            {isLogin && (
              <button className="text-sm text-indigo-600 hover:underline font-medium">
                Forget Password?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
