import { Header } from "@/components/Header";
import { StreakCard } from "@/components/StreakCard";
import { CheckinButtons } from "@/components/CheckinButtons";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { SavingsSummary } from "@/components/SavingsSummary";
import { WishList } from "@/components/WishList";

// --- Mock Data ---
const STREAK_DAYS = 12;
const CHECKED_IN = false;
const SAVED_YEN = 12600;
const SAVED_KCAL = 3780;

const WEEKLY_DAYS = [
  { label: "月", status: "sober" as const },
  { label: "火", status: "sober" as const },
  { label: "水", status: "drink" as const },
  { label: "木", status: "sober" as const },
  { label: "金", status: "sober" as const },
  { label: "土", status: "future" as const },
  { label: "日", status: "future" as const },
];
const TODAY_INDEX = 4; // 金曜日

const WISHES = [
  { emoji: "🎧", name: "AirPods Pro", price: 39800, savedYen: 12600 },
  { emoji: "✈️", name: "温泉旅行", price: 30000, savedYen: 12600 },
];

// --- Page ---
export default function Home() {
  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        <Header />

        <StreakCard streakDays={STREAK_DAYS} />
        <CheckinButtons checkedIn={CHECKED_IN} />
        <WeeklyCalendar days={WEEKLY_DAYS} todayIndex={TODAY_INDEX} />
        <SavingsSummary savedYen={SAVED_YEN} savedKcal={SAVED_KCAL} />
        <WishList wishes={WISHES} />
      </div>
    </div>
  );
}
