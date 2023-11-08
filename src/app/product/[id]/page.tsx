import ClientOnly from "@/components/ClientOnly";
import OneProductClient from "./OneProductClient";
import { getProductById } from "@/actions/getProductById";
import { notFound } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Product({ params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser();
  const product = await getProductById(Number(params.id));
  if (!product) {
    return notFound();
  }
  return (
    <ClientOnly>
      <OneProductClient product={product} currentUser={currentUser} />
    </ClientOnly>
  );
}
