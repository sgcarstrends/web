import React from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { Announcement } from "@/components/Announcement";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ANNOUNCEMENT, BASE_URL } from "@/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title: string = `Singapore EV Trends`;
const description: string = `Stay ahead of the shift to Electric Vehicle (EV) in Singapore with the latest Singapore EV trends. Data provided by Land Transport Authority (LTA)`;
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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={classNames(inter.className, "bg-gray-50 text-gray-900")}>
        <Announcement>{ANNOUNCEMENT}</Announcement>
        <Header />
        <main className="min-h-screen px-4 py-16">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId={gaMeasurementId} />
    </html>
  );
};

export default RootLayout;
