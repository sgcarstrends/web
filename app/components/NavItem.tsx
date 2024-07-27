"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps extends PropsWithChildren {
  href: string;
}

export const NavItem = ({ href, children }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/" && pathname !== href) {
      return false;
    }

    return pathname.startsWith(href);
  };

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        { "text-muted-foreground": !isActive(href) },
      )}
    >
      {children}
    </Link>
  );
};
