import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

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
