import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Header = ({ className, ...props }: Props) => (
  <header
    className={cn("flex h-16 items-center gap-2 border-b px-4", className)}
    {...props}
  />
);
