import { type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Navbar = ({ children, className, ...props }: Props) => {
  return (
    <header
      className={cn("bg-sidebar flex h-16 items-center gap-2 px-4", className)}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
};
