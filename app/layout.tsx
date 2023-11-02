import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Singapore EV Trends",
  description:
    "Stay ahead of the electric vehicle (EV) revolution in Singapore with the latest Singapore EV trends. Discover the future of sustainable transportation, charging infrastructure, government incentives, and more. Explore how Singapore is driving the shift towards eco-friendly mobility. Stay informed and make informed choices with Singapore EV Trends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
