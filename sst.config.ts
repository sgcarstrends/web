/// <reference path="./.sst/platform/config.d.ts" />

const DOMAIN_NAME = "sgmotortrends.com";

const DOMAIN: Record<string, string> = {
  dev: `dev.${DOMAIN_NAME}`,
  staging: `staging.${DOMAIN_NAME}`,
  prod: DOMAIN_NAME,
};

export default $config({
  app(input) {
    return {
      name: "sgcarstrends",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: { region: "ap-southeast-1" },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("Site", {
      domain: {
        name: DOMAIN[$app.stage],
        // redirects: [`www.${DOMAIN_NAME}`],
      },
    });
  },
});
