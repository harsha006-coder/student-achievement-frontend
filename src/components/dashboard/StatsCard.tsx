import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "primary" | "success" | "warning" | "secondary";
}

const gradientMap = {
  primary: "linear-gradient(135deg, hsl(239 84% 67%), hsl(270 60% 60%))",
  success: "linear-gradient(135deg, hsl(142 71% 45%), hsl(160 60% 50%))",
  warning: "linear-gradient(135deg, hsl(38 92% 50%), hsl(25 95% 55%))",
  secondary: "linear-gradient(135deg, hsl(270 60% 60%), hsl(300 50% 55%))",
};

const accentMap = {
  primary: "linear-gradient(90deg, hsl(239 84% 67%), hsl(270 60% 60%))",
  success: "linear-gradient(90deg, hsl(142 71% 45%), hsl(160 60% 50%))",
  warning: "linear-gradient(90deg, hsl(38 92% 50%), hsl(25 95% 55%))",
  secondary: "linear-gradient(90deg, hsl(270 60% 60%), hsl(300 50% 55%))",
};

const StatsCard = ({ title, value, icon: Icon, trend, color = "primary" }: StatsCardProps) => (
  <div className="relative overflow-hidden p-6 group bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
    {/* Accent line */}
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accentMap[color] }} />

    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: gradientMap[color] }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full border border-green-200">
          {trend}
        </span>
      )}
    </div>
    <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
    <p className="text-sm text-gray-500 mt-1 font-medium">{title}</p>
  </div>
);

export default StatsCard;
