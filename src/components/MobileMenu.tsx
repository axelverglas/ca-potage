"use client";

import Link from "next/link";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Button from "./Button";
import { MdOutlineAddBox } from "react-icons/md";
import { FiLogOut, FiSettings, FiShoppingBag, FiUser } from "react-icons/fi";
import { useEffect } from "react";

interface MobileMenuProps {
  currentUser?: User | null;
  toggleMenu: () => void;
}

export default function MobileMenu({
  currentUser,
  toggleMenu,
}: MobileMenuProps) {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const handleSignOut = () => {
    signOut();
    toggleMenu();
  };
  useEffect(() => {
    if (loginModal.isOpen) {
      toggleMenu();
    }
    if (registerModal.isOpen) {
      toggleMenu();
    }
  }, [loginModal.isOpen, toggleMenu, registerModal.isOpen]);
  return (
    <div className="fixed top-[90px] left-0 w-full h-full bg-white z-10 overflow-auto flex justify-center items-start md:hidden backdrop-blur-sm">
      <div className="container py-6">
        {currentUser && currentUser?.role != "BUYER" && (
          <div className="flex">
            <Button
              href={"/product/add"}
              onClick={toggleMenu}
              className="flex items-center gap-2"
            >
              <MdOutlineAddBox className="w-6 h-6" />
              déposer une annonce
            </Button>
          </div>
        )}
        <h2 className="text-xl mt-4 mb-4 font-bold">Mon compte</h2>
        <ul className="space-y-4 font-medium">
          {currentUser ? (
            <>
              <li>
                <Link
                  href={`/profil/${currentUser.slug}`}
                  onClick={toggleMenu}
                  className="flex items-center gap-2"
                >
                  <FiUser className="w-6 h-6" />
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  href={`/purchase-request`}
                  onClick={toggleMenu}
                  className="flex items-center gap-2"
                >
                  <FiShoppingBag className="w-6 h-6" />
                  Demande d&apos;achat
                </Link>
              </li>
              <li>
                <Link
                  href={"/profil/edit"}
                  onClick={toggleMenu}
                  className="flex items-center gap-2"
                >
                  <FiSettings className="w-6 h-6" />
                  Paramètres
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <FiLogOut className="w-6 h-6" />
                  Se déconnecter
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={loginModal.onOpen}>Se connecter</button>
              </li>
              <li>
                <button onClick={registerModal.onOpen}>S&apos;inscrire</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
