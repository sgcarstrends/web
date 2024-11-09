const isProd = process.env.NODE_ENV === "production";

let redirects = [];
if (isProd) {
  redirects = [{ source: "/", destination: "/cars", permanent: false }];
}

// Temporary redirects until features in the respective page is completed
redirects = redirects.concat([
  {
    source: "/cars/fuel-types",
    destination: "/cars",
    permanent: false,
  },
  {
    source: "/cars/vehicle-types",
    destination: "/cars",
    permanent: false,
  },
  {
    source: "/cars/makes",
    destination: "/cars",
    permanent: false,
  },
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return redirects;
  },
};

module.exports = nextConfig;
