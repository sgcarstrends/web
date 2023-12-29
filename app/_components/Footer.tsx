import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface LinkProps
  extends PropsWithChildren,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  useIcon?: boolean;
}

const Link = ({ href, rel, useIcon = true, children }: LinkProps) => {
  rel = ["noopener", rel].join(" ");

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      className="inline-flex items-center text-gray-900 underline underline-offset-4"
    >
      {children}
      {useIcon && <ArrowTopRightOnSquareIcon width={16} height={16} />}
    </a>
  );
};

export const Footer = () => {
  return (
    <footer className="flex justify-center gap-4 bg-gray-100 px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-y-4">
        <div className="flex gap-x-4">
          <span>
            Developed by <Link href="https://ruchern.xyz">Chong Ru Chern</Link>
          </span>
          <span>
            <Link href="https://github.com/ruchernchong/singapore-ev-trends">
              Source code
            </Link>
          </span>
        </div>
        <div>
          Data provided by{" "}
          <Link
            href="https://www.lta.gov.sg/content/ltagov/en.html"
            rel="nofollow"
            useIcon={false}
          >
            Land Transport Authority (LTA)
          </Link>
          . For more information, visit&nbsp;
          <Link
            href="https://datamall.lta.gov.sg/content/datamall/en/static-data.html"
            rel="nofollow"
            useIcon={false}
          >
            Land Transport Datamall
          </Link>
          . &copy; {new Date().getFullYear()}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
