const LoadingSkeleton = ({ count = 3, className = "grid gap-4 md:grid-cols-3" }) => (
  <div className={className}>
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="ambient-card rounded-2xl p-5">
        <div className="h-4 w-24 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-4 h-8 w-32 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-6 h-3 w-full animate-pulse rounded-full bg-slate-100" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
