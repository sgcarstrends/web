"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Search, TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";

const links = [
  { title: "Petrol", link: "/cars/petrol" },
  { title: "Hybrid", link: "/cars/hybrid" },
  { title: "Electric", link: "/cars/electric" },
  { title: "Diesel", link: "/cars/diesel" },
];

export const MobileNavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3 lg:hidden">
      <div className="flex items-center gap-x-2">
        <TrendingUp className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold">
          <span className="text-black">SGCars</span>
          <span className="text-blue-600">Trends</span>
        </span>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">
                <span className="text-black">SGCars</span>
                <span className="text-blue-600">Trends</span>
              </span>
            </div>
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
                        {title} Cars
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
