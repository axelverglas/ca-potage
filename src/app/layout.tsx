import Header from "@/components/Header";
import AuthContext from "@/context/AuthContext";
import ToasterContext from "@/context/ToastContext";
import "./globals.css";
import type { Metadata } from "next";
import LoginModal from "@/components/auth/LoginModal";
import { Montserrat } from "next/font/google";
import getCurrentUser from "@/actions/getCurrentUser";
import RegisterModal from "@/components/auth/RegisterModal";
import Footer from "@/components/Footer";
import Analytics from "./analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ca-potage.fr/"),
  title: "Ça Potage",
  description:
    "Ça potage est un site communaitaires entre ceux qui veulent vendre leur production issu du nano maraichage.",
  twitter: {
    card: "summary_large_image",
    title: "Ça Potage",
    description:
      "Ça potage est un site communaitaires entre ceux qui veulent vendre leur production issu du nano maraichage.",
    images: ["https://www.ca-potage.fr/img/logo.svg"],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ça Potage",
    description:
      "Ça potage est un site communaitaires entre ceux qui veulent vendre leur production issu du nano maraichage.",
    url: "https://www.ca-potage.fr/",
    siteName: "Ça Potage",
    images: [
      {
        url: "https://www.ca-potage.fr/img/logo.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1.0",
};

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} min-h-screen flex flex-col`}>
        <AuthContext>
          <Analytics />
          <ToasterContext />
          <LoginModal />
          <RegisterModal />
          <Header currentUser={currentUser} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}
