import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { BASE_URL } from "@/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title = `Singapore EV Trends`;
const description = `Stay ahead of the shift to Electric Vehicle (EV) in Singapore with the latest Singapore EV trends. Data provided by Land Transport Authority (LTA)`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: BASE_URL,
    siteName: title,
    images: "/og-image.png",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@ruchernchong",
    images: "/og-image.png",
  },
  authors: [{ name: "Ru Chern", url: "https://ruchern.xyz" }],
  creator: "Ru Chern",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50",
        )}
      >
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
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
