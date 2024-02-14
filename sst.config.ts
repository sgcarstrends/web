import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

const DOMAIN = "sgmotortrends.com";

export default {
  config(_input) {
    return {
      name: "singapore-ev-trends",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(function site({ stack }) {
      const nextjsSite = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: DOMAIN,
          domainAlias: `www.${DOMAIN}`,
        },
        experimental: {
          disableIncrementalCache: true,
        },
        warm: 20,
      });

      stack.addOutputs({
        SiteUrl: nextjsSite.url,
      });
    });
  },
} satisfies SSTConfig;
