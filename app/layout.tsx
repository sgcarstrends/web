import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { mdiCarElectric, mdiChartBellCurve, mdiGasStation } from "@mdi/js";
import { Tabs } from "@/app/_components/Tabs";
import { BASE_URL } from "@/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title = `Singapore EV Trends`;
const description = `Stay ahead of the shift to Electric Vehicle (EV) in Singapore with the latest Singapore EV trends. Data provided by Land Transport Authority (LTA)`;
const url = new URL(BASE_URL);

export const metadata: Metadata = {
  metadataBase: url,
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@ruchernchong",
  },
  authors: [{ name: "Ru Chern", url: "https://ruchern.xyz" }],
  creator: "Ru Chern",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={classNames(inter.className, "bg-gray-50 text-gray-900")}>
        <main className="mx-auto w-full max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center gap-8">
            <div className="prose flex text-center">
              <h1>Singapore EV Trends</h1>
            </div>
            <Tabs
              tabItems={[
                {
                  title: "Electric",
                  href: "/",
                  icon: mdiCarElectric,
                },
                {
                  title: "Petrol",
                  href: "/petrol",
                  icon: mdiGasStation,
                },
                {
                  title: "COE",
                  href: "/coe",
                  icon: mdiChartBellCurve,
                },
              ]}
            />
          </div>
          {children}
        </main>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${gaMeasurementId}');
        `}
      </Script>
    </html>
  );
};

export default RootLayout;
