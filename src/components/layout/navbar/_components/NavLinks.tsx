"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  items: {
    label: string;
    href: string;
  };
  renderAsButton?: boolean;
  onClick?: () => void;
}

export default function NavLinks({ items, renderAsButton = false, onClick }: NavLinksProps) {
  const pathname = usePathname();
  const isActive = pathname === items.href;

  const baseStyles = cn(
    "text-h6-regular",
    "p-2.5",
    isActive
      ? "text-primary border-b-2 border-primary "
      : "text-black hover:text-primary hover:border-b-2 hover:border-primary"
  );

  if (renderAsButton) {
    return (
      <li>
        <button
          onClick={onClick}
          className={baseStyles}
        >
          {items.label}
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link
        key={items.href}
        href={items.href}
        aria-current={isActive ? "page" : undefined}
        className={baseStyles}
      >
        {items.label}
      </Link>
    </li>
  )
}