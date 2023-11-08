import ClientOnly from "@/components/ClientOnly";
import ProductClient from "./ProductClient";
import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";

export default async function ProductPage() {
  const currentUser = await getCurrentUser();
  if (currentUser?.role === "BUYER") {
    return (
      <ClientOnly>
        <EmptyState
          title="Accès non autorisé"
          subtitle="Vous êtes seulement acheteur, vous ne pouvez pas publier d'annonce."
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ProductClient />
    </ClientOnly>
  );
}
