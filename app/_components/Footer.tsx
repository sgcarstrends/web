import { PropsWithChildren } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface LinkProps extends PropsWithChildren {
  href: string;
}

const Link = ({ href, children }: LinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="flex items-center gap-x-1 text-gray-900 hover:underline hover:underline-offset-8"
    >
      {children}
      <ArrowTopRightOnSquareIcon width={16} height={16} />
    </a>
  );
};

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-x-4 bg-gray-100 p-4">
      <Link href="https://ruchern.xyz">Chong Ru Chern</Link>
      <Link href="https://github.com/ruchernchong/singapore-ev-trends">
        Source code
      </Link>
    </footer>
  );
};
