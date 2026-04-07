import { Moon, Sun, Bell, Search, PanelLeftClose, PanelLeft } from "lucide-react";

interface NavbarProps {
  title: string;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  collapsed?: boolean;
}

const Navbar = ({ title, onToggleSidebar, darkMode, onToggleDark, collapsed }: NavbarProps) => (
  <header className="sticky top-0 z-30 bg-[#1a73e8] border-b border-[#1765c1] px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-xl hover:bg-white/15 transition-all duration-200 text-white active:scale-95"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
      </button>
      <div>
        <h1 className="text-lg font-semibold text-white tracking-tight">{title}</h1>
        <p className="text-[11px] text-white/80 font-medium -mt-0.5">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-1.5">
      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 border border-white/20 mr-2 group focus-within:border-white/40 transition-all">
        <Search className="w-4 h-4 text-white/80 transition-colors" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-white placeholder:text-white/70 outline-none w-32 focus:w-48 transition-all duration-300"
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2.5 rounded-xl hover:bg-white/15 transition-all duration-200 text-white active:scale-95">
        <Bell className="w-[18px] h-[18px]" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      {/* Dark mode */}
      <button
        onClick={onToggleDark}
        className="p-2.5 rounded-xl hover:bg-white/15 transition-all duration-200 text-white active:scale-95"
      >
        {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
      </button>
    </div>
  </header>
);

export default Navbar;
