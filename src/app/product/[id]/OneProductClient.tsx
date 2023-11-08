"use client";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { ProductWithUser } from "@/types/Product";
import { ChevronLeft, ChevronRight } from "@/components/Icons";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import Image from "next/image";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/Button";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import Comment from "@/app/product/[id]/components/Comment";

const currentDate = dayjs();

interface ProductClientProps {
  product: ProductWithUser;
  currentUser: User | null;
}

export default function ProductClient({
  product,
  currentUser,
}: ProductClientProps) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        ssr: false,
      }),
    []
  );

  const formattedSalesStart = dayjs(product.salesPeriodeStart).format(
    "DD/MM/YYYY"
  );
  const formattedSalesEnd = dayjs(product.salesPeriodeEnd).format("DD/MM/YYYY");

  const salesPeriodStart = dayjs(product.salesPeriodeStart);
  const salesPeriodEnd = dayjs(product.salesPeriodeEnd);

  async function handlePurchaseRequest() {
    const response = await fetch(`/api/product/${product.id}`, {
      method: "POST",
      body: JSON.stringify({
        productId: product.id,
      }),
    });

    if (!response.ok) {
      toast.error("Une erreur est survenue");
    }

    toast.success("Votre demande d'achat a bien été envoyée");
    router.refresh();
  }

  const requestStatusMapping = {
    PENDING: "en attente de réponse",
    ACCEPTED: "acceptée",
    REJECTED: "refusée",
  };

  const currentRequest = product.requests.find(
    (request) => request.userId === currentUser?.id
  );
  return (
    <Section>
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <ChevronLeft
            className="w-5 h-5 stroke-black"
            onClick={handleGoBack}
          />
          <Heading level="h1" size="h2">
            {product.title}
          </Heading>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-2">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={350}
              className="rounded-xl w-full object-cover md:h-[500px] mb-6"
            />
            <div className="flex justify-between mt-4">
              <span className="bg-primary/20 text-primary p-1 rounded-lg">
                {product.productType}
              </span>
              <p className="text-primary font-semibold text-xl">
                {product.price} €
              </p>
            </div>
            <div className="mt-4">
              <h2 className="font-bold text-xl">Période de vente</h2>
              <p>
                Du {formattedSalesStart} au {formattedSalesEnd}
              </p>
            </div>
            <p className="mt-4">{product.description}</p>
            <div className="border-t border-gray-300 mt-4">
              <h2 className="font-bold text-xl my-6">Commentaires</h2>
              <Comment currentUser={currentUser} product={product} />
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <Image
                    width="60"
                    height="60"
                    className="rounded-full"
                    src={product.user.image || "/img/placeholder.webp"}
                    alt="Avatar"
                  />
                  <Link href={`/profil/${product.user.slug}`}>
                    <h2 className="font-bold text-xl">{product.user.name}</h2>
                  </Link>
                </div>
                <Link href={`/profil/${product.user.slug}`}>
                  <ChevronRight className="w-5 h-5 stroke-black" />
                </Link>
              </div>
              {currentUser ? (
                product.sold ? (
                  <p>Ce produit a déjà été vendu.</p>
                ) : currentUser.id !== product.userId ? (
                  currentUser.role !== "SELLER" ? (
                    currentRequest ? (
                      <p>
                        Votre demande d&apos;achat est{" "}
                        {requestStatusMapping[currentRequest.status]}.
                      </p>
                    ) : currentDate.isBefore(salesPeriodStart) ? (
                      <p>
                        Le produit n&apos;est pas encore disponible à
                        l&apos;achat. La période de vente commencera le{" "}
                        {formattedSalesStart}.
                      </p>
                    ) : currentDate.isAfter(salesPeriodEnd) ? (
                      <p>La période de vente pour ce produit est terminée.</p>
                    ) : (
                      <Button onClick={handlePurchaseRequest}>
                        Faire une demande d&apos;achat
                      </Button>
                    )
                  ) : (
                    <p>
                      Vous ne pouvez pas faire de demande d&apos;achat en tant
                      que vendeur
                    </p>
                  )
                ) : null
              ) : (
                <p>
                  Veuillez vous connecter pour pouvoir faire une demande
                  d&apos;achat !
                </p>
              )}
            </div>
            <div>
              <h2 className="font-bold text-xl">Localisation</h2>
              <p className="my-4 flex gap-2">
                <FaLocationDot className="text-primary w-6 h-6" />
                {product.location.label}
              </p>
              <Map
                center={[
                  product.location.coordinates.lat,
                  product.location.coordinates.lng,
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
