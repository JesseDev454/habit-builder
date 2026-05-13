// Settings page:
// presentation-friendly control panel for account info, preferences, and demo polish toggles.
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedNumber from "../components/common/AnimatedNumber";
import MaterialIcon from "../components/common/MaterialIcon";
import { getDashboardAnalytics } from "../api/analyticsApi";
import useAppAvatar from "../hooks/useAppAvatar";
import useAuth from "../hooks/useAuth";

const SETTINGS_STORAGE_KEY = "habitquest_settings";

const defaultSettings = {
  notifications: {
    badges: true,
    levelUps: true,
    challenges: true,
    streaks: true,
  },
  appearance: {
    darkMode: false,
    reducedMotion: false,
  },
  privacy: {
    showProgress: true,
    remindBeforeDemo: true,
  },
};

// Reusable toggle row so settings sections stay visually consistent.
const ToggleRow = ({ checked, description, icon, label, onToggle }) => (
  <div className="motion-card flex items-center justify-between gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4">
    <div className="min-w-0">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-primary">
          <MaterialIcon name={icon} />
        </div>
        <div>
          <h3 className="text-label-sm text-on-surface">{label}</h3>
          <p className="text-[13px] text-on-surface-variant">{description}</p>
        </div>
      </div>
    </div>
    <button
      aria-pressed={checked}
      className={`relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300 ${checked ? "bg-primary" : "bg-surface-container-highest"}`}
      onClick={onToggle}
      type="button"
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-surface-container-lowest shadow-sm transition-all duration-300 ${checked ? "left-7" : "left-1"}`}
      />
    </button>
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const avatarSrc = useAppAvatar();
  const { user, logout, updateUser } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    // Restore demo preferences from localStorage when the page opens.
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      } catch {
        setSettings(defaultSettings);
      }
    }
  }, []);

  useEffect(() => {
    // Persist settings locally and apply visual classes immediately.
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.classList.toggle("dark", Boolean(settings.appearance.darkMode));
    document.documentElement.classList.toggle("reduce-motion", Boolean(settings.appearance.reducedMotion));
  }, [settings]);

  useEffect(() => {
    // Reuse dashboard analytics so Settings can show real account progress.
    getDashboardAnalytics()
      .then((data) => {
        setDashboard(data);
        updateUser(data.user);
        setError("");
      })
      .catch((loadError) => {
        setDashboard(null);
        setError(loadError.message || "Could not load settings.");
      });
  }, [updateUser]);

  const safeUser = dashboard?.user || user;
  const levelProgress = dashboard?.levelProgress;
  const quickStats = useMemo(
    () => [
      { label: "Level", value: safeUser?.level ?? 1, icon: "military_tech" },
      { label: "XP", value: safeUser?.totalXP ?? 0, icon: "stars" },
      { label: "Coins", value: safeUser?.coins ?? 0, icon: "monetization_on" },
    ],
    [safeUser?.coins, safeUser?.level, safeUser?.totalXP]
  );

  // Flip a single boolean within one nested settings section.
  const updateSection = (section, key) => {
    setSettings((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: !current[section][key],
      },
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="animate-page-in space-y-8">
      <header className="motion-card rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img alt={`${safeUser?.name || "Hero"} avatar`} className="h-16 w-16 rounded-full border-4 border-primary-fixed object-cover shadow-sm" src={avatarSrc} />
            <div>
              <p className="text-label-sm uppercase tracking-[0.08em] text-primary">Settings</p>
              <h1 className="text-headline-lg text-on-surface">Presentation Control Center</h1>
              <p className="text-body-base text-on-surface-variant">Tidy up your account, polish the demo experience, and keep the app feeling intentional.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickStats.map((item) => (
              <div className="motion-card min-w-[92px] rounded-xl bg-surface-container p-4 text-center" key={item.label}>
                <MaterialIcon className="mb-2 text-primary" name={item.icon} />
                <p className="text-title-md text-on-surface">
                  <AnimatedNumber value={item.value} />
                </p>
                <p className="text-badge-xs text-on-surface-variant">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface-container-highest">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${Math.max(levelProgress?.progressPercent ?? 0, 0)}%` }} />
        </div>
      </header>

      {error ? (
        <div className="rounded-xl border border-error-container bg-surface-container-lowest p-4 text-body-base text-error">
          {error}
        </div>
      ) : null}

      <section className="grid gap-gutter lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-gutter">
          <div className="motion-card rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
            <div className="mb-5 flex items-center gap-3">
              <MaterialIcon className="text-primary" name="person" />
              <div>
                <h2 className="text-title-md text-on-surface">Profile & Account</h2>
                <p className="text-[13px] text-on-surface-variant">The essentials you would expect to check before presenting.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-surface-container p-4">
                <p className="text-badge-xs uppercase tracking-[0.08em] text-on-surface-variant">Name</p>
                <p className="mt-2 text-body-base text-on-surface">{safeUser?.name || "Hero"}</p>
              </div>
              <div className="rounded-xl bg-surface-container p-4">
                <p className="text-badge-xs uppercase tracking-[0.08em] text-on-surface-variant">Email</p>
                <p className="mt-2 text-body-base text-on-surface">{safeUser?.email || "No email available"}</p>
              </div>
            </div>
          </div>

          <div className="motion-card rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
            <div className="mb-5 flex items-center gap-3">
              <MaterialIcon className="text-secondary" name="notifications_active" />
              <div>
                <h2 className="text-title-md text-on-surface">Notification Preferences</h2>
                <p className="text-[13px] text-on-surface-variant">These controls are stored locally for the presentation build.</p>
              </div>
            </div>
            <div className="space-y-4">
              <ToggleRow checked={settings.notifications.badges} description="Celebrate badge unlocks as soon as they happen." icon="workspace_premium" label="Badge unlocks" onToggle={() => updateSection("notifications", "badges")} />
              <ToggleRow checked={settings.notifications.levelUps} description="Show level-up moments during completions." icon="star" label="Level-up moments" onToggle={() => updateSection("notifications", "levelUps")} />
              <ToggleRow checked={settings.notifications.challenges} description="Keep challenge progress and completions visible." icon="swords" label="Challenge updates" onToggle={() => updateSection("notifications", "challenges")} />
              <ToggleRow checked={settings.notifications.streaks} description="Highlight streak milestones while presenting." icon="local_fire_department" label="Streak milestones" onToggle={() => updateSection("notifications", "streaks")} />
            </div>
          </div>
        </div>

        <div className="space-y-gutter">
          <div className="motion-card rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
            <div className="mb-5 flex items-center gap-3">
              <MaterialIcon className="text-tertiary" name="palette" />
              <div>
                <h2 className="text-title-md text-on-surface">Appearance</h2>
                <p className="text-[13px] text-on-surface-variant">Small touches that keep the demo feeling polished.</p>
              </div>
            </div>
            <div className="space-y-4">
              <ToggleRow checked={settings.appearance.darkMode} description="Switch the app into dark mode using the existing class-based theme support." icon="dark_mode" label="Dark mode" onToggle={() => updateSection("appearance", "darkMode")} />
              <ToggleRow checked={settings.appearance.reducedMotion} description="Reduce motion if you want a calmer presentation mode." icon="animation" label="Presentation motion" onToggle={() => updateSection("appearance", "reducedMotion")} />
            </div>
          </div>

          <div className="motion-card rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
            <div className="mb-5 flex items-center gap-3">
              <MaterialIcon className="text-primary" name="verified_user" />
              <div>
                <h2 className="text-title-md text-on-surface">Privacy & Preferences</h2>
                <p className="text-[13px] text-on-surface-variant">Useful presentation-safe controls people expect to see in settings.</p>
              </div>
            </div>
            <div className="space-y-4">
              <ToggleRow checked={settings.privacy.showProgress} description="Keep XP, progress bars, and streaks visible across the demo." icon="leaderboard" label="Show progress publicly" onToggle={() => updateSection("privacy", "showProgress")} />
              <ToggleRow checked={settings.privacy.remindBeforeDemo} description="Keep presentation reminders and prep cues switched on." icon="tips_and_updates" label="Demo reminders" onToggle={() => updateSection("privacy", "remindBeforeDemo")} />
            </div>
          </div>

          <div className="motion-card rounded-xl bg-primary-container p-6 text-on-primary-container shadow-[0px_8px_30px_rgba(83,65,205,0.18)]">
            <h2 className="text-title-md">Support & Quick Links</h2>
            <p className="mt-2 text-body-base text-on-primary-container/80">
              Jump to the views most useful during your presentation and keep your story flowing.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-xl bg-primary px-4 py-2 text-label-sm text-on-primary transition-transform hover:scale-[1.02]" onClick={() => navigate("/analytics")} type="button">
                Open Analytics
              </button>
              <button className="rounded-xl bg-surface/20 px-4 py-2 text-label-sm text-on-primary-container transition-transform hover:scale-[1.02]" onClick={() => navigate("/achievements")} type="button">
                Open Achievements
              </button>
              <button className="rounded-xl bg-surface/20 px-4 py-2 text-label-sm text-on-primary-container transition-transform hover:scale-[1.02]" onClick={() => navigate("/notifications")} type="button">
                View Notifications
              </button>
            </div>
            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-surface/20 px-4 py-3 text-label-sm text-on-primary-container transition-all hover:bg-surface/30" onClick={handleLogout} type="button">
              <MaterialIcon name="logout" />
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
