import getCurrentUser from "@/actions/getCurrentUser";
import { getPurchaseRequests } from "@/actions/getPurchaseRequests";
import ClientOnly from "@/components/ClientOnly";
import PurchaseClients from "./PurchaseClients";

export default async function PurchaseRequests() {
  const currentUser = await getCurrentUser();
  const requestsByBuyer = await getPurchaseRequests(currentUser?.id, false);
  const requestsBySeller = await getPurchaseRequests(currentUser?.id, true);
  return (
    <ClientOnly>
      <PurchaseClients
        requestsByBuyer={requestsByBuyer}
        requestsBySeller={requestsBySeller}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
