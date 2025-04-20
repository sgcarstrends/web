/// <reference path="./.sst/platform/config.d.ts" />

const DOMAIN_NAME = "sgcarstrends.com";

const DOMAIN: Record<string, any> = {
  dev: { name: `dev.${DOMAIN_NAME}` },
  staging: { name: `staging.${DOMAIN_NAME}` },
  prod: { name: DOMAIN_NAME, redirects: [`www.${DOMAIN_NAME}`] },
};

export default $config({
  app(input) {
    return {
      name: "sgcarstrends",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: { region: "ap-southeast-1" },
        cloudflare: true,
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("Site", {
      domain: {
        ...DOMAIN[$app.stage],
        dns: sst.cloudflare.dns(),
      },
      environment: {
        SG_CARS_TRENDS_API_TOKEN: process.env.SG_CARS_TRENDS_API_TOKEN!,
        DATABASE_URL: process.env.DATABASE_URL!,
        APP_ENV: $app.stage,
      },
      server: {
        architecture: "arm64",
        memory: "4096 MB",
      },
      warm: 1,
    });
  },
});
