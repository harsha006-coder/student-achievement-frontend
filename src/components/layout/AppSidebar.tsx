import { useLocation, Link, useNavigate } from "react-router-dom";
import { LogOut, LucideIcon } from "lucide-react";
import { getCurrentUser, logout } from "@/lib/auth";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface AppSidebarProps {
  items: NavItem[];
  collapsed: boolean;
}

const AppSidebar = ({ items, collapsed }: AppSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className="fixed top-0 left-0 z-40 h-screen w-64 overflow-y-auto bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] p-4 flex flex-col items-start"
    >
      {/* Logo */}
      <div className="w-full p-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
            style={{ background: "linear-gradient(135deg, hsl(239 84% 67%), hsl(270 60% 60%))" }}
          >
            <span className="text-white font-bold text-sm">SA</span>
          </div>
          {!collapsed && <span className="font-bold text-sm text-white tracking-wide">Smart Achieve</span>}
        </div>
      </div>

      {/* Nav */}
      <nav className="w-full flex-1 py-5 px-3 space-y-3">
        {items.map((item) => {
          const active = location.pathname === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white rounded-lg"
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="w-full p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ background: "linear-gradient(135deg, hsl(239 84% 67%), hsl(270 60% 60%))" }}
          >
            <span className="text-white text-xs font-bold">{user?.name?.charAt(0) || "U"}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
              <p className="text-xs text-white/40 truncate capitalize">{user?.role || "student"}</p>
            </div>
          )}
          <button onClick={handleLogout} className="text-white/40 hover:text-white transition-colors duration-200" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
