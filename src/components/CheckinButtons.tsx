type Props = {
  checkedIn: boolean;
};

export function CheckinButtons({ checkedIn }: Props) {
  if (checkedIn) {
    return (
      <div className="rounded-r bg-bg2 border border-border p-4">
        <div className="rounded-r2 bg-green-dim p-4 text-center text-green font-medium">
          今日の記録済み
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-r bg-bg2 border border-border p-4">
      <p className="text-sm text-text2 mb-3">今日の記録</p>
      <div className="flex gap-3">
        <button className="flex-1 rounded-r2 bg-green-dim text-green font-medium py-3 px-4">
          飲まなかった
        </button>
        <button className="flex-1 rounded-r2 bg-red-dim text-red font-medium py-3 px-4">
          飲んでしまった
        </button>
      </div>
    </div>
  );
}
