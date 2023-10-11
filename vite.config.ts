import path from "path";

import million from "million/compiler";
import { loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
  process.env = {
    ...process.env,
    ...loadEnv(configEnv.mode, process.cwd(), "VITE_"),
  };

  return defineConfig({
    base: process.env.VITE_APP_BASE_URL,
    plugins: [million.vite({ auto: true }), react()],
    css: {
      devSourcemap: true,
    },
    build: { sourcemap: true },
    resolve: {
      alias: {
        // TODO: "@*": path.resolve(__dirname, "src/*"),
        "@application": path.resolve(__dirname, "src/application"),
        "@domain": path.resolve(__dirname, "src/domain"),
        "@infrastructure": path.resolve(__dirname, "src/infrastructure"),
        "@presentation": path.resolve(__dirname, "src/presentation"),
      },
    },
    test: {
      globals: true,
      css: true,
      watch: false,
      include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
      },
      passWithNoTests: true,
      environment: "happy-dom",
      setupFiles: "./src/vitest.setup.ts",
    },
    server: {
      open: true,
      host: process.env.VITE_SERVER_HOST,
      port: Number(process.env.VITE_SERVER_PORT),
    },
  });
};
