import { CheckCircle, Clock, XCircle, HelpCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "Approved" | "Pending" | "Rejected" | string | null;
}

const statusConfig: Record<string, { bg: string; text: string; border: string; icon: typeof CheckCircle }> = {
  Approved: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle },
  Pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: Clock },
  Rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: XCircle },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const displayStatus = status || "Unknown";
  const config = statusConfig[displayStatus] || {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
    icon: HelpCircle,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${config.bg} ${config.text} ${config.border}`}
    >
      <Icon className="w-3 h-3" />
      {displayStatus}
    </span>
  );
};

export default StatusBadge;
