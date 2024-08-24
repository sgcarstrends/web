"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Battery,
  Droplet,
  Fuel,
  type LucideIcon,
  Menu,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Cars</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/cars"
                  >
                    <TrendingUp className="h-6 w-6 stroke-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">Monthly</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Car registration data for the latest month and previous
                      months, broken down by fuel type and vehicle type.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/cars/petrol" title="Petrol" icon={Fuel}>
                Petrol Cars
              </ListItem>
              <ListItem href="/cars/hybrid" title="Hybrid" icon={Zap}>
                Hybrid Cars
              </ListItem>
              <ListItem href="/cars/electric" title="Electric" icon={Battery}>
                Electric Cars
              </ListItem>
              <ListItem href="/cars/diesel" title="Diesel" icon={Droplet}>
                Diesel Cars
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <UnreleasedFeature>
          <NavigationMenuItem>
            <NavigationMenuTrigger>COE</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/coe/prices" title="Latest COE">
                  Latest
                </ListItem>
                <ListItem href="/coe/prices" title="Historical COE Trends">
                  Historical
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </UnreleasedFeature>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const DesktopNavMenu = () => {
  return (
    <div className="container hidden items-center justify-between p-4 lg:flex">
      <nav className="flex items-center gap-x-4">
        <Link href="/" className="flex items-center gap-x-2">
          <BrandLogo />
        </Link>
        <NavMenu />
      </nav>
      <UnreleasedFeature>
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="border border-gray-300 pl-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </UnreleasedFeature>
    </div>
  );
};

export const MobileNavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Overview", link: "/cars" },
    { title: "Petrol Cars", link: "/cars/petrol" },
    { title: "Hybrid Cars", link: "/cars/hybrid" },
    { title: "Electric Cars", link: "/cars/electric" },
    { title: "Diesel Cars", link: "/cars/diesel" },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-3 lg:hidden">
      <Link href="/" className="flex items-center gap-x-2">
        <BrandLogo />
      </Link>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-x-2">
              <BrandLogo />
            </Link>
          </div>
          <UnreleasedFeature>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                type="search"
                placeholder="Search cars..."
                className="rounded-full border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </UnreleasedFeature>
          <ScrollArea>
            <Accordion type="single" collapsible>
              <AccordionItem value="cars">
                <AccordionTrigger>Cars</AccordionTrigger>
                <AccordionContent>
                  <nav className="flex flex-col space-y-4">
                    {links.map(({ title, link }) => (
                      <Link
                        key={title}
                        href={link}
                        className="text-blue-600 hover:underline"
                      >
                        {title}
                      </Link>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <nav className="mt-4 flex flex-col space-y-4">
              <Link
                href="/coe/prices"
                className="text-gray-700 hover:text-blue-600"
              >
                COE
              </Link>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href: string;
    icon?: LucideIcon;
  }
>(({ className, title, children, href, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
        <Link href={href} legacyBehavior passHref>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="flex items-center space-x-2">
              {Icon && <Icon className="h-4 w-4" />}
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
