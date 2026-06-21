import { execFileSync } from "node:child_process";

export default async () => {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = getEnvValue("DATABASE_URL");
  }
};

/** Returns an env value from the root ./env wrapper. */
function getEnvValue(name: string): string {
  return execFileSync("./env", ["sh", "-c", `echo $${name}`], { encoding: "utf8" }).trim();
}
