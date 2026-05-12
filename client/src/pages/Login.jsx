import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const setField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      toast.error("Please enter your login details.");
      return;
    }

    try {
      setSubmitting(true);
      await login({
        email: form.email.trim(),
        password: form.password,
      });
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Could not log in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-margin_mobile text-on-background md:p-margin_desktop">
      <section className="relative flex w-full max-w-[1100px] flex-col overflow-hidden rounded-[24px] bg-surface-container-lowest shadow-[0px_4px_20px_rgba(15,23,42,0.05)] md:flex-row">
        <aside className="relative hidden overflow-hidden bg-primary p-12 md:flex md:w-5/12 md:flex-col md:justify-between">
          <div className="absolute inset-0 z-0">
            <img
              className="h-full w-full object-cover opacity-40 mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv_jHo4eqTsoweGxPRcrWVr58EKPbZUtcOfDGggaH-hR-5NOhjjyZwHoV1AAZSytTB5Aj1srY-_U6gS4EEMfJFFwIpmfcaztLR7mL0arw_R4lHjDn6vU3G-zPg4RDMRGlkuImxmQri8ktW7Lc3WOROoP_7cgzJudFFM8N6at_wnX7c9nikltz8u1E3AvtK3imxqPJsJF6srWmEQ7u0ZpJg_0PoGLDfBffsOUXVxPmrDyaqV5cDGCkTf-9KlFw9ZKOJ1XlWC5N3m2ed"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/80 to-primary" />
          </div>

          <div className="relative z-20 flex h-full flex-col">
            <div className="mb-12 flex items-center gap-2">
              <MaterialIcon className="text-[32px] text-on-primary" name="swords" />
              <span className="text-headline-lg-mobile font-black tracking-tight text-on-primary">HabitQuest</span>
            </div>

            <div className="mt-auto">
              <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-surface/30 bg-surface/20 px-3 py-1.5 text-badge-xs text-on-primary backdrop-blur-sm">
                <MaterialIcon className="text-[14px]" name="workspace_premium" />
                Continue the Quest
              </span>
              <h1 className="mb-4 text-display-xl leading-tight text-on-primary">Welcome back, hero.</h1>
              <p className="w-full max-w-[24rem] whitespace-normal text-body-base text-primary-fixed-dim">
                Return to your dashboard, keep the streak alive, and pick up where your adventure left off.
              </p>
            </div>
          </div>

          <div className="absolute right-[-50px] top-[-50px] z-10 h-64 w-64 rounded-full bg-primary-container/30 blur-3xl" />
          <div className="absolute bottom-[-100px] left-[-50px] z-10 h-80 w-80 rounded-full bg-secondary-container/20 blur-3xl" />
        </aside>

        <section className="flex w-full flex-col justify-center bg-surface-container-lowest p-8 md:w-7/12 md:p-16">
          <div className="mb-8 flex items-center justify-center gap-2 md:hidden">
            <MaterialIcon className="text-[28px] text-primary" name="swords" />
            <span className="text-headline-lg-mobile font-black tracking-tight text-primary">HabitQuest</span>
          </div>

          <div className="mx-auto w-full max-w-[420px]">
            <div className="mb-10 text-center md:text-left">
              <h2 className="mb-2 text-headline-lg text-on-background">Login</h2>
              <p className="text-body-base text-on-surface-variant">Jump back in and continue tracking today.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="ml-1 block text-label-sm text-on-surface" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant/50">
                    <MaterialIcon className="text-[20px]" name="mail" />
                  </div>
                  <input
                    className="w-full rounded-xl border border-outline-variant bg-surface py-3.5 pl-11 pr-4 text-body-base text-on-surface shadow-sm outline-none transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-4 focus:ring-primary/20"
                    id="email"
                    onChange={setField("email")}
                    placeholder="you@realm.com"
                    type="email"
                    value={form.email}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="ml-1 block text-label-sm text-on-surface" htmlFor="password">
                  Secret Code
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant/50">
                    <MaterialIcon className="text-[20px]" name="lock" />
                  </div>
                  <input
                    className="w-full rounded-xl border border-outline-variant bg-surface py-3.5 pl-11 pr-4 text-body-base text-on-surface shadow-sm outline-none transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-4 focus:ring-primary/20"
                    id="password"
                    onChange={setField("password")}
                    placeholder="••••••••"
                    type="password"
                    value={form.password}
                  />
                </div>
              </div>

              <button
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-label-sm text-on-primary shadow-[0_4px_14px_0_rgba(83,65,205,0.39)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(83,65,205,0.23)] active:scale-95"
                disabled={submitting}
                type="submit"
              >
                {submitting ? "Logging In..." : "Continue Your Quest"}
                <MaterialIcon className="text-[18px] transition-transform group-hover:translate-x-1" name="arrow_forward" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-body-base text-on-surface-variant">
                Need an account?
                <Link className="ml-1 text-label-sm text-primary hover:underline" to="/register">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Login;
