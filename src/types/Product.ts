import {
  Product as PrismaProduct,
  User,
  PurchaseRequest,
  Comment,
} from "@prisma/client";

interface LocationDetails {
  label: string;
  value: {
    place_id: string;
    description: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type Product = PrismaProduct & {
  location: LocationDetails;
};

export type ProductWithUser = Product & {
  user: User;
  requests: PurchaseRequest[];
  comments: CommentWithUser[];
};

export type CommentWithUser = Comment & {
  user: User;
};
