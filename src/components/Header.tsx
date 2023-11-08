"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import Logo from "./Logo";
import useLoginModal from "../hooks/useLoginModal";
import { User } from "@prisma/client";
import MobileMenu from "./MobileMenu";
import Button from "./Button";
import Account from "./Account";

interface HeaderProps {
  currentUser?: User | null;
}

export default function Header({ currentUser }: HeaderProps) {
  const loginModal = useLoginModal();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <header className="w-full border-b">
        <div className="container flex justify-between items-center h-[5.5rem]">
          <Logo />

          <div className="md:flex gap-4 items-center hidden">
            {currentUser && currentUser?.role != "BUYER" && (
              <Button href={"/product/add"} className="flex items-center gap-2">
                <MdOutlineAddBox className="w-6 h-6" />
                déposer une annonce
              </Button>
            )}
            {currentUser ? (
              <Account currentUser={currentUser} />
            ) : (
              <Button onClick={loginModal.onOpen}>Se connecter</Button>
            )}
          </div>

          <div className="md:hidden block">
            {isMenuOpen ? (
              <FiX onClick={toggleMenu} className="block w-6 h-6" />
            ) : (
              <FiMenu onClick={toggleMenu} className="block w-6 h-6" />
            )}
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <MobileMenu currentUser={currentUser} toggleMenu={toggleMenu} />
      )}
    </>
  );
}
