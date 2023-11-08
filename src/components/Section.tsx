"use client";

import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className }: SectionProps) {
  return (
    <section id={id} className={clsx("pb-12 first-of-type:pt-12", className)}>
      {children}
    </section>
  );
}
