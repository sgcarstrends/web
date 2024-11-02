import React, { type ReactNode } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import classNames from "classnames";
import { Announcement } from "@/app/components/Announcement";
// import { Footer } from "@/app/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ANNOUNCEMENT, SITE_TITLE, SITE_URL } from "@/config";
import "./globals.css";
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

const RootLayout = async ({
  breadcrumbs,
  children,
}: {
  breadcrumbs: ReactNode;
  children: ReactNode;
}) => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={classNames(inter.className)}>
        {ANNOUNCEMENT && <Announcement>{ANNOUNCEMENT}</Announcement>}
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <Header breadcrumbs={breadcrumbs}>
              <SidebarTrigger />
            </Header>
            <div className="bg-gray-50 p-4">{children}</div>
          </main>
        </SidebarProvider>
        {/*<Footer />*/}
        <Analytics />
      </body>
      <Script
        defer
        src="https://analytics.sgcarstrends.com/script.js"
        data-website-id="b98dda44-ccc9-4a73-87d4-dcbe561aedb8"
        data-domains="sgcarstrends.com"
      />
      <GoogleAnalytics gaId={gaMeasurementId} />
    </html>
  );
};

export default RootLayout;
