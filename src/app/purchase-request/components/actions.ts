"use server";
import prisma from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

export async function handleAccept(id: number, productId: number) {
  await prisma.purchaseRequest.update({
    where: {
      id: id,
    },
    data: {
      status: "ACCEPTED",
    },
  });

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      sold: true,
    },
  });

  revalidatePath("/purchaserequests");
}

export async function handleReject(id: number) {
  await prisma.purchaseRequest.update({
    where: {
      id: id,
    },
    data: {
      status: "REJECTED",
    },
  });

  revalidatePath("/purchaserequests");
}
