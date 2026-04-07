import { useLocation, Link, useNavigate } from "react-router-dom";
import { LogOut, LucideIcon, ChevronRight } from "lucide-react";
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
      className={`fixed top-0 left-0 z-40 h-screen overflow-y-auto overflow-x-hidden flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[260px]"
      }`}
      style={{
        background: "linear-gradient(180deg, #0f0c29 0%, #1a1145 40%, #0f172a 100%)",
      }}
    >
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-full h-32 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.4), transparent 70%)" }}
      />

      {/* Logo */}
      <div className={`relative z-10 flex items-center gap-3 px-5 py-6 border-b border-white/[0.06] ${collapsed ? "justify-center" : ""}`}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20 animate-float"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)" }}
        >
          <span className="text-white font-extrabold text-sm tracking-wider">SA</span>
        </div>
        {!collapsed && (
          <div className="animate-slide-in">
            <span className="font-bold text-[15px] text-white tracking-wide">Smart Achieve</span>
            <p className="text-[10px] text-white/30 font-medium tracking-widest uppercase mt-0.5">Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`relative z-10 flex-1 py-4 ${collapsed ? "px-2" : "px-3"} space-y-1`}>
        {!collapsed && (
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.2em] px-3 mb-3">
            Navigation
          </p>
        )}
        {items.map((item) => {
          const active = location.pathname === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`group relative flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 rounded-xl overflow-hidden
                ${
                  active
                    ? "text-white shadow-lg shadow-indigo-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                } ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? item.title : undefined}
            >
              {active && (
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.9))" }}
                />
              )}
              {active && <div className="absolute inset-0 rounded-xl animate-shimmer" />}
              <item.icon className={`relative z-10 w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`} />
              {!collapsed && <span className="relative z-10 flex-1">{item.title}</span>}
              {!collapsed && active && <ChevronRight className="relative z-10 w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={`relative z-10 border-t border-white/[0.06] p-4 ${collapsed ? "px-2" : ""}`}>
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-white/10"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            <span className="text-white text-xs font-bold">{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-slide-in">
              <p className="text-sm font-semibold text-white truncate">{user?.name || "User"}</p>
              <p className="text-[11px] text-white/30 truncate capitalize">{user?.role || "student"}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-white/5 transition-all duration-200"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
