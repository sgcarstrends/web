import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    alias: {
      "@/*": path.resolve(__dirname, "./*")
    },
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e"],
    setupFiles: "./setupTests.ts"
  }
});
 