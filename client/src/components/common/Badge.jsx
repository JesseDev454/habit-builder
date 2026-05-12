const tones = {
  purple: "bg-[#eeeafe] text-[var(--color-primary)]",
  gold: "bg-amber-100 text-amber-700",
  orange: "bg-orange-100 text-orange-700",
  green: "bg-emerald-100 text-emerald-700",
  blue: "bg-sky-100 text-sky-700",
  pink: "bg-pink-100 text-pink-700",
  slate: "bg-slate-100 text-slate-600",
};

const Badge = ({ children, tone = "purple", className = "" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tones[tone]} ${className}`}>
    {children}
  </span>
);

export default Badge;
