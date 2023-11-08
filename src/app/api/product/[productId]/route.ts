import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface IParams {
  productId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  const purchaseRequest = await prisma.purchaseRequest.create({
    data: {
      product: { connect: { id: Number(productId) } },
      user: { connect: { id: currentUser.id } },
      status: "PENDING",
    },
  });

  return NextResponse.json(purchaseRequest);
}
