"use client";

import clsx from "clsx";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  secondary?: boolean;
  error?: boolean;
}

export default function Button({
  children,
  className,
  href,
  target,
  onClick,
  secondary,
  error,
  type = "button",
}: ButtonProps) {
  const commonClasses = clsx(
    "inline-block rounded-bl-xl rounded-tr-xl px-4 py-2 font-semibold transition-all duration-200",
    secondary
      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
      : "bg-primary text-white hover:bg-primaryhover",
    error && "bg-red-500 hover:bg-red-600",
    className
  );

  if (href) {
    return (
      <Link href={href} target={target} className={commonClasses}>
        {children}
      </Link>
    );
  } else {
    return (
      <button type={type} onClick={onClick} className={commonClasses}>
        {children}
      </button>
    );
  }
}
