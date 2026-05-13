const ProgressBar = ({ value = 0, color = "var(--color-primary)", className = "" }) => (
  <div className={`h-3 overflow-hidden rounded-full bg-slate-100 ${className}`}>
    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }} />
  </div>
);

export default ProgressBar;
