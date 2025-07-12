import type { ComponentType } from "react";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
} from "@icons-pack/react-simple-icons";
import { sortByName } from "@/utils/sorting";

export interface NavigationItem {
  title: string;
  url: string;
}

export interface SocialMediaItem {
  title: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavLinks {
  cars: {
    overview: NavigationItem;
    fuelTypes: NavigationItem;
    vehicleTypes: NavigationItem;
  };
  coe: NavigationItem[];
  general: NavigationItem[];
  socialMedia: SocialMediaItem[];
}

const socialMedia = [
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
];

export const navLinks: NavLinks = {
  cars: {
    overview: {
      title: "New Registrations",
      url: "/cars",
    },
    fuelTypes: {
      title: "Fuel Types",
      url: "/cars/fuel-types",
    },
    vehicleTypes: {
      title: "Vehicle Types",
      url: "/cars/vehicle-types",
    },
  },
  coe: [
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
  ],
  general: [
    {
      title: "Blog",
      url: "/blog",
    },
    {
      title: "Visitors",
      url: "/visitors",
    },
  ],
  socialMedia: sortByName(socialMedia, { sortKey: "title" }),
};
