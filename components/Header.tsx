import { type PropsWithChildren, type ReactNode, Suspense } from "react";
import { API_URL } from "@/config";
import { cn } from "@/lib/utils";
import { fetchApi } from "@/utils/fetchApi";
import { MonthSelector } from "./MonthSelector";
import type { Month } from "@/types";

interface Props extends PropsWithChildren {
  breadcrumbs: ReactNode;
  className?: string;
}

export const Header = async ({
  breadcrumbs,
  children,
  className,
  ...props
}: Props) => {
  const months = await fetchApi<Month[]>(`${API_URL}/cars/months`);

  return (
    <header
      className={cn("flex h-16 items-center gap-2 px-4", className)}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {children}
          {breadcrumbs}
        </div>
        <Suspense fallback={null}>
          <MonthSelector months={months} />
        </Suspense>
      </div>
    </header>
  );
};
