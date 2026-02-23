"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createWish(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const emoji = formData.get("emoji") as string;
  const type = formData.get("type") as string;

  if (!name || !price || !emoji || !type) {
    throw new Error("Missing required fields");
  }

  await prisma.wish.create({
    data: {
      userId: session.user.id,
      name,
      price,
      emoji,
      type,
    },
  });

  revalidatePath("/");
  revalidatePath("/settings");
}

export async function updateWish(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing wish id");

  const wish = await prisma.wish.findUnique({ where: { id } });
  if (!wish || wish.userId !== session.user.id) {
    throw new Error("Not found");
  }

  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const emoji = formData.get("emoji") as string;
  const type = formData.get("type") as string;

  if (!name || !price || !emoji || !type) {
    throw new Error("Missing required fields");
  }

  await prisma.wish.update({
    where: { id },
    data: { name, price, emoji, type },
  });

  revalidatePath("/");
  revalidatePath("/settings");
}

export async function deleteWish(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing wish id");

  const wish = await prisma.wish.findUnique({ where: { id } });
  if (!wish || wish.userId !== session.user.id) {
    throw new Error("Not found");
  }

  await prisma.wish.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/settings");
}
