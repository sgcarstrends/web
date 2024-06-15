import Link from "next/link";
import { Button } from "@/components/ui/button";
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
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabItem } from "@/types";
import { NavItem } from "@/app/components/NavItem";

const navItems = [
  { title: "Overview", href: "/" },
  { title: "Cars", href: "/" },
  { title: "COE", href: "/coe" },
];

const tabItems: TabItem[] = [
  {
    title: "Cars",
    href: "/",
  },
  // {
  //   title: "Electric",
  //   href: "/cars/electric",
  //   icon: mdiCarElectric,
  // },
  // {
  //   title: "Petrol",
  //   href: "/petrol",
  //   icon: mdiGasStation,
  // },
  // {
  //   title: "Hybrid",
  //   href: "/hybrid",
  //   icon: mdiGasStation,
  // },
];

export const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between border-b-2 bg-white p-4">
        <nav className="flex gap-x-4">
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
        <div className="flex gap-x-4">
          <Input type="search" placeholder="Search..." />
          <Button type="submit">Search</Button>
        </div>
      </div>
      {/*<div className="flex px-4 py-8">*/}
      {/*<Tabs defaultValue={tabItems[0].title}>*/}
      {/*  <TabsList>*/}
      {/*    {tabItems.map(({ title, href }) => (*/}
      {/*      <Link key={title} href={href}>*/}
      {/*        <TabsTrigger value={title}>{title}</TabsTrigger>*/}
      {/*      </Link>*/}
      {/*    ))}*/}
      {/*  </TabsList>*/}
      {/*</Tabs>*/}
      {/*</div>*/}
    </>
  );
};
