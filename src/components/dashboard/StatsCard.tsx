import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "primary" | "success" | "warning" | "secondary";
}

const gradientMap = {
  primary: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  success: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  warning: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
  secondary: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
};

const iconBgMap = {
  primary: "rgba(99,102,241,0.1)",
  success: "rgba(16,185,129,0.1)",
  warning: "rgba(245,158,11,0.1)",
  secondary: "rgba(139,92,246,0.1)",
};

const iconColorMap = {
  primary: "#6366f1",
  success: "#10b981",
  warning: "#f59e0b",
  secondary: "#8b5cf6",
};

const StatsCard = ({ title, value, icon: Icon, trend, color = "primary" }: StatsCardProps) => {
  const isPositive = trend?.startsWith("+");

  return (
    <div className="group relative w-full overflow-hidden p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200/80 transition-all duration-300 hover:-translate-y-1 animate-scale-in">
      {/* Subtle gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ background: gradientMap[color] }}
      />

      {/* Decorative background circle */}
      <div
        className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
        style={{ background: gradientMap[color] }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: iconBgMap[color] }}
          >
            <Icon className="w-5 h-5" style={{ color: iconColorMap[color] }} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              isPositive
                ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                : "text-red-700 bg-red-50 border border-red-100"
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend}
            </div>
          )}
        </div>
        <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</p>
        <p className="text-[13px] text-gray-500 mt-1 font-medium">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
