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
  Fuel,
  Gauge,
  type LucideIcon,
  Zap,
} from "lucide-react";

import { BrandLogo } from "@/components/BrandLogo";
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
  cars: NavItem[];
  coe: NavItem[];
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
      </SidebarContent>
      {/*<SidebarFooter>*/}
      {/*  <SidebarMenu>*/}
      {/*    <SidebarMenuItem>*/}
      {/*      <DropdownMenu>*/}
      {/*        <DropdownMenuTrigger asChild>*/}
      {/*          <SidebarMenuButton>*/}
      {/*            <User2 /> Username*/}
      {/*            <ChevronUp className="ml-auto" />*/}
      {/*          </SidebarMenuButton>*/}
      {/*        </DropdownMenuTrigger>*/}
      {/*        <DropdownMenuContent*/}
      {/*          side="top"*/}
      {/*          className="w-[--radix-popper-anchor-width]"*/}
      {/*        >*/}
      {/*          <DropdownMenuItem>*/}
      {/*            <span>Account</span>*/}
      {/*          </DropdownMenuItem>*/}
      {/*          <DropdownMenuItem>*/}
      {/*            <span>Billing</span>*/}
      {/*          </DropdownMenuItem>*/}
      {/*          <DropdownMenuItem>*/}
      {/*            <span>Sign out</span>*/}
      {/*          </DropdownMenuItem>*/}
      {/*        </DropdownMenuContent>*/}
      {/*      </DropdownMenu>*/}
      {/*    </SidebarMenuItem>*/}
      {/*  </SidebarMenu>*/}
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
        {
          title: "Petrol",
          icon: Fuel,
          url: "/cars/fuel-types/petrol",
        },
        {
          title: "Hybrid",
          icon: Zap,
          url: "/cars/fuel-types/hybrid",
        },
        {
          title: "Electric",
          icon: Battery,
          url: "/cars/fuel-types/electric",
        },
        {
          title: "Diesel",
          icon: Droplet,
          url: "/cars/fuel-types/diesel",
        },
      ],
    },
    {
      title: "Vehicle Types",
      url: "/cars/vehicle-types",
      isActive: true,
      items: [
        {
          title: "Hatchback",
          url: "/cars/vehicle-types/hatchback",
        },
        {
          title: "Sedan",
          url: "/cars/vehicle-types/sedan",
        },
        {
          title: "Multi-purpose Vehicle",
          url: `/cars/vehicle-types/${encodeURIComponent("multi-purpose vehicle")}`,
        },
        {
          title: "Station-wagon",
          url: "/cars/vehicle-types/station-wagon",
        },
        {
          title: "Sports Utility Vehicle",
          url: `/cars/vehicle-types/${encodeURIComponent("sports utility vehicle")}`,
        },
        {
          title: "Coupe/Convertible",
          url: `/cars/vehicle-types/${encodeURIComponent("coupe/convertible")}`,
        },
      ],
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
};
