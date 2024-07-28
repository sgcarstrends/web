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
    });
  },
});
