"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import {
  type IconType,
  SiBluesky,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
} from "@icons-pack/react-simple-icons";
import { type LucideIcon } from "lucide-react";
import { useQueryState, parseAsString } from "nuqs";
import { BrandLogo } from "@/components/BrandLogo";
import { NavSocialMedia } from "@/components/NavSocialMedia";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { VEHICLE_TYPE_MAP } from "@/constants";
import { slugify } from "@/utils/slugify";

type Icon = LucideIcon | IconType;

type NavItem = {
  title: string;
  icon?: Icon;
  url: string;
  isActive?: boolean;
  items?: NavSubItem[];
};

type NavSubItem = {
  title: string;
  icon?: Icon;
  url: string;
};

type Nav = {
  [key: string]: NavItem[];
};

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const [month] = useQueryState("month", parseAsString);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex flex-col gap-0.5 leading-none">
                  <BrandLogo />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map(({ items, ...item }) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>{item.title}</Link>
                </SidebarMenuButton>
                {items?.length && (
                  <SidebarMenuSub>
                    {items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={{
                              pathname: subItem.url,
                              query: { month },
                            }}
                          >
                            {subItem.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Social Media</SidebarGroupLabel>
          <NavSocialMedia items={data.socialMedia} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

const data: Nav = {
  navMain: [
    { title: "Latest Registration", url: "/cars" },
    {
      title: "Fuel Types",
      url: "/cars/fuel-types",
      items: [
        { title: "Petrol" },
        { title: "Hybrid" },
        { title: "Electric" },
        { title: "Diesel" },
      ].map((item) => ({
        ...item,
        url: `/cars/fuel-types/${slugify(item.title)}`,
      })),
    },
    {
      title: "Vehicle Types",
      url: "/cars/vehicle-types",
      items: [
        { title: "Hatchback" },
        { title: "Sedan" },
        { title: "Multi-purpose Vehicle" },
        { title: "Station-wagon" },
        { title: "Sports Utility Vehicle" },
        { title: "Coupe/Convertible" },
      ].map((item) => ({
        ...item,
        title: VEHICLE_TYPE_MAP[item.title] ?? item.title,
        url: `/cars/vehicle-types/${slugify(item.title)}`,
      })),
    },
    {
      title: "COE",
      url: "/coe",
      items: [
        {
          title: "COE Result",
          url: "/coe",
        },
        {
          title: "COE PQP Rates",
          url: "/coe/pqp",
        },
      ],
    },
  ],
  socialMedia: [
    {
      title: "Facebook",
      url: "https://facebook.com/sgcarstrends",
      icon: SiFacebook,
    },
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
    {
      title: "Bluesky",
      url: "https://bsky.app/profile/sgcarstrends.com",
      icon: SiBluesky,
    },
  ].sort((a, b) => a.title.localeCompare(b.title)),
};
