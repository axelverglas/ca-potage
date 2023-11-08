import ClientOnly from "@/components/ClientOnly";
import ProfilClient from "./ProfilClient";
import getUser from "@/actions/getUser";
import { getProductsByUser } from "@/actions/getProductsByUser";
import getCurrentUser from "@/actions/getCurrentUser";
import { notFound } from "next/navigation";

export default async function Settings({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getUser(params.slug);
  const userProducts = await getProductsByUser(user?.id);
  const currentUser = await getCurrentUser();

  if (!user) {
    return notFound();
  }
  return (
    <ClientOnly>
      <ProfilClient
        user={user}
        currentUser={currentUser}
        product={userProducts}
      />
    </ClientOnly>
  );
}
