"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/libs/prismadb";

export async function action(productId: number) {
  await prisma.purchaseRequest.deleteMany({
    where: {
      productId,
    },
  });

  await prisma.comment.deleteMany({
    where: {
      productId,
    },
  });

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath(`/`);
}
