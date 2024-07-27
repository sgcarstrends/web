import Image from "next/image";
import Link from "next/link";
import banner from "@/app/banner.png";
import { Input } from "@/components/ui/input";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
import { NavItem } from "@/app/components/NavItem";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
import { Search } from "lucide-react";

const navItems = [
  // { title: "Overview", href: "/" },
  { title: "Cars", href: "/cars" },
  { title: "COE", href: "/coe" },
];

export const Header = () => {
  return (
    <header className="border-b-2 bg-white">
      <div className="container flex items-center justify-between p-4">
        <nav className="flex items-center gap-x-4">
          <Link href="/">
            <Image src={banner} height={48} alt="Banner" />
          </Link>
          {navItems.map(({ title, href }) => {
            return (
              <NavItem key={title} href={href}>
                {title}
              </NavItem>
            );
          })}
          {/*<NavigationMenu>*/}
          {/*  <NavigationMenuList>*/}
          {/*    <NavigationMenuItem>*/}
          {/*      <Link href="/" legacyBehavior passHref>*/}
          {/*        <NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
          {/*          Overview*/}
          {/*        </NavigationMenuLink>*/}
          {/*      </Link>*/}
          {/*    </NavigationMenuItem>*/}
          {/*    <NavigationMenuItem>*/}
          {/*      <NavigationMenuTrigger>Cars</NavigationMenuTrigger>*/}
          {/*      <NavigationMenuContent>*/}
          {/*        <NavigationMenuLink*/}
          {/*          className={navigationMenuTriggerStyle()}*/}
          {/*          asChild*/}
          {/*        >*/}
          {/*          Petrol*/}
          {/*        </NavigationMenuLink>*/}
          {/*        <NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
          {/*          Hybrid*/}
          {/*        </NavigationMenuLink>*/}
          {/*        <Link href="/cars/electric" legacyBehavior passHref>*/}
          {/*          <NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
          {/*            Electric*/}
          {/*          </NavigationMenuLink>*/}
          {/*        </Link>*/}
          {/*      </NavigationMenuContent>*/}
          {/*    </NavigationMenuItem>*/}
          {/*    <NavigationMenuItem>*/}
          {/*      <NavigationMenuTrigger>COE</NavigationMenuTrigger>*/}
          {/*      <NavigationMenuContent>*/}
          {/*        <NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
          {/*          Latest*/}
          {/*        </NavigationMenuLink>*/}
          {/*        <NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
          {/*          Historical*/}
          {/*        </NavigationMenuLink>*/}
          {/*      </NavigationMenuContent>*/}
          {/*    </NavigationMenuItem>*/}
          {/*  </NavigationMenuList>*/}
          {/*</NavigationMenu>*/}
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
    </header>
  );
};
