"use client";

import Container from "@/components/Container";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Image from "next/image";
import { ChevronLeft } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { User, Product } from "@prisma/client";
import Card from "@/components/Card";
import { FaEdit } from "react-icons/fa";

interface ProfilProps {
  user: User | null;
  currentUser: User | null;
  product: Product[] | null;
}

export default function ProfilClient({
  user,
  currentUser,
  product,
}: ProfilProps) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  function roleToFrench(role: string | undefined) {
    switch (role) {
      case "BUYER":
        return "Acheteur";
      case "SELLER":
        return "Vendeur";
      case "BOTH":
        return "Acheteur et Vendeur";
      default:
        return "Rôle inconnu";
    }
  }
  return (
    <>
      <Section>
        <Container>
          <div className="flex gap-2 items-center">
            <ChevronLeft
              className="w-5 h-5 stroke-black"
              onClick={handleGoBack}
            />
            <Heading level="h1" size="h2">
              Profil
            </Heading>
          </div>

          <div className="flex items-center mt-6">
            <Image
              width="120"
              height="120"
              className="rounded-full"
              src={user?.image || "/img/placeholder.webp"}
              alt="Avatar"
            />
            <div className="ml-4">
              <div className="flex gap-2 items-center">
                <Heading level="h2" size="h4">
                  {user?.name}
                </Heading>
                {currentUser?.id === user?.id && (
                  <FaEdit
                    className="w-5 h-5 hover:text-primary cursor-pointer"
                    onClick={() => router.push("/profil/edit")}
                  />
                )}
              </div>
              <p className="text-primary">{user?.email}</p>
              <p>{roleToFrench(user?.role)}</p>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading level="h2" size="h2">
            {currentUser?.id === user?.id ? "Mes annonces" : "Ses annonces"}
          </Heading>

          {product && product.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              {product?.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  currentUser={currentUser}
                  profilPage
                />
              ))}
            </div>
          ) : (
            <p className="text-center mt-6">Aucune annonce</p>
          )}
        </Container>
      </Section>
    </>
  );
}
