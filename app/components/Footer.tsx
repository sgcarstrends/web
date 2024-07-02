import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import banner from "@/app/banner.png";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

const FooterSection = ({ title, links }: FooterSectionProps) => (
  <div>
    <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
    <ul className="flex flex-col gap-y-2">
      {links.map(({ href, label }) => (
        <li key={label}>
          <Link href={href} className="text-gray-600 hover:text-blue-600">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {footerSections.map(({ title, links }) => (
            <FooterSection key={title} title={title} links={links} />
          ))}
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
          <div>
            Data provided by{" "}
            <a href="https://www.lta.gov.sg/content/ltagov/en.html">
              Land Transport Authority (LTA)
            </a>{" "}
            <a
              href="https://datamall.lta.gov.sg/content/datamall/en/static-data.html"
              className="text-blue-600 hover:underline"
            >
              Land Transport Datamall
            </a>
          </div>
          <div> &copy; {currentYear}. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};

const footerSections: FooterSection[] = [
  {
    title: "Cars",
    links: [
      { href: "/cars", label: "All Cars" },
      { href: "/cars/petrol", label: "Petrol Cars" },
      { href: "/cars/hybrid", label: "Hybrid Cars" },
      { href: "/cars/electric", label: "Electric Cars" },
      { href: "/cars/diesel", label: "Diesel Cars" },
    ],
  },
  {
    title: "COE",
    links: [
      { href: "/coe/prices", label: "COE Prices" },
      { href: "/coe/bidding", label: "COE Bidding" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
