"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
} from "@icons-pack/react-simple-icons";
import { ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { UnreleasedFeature } from "@/components/unreleased-feature";
import { slugify } from "@/utils/slugify";
import { sortByName } from "@/utils/sorting";
import type { NavbarProps } from "@heroui/navbar";

export const Header = (props: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      {...props}
      maxWidth="full"
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="container mx-auto"
    >
      <NavbarBrand>
        <Link href="/">
          <BrandLogo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem>
          <Link href="/cars">Car Registrations</Link>
        </NavbarItem>
        <UnreleasedFeature>
          <NavbarItem>
            <Link href="/visitors">Visitors</Link>
          </NavbarItem>
        </UnreleasedFeature>
        <UnreleasedFeature>
          <NavbarItem>
            <Link href="/blog">Blog</Link>
          </NavbarItem>
        </UnreleasedFeature>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                endContent={<ChevronDown className="size-4" />}
                radius="sm"
                variant="light"
              >
                Fuel Types
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Fuel Types"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {navData.fuelTypes.map((item) => (
              <DropdownItem
                key={item.title}
                href={item.url}
                className="text-foreground hover:text-primary"
              >
                {item.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                endContent={<ChevronDown className="size-4" />}
                radius="sm"
                variant="light"
              >
                Vehicle Types
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Vehicle Types"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {navData.vehicleTypes.map((item) => (
              <DropdownItem
                key={item.title}
                href={item.url}
                className="text-foreground hover:text-primary"
              >
                {item.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                endContent={<ChevronDown className="size-4" />}
                radius="sm"
                variant="light"
              >
                COE
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="COE"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {navData.coe.map((item) => (
              <DropdownItem
                key={item.title}
                href={item.url}
                className="text-foreground hover:text-primary"
              >
                {item.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem className="ml-2 !flex gap-2">
          {navData.socialMedia.map(({ title, url, icon: Icon }) => (
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
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle
        aria-label="Toggle navigation menu"
        className="sm:hidden"
      />

      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/cars" className="w-full">
            Car Registrations
          </Link>
        </NavbarMenuItem>
        <UnreleasedFeature>
          <NavbarMenuItem>
            <Link href="/visitors" className="w-full">
              Visitors
            </Link>
          </NavbarMenuItem>
        </UnreleasedFeature>
        <UnreleasedFeature>
          <NavbarMenuItem>
            <Link href="/blog" className="w-full">
              Blog
            </Link>
          </NavbarMenuItem>
        </UnreleasedFeature>
        <NavbarMenuItem>
          <div className="text-default-600 py-2 text-sm font-medium">
            Fuel Types
          </div>
        </NavbarMenuItem>
        {navData.fuelTypes.map((item) => (
          <NavbarMenuItem key={item.title}>
            <Link href={item.url} className="text-default-700 w-full pl-4">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <div className="text-default-600 py-2 text-sm font-medium">
            Vehicle Types
          </div>
        </NavbarMenuItem>
        {navData.vehicleTypes.map((item) => (
          <NavbarMenuItem key={item.title}>
            <Link href={item.url} className="text-default-700 w-full pl-4">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <div className="text-default-600 py-2 text-sm font-medium">COE</div>
        </NavbarMenuItem>
        {navData.coe.map((item) => (
          <NavbarMenuItem key={item.title}>
            <Link href={item.url} className="text-default-700 w-full pl-4">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

// Navigation data extracted from the sidebar
const navData = {
  fuelTypes: sortByName(
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
  })),
  vehicleTypes: sortByName(
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
  })),
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
  socialMedia: sortByName(
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
  ),
};
