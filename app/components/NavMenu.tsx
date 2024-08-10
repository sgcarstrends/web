"use client";

import * as React from "react";
import Link from "next/link";
import { Battery, Droplet, Fuel, LucideIcon, Zap } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
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
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Latest month
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon?: LucideIcon }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
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
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
