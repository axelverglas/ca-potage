import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, role } = body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        error: "Un utilisateur existe déjà avec cette adresse email.",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const slug = name.toLowerCase().replace(/\s+/g, "");

  const user = await prisma.user.create({
    data: {
      email,
      name,
      slug,
      hashedPassword,
      role,
    },
  });

  return NextResponse.json(user);
}
