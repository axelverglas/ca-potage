import prisma from "@/libs/prismadb";

export async function getProductsByUser(userId: string | undefined) {
  try {
    const userProducts = await prisma.product.findMany({
      where: {
        userId: userId,
      },
    });

    if (!userProducts) {
      return null;
    }

    return userProducts;
  } catch (error: any) {
    return null;
  }
}
