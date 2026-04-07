import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import API from "@/lib/api";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import SearchFilter from "@/components/dashboard/SearchFilter";
import type { Achievement, AchievementStatus } from "@/lib/types";

const AdminManageAchievements = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    title: "",
    description: "",
    category: "Technical",
    date: new Date().toISOString().split("T")[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [processingActionId, setProcessingActionId] = useState<string | number | null>(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await API.get("/achievements/all");
      const data = response.data || [];
      setAchievements(data);
      const uniqueCategories = [...new Set(data.map((a: Achievement) => a.category))];
      setCategories(uniqueCategories as string[]);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch achievements:", err);
      setError("Failed to load achievements. Please try again.");
      setAchievements([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const requestWithFallback = async (requests: Array<() => Promise<unknown>>) => {
    let lastError: unknown;
    for (const request of requests) {
      try {
        await request();
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  };

  const updateStatus = async (id: string | number, status: AchievementStatus | null) => {
    if (!status) return;
    try {
      setProcessingActionId(id);
      await requestWithFallback([
        () => API.patch(`/achievements/${id}/status`, { status }),
        () => API.put(`/achievements/${id}/status`, { status }),
        () => API.put(`/achievements/update-status/${id}`, { status }),
        () => API.patch(`/achievements/${id}`, { status }),
        () => API.put(`/achievements/${id}`, { status }),
      ]);
      await fetchAchievements();
    } catch (err) {
      console.error("Failed to update achievement status:", err);
      alert("Failed to update status. Please check backend status endpoint.");
    } finally {
      setProcessingActionId(null);
    }
  };

  const deleteAchievement = async (id: string | number) => {
    try {
      setProcessingActionId(id);
      await requestWithFallback([
        () => API.delete(`/achievements/${id}`),
        () => API.delete(`/achievements/delete/${id}`),
        () => API.delete(`/achievements/remove/${id}`),
      ]);
      await fetchAchievements();
    } catch (err) {
      console.error("Failed to delete achievement:", err);
      alert("Failed to delete achievement. Please check backend delete endpoint.");
    } finally {
      setProcessingActionId(null);
    }
  };

  const clearOldData = async () => {
    if (achievements.length === 0) return;
    const confirmed = window.confirm("Delete all existing achievements? This cannot be undone.");
    if (!confirmed) return;

    try {
      setBulkDeleting(true);
      for (const achievement of achievements) {
        await requestWithFallback([
          () => API.delete(`/achievements/${achievement.id}`),
          () => API.delete(`/achievements/delete/${achievement.id}`),
          () => API.delete(`/achievements/remove/${achievement.id}`),
        ]);
      }
      await fetchAchievements();
      alert("Old data removed. You can now add new records.");
    } catch (err) {
      console.error("Failed to clear old data:", err);
      alert("Could not clear all records. Please verify backend delete APIs.");
    } finally {
      setBulkDeleting(false);
    }
  };

  const addAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.title || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const userId = 1; // temporary user ID
      await API.post(`/achievements/add/${userId}`, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        studentName: formData.studentName,
        date: formData.date,
      });

      // Refresh achievements list
      await fetchAchievements();
      
      // Reset form
      setFormData({
        studentName: "",
        title: "",
        description: "",
        category: "Technical",
        date: new Date().toISOString().split("T")[0],
      });
      setShowForm(false);
      alert("Achievement added successfully!");
    } catch (err) {
      console.error("Failed to add achievement:", err);
      alert("Failed to add achievement. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = achievements.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || (a.studentName || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filter || a.category === filter;
    return matchSearch && matchFilter;
  });

  const columns = [
    { header: "Student", accessor: "studentName" as keyof Achievement },
    { header: "Title", accessor: "title" as keyof Achievement },
    { header: "Category", accessor: "category" as keyof Achievement },
    { header: "Date", accessor: "date" as keyof Achievement },
    { header: "Status", accessor: (row: Achievement) => <StatusBadge status={row.status} /> },
    {
      header: "Actions",
      accessor: (row: Achievement) => (
        <div className="flex gap-2">
          <button
            onClick={() => updateStatus(row.id, "Approved")}
            disabled={processingActionId === row.id}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:bg-gray-200 disabled:text-gray-500 transition"
          >
            Approve
          </button>
          <button
            onClick={() => updateStatus(row.id, "Rejected")}
            disabled={processingActionId === row.id}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:bg-gray-200 disabled:text-gray-500 transition"
          >
            Reject
          </button>
          <button
            onClick={() => deleteAchievement(row.id)}
            disabled={processingActionId === row.id}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 transition"
          >
            {processingActionId === row.id ? "Working..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading && <div className="text-center py-8">Loading achievements...</div>}
      {error && <div className="text-center py-8 text-red-600">{error}</div>}
      {!loading && !error && (
        <>
          <div className="mb-6 flex justify-between items-center">
            <SearchFilter search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} filterOptions={categories} />
            <div className="flex items-center gap-3">
              <button
                onClick={clearOldData}
                disabled={bulkDeleting || achievements.length === 0}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-gray-400 transition font-medium"
              >
                {bulkDeleting ? "Clearing..." : "Clear Old Data"}
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                <Plus size={18} />
                Add Achievement
              </button>
            </div>
          </div>

          {showForm && (
            <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Achievement</h3>
              <form onSubmit={addAchievement} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Student Name *</label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="Student name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Achievement Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Hackathon Winner"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Achievement description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Academic">Academic</option>
                      <option value="Sports">Sports</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Extracurricular">Extracurricular</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition font-medium"
                  >
                    {submitting ? "Adding..." : "Add Achievement"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No achievements found</div>
          ) : (
            <DataTable columns={columns} data={filtered} />
          )}
        </>
      )}
    </div>
  );
};

export default AdminManageAchievements;
