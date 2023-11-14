import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

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
          domainName: "singapore-ev-trends.ruchern.xyz",
          hostedZone: "ruchern.xyz",
        },
      });

      stack.addOutputs({
        SiteUrl: nextjsSite.url,
      });
    });
  },
} satisfies SSTConfig;
