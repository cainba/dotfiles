import type { BuildConfig } from "bun";
let buildConfig: BuildConfig;
if (process.env.NODE_ENV == "production") {
  buildConfig = {
    sourcemap: "inline",
    banner: "/* This is a banner */",
    footer: "/* This is a footer */",
    bytecode: true,
    conditions: ["development", "production"],
    emitDCEAnnotations: true,
    drop: ["console.log"],
    minify: true,
    splitting: true,
    target: "bun",
    format: "esm",
    plugins: [],
    external: [],
    outdir: "",
    publicPath: "",
    root: "",
    entrypoints: ["./index.ts"],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  };
} else {
  buildConfig = {
    sourcemap: "inline",
    banner: "/* This is a banner */",
    footer: "/* This is a footer */",
    bytecode: true,
    conditions: ["development", "production"],
    emitDCEAnnotations: true,
    drop: ["console.log"],
    minify: true,
    splitting: true,
    target: "bun",
    format: "esm",
    outdir: "dist",
    root: ".",
    entrypoints: ["./index.ts"],
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
  };
}

const projRootDir = process.cwd();
if (projRootDir) process.env.PROJ_ROOT = projRootDir;
export { buildConfig, projRootDir };
