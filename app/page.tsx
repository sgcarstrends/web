import { Infographic } from "@/components/Infographic";
import { API_URL, BASE_URL } from "@/config";
import { WebSite, WithContext } from "schema-dts";
import type { Car } from "@/types";

const Home = async () => {
  const electricCars: Car[] = await fetch(API_URL, { cache: "no-store" }).then(
    (res) => res.json(),
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
