import { useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
}

const pageTitles: Record<string, string> = {
  "/student/dashboard": "Dashboard",
  "/student/achievements": "Achievements",
  "/student/profile": "Profile",
  "/student/report": "Report",
  "/student/settings": "Settings",
  "/admin/dashboard": "Dashboard",
  "/admin/manage-achievements": "Manage Achievements",
  "/admin/profile": "Profile",
  "/admin/report": "Report",
  "/admin/settings": "Settings",
};

const DashboardLayout = ({ children, navItems }: DashboardLayoutProps) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen w-full" style={{ background: "#f3f5f8" }}>
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar
          title={title}
          navItems={navItems}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(!darkMode)}
        />
        <main className="flex-1 p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
