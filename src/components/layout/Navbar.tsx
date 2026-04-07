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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-[#1a73e8] border-b border-[#1765c1] px-6 py-3">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold text-white">Smart Achieve</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const active = location.pathname === item.url;
              return (
                <Link
                  key={item.url}
                  to={item.url}
                  className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                    active ? "bg-white text-[#1a73e8] font-semibold" : "text-white/90 hover:bg-white/15"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/15 border border-white/20">
            <Search className="w-4 h-4 text-white/85" />
            <input
              type="text"
              placeholder={title}
              className="bg-transparent text-sm text-white placeholder:text-white/70 outline-none w-28"
            />
          </div>

          <button className="relative p-2 rounded-md hover:bg-white/15 transition-all duration-200 text-white">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <button
            onClick={onToggleDark}
            className="p-2 rounded-md hover:bg-white/15 transition-all duration-200 text-white"
          >
            {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-white hover:bg-white/15 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
