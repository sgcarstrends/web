import Script from "next/script";
import { WithContext } from "schema-dts";

interface StructuredDataProps {
  data: WithContext<any>;
}

export const StructuredData = ({ data }: StructuredDataProps) => {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
