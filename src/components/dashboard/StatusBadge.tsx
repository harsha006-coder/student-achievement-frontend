interface StatusBadgeProps {
  status: "Approved" | "Pending" | "Rejected";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
