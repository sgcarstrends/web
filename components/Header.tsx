import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  breadcrumbs: ReactNode;
  className?: string;
}

export const Header = ({
  breadcrumbs,
  children,
  className,
  ...props
}: Props) => (
  <header
    className={cn("flex h-16 items-center gap-2 px-4", className)}
    {...props}
  >
    {children}
    {breadcrumbs}
  </header>
);
