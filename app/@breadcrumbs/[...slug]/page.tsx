import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Params = Promise<{ slug: string[] }>;

interface BreadcrumbItem {
  href: string;
  label: string;
  isLastItem: boolean;
}

const BREADCRUMB_MAP: Record<string, string> = {
  coe: "COE",
};

const capitaliseWords = (text: string): string =>
  text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const generateBreadcrumbs = (slug: string[]): BreadcrumbItem[] =>
  slug.map((segment, index) => ({
    href: `/${slug.slice(0, index + 1).join("/")}`,
    label: BREADCRUMB_MAP[segment] ?? capitaliseWords(segment),
    isLastItem: index === slug.length - 1,
  }));

const Breadcrumbs = async (props: { params: Params }) => {
  const params = await props.params;
  const breadcrumbs = generateBreadcrumbs(params.slug);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map(({ isLastItem, href, label }) => (
          <Fragment key={href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isLastItem ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
