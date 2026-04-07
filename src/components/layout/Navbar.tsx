import { Moon, Sun, Bell, Search, LogOut, LucideIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/lib/auth";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface NavbarProps {
  title: string;
  navItems: NavItem[];
  darkMode: boolean;
  onToggleDark: () => void;
}

const Navbar = ({ title, navItems, darkMode, onToggleDark }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navbarClass = darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-[#1a73e8] border-[#1765c1]";

  const brandTextClass = darkMode ? "text-white" : "text-white";
  const subtitleTextClass = darkMode ? "text-slate-300" : "text-white/80";
  const navActiveClass = darkMode
    ? "bg-slate-700 text-white font-semibold"
    : "bg-white text-[#1a73e8] font-semibold";
  const navInactiveClass = darkMode
    ? "text-slate-200 hover:bg-slate-800"
    : "text-white/95 hover:bg-white/15";
  const iconButtonClass = darkMode
    ? "text-slate-100 hover:bg-slate-800"
    : "text-white hover:bg-white/15";
  const searchWrapperClass = darkMode
    ? "bg-slate-800 border-slate-600"
    : "bg-white/15 border-white/20";
  const searchTextClass = darkMode ? "text-slate-100 placeholder:text-slate-300" : "text-white placeholder:text-white/70";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={`sticky top-0 z-30 border-b px-3 sm:px-4 md:px-6 py-2.5 transition-colors ${navbarClass}`}>
      <div className="max-w-[1240px] mx-auto">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
            <div className="flex flex-col shrink-0 leading-tight">
              <span className={`text-lg md:text-xl font-bold ${brandTextClass}`}>Smart Achieve</span>
              <span className={`text-[11px] ${subtitleTextClass}`}>{title}</span>
            </div>

            <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
              {navItems.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <Link
                    key={item.url}
                    to={item.url}
                    className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                      active ? navActiveClass : navInactiveClass
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className={`hidden xl:flex items-center gap-2 px-3 h-9 rounded-md border ${searchWrapperClass}`}>
              <Search className="w-4 h-4" />
            <input
              type="text"
                placeholder="Search"
                className={`bg-transparent text-sm outline-none w-32 ${searchTextClass}`}
            />
            </div>

            <button
              aria-label="Notifications"
              className={`relative h-9 w-9 grid place-items-center rounded-md transition-all duration-200 ${iconButtonClass}`}
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <button
              aria-label="Toggle dark mode"
              onClick={onToggleDark}
              className={`h-9 w-9 grid place-items-center rounded-md transition-all duration-200 ${iconButtonClass}`}
            >
              {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <button
              onClick={handleLogout}
              className={`flex items-center gap-1.5 px-2.5 md:px-3 h-9 rounded-md text-sm transition-colors ${iconButtonClass}`}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        <nav className="md:hidden mt-2 -mb-0.5 overflow-x-auto whitespace-nowrap no-scrollbar">
          <div className="flex items-center gap-1 pb-1">
            {navItems.map((item) => {
              const active = location.pathname === item.url;
              return (
                <Link
                  key={item.url}
                  to={item.url}
                  className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                    active ? navActiveClass : navInactiveClass
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
