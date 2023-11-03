import { Infographic } from "@/components/Infographic";
import { getCarRegistrationByMake } from "@/lib/getCarRegistrationByMake";
import { BASE_URL } from "@/config";
import { WebSite, WithContext } from "schema-dts";
import type { Car } from "@/types";

const Home = async () => {
  // TODO: Temporary solution while building a more permanent one.
  const electricVehicles: Car[] = await getCarRegistrationByMake(
    `https://raw.githubusercontent.com/ruchernchong/singapore-ev-trends/main/public/data/M03-Car_Regn_by_make.csv`,
  );

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Singapore EV Trends",
    url: BASE_URL,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col items-center gap-8">
        <div className="prose dark:prose-invert">
          <h1>
            Singapore <br className="md:hidden" /> EV Trends
          </h1>
        </div>
        <Infographic electricVehicles={electricVehicles} />
      </div>
    </section>
  );
};

export default Home;
