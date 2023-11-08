import getCurrentUser from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProduct";
import Hero from "@/components/Home/Hero";
import ProductListing from "@/components/Home/ProductListing";

export default async function Home() {
  const products = await getProducts();
  const currentUser = await getCurrentUser();
  return (
    <>
      <Hero />
      <ProductListing products={products} currentUser={currentUser} />
    </>
  );
}
