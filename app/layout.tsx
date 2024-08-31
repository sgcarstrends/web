import React from "react";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import classNames from "classnames";
import { Providers } from "@/app/Providers";
import { Announcement } from "@/app/components/Announcement";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { ANNOUNCEMENT, SITE_TITLE, SITE_URL } from "@/config";
import "./globals.css";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { Analytics } from "./components/Analytics";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const title: string = SITE_TITLE;
const description: string = `Statistics for car trends in Singapore. Data provided by Land Transport Authority (LTA)`;
const url = new URL(SITE_URL);

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
    creator: "@sgcarstrends",
  },
  authors: [{ name: "Ru Chern CHONG", url: "https://ruchern.xyz" }],
  creator: "Ru Chern CHONG",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={classNames(inter.className, "bg-gray-50 text-gray-900")}>
        <GlobalStateProvider>
          {ANNOUNCEMENT && <Announcement>{ANNOUNCEMENT}</Announcement>}
          <Header />
          <Providers>
            <main className="container mx-auto min-h-screen px-4 py-16">
              {children}
            </main>
          </Providers>
          <Footer />
        </GlobalStateProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={gaMeasurementId} />
    </html>
  );
};

export default RootLayout;
