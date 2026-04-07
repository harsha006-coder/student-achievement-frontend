import { useEffect } from "react";
import { Trophy, CheckCircle, Clock, XCircle } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import ProgressChart from "@/components/dashboard/ProgressChart";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAchievements } from "@/context/AchievementContext";
import type { Achievement } from "@/lib/types";

const columns = [
  { header: "Title", accessor: "title" as keyof Achievement },
  { header: "Category", accessor: "category" as keyof Achievement },
  { header: "Date", accessor: "date" as keyof Achievement },
  { header: "Status", accessor: (row: Achievement) => <StatusBadge status={row.status} /> },
];

const StudentDashboard = () => {
  const { achievements, fetchAchievements } = useAchievements();

  useEffect(() => {
    fetchAchievements();
  }, []);

  const total = achievements.length;
  const approved = achievements.filter((a) => a.status === "Approved").length;
  const pending = achievements.filter((a) => a.status === "Pending").length;
  const rejected = achievements.filter((a) => a.status === "Rejected").length;
  const recentAchievements = achievements.slice(0, 5);



  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
        <StatsCard title="Total Achievements" value={total} icon={Trophy} color="primary" trend="+12%" />
        <StatsCard title="Approved" value={approved} icon={CheckCircle} color="success" />
        <StatsCard title="Pending" value={pending} icon={Clock} color="warning" />
        <StatsCard title="Rejected" value={rejected} icon={XCircle} color="secondary" />
        <ProgressChart approved={approved} pending={pending} rejected={rejected} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
        {recentAchievements.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No achievements yet</div>
        ) : (
          <DataTable columns={columns} data={recentAchievements} />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
