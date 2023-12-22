"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@mdi/react";
import classNames from "classnames";

interface TabItem {
  title: string;
  href: string;
  icon: string;
}

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
    <div className="flex w-full justify-center border-b border-gray-600 text-center text-gray-400">
      <ul className="-mb-px flex flex-wrap gap-x-2">
        {tabItems.map(({ title, href, icon }) => {
          return (
            <li key={title}>
              <Link
                href={href}
                className={classNames(
                  `group inline-flex items-center justify-center gap-x-2 border-b-2 p-4 hover:border-gray-900 hover:text-gray-900 ${
                    isActive(href)
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent"
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
