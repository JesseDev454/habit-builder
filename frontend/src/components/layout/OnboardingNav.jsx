const OnboardingNav = ({ step }) => (
  <header className="sticky top-0 z-40 w-full bg-surface-container-lowest shadow-sm">
    <div className="flex h-16 w-full items-center justify-between px-lg">
      <div className="font-page-heading text-section-heading font-extrabold text-primary">HabitQuest</div>
      <div className="font-label-sm text-label-sm font-medium text-text-secondary">{step}</div>
    </div>
  </header>
);

export default OnboardingNav;
