import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { registerUser, loginUser } from "@/lib/auth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin" | "teacher">("student");
  const [userClass, setUserClass] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }
    try {
      const success = await registerUser({ name, email, password, role, userClass, department });
      if (success) {
        setMessage("Registration successful! Please sign in.");
        setMessageType("success");
        setIsLogin(true);
        setName("");
        setPassword("");
        setUserClass("");
        setDepartment("");
      } else {
        setMessage("Email already registered or registration failed");
        setMessageType("error");
      }
    } catch (error) {
      if (error instanceof Error && error.message === "SERVER_UNREACHABLE") {
        setMessage("Cannot connect to backend API. Start backend server or set VITE_API_URL.");
        setMessageType("error");
        return;
      }
      setMessage("Registration failed. Please try again.");
      setMessageType("error");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(identifier, password, role);
      if (user) {
        if (user.role && user.role.toLowerCase() === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role && user.role.toLowerCase() === "teacher") {
          navigate("/teacher/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        setMessage("Invalid credentials or role mismatch");
        setMessageType("error");
      }
    } catch (error) {
      if (error instanceof Error && error.message === "SERVER_UNREACHABLE") {
        setMessage("Cannot connect to backend API. Start backend server or set VITE_API_URL.");
        setMessageType("error");
        return;
      }
      setMessage("Login failed. Please try again.");
      setMessageType("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-200 text-sm shadow-sm";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div
        className="lg:w-1/2 w-full min-h-[300px] lg:min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #6d28d9 70%, #4338ca 100%)",
        }}
      >
        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 text-center text-white px-8 animate-slide-up">
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl shadow-black/20">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
            Smart Achieve
          </h1>
          <p className="text-lg text-white/60 font-light max-w-sm mx-auto">
            Track, manage, and celebrate student achievements seamlessly
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["📊 Analytics", "🏆 Achievements", "👥 Teams", "📱 Mobile"].map((f) => (
              <span key={f} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/70 font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8 lg:p-16 bg-[#fafbfe]">
        <div className="w-full max-w-md animate-slide-up" style={{ animationDelay: "100ms" }}>
          {/* Logo for small screens */}
          <div className="flex items-center gap-2.5 mb-10">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Smart Achieve</span>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
            {isLogin ? "Welcome back" : "Get started"}
          </h2>
          <p className="text-gray-500 mb-8 text-[15px]">
            {isLogin
              ? "Sign in to access your dashboard and achievements."
              : "Create your account to start tracking achievements."}
          </p>

          {message && (
            <div
              className={`mb-6 p-3.5 rounded-2xl text-sm font-medium flex items-center gap-2 animate-scale-in ${
                messageType === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              {message}
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <div className="animate-slide-up space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Class / Grade</label>
                    <input type="text" value={userClass} onChange={(e) => setUserClass(e.target.value)} className={inputClass} placeholder="e.g. 10th Grade" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <select 
                      value={department} 
                      onChange={(e) => setDepartment(e.target.value)} 
                      className={inputClass}
                    >
                      <option value="">Select Branch</option>
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="ECE">Electronics (ECE)</option>
                      <option value="EEE">Electrical (EEE)</option>
                      <option value="ME">Mechanical (ME)</option>
                      <option value="CE">Civil (CE)</option>
                      <option value="IT">Info Tech (IT)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {isLogin ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email or Username</label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={inputClass}
                  placeholder="Email or Username"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {(["student", "teacher", "admin"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-3 rounded-2xl text-sm font-semibold border-2 transition-all duration-200 capitalize ${
                      role === r
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {r === "student" ? "🎓 Student" : r === "teacher" ? "👨‍🏫 Teacher" : "🛡️ Admin"}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-bold text-white transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] flex items-center justify-center gap-2 group mt-2"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => { setIsLogin(!isLogin); setMessage(""); }}
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
