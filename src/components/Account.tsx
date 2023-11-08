"use client";

import { signOut } from "next-auth/react";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { FiSettings, FiLogOut, FiUser, FiShoppingBag } from "react-icons/fi";
import { User } from "@prisma/client";

const options = [
  { label: "Profil", value: "profile", icon: FiUser },
  {
    label: "Demande d'achat",
    value: "purchase-request",
    icon: FiShoppingBag,
  },
  { label: "Paramètres", value: "settings", icon: FiSettings },
  { label: "Déconnexion", value: "logout", icon: FiLogOut },
];

interface AccountProps {
  currentUser: User | null;
}

export default function Account({ currentUser }: AccountProps) {
  const Router = useRouter();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Listbox
      value={null}
      onChange={(value) => {
        if (value === "settings") {
          Router.push("/profil/edit");
        } else if (value === "logout") {
          handleSignOut();
        } else if (value === "purchase-request") {
          Router.push("/purchase-request");
        } else {
          Router.push(`/profil/${currentUser?.slug}`);
        }
      }}
    >
      <Listbox.Label className="sr-only">User menu</Listbox.Label>
      <div className="relative">
        <Listbox.Button className="rounded-lg">
          <Image
            src={currentUser?.image || "/img/placeholder.webp"}
            alt="Avatar"
            className="rounded-full"
            height={42}
            width={42}
          />
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            "absolute right-0 top-full z-50 w-48 overflow-hidden rounded-bl-xl rounded-tr-xl border bg-white p-2 text-sm font-medium shadow-lg outline-none",
            "mt-2"
          )}
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className="flex cursor-pointer items-center rounded-lg px-2 py-2 hover:bg-slate-100"
            >
              {option.icon && <option.icon className="mr-2 h-5 w-5" />}
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
