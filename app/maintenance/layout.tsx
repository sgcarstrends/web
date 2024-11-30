import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import type { Metadata } from "next";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Site Maintenance",
  description: "Site is currently under maintenance",
  robots: {
    index: false,
    follow: false,
  },
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={classNames(inter.className)}>
        <main>{children}</main>
      </body>
    </html>
  );
};
export default layout;
