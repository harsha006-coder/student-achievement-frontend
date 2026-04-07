import { Navigate, Outlet } from "react-router-dom";
import { LayoutDashboard, Trophy, User, FileText, Settings } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getCurrentUser } from "@/lib/auth";

const teacherNav = [
  { title: "Dashboard", url: "/teacher/dashboard", icon: LayoutDashboard },
  { title: "Student Records", url: "/teacher/records", icon: Trophy },
  { title: "Profile", url: "/teacher/profile", icon: User },
  { title: "Report", url: "/teacher/report", icon: FileText },
  { title: "Settings", url: "/teacher/settings", icon: Settings },
];

const TeacherLayout = () => {
  const user = getCurrentUser();
  if (!user || user.role !== "teacher") return <Navigate to="/" replace />;
  return (
    <DashboardLayout navItems={teacherNav}>
      <Outlet />
    </DashboardLayout>
  );
};

export default TeacherLayout;
