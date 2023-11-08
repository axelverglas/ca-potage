import prisma from "@/libs/prismadb";
import { ProductWithUser } from "@/types/Product";

export async function getProductById(
  id: number
): Promise<ProductWithUser | null> {
  try {
    const productData = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        requests: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!productData) {
      return null;
    }

    const product: ProductWithUser = {
      ...productData,
      location: productData.location as ProductWithUser["location"],
    };
    return product;
  } catch (error: any) {
    return null;
  }
}
