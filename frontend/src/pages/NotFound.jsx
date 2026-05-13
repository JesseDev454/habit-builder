import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/common/Button";

const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] p-6">
    <div className="w-full max-w-[32rem] text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eeeafe] text-[var(--color-primary)]">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-display text-5xl font-extrabold">Quest not found</h1>
      <p className="mt-3 text-[var(--color-secondary)]">This path is not part of the current Sprint 0 map.</p>
      <Link to="/dashboard"><Button className="mt-6">Back to dashboard</Button></Link>
    </div>
  </main>
);

export default NotFound;
