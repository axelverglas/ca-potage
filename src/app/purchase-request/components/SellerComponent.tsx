"use client";

import Image from "next/image";
import { PurchaseRequestWithProduct } from "@/types/PurchaseRequests";
import { handleAccept, handleReject } from "./actions";
import { useTransition } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { toast } from "react-hot-toast";

interface SellerProps {
  requests: PurchaseRequestWithProduct[];
}

export default function SellerComponent({ requests }: SellerProps) {
  let [isPending, startTransition] = useTransition();

  const handleRefused = (id: number) => () => {
    startTransition(() => {
      handleReject(id);
    });

    toast.success("Demande refusée !");
  };

  const handleAccepted = (id: number, productId: number) => () => {
    startTransition(() => {
      handleAccept(id, productId);
    });

    toast.success("Demande acceptée !");
  };
  return (
    <div>
      <Heading className="mb-6" level="h2" size="h3">
        Demandes d&apos;achat en tant que vendeur ({requests.length})
      </Heading>
      {requests.map((request, index) => (
        <div
          key={index}
          className="border-b border-gray-300 pb-4 mb-4 last-of-type:border-0"
        >
          <div className="flex gap-4">
            <Link href={`/product/${request.product.id}`}>
              <Image
                width={128}
                height={128}
                src={request.product.image}
                alt={request.product.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </Link>
            <div>
              <Link href={`/product/${request.product.id}`}>
                <h2 className="text-xl font-bold hover:text-primary">
                  {request.product.title}
                </h2>
              </Link>
              <div className="text-gray-500 flex gap-2">
                <span>Acheteur :</span>
                <Link
                  href={`/profil/${request.user.slug}`}
                  className="text-primary hover:text-primaryhover"
                >
                  {request.user.name}
                </Link>
              </div>
              <div className="mt-2">
                {request.status === "PENDING" && (
                  <div className="flex gap-2">
                    <Button onClick={handleRefused(request.id)} error>
                      Refuser
                    </Button>
                    <Button
                      onClick={handleAccepted(request.id, request.product.id)}
                    >
                      Accepter
                    </Button>
                  </div>
                )}
                {request.status === "ACCEPTED" && (
                  <p className="text-primary">Accepté</p>
                )}
                {request.status === "REJECTED" && (
                  <p className="text-red-500">Refusé</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
