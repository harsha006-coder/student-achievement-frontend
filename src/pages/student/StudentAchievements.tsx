import { useEffect, useMemo, useState } from "react";
import { Trophy, Clock, CheckCircle, XCircle } from "lucide-react";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import SearchFilter from "@/components/dashboard/SearchFilter";
import { useAchievements } from "@/context/AchievementContext";
import type { Achievement, AchievementStatus } from "@/lib/types";

const columns = [
  { header: "Title", accessor: "title" as keyof Achievement },
  { header: "Date", accessor: "date" as keyof Achievement },
  { header: "Status", accessor: (row: Achievement) => <StatusBadge status={row.status} /> },
];

const StudentAchievements = () => {
  const { achievements, addAchievement, fetchAchievements } = useAchievements();
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<AchievementStatus>("Pending");

  useEffect(() => {
    fetchAchievements();
  }, []);

  const submitAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    try {
      await addAchievement({
        title: title.trim(),
        category: "Extracurricular",
        date: date,
        status: String(status).toUpperCase() as AchievementStatus,
      });

      alert("Submitted!");
    } catch (error) {
      console.error("Failed to submit achievement:", error);
      alert("Failed to submit achievement. Please try again.");
      return;
    }

    setTitle("");
    setDate("");
    setStatus("Pending");
  };

  const filtered = achievements.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const summary = useMemo(
    () => ({
      total: achievements.length,
      approved: achievements.filter((a) => a.status === "Approved").length,
      pending: achievements.filter((a) => a.status === "Pending").length,
      rejected: achievements.filter((a) => a.status === "Rejected").length,
    }),
    [achievements],
  );

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-2xl font-semibold">{summary.total}</p>
            <Trophy className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Approved</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-2xl font-semibold">{summary.approved}</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Pending</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-2xl font-semibold">{summary.pending}</p>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-4 bg-white">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Rejected</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-2xl font-semibold">{summary.rejected}</p>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 p-5 bg-white">
        <h2 className="text-lg font-semibold mb-4">Add Extracurricular Achievement</h2>
        <form onSubmit={submitAchievement} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Achievement title"
            className="md:col-span-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as AchievementStatus)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            type="submit"
            className="md:col-span-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:opacity-90 transition"
          >
            Save Achievement
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Extracurricular Achievements</h2>
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          filter=""
          onFilterChange={() => {}}
          filterOptions={[]}
        />
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500">No extracurricular achievements found.</p>
        ) : (
          <DataTable columns={columns} data={filtered} />
        )}
      </section>
    </div>
  );
};

export default StudentAchievements;
