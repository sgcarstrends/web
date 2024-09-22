"use client";

import type { PropsWithChildren } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props extends PropsWithChildren {
  href: string;
}

export const LinkWithParams = ({ href, children }: Props) => {
  const params = useSearchParams();
  const query = params.toString();

  return <Link href={{ pathname: href, query }}>{children}</Link>;
};
