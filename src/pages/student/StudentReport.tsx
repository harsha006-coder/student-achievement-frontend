import { useEffect, useState } from "react";
import API from "@/lib/api";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import type { Achievement } from "@/lib/types";

const columns = [
  { header: "Title", accessor: "title" as keyof Achievement },
  { header: "Category", accessor: "category" as keyof Achievement },
  { header: "Date", accessor: "date" as keyof Achievement },
  { header: "Status", accessor: (row: Achievement) => <StatusBadge status={row.status} /> },
];

const StudentReport = () => {
  const [data, setData] = useState<Achievement[]>([]);
  const userId = 1; // 🔥 later replace with login

  useEffect(() => {
    API.get(`/achievements/student/${userId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievement Report</h2>
      <DataTable columns={columns} data={data.slice(0, 5)} />
    </div>
  );
};

export default StudentReport;