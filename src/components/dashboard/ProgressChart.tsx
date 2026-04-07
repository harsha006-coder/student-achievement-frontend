import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ProgressChartProps {
  approved: number;
  pending: number;
  rejected: number;
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const ProgressChart = ({ approved, pending, rejected }: ProgressChartProps) => {
  const data = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ];

  const total = approved + pending + rejected;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full h-full min-h-[180px] animate-scale-in">
      <h2 className="text-[13px] font-bold text-gray-900 mb-1">Progress Overview</h2>
      <p className="text-[11px] text-gray-400 mb-2">Achievement status breakdown</p>

      <div className="w-full h-36 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={45}
              outerRadius={65}
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
                fontWeight: 600
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-gray-900">{total}</p>
            <p className="text-[10px] text-gray-400 font-medium">Total</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-1">
        {data.map((entry, i) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
            <span className="text-[11px] text-gray-500 font-medium">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;
