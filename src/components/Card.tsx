import Image from "next/image";
import Heading from "./Heading";
import { Product, User } from "@prisma/client";
import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { action } from "../actions/deleteProduct";

interface CardProps {
  product: Product;
  currentUser: User | null;
  profilPage?: boolean;
}

export default function Card({ product, currentUser, profilPage }: CardProps) {
  let [isPending, startTransition] = useTransition();

  const handleDelete = async (id: number) => {
    startTransition(() => {
      action(id);
    });

    toast.success("Annonce supprimé !");
  };
  return (
    <div>
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          alt={product.title}
          width={350}
          height={200}
          className="rounded-xl w-full md:h-32 lg:h-52 mb-2 object-cover"
        />
      </Link>
      <div className="flex items-center justify-between mb-2">
        <div>
          <Link
            href={`/product/${product.id}`}
            className="hover:text-primary transition-all duration-150"
          >
            <Heading level="h3">{product.title}</Heading>
          </Link>
        </div>
        <div>
          <p className="text-primary text-lg font-semibold">
            {product.price} €
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="bg-primary/20 text-primary p-1 rounded-lg">
          {product.productType}
        </span>
        {profilPage && currentUser?.id === product.userId && (
          <button
            onClick={() => startTransition(() => handleDelete(product.id))}
            className="hover:text-primary transition-all duration-150"
          >
            <BsTrash className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
