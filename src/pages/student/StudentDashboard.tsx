import { useEffect, useState } from "react";
import { Trophy, CheckCircle, Clock, XCircle } from "lucide-react";
import API from "@/lib/api";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { getCurrentUser } from "@/lib/auth";

const columns = [
  { header: "Title", accessor: "title" as keyof Achievement },
  { header: "Category", accessor: "category" as keyof Achievement },
  { header: "Date", accessor: "date" as keyof Achievement },
  { header: "Status", accessor: (row: Achievement) => <StatusBadge status={row.status} /> },
];

const StudentDashboard = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const user = getCurrentUser();
  const userId = user?.id || 1;

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/achievements/student/${userId}`);
        setAchievements(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
        setError("Failed to load achievements. Please try again.");
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-8">Loading achievements...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  const total = achievements.length;
  const approved = achievements.filter((a) => a.status === "Approved").length;
  const pending = achievements.filter((a) => a.status === "Pending").length;
  const rejected = achievements.filter((a) => a.status === "Rejected").length;
  const recentAchievements = achievements.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Achievements" value={total} icon={Trophy} color="primary" trend="+12%" />
        <StatsCard title="Approved" value={approved} icon={CheckCircle} color="success" />
        <StatsCard title="Pending" value={pending} icon={Clock} color="warning" />
        <StatsCard title="Rejected" value={rejected} icon={XCircle} color="secondary" />
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
