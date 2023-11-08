"use server";
import { revalidatePath } from "next/cache";
import { CommentFormInputs } from "./Comment";
import prisma from "@/libs/prismadb";

export async function action(
  data: CommentFormInputs,
  currentUserId: string | undefined,
  productId: number
) {
  await prisma.comment.create({
    data: {
      text: data.comment,
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: currentUserId,
        },
      },
    },
  });

  revalidatePath(`/product/${productId}`);
}
