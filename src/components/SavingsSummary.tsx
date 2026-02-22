type Props = {
  savedYen: number;
  savedKcal: number;
};

export function SavingsSummary({ savedYen, savedKcal }: Props) {
  return (
    <div className="rounded-r bg-bg2 border border-border p-4">
      <p className="text-sm text-text2 mb-3">節約サマリー</p>
      <div className="flex gap-3">
        <div className="flex-1 rounded-r2 bg-amber-dim p-3">
          <p className="text-xs text-text2 mb-1">節約額</p>
          <p className="font-mono text-xl text-amber">
            &yen;{savedYen.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 rounded-r2 bg-bg3 p-3">
          <p className="text-xs text-text2 mb-1">カロリー</p>
          <p className="font-mono text-xl text-text">
            {savedKcal.toLocaleString()}
            <span className="text-sm text-text2 ml-1">kcal</span>
          </p>
        </div>
      </div>
    </div>
  );
}
