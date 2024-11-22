"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  Battery,
  ChevronRight,
  DollarSign,
  Droplet,
  Facebook,
  Fuel,
  Gauge,
  Github,
  Instagram,
  Linkedin,
  type LucideIcon,
  Twitter,
  Zap,
} from "lucide-react";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { VEHICLE_TYPE_MAP } from "@/constants";
import { slugify } from "@/utils/slugify";
import type { VehicleType } from "@/types";

type NavItem = {
  title: string;
  icon?: LucideIcon;
  url: string;
  isActive?: boolean;
  items?: NavSubItem[];
};

type NavSubItem = {
  title: string;
  icon?: LucideIcon;
  url: string;
};

type Nav = {
  [key: string]: NavItem[];
};

export const AppSidebar = () => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
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
          <SidebarGroupLabel>Cars</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/cars"}>
                <Link href="/cars">
                  <Gauge />
                  <span>Monthly Registrations</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {data.cars.map(({ items, ...item }) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.url === pathname}
                            onClick={() => setOpenMobile(false)}
                          >
                            <Link href={subItem.url}>
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>COE</SidebarGroupLabel>
          <SidebarMenu>
            {data.coe.map(({ items, ...item }) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.url === pathname}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={subItem.url === pathname}
                      >
                        <Link href={subItem.url}>
                          {subItem.icon && <subItem.icon />}
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Social Media</SidebarGroupLabel>
          <NavSocialMedia items={data.socialMedia} />
        </SidebarGroup>
      </SidebarContent>
      {/*<SidebarFooter>*/}
      {/*<SidebarMenu>*/}
      {/*  <SidebarMenuItem>*/}
      {/*    <DropdownMenu>*/}
      {/*      <DropdownMenuTrigger asChild>*/}
      {/*        <SidebarMenuButton>*/}
      {/*          <User2 /> Username*/}
      {/*          <ChevronUp className="ml-auto" />*/}
      {/*        </SidebarMenuButton>*/}
      {/*      </DropdownMenuTrigger>*/}
      {/*      <DropdownMenuContent*/}
      {/*        side="top"*/}
      {/*        className="w-[--radix-popper-anchor-width]"*/}
      {/*      >*/}
      {/*        <DropdownMenuItem>*/}
      {/*          <span>Account</span>*/}
      {/*        </DropdownMenuItem>*/}
      {/*        <DropdownMenuItem>*/}
      {/*          <span>Billing</span>*/}
      {/*        </DropdownMenuItem>*/}
      {/*        <DropdownMenuItem>*/}
      {/*          <span>Sign out</span>*/}
      {/*        </DropdownMenuItem>*/}
      {/*      </DropdownMenuContent>*/}
      {/*    </DropdownMenu>*/}
      {/*  </SidebarMenuItem>*/}
      {/*</SidebarMenu>*/}
      {/*</SidebarFooter>*/}
    </Sidebar>
  );
};

// TODO: Slugify URLs
const data: Nav = {
  cars: [
    {
      title: "Fuel Types",
      // icon: Fuel,
      url: "/cars/fuel-types",
      isActive: true,
      items: [
        { title: "Petrol", icon: Fuel },
        { title: "Hybrid", icon: Zap },
        { title: "Electric", icon: Battery },
        { title: "Diesel", icon: Droplet },
      ].map((item) => {
        const title = item.title;
        return {
          ...item,
          url: `/cars/fuel-types/${slugify(title)}`,
        };
      }),
    },
    {
      title: "Vehicle Types",
      url: "/cars/vehicle-types",
      isActive: true,
      items: [
        { title: "Hatchback" },
        { title: "Sedan" },
        { title: "Multi-purpose Vehicle" },
        { title: "Station-wagon" },
        { title: "Sports Utility Vehicle" },
        { title: "Coupe/Convertible" },
      ].map((item) => {
        const title = item.title as VehicleType;
        return {
          ...item,
          title: VEHICLE_TYPE_MAP[title] || title,
          url: `/cars/vehicle-types/${slugify(title)}`,
        };
      }),
    },
  ],
  coe: [
    {
      title: "Prices",
      icon: DollarSign,
      url: "/coe",
    },
    // {
    //   title: "COE",
    //   icon: "",
    //   url: "/coe",
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Prices",
    //       icon: DollarSign,
    //       url: "/coe/prices",
    //     },
    //   ] satisfies NavSubItem[],
    // },
  ],
  socialMedia: [
    {
      title: "Facebook",
      url: "https://facebook.com/sgcarstrends",
      icon: Facebook,
    },
    {
      title: "Twitter",
      url: "https://twitter.com/sgcarstrends",
      icon: Twitter,
    },
    {
      title: "Instagram",
      url: "https://instagram.com/sgcarstrends",
      icon: Instagram,
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/company/sgcarstrends",
      icon: Linkedin,
    },
    {
      title: "GitHub",
      url: "https://github.com/sgcarstrends",
      icon: Github,
    },
  ].sort((a, b) => a.title.localeCompare(b.title)),
};
