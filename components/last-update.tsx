import { RefreshCw } from "lucide-react";

interface Props {
  lastUpdated: Date;
  locale?: Intl.LocalesArgument;
}

export const LastUpdate = ({ lastUpdated, locale = "en-SG" }: Props) => {
  return (
    <>
      <span>|</span>
      <span className="flex items-center gap-2">
        Last update:{" "}
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

export default LastUpdate;
