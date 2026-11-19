import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// The same path aliases as tsconfig.json, so tests can import modules that use "@/...".
export default defineConfig({
  resolve: {
    alias: {
      "@content": fileURLToPath(new URL("./content", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
