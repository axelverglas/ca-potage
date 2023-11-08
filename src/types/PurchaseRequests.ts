import {
  PurchaseRequest as PrismaPurchaseRequest,
  Product as PrismaProduct,
  User,
} from "@prisma/client";

export type PurchaseRequestWithProduct = PrismaPurchaseRequest & {
  product: PrismaProduct;
  user: User;
};
