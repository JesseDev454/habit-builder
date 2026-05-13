const StatusChip = ({ status }) => {
  const active = status === "Active";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${active ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
      {status}
    </span>
  );
};

export default StatusChip;
