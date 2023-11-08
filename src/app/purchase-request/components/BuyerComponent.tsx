import { PurchaseRequestWithProduct } from "@/types/PurchaseRequests";
import Image from "next/image";
import Heading from "@/components/Heading";
import Link from "next/link";

interface BuyerProps {
  requests: PurchaseRequestWithProduct[];
}

export default function BuyerComponent({ requests }: BuyerProps) {
  return (
    <div>
      <Heading className="mb-6" level="h2" size="h3">
        Demandes d&apos;achat en tant qu&apos;acheteur ({requests.length})
      </Heading>
      {requests && requests.length > 0 ? (
        requests.map((request, index) => (
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
                {request.status === "PENDING" ? (
                  <p className="text-gray-500">En attente de réponse</p>
                ) : request.status === "ACCEPTED" ? (
                  <p className="text-primary">Acceptée</p>
                ) : (
                  <p className="text-red-500">Refusée</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Aucune demande d&apos;achat</p>
      )}
    </div>
  );
}
