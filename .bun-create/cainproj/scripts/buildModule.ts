import { type BuildConfig, type BuildOutput, build } from "bun";
import { buildConfig } from "../project";
const inputArgs = Bun.argv.slice(0, 1);
export async function buildModule(
  entrypoints?: string[],
  outDir?: string,
  format?: "esm" | "cjs" | "iife",
  target?: "bun" | "browser",
  bytecode?: boolean,
): Promise<BuildOutput | boolean> {
  console.log(inputArgs);
  const modBuild = await build({
    ...buildConfig,
    entrypoints: entrypoints ?? [""],
    outdir: outDir ?? "./dist",
    format: format ?? "esm",
    target: target ?? "bun",
    bytecode: bytecode ?? false,
  })
    .catch((e) => {
      console.error(e);
    })
    .then((r) => {
      console.log(r);
      return r;
    });
  return false;
}

buildModule();
