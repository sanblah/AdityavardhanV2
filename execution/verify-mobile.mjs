import { spawnSync } from "node:child_process";

const run = (command, args) => {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run("npm", ["run", "build"]);
const result = spawnSync("npx", ["playwright", "test", "tests/mobile/mobile-layout.spec.ts"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    PLAYWRIGHT_PROD: "1",
  },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
