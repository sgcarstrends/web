"use client";

import type { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};
