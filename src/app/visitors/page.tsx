export const dynamic = "force-dynamic";
import { StructuredData } from "@/components/structured-data";
import Typography from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorTrendsChart } from "@/components/visitor-trends-chart";
import { SITE_TITLE, SITE_URL } from "@/config";
import type { AnalyticsData } from "@/types/analytics";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

export const generateMetadata = (): Metadata => {
  const title = "Visitor Analytics";
  const description = "Website visitor statistics and traffic data.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/visitors",
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical: "/visitors",
    },
  };
};

const VisitorsPage = async () => {
  let data: AnalyticsData;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch analytics data");
    }
    data = await response.json();
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    // Provide default data structure
    data = {
      totalViews: 0,
      uniqueVisitors: 0,
      topCountries: [],
      topCities: [],
      topPages: [],
      topReferrers: [],
      dailyViews: [],
    };
  }

  const title = "Visitor Analytics";
  const description = "Website visitor statistics and traffic data.";

  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}/visitors`,
    publisher: {
      "@type": "Organization",
      name: SITE_TITLE,
      url: SITE_URL,
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Typography.H1>Visitor Analytics</Typography.H1>
          <Typography.P className="text-muted-foreground">
            Website traffic and visitor statistics
          </Typography.P>
        </div>

        <div className="mb-6">
          <VisitorTrendsChart data={data.dailyViews} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Referrer</span>
                  <span className="text-right">Views</span>
                  <span className="text-right">%</span>
                </div>
                {data.topReferrers.length === 0 ? (
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <span>Direct / None</span>
                    <span className="text-right font-medium">{data.totalViews}</span>
                    <span className="text-right text-muted-foreground">100</span>
                  </div>
                ) : (
                  <>
                    {data.totalViews - data.topReferrers.reduce((sum, r) => sum + r.count, 0) > 0 && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span>Direct / None</span>
                        <span className="text-right font-medium">
                          {data.totalViews - data.topReferrers.reduce((sum, r) => sum + r.count, 0)}
                        </span>
                        <span className="text-right text-muted-foreground">
                          {Math.round(((data.totalViews - data.topReferrers.reduce((sum, r) => sum + r.count, 0)) / data.totalViews) * 100)}
                        </span>
                      </div>
                    )}
                    {data.topReferrers.map((referrer) => (
                      <div key={referrer.referrer} className="grid grid-cols-3 gap-4 text-sm">
                        <span className="truncate">{referrer.referrer}</span>
                        <span className="text-right font-medium">{referrer.count}</span>
                        <span className="text-right text-muted-foreground">
                          {Math.round((referrer.count / data.totalViews) * 100)}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Page</span>
                  <span className="text-right">Views</span>
                  <span className="text-right">%</span>
                </div>
                {data.topPages.map((page) => (
                  <div key={page.pathname} className="grid grid-cols-3 gap-4 text-sm">
                    <span className="truncate">{page.pathname}</span>
                    <span className="text-right font-medium">{page.count}</span>
                    <span className="text-right text-muted-foreground">
                      {Math.round((page.count / data.totalViews) * 100)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Country</span>
                  <span className="text-right">Views</span>
                  <span className="text-right">%</span>
                </div>
                {data.topCountries.map((country) => (
                  <div key={country.country} className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.country}</span>
                    </div>
                    <span className="text-right font-medium">{country.count}</span>
                    <span className="text-right text-muted-foreground">
                      {Math.round((country.count / data.totalViews) * 100)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Cities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>City</span>
                  <span className="text-right">Views</span>
                  <span className="text-right">%</span>
                </div>
                {data.topCities.map((city) => (
                  <div key={`${city.city}-${city.country}`} className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span>{city.flag}</span>
                      <span>{city.city}, {city.country}</span>
                    </div>
                    <span className="text-right font-medium">{city.count}</span>
                    <span className="text-right text-muted-foreground">
                      {Math.round((city.count / data.totalViews) * 100)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VisitorsPage;
