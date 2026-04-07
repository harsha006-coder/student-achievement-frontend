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
      className={`fixed top-0 left-0 z-40 h-screen overflow-y-auto overflow-x-hidden flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[260px]"
      }`}
      style={{
        background: "#1a73e8",
      }}
    >
      {/* Logo */}
      <div className={`relative z-10 flex items-center gap-3 px-5 py-5 border-b border-white/20 ${collapsed ? "justify-center" : ""}`}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          <span className="text-white font-bold text-sm tracking-wider">SA</span>
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-[15px] text-white tracking-wide">Smart Achieve</span>
            <p className="text-[10px] text-white/70 font-medium tracking-widest uppercase mt-0.5">Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`relative z-10 flex-1 py-4 ${collapsed ? "px-2" : "px-3"} space-y-1`}>
        {!collapsed && (
          <p className="text-[10px] font-semibold text-white/70 uppercase tracking-[0.2em] px-3 mb-3">
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
                    ? "text-[#1f6fe5] bg-white"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                } ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? item.title : undefined}
            >
              <item.icon className={`w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`} />
              {!collapsed && <span className="flex-1">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={`relative z-10 border-t border-white/20 p-4 ${collapsed ? "px-2" : ""}`}>
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-white/10"
            style={{ background: "rgba(255,255,255,0.25)" }}
          >
            <span className="text-white text-xs font-bold">{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || "User"}</p>
              <p className="text-[11px] text-white/80 truncate capitalize">{user?.role || "student"}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
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
