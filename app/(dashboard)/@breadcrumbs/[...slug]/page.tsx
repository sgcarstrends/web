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
import { deslugify } from "@/utils/slugify";

type Params = Promise<{ slug: string[] }>;

interface BreadcrumbItem {
  href: string;
  label: string;
  isLastItem: boolean;
}

const BREADCRUMB_MAP: Record<string, string> = {
  coe: "COE",
};

const generateBreadcrumbs = (slug: string[]): BreadcrumbItem[] => {
  return slug.map((segment, index) => {
    const isMakesPage = slug[index - 1] === "makes";

    let label = deslugify(segment);
    if (BREADCRUMB_MAP[segment]) {
      label = BREADCRUMB_MAP[segment];
    } else if (isMakesPage) {
      label = label.toUpperCase();
    }

    return {
      href: `/${slug.slice(0, index + 1).join("/")}`,
      label,
      isLastItem: index === slug.length - 1,
    };
  });
};

const Breadcrumbs = async (props: { params: Params }) => {
  const params = await props.params;
  const breadcrumbs = generateBreadcrumbs(params.slug);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/public">Home</Link>
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
