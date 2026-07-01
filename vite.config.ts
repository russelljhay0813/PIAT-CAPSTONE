import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    optimizeDeps: {
      include: ["use-sync-external-store/shim/with-selector"],
    },
    resolve: {
      alias: {
        "use-sync-external-store/shim/with-selector": path.resolve(
          __dirname,
          "src/lib/shims/use-sync-external-store-with-selector.ts"
        ),
      },
    },
  },
});
