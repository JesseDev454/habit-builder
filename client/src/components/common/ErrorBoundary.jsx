import { Component } from "react";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-app-bg p-6 text-text-primary">
          <section className="w-full max-w-[32rem] rounded-3xl border border-border-neutral bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <p className="text-sm font-bold uppercase tracking-wide text-error-red">HabitQuest render error</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold">The app hit a screen error.</h1>
            <p className="mt-3 text-sm text-text-secondary">
              Refresh the page after the dev server restarts. If this stays visible, check the browser console for the component stack.
            </p>
            <pre className="mt-5 max-h-40 overflow-auto rounded-2xl bg-slate-950 p-4 text-left text-xs text-white">
              {this.state.error?.message || "Unknown render error"}
            </pre>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
