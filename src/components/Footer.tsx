import Link from "next/link";
import Logo from "./Logo";
import { siteConfig } from "../config/siteconfig";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary py-8">
      <div className="container">
        <div className="mb-8 flex justify-center">
          <Logo footer />
        </div>
      </div>
      <div className="mt-8 md:flex text-center items-center justify-center gap-2 text-xs md:text-base text-white">
        <p>© Copyright {year}</p>
        <span className="hidden md:block">|</span>
        <Link href={"/legal"} className="block my-2 md:my-0">
          Mentions légales
        </Link>
        <span className="hidden md:block">|</span>
        <Link href={"/politique-de-confidentialite"}>
          Politique de confidentialité
        </Link>
      </div>
    </footer>
  );
}
