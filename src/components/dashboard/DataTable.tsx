import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

function DataTable<T extends { id: string | number }>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="rounded-2xl shadow-sm overflow-hidden border border-gray-100 bg-white animate-scale-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400 bg-gray-50/80"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={String(row.id)}
                className="border-b border-gray-50 last:border-0 transition-colors duration-150 hover:bg-indigo-50/40 group"
                style={{ animationDelay: `${rowIndex * 50}ms` }}
              >
                {columns.map((col, i) => (
                  <td key={i} className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                    {typeof col.accessor === "function" ? col.accessor(row) : String(row[col.accessor] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          <p className="text-lg mb-1">📭</p>
          No data available
        </div>
      )}
    </div>
  );
}

export default DataTable;
