import { Menu, Moon, Sun, Bell, Search, PanelLeftClose, PanelLeft } from "lucide-react";

interface NavbarProps {
  title: string;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  collapsed?: boolean;
}

const Navbar = ({ title, onToggleSidebar, darkMode, onToggleDark, collapsed }: NavbarProps) => (
  <header className="sticky top-0 z-30 glass border-b border-gray-200/60 px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 text-gray-500 hover:text-gray-900 active:scale-95"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
      </button>
      <div>
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h1>
        <p className="text-[11px] text-gray-400 font-medium -mt-0.5">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-1.5">
      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100/80 border border-gray-200/50 mr-2 group focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <Search className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-32 focus:w-48 transition-all duration-300"
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 text-gray-500 hover:text-gray-700 active:scale-95">
        <Bell className="w-[18px] h-[18px]" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      {/* Dark mode */}
      <button
        onClick={onToggleDark}
        className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 text-gray-500 hover:text-gray-700 active:scale-95"
      >
        {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
      </button>
    </div>
  </header>
);

export default Navbar;
