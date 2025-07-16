"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    console.log("404 page viewed");
  }, []);

  return (
    <main
      role="main"
      aria-labelledby="page-title"
      className="flex min-h-screen flex-col items-center justify-between bg-white px-4 py-12"
    >
      <section className="flex flex-col items-center text-center">
        <div className="mb-6 text-6xl"></div>
        <h1 id="page-title" className="mb-2 text-4xl font-bold">
          Page Not Found
        </h1>
        <p className="mb-6 text-gray-600">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button> Go Home</Button>
          </Link>
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>

        <div className="text-left text-sm text-gray-700">
          <p className="mb-2 text-center font-semibold">Popular Pages:</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-center">
            <li>
              <Link href="/cars">• Cars Overview</Link>
            </li>
            <li>
              <Link href="/coe/results">• COE Results</Link>
            </li>
            <li>
              <Link href="/cars/fuel">• Fuel Types</Link>
            </li>
            <li>
              <Link href="/cars/types">• Vehicle Types</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
