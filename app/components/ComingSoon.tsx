import { Icon } from "@mdi/react";
import { mdiClockFast } from "@mdi/js";

interface ComingSoonProps {
  page: string;
}

const PAGE_MAPPING: Record<string, string> = {
  coe: "COE data",
  petrol: "Petrol cars data",
};

export const ComingSoon = ({ page }: ComingSoonProps) => {
  return (
    <section>
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        <div className="prose flex items-center justify-center gap-4">
          <Icon path={mdiClockFast} size={2} />
          <h1 className="capitalize">{PAGE_MAPPING[page]} - Coming Soon!</h1>
        </div>
      </div>
    </section>
  );
};
