import { Users, Trophy, Clock, GraduationCap } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAchievements } from "@/context/AchievementContext";
import { getCurrentUser } from "@/lib/auth";
import type { Achievement } from "@/lib/types";

const columns = [
  { header: "Student", accessor: "studentName" as keyof Achievement },
  { header: "Title", accessor: "title" as keyof Achievement },
  { header: "Category", accessor: "category" as keyof Achievement },
  { header: "Date", accessor: "date" as keyof Achievement },
  { header: "Status", accessor: (row: Achievement) => <StatusBadge status={row.status} /> },
];

const TeacherDashboard = () => {
  const { achievements } = useAchievements();
  const user = getCurrentUser();
  const pending = achievements.filter((a) => a.status === "Pending").length;
  const uniqueStudents = new Set(achievements.map((a) => a.studentName)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Teacher Dashboard</h1>
          <p className="text-gray-500">Managing <span className="font-semibold text-indigo-600">{user?.userClass || "Current Class"}</span> | <span className="text-gray-400 capitalize">{user?.department || "General"} Department</span></p>
        </div>
        <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">{user?.userClass}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <StatsCard 
          title="My Students" 
          value={uniqueStudents} 
          icon={Users} 
          color="primary" 
        />
        <StatsCard 
          title="Class Achievements" 
          value={achievements.length} 
          icon={Trophy} 
          color="success" 
        />
        <StatsCard 
          title="Pending Approvals" 
          value={pending} 
          icon={Clock} 
          color="warning" 
        />
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Class Submissions</h2>
        <DataTable columns={columns} data={achievements.slice(0, 10)} />
      </div>
    </div>
  );
};

export default TeacherDashboard;
