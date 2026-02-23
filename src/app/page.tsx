import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getTodayJST, getWeekRangeJST, addDaysJST } from "@/lib/date";
import { Header } from "@/components/Header";
import { StreakCard } from "@/components/StreakCard";
import { CheckinButtons } from "@/components/CheckinButtons";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { SavingsSummary } from "@/components/SavingsSummary";
import { WishList } from "@/components/WishList";
import Link from "next/link";

/** 今日/昨日から遡って連続 didDrink=false の日数を数える */
async function calcStreak(userId: string): Promise<number> {
  const today = getTodayJST();
  let streak = 0;
  let cursor = today;

  // 今日のチェックインがまだなら昨日から数え始める
  const todayCheckin = await prisma.checkin.findUnique({
    where: { userId_date: { userId, date: today } },
  });

  if (!todayCheckin) {
    cursor = addDaysJST(today, -1);
  }

  // 最大365日遡る
  for (let i = 0; i < 365; i++) {
    const ci = await prisma.checkin.findUnique({
      where: { userId_date: { userId, date: cursor } },
    });
    if (!ci || ci.didDrink) break;
    streak++;
    cursor = addDaysJST(cursor, -1);
  }

  return streak;
}

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  const habit = userId
    ? await prisma.habit.findFirst({
        where: { userId },
        orderBy: { createdAt: "asc" },
      })
    : null;

  if (!userId || !habit) {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <Header />
          <div className="rounded-r bg-bg2 border border-border p-6 text-center flex flex-col gap-3">
            <p className="text-lg font-bold text-text">
              まずは習慣を登録しましょう
            </p>
            <p className="text-sm text-text2">
              やめたい・減らしたい習慣を設定すると、節約額やカロリーを記録できます
            </p>
            <Link
              href="/settings"
              className="mx-auto rounded-r2 bg-amber px-6 py-2 text-sm font-bold text-black hover:opacity-90 transition"
            >
              設定ページへ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- 今日のチェックイン状態 ---
  const today = getTodayJST();
  const todayCheckin = await prisma.checkin.findUnique({
    where: { userId_date: { userId, date: today } },
  });
  const checkedIn = !!todayCheckin;

  // --- ストリーク ---
  const streakDays = await calcStreak(userId);

  // --- 週間カレンダー ---
  const { days: weekDays, todayIndex } = getWeekRangeJST();
  const weekCheckins = await prisma.checkin.findMany({
    where: {
      userId,
      date: { gte: weekDays[0].date, lte: weekDays[6].date },
    },
  });
  const checkinMap = new Map(
    weekCheckins.map((c) => [c.date.getTime(), c])
  );

  const calendarDays = weekDays.map((wd, i) => {
    const ci = checkinMap.get(wd.date.getTime());
    let status: "sober" | "drink" | "future";
    if (i > todayIndex) {
      status = "future";
    } else if (!ci) {
      status = "future"; // 未記録は future 扱い
    } else {
      status = ci.didDrink ? "drink" : "sober";
    }
    return { label: wd.label, status };
  });

  // --- 節約サマリー（全 Checkin 合算） ---
  const savingsAgg = await prisma.checkin.aggregate({
    where: { userId },
    _sum: { savedYen: true, savedKcal: true },
  });
  const savedYen = savingsAgg._sum.savedYen ?? 0;
  const savedKcal = savingsAgg._sum.savedKcal ?? 0;

  // --- Wish を DB から取得 ---
  const wishes = await prisma.wish.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  const wishesWithSaved = wishes.map((w) => ({
    emoji: w.emoji,
    name: w.name,
    price: w.price,
    savedYen,
  }));

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        <Header />
        <StreakCard streakDays={streakDays} />
        <CheckinButtons checkedIn={checkedIn} didDrink={todayCheckin?.didDrink} />
        <WeeklyCalendar days={calendarDays} todayIndex={todayIndex} />
        <SavingsSummary savedYen={savedYen} savedKcal={savedKcal} />
        <WishList wishes={wishesWithSaved} />
      </div>
    </div>
  );
}
