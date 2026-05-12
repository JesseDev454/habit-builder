import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-sm",
  secondary: "bg-[var(--color-lavender)] text-[var(--color-primary)] hover:bg-[#e4dfff]",
  ghost: "bg-transparent text-[var(--color-secondary)] hover:bg-[#f6f2fe]",
  outline: "border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:bg-slate-50",
  success: "bg-[var(--color-success)] text-white hover:brightness-95",
};

const Button = ({ children, variant = "primary", className = "", loading = false, ...props }) => (
  <button
    className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none ${variants[variant]} ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    {children}
  </button>
);

export default Button;
