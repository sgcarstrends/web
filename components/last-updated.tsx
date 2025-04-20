import { RefreshCw } from "lucide-react";

interface Props {
  lastUpdated: number;
  locale?: Intl.LocalesArgument;
}

export const LastUpdated = ({ lastUpdated, locale = "en-SG" }: Props) => {
  return (
    <>
      <span className="first:hidden">|</span>
      <span className="flex items-center gap-2">
        Last updated:
        <span className="text-foreground flex items-center gap-2 font-bold">
          <span className="uppercase">
            {new Date(lastUpdated).toLocaleString(locale)}
          </span>
          <RefreshCw className="size-4" />
        </span>
      </span>
    </>
  );
};
