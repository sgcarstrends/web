import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Singapore EV Trends",
  description:
    "Stay ahead of the electric vehicle (EV) revolution in Singapore with the latest Singapore EV trends. Discover the future of sustainable transportation, charging infrastructure, government incentives, and more. Explore how Singapore is driving the shift towards eco-friendly mobility. Stay informed and make informed choices with Singapore EV Trends.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
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
      <body className={inter.className}>
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
