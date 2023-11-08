import Link from "next/link";
import Container from "../Container";
import Section from "../Section";
import Image from "next/image";

export default function Hero() {
  return (
    <Section>
      <Container>
        <div className="bg-primary rounded-xl md:p-16 p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-0">
            <div className="col-span-1 md:col-span-2 flex justify-center flex-col">
              <h1 className="mb-6 text-white font-extrabold text-4xl md:text-5xl md:leading-tight uppercase">
                <span className="md:block">Du jardin à la table :</span>{" "}
                <span className="md:block">partagez votre passion</span> pour le
                potager
              </h1>
              <p className="text-lg text-white md:w-[600px]">
                Partagez l&apos;abondance de votre jardin avec votre communauté
                et découvrez la richesse des produits locaux autour de vous.
              </p>
              <div>
                <Link
                  href={"/#product"}
                  className="mt-6 inline-block rounded-bl-xl rounded-tr-xl px-4 py-2 font-semibold transition-all duration-200 bg-white text-primary hover:bg-gray-100"
                >
                  Découvrir les produits
                </Link>
              </div>
            </div>
            <div className="flex justify-center mt-4 md:mt-0">
              <Image
                src="/img/basket.webp"
                alt="Hero"
                width={300}
                height={300}
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
