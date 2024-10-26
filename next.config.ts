import type { Redirect } from "next/dist/lib/load-custom-routes";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

let redirects: Redirect[] | PromiseLike<Redirect[]> = [];
if (isProd) {
  redirects = [{ source: "/", destination: "/cars", permanent: false }];
}

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
