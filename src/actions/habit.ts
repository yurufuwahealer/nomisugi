"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHabit(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const dailyCost = Number(formData.get("dailyCost"));
  const frequency = Number(formData.get("frequency"));
  const goalType = formData.get("goalType") as string;
  const goalDays = formData.get("goalDays")
    ? Number(formData.get("goalDays"))
    : null;

  if (!name || !type || !dailyCost || !frequency || !goalType) {
    throw new Error("Missing required fields");
  }

  await prisma.habit.create({
    data: {
      userId: session.user.id,
      name,
      type,
      dailyCost,
      frequency,
      goalType,
      goalDays: goalType === "reduce" ? goalDays : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/settings");
}

export async function updateHabit(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing habit id");

  const habit = await prisma.habit.findUnique({ where: { id } });
  if (!habit || habit.userId !== session.user.id) {
    throw new Error("Not found");
  }

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const dailyCost = Number(formData.get("dailyCost"));
  const frequency = Number(formData.get("frequency"));
  const goalType = formData.get("goalType") as string;
  const goalDays = formData.get("goalDays")
    ? Number(formData.get("goalDays"))
    : null;

  if (!name || !type || !dailyCost || !frequency || !goalType) {
    throw new Error("Missing required fields");
  }

  await prisma.habit.update({
    where: { id },
    data: {
      name,
      type,
      dailyCost,
      frequency,
      goalType,
      goalDays: goalType === "reduce" ? goalDays : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/settings");
}

export async function deleteHabit(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing habit id");

  const habit = await prisma.habit.findUnique({ where: { id } });
  if (!habit || habit.userId !== session.user.id) {
    throw new Error("Not found");
  }

  await prisma.habit.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/settings");
}
