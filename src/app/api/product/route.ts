import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    productType,
    salesPeriodeStart,
    salesPeriodeEnd,
    image,
    price,
    location,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const product = await prisma.product.create({
    data: {
      title,
      description,
      productType,
      salesPeriodeStart,
      salesPeriodeEnd,
      image,
      price: parseInt(price, 10),
      location,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(product);
}
