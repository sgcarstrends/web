import { SITE_TITLE, SITE_URL } from "@/config";
import type { Dataset, FAQPage, Organization, WebSite } from "schema-dts";

/**
 * Generate Dataset schema for Singapore car registration data
 */
export const generateDatasetSchema = (): Dataset => ({
  "@type": "Dataset",
  name: "Singapore Car Registration Data",
  description:
    "Comprehensive monthly vehicle registration statistics for Singapore, including breakdowns by manufacturer, fuel type, and vehicle category. Data sourced from Singapore's Land Transport Authority (LTA).",
  keywords: [
    "Singapore",
    "car registration",
    "vehicle statistics",
    "COE",
    "automotive market",
    "LTA data",
    "transport statistics",
    "motor vehicle trends",
  ],
  url: `${SITE_URL}/cars`,
  creator: {
    "@type": "Organization",
    name: "SG Cars Trends",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "SG Cars Trends",
    url: SITE_URL,
  },
  provider: {
    "@type": "Organization",
    name: "Land Transport Authority",
    url: "https://www.lta.gov.sg",
    description: "Singapore's transport regulatory authority",
  },
  spatialCoverage: {
    "@type": "Place",
    name: "Singapore",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 1.3521,
      longitude: 103.8198,
    },
  },
  temporalCoverage: "2020-01/2024-12",
  license:
    "https://www.lta.gov.sg/content/ltagov/en/footer/data-gov-sg-terms-of-use.html",
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: `${SITE_URL}/api/cars/registrations`,
    },
  ],
  measurementTechnique: "Official government vehicle registration records",
  variableMeasured: [
    "Vehicle registrations by month",
    "Market share by manufacturer",
    "Fuel type distribution",
    "Vehicle category breakdown",
  ],
});

/**
 * Generate Organization schema for Land Transport Authority
 */
export const generateLTAOrganizationSchema = (): Organization => ({
  "@type": "Organization",
  name: "Land Transport Authority",
  alternateName: "LTA",
  url: "https://www.lta.gov.sg",
  description:
    "Singapore's statutory board responsible for planning, operating, and maintaining the land transport infrastructure and systems",
  parentOrganization: {
    "@type": "Organization",
    name: "Government of Singapore",
    url: "https://www.gov.sg",
  },
  areaServed: {
    "@type": "Place",
    name: "Singapore",
  },
  foundingDate: "1995-09-01",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://www.lta.gov.sg/content/ltagov/en/contact_us.html",
  },
});

/**
 * Generate WebSite schema with search functionality
 */
export const generateWebSiteSchema = (): WebSite => ({
  "@type": "WebSite",
  name: SITE_TITLE,
  url: SITE_URL,
  description:
    "Singapore's authoritative source for automotive market analytics, COE bidding results, and vehicle registration trends",
  publisher: {
    "@type": "Organization",
    name: SITE_TITLE,
    url: SITE_URL,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/cars/makes/{search_term_string}`,
    },
  },
  about: [
    {
      "@type": "Thing",
      name: "Certificate of Entitlement",
      description: "Singapore's vehicle quota system",
    },
    {
      "@type": "Thing",
      name: "Vehicle Registration Statistics",
      description: "Monthly car registration data for Singapore",
    },
    {
      "@type": "Thing",
      name: "Automotive Market Analysis",
      description: "Singapore car market trends and insights",
    },
  ],
});

/**
 * Generate FAQ schema for COE-related questions
 */
export const generateCOEFAQSchema = (): FAQPage => ({
  "@type": "FAQPage",
  name: "COE System FAQ - Singapore Certificate of Entitlement",
  description:
    "Frequently asked questions about Singapore's Certificate of Entitlement (COE) system",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is COE in Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Certificate of Entitlement (COE) is a quota license required in Singapore to own a vehicle. It gives the holder the right to register, purchase and use a vehicle in Singapore for a period of 10 years.",
      },
    },
    {
      "@type": "Question",
      name: "How does COE bidding work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "COE bidding exercises are held twice monthly. Bidders submit their bids for different vehicle categories, and COE is awarded to the highest bidders up to the quota available for each category.",
      },
    },
    {
      "@type": "Question",
      name: "What are the COE categories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are 5 COE categories: Category A (cars up to 1,600cc and 130bhp), Category B (cars above 1,600cc or 130bhp), Category C (goods vehicles and buses), Category D (motorcycles), and Category E (open category for all vehicle types).",
      },
    },
    {
      "@type": "Question",
      name: "How long is COE valid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "COE is valid for 10 years from the date of vehicle registration. After 10 years, vehicle owners must either renew their COE or deregister their vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "What affects COE prices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "COE prices are determined by supply and demand. Factors include the monthly quota set by the government, economic conditions, consumer confidence, and seasonal demand patterns.",
      },
    },
  ],
});
