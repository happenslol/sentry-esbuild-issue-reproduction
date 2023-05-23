import esbuild from "esbuild";
import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin";
import fs from "fs/promises";

await fs.rm("./build", { recursive: true, force: true });

await esbuild.build({
  logLevel: "info",
  entryPoints: ["src/index.js"],
  bundle: true,
  sourcemap: true,
  outfile: "build/index.js",
  plugins: [
    sentryEsbuildPlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      debug: true,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: { assets: "./build/**" },
      release: { name: "test" },
    }),
  ],
});
