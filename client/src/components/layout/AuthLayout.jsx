import { Compass, Flame, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => (
  <main className="min-h-screen bg-[var(--color-bg)] p-4 md:p-8">
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[1fr_0.9fr]">
      <section className="flex flex-col justify-center p-6 md:p-12">
        <Link to="/" className="mb-10 flex items-center gap-2 font-display text-2xl font-extrabold text-[var(--color-primary)]">
          <Compass className="h-7 w-7" /> HabitQuest
        </Link>
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-3 w-full max-w-[28rem] whitespace-normal text-sm leading-6 text-[var(--color-secondary)]">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </section>
      <section className="relative hidden overflow-hidden bg-[#f6f2fe] p-10 md:block">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-primary)]/20" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[var(--color-quest)]/20" />
        <div className="relative z-10 flex h-full flex-col justify-center">
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--color-secondary)]">Today&apos;s Quest</p>
                <h2 className="mt-1 font-display text-2xl font-extrabold">Build your streak</h2>
              </div>
              <div className="rounded-2xl bg-orange-100 p-3 text-[var(--color-streak)]">
                <Flame className="h-7 w-7 fill-current" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {["Code for 1 hour", "Read for 20 minutes", "Drink 8 cups of water"].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <span className="text-sm font-bold">{item}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${index === 0 ? "bg-emerald-100 text-emerald-700" : "bg-[#eeeafe] text-[var(--color-primary)]"}`}>
                    +{index === 0 ? 30 : 10} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="glass-card rounded-3xl p-5">
              <Sparkles className="h-6 w-6 text-[var(--color-xp)]" />
              <p className="mt-3 font-display text-2xl font-extrabold">380 XP</p>
              <p className="text-xs font-bold text-[var(--color-secondary)]">Level 3</p>
            </div>
            <div className="glass-card rounded-3xl p-5">
              <Trophy className="h-6 w-6 text-[var(--color-badge)]" />
              <p className="mt-3 font-display text-2xl font-extrabold">4 Badges</p>
              <p className="text-xs font-bold text-[var(--color-secondary)]">Unlocked</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
);

export default AuthLayout;
