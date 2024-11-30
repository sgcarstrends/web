import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export const Header = () => {
  return (
    <header className="border-b bg-white">
      <nav className="container mx-auto px-4 py-8">
        <Link href="/">
          <BrandLogo />
        </Link>
      </nav>
    </header>
  );
};
