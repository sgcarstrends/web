"use client";

import Link from "next/link";
import { Button, Divider } from "@heroui/react";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
} from "@icons-pack/react-simple-icons";
import { BrandLogo } from "@/components/brand-logo";
import { UnreleasedFeature } from "@/components/unreleased-feature";
import { slugify } from "@/utils/slugify";
import { sortByName } from "@/utils/sorting";

export const Footer = () => (
  <footer className="bg-content1 border-divider mt-16 border-t">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand Section */}
        <div className="space-y-4">
          <BrandLogo />
          <p className="text-default-600 text-sm leading-relaxed">
            Your go-to source for Singapore car market data and trends. We make
            sense of the numbers so you don&apos;t have to.
          </p>
          <div className="flex gap-2">
            {socialMediaLinks.map(({ title, url, icon: Icon }) => (
              <Button
                key={title}
                as="a"
                href={url}
                rel="me noreferrer"
                target="_blank"
                isIconOnly
                variant="light"
                size="sm"
                className="text-default-500 hover:text-primary transition-colors"
                aria-label={title}
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </div>
        </div>

        {/* General Section */}
        <UnreleasedFeature>
          <div className="space-y-4">
            <h3 className="text-default-900 text-lg font-semibold">General</h3>
            <div className="space-y-2">
              <Link
                href="/visitors"
                className="text-default-600 hover:text-primary block text-sm transition-colors"
              >
                Visitors
              </Link>
              <Link
                href="/blog"
                className="text-default-600 hover:text-primary block text-sm transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </UnreleasedFeature>

        {/* Car Data Section */}
        <div className="space-y-4">
          <h3 className="text-default-900 text-lg font-semibold">Car Data</h3>
          <div className="space-y-2">
            <Link
              href="/cars"
              className="text-default-600 hover:text-primary block text-sm transition-colors"
            >
              Car Registrations
            </Link>
            {fuelTypes.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-default-600 hover:text-primary block text-sm transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Vehicle Types Section */}
        <div className="space-y-4">
          <h3 className="text-default-900 text-lg font-semibold">
            Vehicle Types
          </h3>
          <div className="space-y-2">
            {vehicleTypes.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-default-600 hover:text-primary block text-sm transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* COE Section */}
        <div className="space-y-4">
          <h3 className="text-default-900 text-lg font-semibold">COE</h3>
          <div className="space-y-2">
            {coeLinks.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-default-600 hover:text-primary block text-sm transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Divider className="my-8" />

      {/* Bottom Section */}
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="text-default-600 text-center text-sm md:text-left">
          <p>
            © {new Date().getFullYear()} SGCarsTrends. All rights reserved.
          </p>
          <p className="mt-1">
            Data provided by{" "}
            <Link
              href="https://datamall.lta.gov.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LTA DataMall
            </Link>
          </p>
        </div>

        <div className="flex gap-4 text-sm">
          <Link
            href="/legal/privacy-policy"
            className="text-default-600 hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/legal/terms-of-service"
            className="text-default-600 hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

// Navigation data extracted from header component
const fuelTypes = sortByName(
  [
    { title: "Petrol" },
    { title: "Hybrid" },
    { title: "Electric" },
    { title: "Diesel" },
  ],
  { sortKey: "title" },
).map((item) => ({
  ...item,
  url: `/cars/fuel-types/${slugify(item.title)}`,
}));

const vehicleTypes = sortByName(
  [
    { title: "Hatchback" },
    { title: "Sedan" },
    { title: "Multi-purpose Vehicle" },
    { title: "Station-wagon" },
    { title: "Sports Utility Vehicle" },
    { title: "Coupe/Convertible" },
  ],
  { sortKey: "title" },
).map((item) => ({
  ...item,
  url: `/cars/vehicle-types/${slugify(item.title)}`,
}));

const coeLinks = [
  {
    title: "Overview",
    url: "/coe",
  },
  {
    title: "Historical Results",
    url: "/coe/results",
  },
  {
    title: "Trends Analysis",
    url: "/coe/trends",
  },
  {
    title: "Bidding Results",
    url: "/coe/bidding",
  },
  {
    title: "PQP Rates",
    url: "/coe/pqp",
  },
];

const socialMediaLinks = sortByName(
  [
    {
      title: "Twitter",
      url: "https://twitter.com/sgcarstrends",
      icon: SiX,
    },
    {
      title: "Instagram",
      url: "https://instagram.com/sgcarstrends",
      icon: SiInstagram,
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/company/sgcarstrends",
      icon: SiLinkedin,
    },
    {
      title: "GitHub",
      url: "https://github.com/sgcarstrends",
      icon: SiGithub,
    },
  ],
  { sortKey: "title" },
);
