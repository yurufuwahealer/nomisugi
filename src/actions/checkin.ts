"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getTodayJST } from "@/lib/date";
import { revalidatePath } from "next/cache";

/** ビール 500ml ≒ 200kcal を基準に dailyCost から概算 */
function estimateKcal(dailyCost: number): number {
  // 500円 ≒ ビール2本 ≒ 400kcal として比例計算
  return Math.round((dailyCost / 500) * 400);
}

export async function checkin(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;
  const didDrink = formData.get("didDrink") === "true";

  // ユーザーの最初の Habit を取得
  const habit = await prisma.habit.findFirst({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  if (!habit) throw new Error("Habit not found");

  const today = getTodayJST();
  const savedYen = didDrink ? 0 : habit.dailyCost;
  const savedKcal = didDrink ? 0 : estimateKcal(habit.dailyCost);

  await prisma.checkin.upsert({
    where: { userId_date: { userId, date: today } },
    create: {
      userId,
      date: today,
      didDrink,
      savedYen,
      savedKcal,
    },
    update: {
      didDrink,
      savedYen,
      savedKcal,
    },
  });

  revalidatePath("/");
}
