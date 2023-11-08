import prisma from "@/libs/prismadb";
import { Product } from "@/types/Product";

export default async function getProducts() {
  try {
    const allProducts = await prisma.product.findMany({
      where: {
        sold: false,
      },
    });
    return allProducts.map((product) => ({
      ...product,
      location: product.location as Product["location"],
    }));
  } catch (error: any) {
    console.error("Error fetching products: ", error);
    return [];
  }
}
