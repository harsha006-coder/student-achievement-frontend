import { Navigate, Outlet } from "react-router-dom";
import { LayoutDashboard, Trophy, User, FileText, Settings } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getCurrentUser } from "@/lib/auth";

const studentNav = [
  { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
  { title: "Achievements", url: "/student/achievements", icon: Trophy },
  { title: "Profile", url: "/student/profile", icon: User },
  { title: "Report", url: "/student/report", icon: FileText },
  { title: "Settings", url: "/student/settings", icon: Settings },
];

const StudentLayout = () => {
  const user = getCurrentUser();
  if (!user || user.role !== "student") return <Navigate to="/" replace />;
  return (
    <DashboardLayout navItems={studentNav}>
      <Outlet />
    </DashboardLayout>
  );
};

export default StudentLayout;
