const isProd = process.env.NODE_ENV === "production";

let redirects = [];
if (isProd) {
  redirects = [
    { source: "/", destination: "/cars", permanent: false },
    { source: "/coe", destination: "/coe/prices", permanent: false },
  ];
}

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
