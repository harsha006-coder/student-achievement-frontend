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

function DataTable<T extends { id: string }>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((col, i) => (
                <th key={i} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 last:border-0 transition-colors duration-200 hover:bg-indigo-50">
                {columns.map((col, i) => (
                  <td key={i} className="px-4 py-3 text-sm text-gray-900">
                    {typeof col.accessor === "function" ? col.accessor(row) : String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
