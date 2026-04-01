import { useEffect, useState } from "react";
import API from "@/lib/api";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import SearchFilter from "@/components/dashboard/SearchFilter";

type Achievement = {
  id: number;
  title: string;
  category: string;
  date: string;
  status: string | null;
};

const AdminReport = () => {
  const [data, setData] = useState<Achievement[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // 🔥 Fetch from backend
  useEffect(() => {
    API.get("/achievements/all")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔥 Dynamic categories
  const categories = [...new Set(data.map(a => a.category))];

  // 🔥 Table columns
  const columns = [
    { header: "Title", accessor: "title" as keyof Achievement },
    { header: "Category", accessor: "category" as keyof Achievement },
    { header: "Date", accessor: "date" as keyof Achievement },
    { header: "Status", accessor: (row: Achievement) => <StatusBadge status={row.status} /> },
  ];

  // 🔥 Filter logic
  const filtered = data.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filter || a.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">System Report</h2>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        filterOptions={categories}
      />

      <DataTable columns={columns} data={filtered} />
    </div>
  );
};

export default AdminReport;