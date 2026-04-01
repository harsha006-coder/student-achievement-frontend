import { Menu, Moon, Sun, Bell } from "lucide-react";

interface NavbarProps {
  title: string;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const Navbar = ({ title, onToggleSidebar, darkMode, onToggleDark }: NavbarProps) => (
  <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-900">
        <Menu className="w-5 h-5" />
      </button>
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500 relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
      </button>
      <button onClick={onToggleDark} className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500">
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  </header>
);

export default Navbar;
