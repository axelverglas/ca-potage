import prisma from "@/libs/prismadb";
import { PurchaseRequestWithProduct } from "@/types/PurchaseRequests";

export async function getPurchaseRequests(
  userId: string | undefined,
  isSeller: boolean = false
): Promise<PurchaseRequestWithProduct[]> {
  try {
    let purchaseRequests;

    if (isSeller) {
      purchaseRequests = await prisma.purchaseRequest.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          product: {
            userId: userId,
          },
        },
        include: {
          product: true,
          user: true, // cela va inclure les détails de l'utilisateur qui a fait la demande d'achat.
        },
      });
    } else {
      purchaseRequests = await prisma.purchaseRequest.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: userId,
        },
        include: {
          product: true,
        },
      });
    }

    // Si aucun résultat n'est trouvé, renvoyer un tableau vide.
    if (!purchaseRequests || purchaseRequests.length === 0) {
      return [];
    }

    // Si des résultats sont trouvés, renvoyer les résultats.
    return purchaseRequests as PurchaseRequestWithProduct[];
  } catch (error: any) {
    console.error(error);
    return [];
  }
}
