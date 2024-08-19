import type { PropsWithChildren } from "react";
import { FEATURE_FLAG_UNRELEASED } from "@/config";

interface UnreleasedFeatureProps extends PropsWithChildren {}

export const UnreleasedFeature = ({ children }: UnreleasedFeatureProps) => {
  return (
    FEATURE_FLAG_UNRELEASED && (
      <div className="border border-dashed border-red-500 p-1">{children}</div>
    )
  );
};
