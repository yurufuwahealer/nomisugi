type Props = {
  streakDays: number;
};

export function StreakCard({ streakDays }: Props) {
  return (
    <div className="rounded-r bg-bg2 border border-border p-4">
      <p className="text-sm text-text2 mb-3">連続記録</p>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-6xl text-amber">{streakDays}</span>
        <span className="text-text2 text-lg">日 飲まなかった</span>
      </div>
    </div>
  );
}
