import type { PropsWithChildren } from "react";
import { Provider } from "jotai";

export const Providers = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};
