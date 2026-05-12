const Input = ({ label, className = "", ...props }) => (
  <label className="block">
    {label && <span className="mb-2 block text-sm font-semibold text-[var(--color-text)]">{label}</span>}
    <input
      className={`w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[#eeeafe] ${className}`}
      {...props}
    />
  </label>
);

export default Input;
