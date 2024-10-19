import { cn } from "@/lib/utils";

export const Header = ({ className, ...props }) => (
  <header
    className={cn("flex h-16 items-center gap-2 border-b px-4", className)}
    {...props}
  />
);
