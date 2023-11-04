import { Infographic } from "@/components/Infographic";
import { getElectricCarRegistrationByMake } from "@/lib/getElectricCarRegistrationByMake";
import { BASE_URL } from "@/config";
import { WebSite, WithContext } from "schema-dts";
import type { Car } from "@/types";

const Home = async () => {
  // TODO: Temporary solution while building a more permanent one.
  const electricCars: Car[] = await getElectricCarRegistrationByMake(
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
        <div className="prose flex text-center dark:prose-invert">
          <h1>Singapore EV Trends</h1>
        </div>
        <Infographic electricCars={electricCars} />
      </div>
    </section>
  );
};

export default Home;
