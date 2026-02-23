import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** JST 00:00 固定の Date を作る（seed用） */
function jstDate(y: number, m: number, d: number): Date {
  return new Date(Date.UTC(y, m - 1, d));
}

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "dev@example.com" },
    update: {},
    create: {
      email: "dev@example.com",
      name: "Dev User",
      password: "password123",
    },
  });

  console.log(`Seeded user: ${user.email} (id: ${user.id})`);

  const habit = await prisma.habit.upsert({
    where: { id: "seed-habit-beer" },
    update: {},
    create: {
      id: "seed-habit-beer",
      userId: user.id,
      type: "alcohol",
      name: "ビール",
      dailyCost: 500,
      frequency: 5,
      goalType: "reduce",
      goalDays: 2,
    },
  });

  console.log(`Seeded habit: ${habit.name} (id: ${habit.id})`);

  // --- サンプル Wish データ ---
  const wish1 = await prisma.wish.upsert({
    where: { id: "seed-wish-airpods" },
    update: {},
    create: {
      id: "seed-wish-airpods",
      userId: user.id,
      name: "AirPods Pro",
      price: 39800,
      emoji: "🎧",
      type: "item",
    },
  });
  console.log(`Seeded wish: ${wish1.name} (id: ${wish1.id})`);

  const wish2 = await prisma.wish.upsert({
    where: { id: "seed-wish-onsen" },
    update: {},
    create: {
      id: "seed-wish-onsen",
      userId: user.id,
      name: "温泉旅行",
      price: 30000,
      emoji: "✈️",
      type: "experience",
    },
  });
  console.log(`Seeded wish: ${wish2.name} (id: ${wish2.id})`);

  // --- サンプル Checkin データ ---
  // 今日から遡って数日分のチェックインを作成
  const now = new Date();
  const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const todayY = jstNow.getUTCFullYear();
  const todayM = jstNow.getUTCMonth() + 1;
  const todayD = jstNow.getUTCDate();

  // 過去7日分: 5日飲まなかった → 1日飲んだ → 3日飲まなかった(ストリーク)
  const checkinData = [
    { daysAgo: 7, didDrink: false },
    { daysAgo: 6, didDrink: false },
    { daysAgo: 5, didDrink: false },
    { daysAgo: 4, didDrink: true },
    { daysAgo: 3, didDrink: false },
    { daysAgo: 2, didDrink: false },
    { daysAgo: 1, didDrink: false },
  ];

  for (const { daysAgo, didDrink } of checkinData) {
    const d = new Date(jstDate(todayY, todayM, todayD).getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const savedYen = didDrink ? 0 : habit.dailyCost;
    const savedKcal = didDrink ? 0 : Math.round((habit.dailyCost / 500) * 400);

    await prisma.checkin.upsert({
      where: { userId_date: { userId: user.id, date: d } },
      update: { didDrink, savedYen, savedKcal },
      create: {
        userId: user.id,
        date: d,
        didDrink,
        savedYen,
        savedKcal,
      },
    });

    console.log(
      `Seeded checkin: ${d.toISOString().slice(0, 10)} ${didDrink ? "drink" : "sober"}`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
