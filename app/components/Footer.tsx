import type { ElementType } from "react";
import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Separator } from "@/components/ui/separator";

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

interface SocialMediaLink {
  name: string;
  url: string;
  icon: ElementType;
}

const socialMediaLinks: SocialMediaLink[] = [
  {
    name: "Facebook",
    url: "https://facebook.com/sgcarstrends",
    icon: Facebook,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/sgcarstrends",
    icon: Twitter,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/sgcarstrends",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/sgcarstrends",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/sgcarstrends",
    icon: Github,
  },
  // {
  //   name: "Threads",
  //   url: "https://threads.net/sgcarstrends",
  //   icon: Threads,
  // },
];

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

  const sortByName = (a: SocialMediaLink, b: SocialMediaLink) =>
    a.name.localeCompare(b.name);

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <BrandLogo />
            </div>
            {footerSections.map(({ title, links }) => (
              <FooterSection key={title} title={title} links={links} />
            ))}
          </div>
          <div className="flex flex-col items-center">
            <h3 className="mb-2 font-semibold text-gray-900">Follow Us</h3>
            <div className="flex gap-4">
              {socialMediaLinks.toSorted(sortByName).map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                  aria-label={social.name}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
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
  // {
  //   title: "COE",
  //   links: [
  //     { href: "/coe/prices", label: "COE Prices" },
  //     { href: "/coe/bidding", label: "COE Bidding" },
  //   ],
  // },
  // {
  //   title: "Resources",
  //   links: [
  //     { href: "/about", label: "About" },
  //     { href: "/contact", label: "Contact" },
  //   ],
  // },
];
