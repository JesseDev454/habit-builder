import { Sparkles } from "lucide-react";
import Button from "./Button";
import Card from "./Card";

const EmptyState = ({ title = "Nothing here yet", message = "Start a new quest to fill this space.", action = "Create habit", secondaryAction, onAction, onSecondaryAction }) => (
  <Card className="text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eeeafe] text-[var(--color-primary)]">
      <Sparkles className="h-7 w-7" />
    </div>
    <h3 className="font-display text-xl font-bold">{title}</h3>
    <p className="mx-auto mt-2 w-full max-w-[28rem] whitespace-normal text-sm text-[var(--color-secondary)]">{message}</p>
    <div className="mt-5 flex flex-wrap justify-center gap-3">
      {action ? <Button onClick={onAction}>{action}</Button> : null}
      {secondaryAction ? <Button variant="secondary" onClick={onSecondaryAction}>{secondaryAction}</Button> : null}
    </div>
  </Card>
);

export default EmptyState;
