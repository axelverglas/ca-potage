"use client";

import { User } from "@prisma/client";
import { PurchaseRequestWithProduct } from "@/types/PurchaseRequests";
import BuyerComponent from "./components/BuyerComponent";
import SellerComponent from "./components/SellerComponent";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { ChevronLeft } from "@/components/Icons";
import { useRouter } from "next/navigation";

interface PurchaseProps {
  requestsByBuyer: PurchaseRequestWithProduct[];
  requestsBySeller: PurchaseRequestWithProduct[];
  currentUser: User | null;
}

export default function PurchaseClients({
  requestsByBuyer,
  requestsBySeller,
  currentUser,
}: PurchaseProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const components = [
    {
      role: "BUYER",
      requests: requestsByBuyer,
      Component: BuyerComponent,
    },
    {
      role: "SELLER",
      requests: requestsBySeller,
      Component: SellerComponent,
    },
  ];

  components.sort((a, b) => b.requests.length - a.requests.length);

  return (
    <Section>
      <Container>
        <div className="flex gap-2 items-center mb-6">
          <ChevronLeft
            className="w-5 h-5 stroke-black"
            onClick={handleGoBack}
          />
          <Heading level="h1" size="h2">
            Demandes d&apos;achat
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
          {components.map(
            ({ role, requests, Component }, index) =>
              (currentUser?.role === role || currentUser?.role === "BOTH") && (
                <>
                  <Component requests={requests} key={index} />
                </>
              )
          )}
        </div>
      </Container>
    </Section>
  );
}
