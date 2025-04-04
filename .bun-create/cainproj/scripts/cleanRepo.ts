import { $ } from "bun";
const inputArgs = Bun.argv.slice(0, 2);
export async function cleanRepo(reinstall?: boolean) {
  const cwd = process.cwd();
  console.log(`CWD:${cwd}`);
  if (await Bun.file(cwd + "/node_modules").exists()) {
    console.info(`
    Cleaning node_modules in ${cwd}...`);
    try {
      await $`rm -rf ${cwd}/node_modules`;
      if (reinstall || inputArgs.includes("--reinstall")) {
        console.info(`Reinstalling dependencies...`);
        await $`bun i -f`;
      }
    } catch (error) {
      console.error(`Error cleaning node_modules: ${error}`);
    }
  }
  await $`rm -rf ${cwd}/node_modules`;
  if (await Bun.file(cwd + "/bun.lock").exists()) {
    console.info(`
    Cleaning bun.lock in ${cwd}...`);
    try {
      await $`rm ${cwd}/bun.lock`;
      if (reinstall || inputArgs.includes("--reinstall")) {
        console.info(`Reinstalling dependencies...`);
        await $`bun i -f`;
      }
    } catch (error) {
      console.error(`Error cleaning bun.lock: ${error}`);
    }
  }
}
await cleanRepo();
