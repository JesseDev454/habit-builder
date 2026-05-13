import Button from "./Button";
import Card from "./Card";

const ConfirmationModal = ({
  isOpen = true,
  title = "Archive habit?",
  message = "This action can be changed later by an admin.",
  confirmLabel = "Confirm",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
      <Card className="w-full max-w-[28rem]">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm text-[var(--color-secondary)]">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel} type="button">Cancel</Button>
          <Button loading={loading} onClick={onConfirm} type="button">{confirmLabel}</Button>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmationModal;
