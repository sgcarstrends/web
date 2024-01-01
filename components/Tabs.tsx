"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@mdi/react";
import classNames from "classnames";
import { TabItem } from "@/types";

interface TabProps {
  tabItems: TabItem[];
}

export const Tabs = ({ tabItems }: TabProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    // Special case for the root page
    if (href === "/" && pathname === "/") {
      return true;
    }

    return pathname.startsWith(href) && href !== "/";
  };

  return (
    <div className="flex justify-center border-b border-gray-600 text-center text-gray-900">
      <ul className="-mb-px flex flex-wrap gap-x-2">
        {tabItems.map(({ title, href, icon }) => {
          return (
            <li key={title}>
              <Link
                href={href}
                className={classNames(
                  `group inline-flex items-center justify-center gap-x-2 border-b-2 p-4  ${
                    isActive(href)
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent hover:border-blue-600 hover:text-blue-600"
                  }`,
                )}
              >
                <Icon path={icon} size={1} aria-hidden={true} />
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
