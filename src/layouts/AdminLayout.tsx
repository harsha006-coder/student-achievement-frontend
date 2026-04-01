import { Navigate, Outlet } from "react-router-dom";
import { LayoutDashboard, Trophy, User, FileText, Settings } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getCurrentUser } from "@/lib/auth";

const adminNav = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Manage Achievements", url: "/admin/manage-achievements", icon: Trophy },
  { title: "Profile", url: "/admin/profile", icon: User },
  { title: "Report", url: "/admin/report", icon: FileText },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;
  return (
    <DashboardLayout navItems={adminNav}>
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminLayout;
