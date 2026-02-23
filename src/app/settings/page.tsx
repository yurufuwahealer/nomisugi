import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { createHabit, updateHabit, deleteHabit } from "@/actions/habit";
import { HabitSettings } from "@/components/HabitSettings";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-text">設定</h1>
            <p className="text-sm text-text3">習慣の管理</p>
          </div>
          <Link
            href="/"
            className="text-sm text-text3 hover:text-text transition"
          >
            ダッシュボードへ戻る
          </Link>
        </header>

        <HabitSettings
          habits={habits.map((h) => ({
            id: h.id,
            type: h.type,
            name: h.name,
            dailyCost: h.dailyCost,
            frequency: h.frequency,
            goalType: h.goalType,
            goalDays: h.goalDays,
          }))}
          createAction={createHabit}
          updateAction={updateHabit}
          deleteAction={deleteHabit}
        />
      </div>
    </div>
  );
}
