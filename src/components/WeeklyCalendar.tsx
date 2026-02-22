type DayStatus = "sober" | "drink" | "future";

type Props = {
  days: Array<{ label: string; status: DayStatus }>;
  todayIndex: number;
};

const statusStyles: Record<DayStatus, string> = {
  sober: "bg-green-dim text-green",
  drink: "bg-red-dim text-red",
  future: "bg-bg3 text-text3",
};

const statusIcon: Record<DayStatus, string> = {
  sober: "○",
  drink: "×",
  future: "−",
};

export function WeeklyCalendar({ days, todayIndex }: Props) {
  return (
    <div className="rounded-r bg-bg2 border border-border p-4">
      <p className="text-sm text-text2 mb-3">今週の記録</p>
      <div className="flex justify-between">
        {days.map((day, i) => (
          <div key={day.label} className="flex flex-col items-center gap-1">
            <span className="text-xs text-text3">{day.label}</span>
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${statusStyles[day.status]} ${i === todayIndex ? "ring-2 ring-amber" : ""}`}
            >
              {statusIcon[day.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
