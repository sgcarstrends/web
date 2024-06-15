"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UrlObject } from "node:url";

type Url = string | UrlObject;

interface NavItemProps extends PropsWithChildren {
  href: Url;
}

export const NavItem = ({ href, children }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        { "text-muted-foreground": !isActive },
      )}
    >
      {children}
    </Link>
  );
};
