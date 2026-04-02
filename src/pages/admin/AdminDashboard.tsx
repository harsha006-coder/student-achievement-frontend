import { Users, Trophy, Clock } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAchievements } from "@/context/AchievementContext";

const columns = [
  { header: "Student", accessor: "studentName" as keyof Achievement },
  { header: "Title", accessor: "title" as keyof Achievement },
  { header: "Category", accessor: "category" as keyof Achievement },
  { header: "Date", accessor: "date" as keyof Achievement },
  { header: "Status", accessor: (row: Achievement) => <StatusBadge status={row.status} /> },
];

const AdminDashboard = () => {
  const { achievements } = useAchievements();
  const pending = achievements.filter((a) => a.status === "Pending").length;
  const uniqueStudents = new Set(achievements.map((a) => a.studentName)).size;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <StatsCard title="Total Students" value={uniqueStudents} icon={Users} color="primary" trend="+5%" />
        <StatsCard title="Total Achievements" value={achievements.length} icon={Trophy} color="success" />
        <StatsCard title="Pending Approvals" value={pending} icon={Clock} color="warning" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Submissions</h2>
        <DataTable columns={columns} data={achievements.slice(0, 5)} />
      </div>
    </div>
  );
};

export default AdminDashboard;
