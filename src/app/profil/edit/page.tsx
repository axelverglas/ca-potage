import getCurrentUser from "@/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import EditClient from "./EditClient";

export default async function Settings() {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <EditClient currentUser={currentUser} />
    </ClientOnly>
  );
}
