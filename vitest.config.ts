import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      include: ["src"],
      exclude: [
        "src/components/ui",
        "src/config",
        "src/functions",
        "src/lib",
        "src/schema",
        "src/types",
      ],
    },
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "tests"],
    setupFiles: "./setupTests.ts",
  },
});
