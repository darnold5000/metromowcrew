/**
 * Apply Metro Mow Crew lawn-ops migrations (001–005) on shared Signal Works Postgres.
 *
 *   DATABASE_URL="postgresql://..." npm run db:migrate
 *
 * Or set DATABASE_URL / SUPABASE_DB_URL in .env.local (not committed).
 *
 * Shared production guard (optional):
 *   METROMOWCREW_MIGRATE_CONFIRM=<project-ref> DATABASE_URL=... npm run db:migrate
 *
 * After 001, the script prints METROMOWCREW_TENANT_ID for .env.local.
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const MIGRATION_PREFIXES = ["001_", "002_", "003_", "004_", "005_"];

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  try {
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

loadEnvLocal();

const databaseUrl =
  process.env.DATABASE_URL?.trim() || process.env.SUPABASE_DB_URL?.trim();
if (!databaseUrl) {
  console.error(
    "Set DATABASE_URL or SUPABASE_DB_URL (Supabase → Project Settings → Database → URI).",
  );
  process.exit(1);
}

const projectRefMatch = databaseUrl.match(/@db\.([a-z0-9]+)\.supabase\.co/i);
const projectRef = projectRefMatch?.[1] ?? null;
const confirm = process.env.METROMOWCREW_MIGRATE_CONFIRM?.trim();
if (projectRef && confirm && confirm !== projectRef) {
  console.error(
    `METROMOWCREW_MIGRATE_CONFIRM does not match database project ref (${projectRef}).`,
  );
  process.exit(1);
}
if (projectRef === "gezdzzqnylloaxcmuzvm" && confirm !== projectRef) {
  console.error(
    `This URL is shared Signal Works production (${projectRef}). Re-run with METROMOWCREW_MIGRATE_CONFIRM=${projectRef}.`,
  );
  process.exit(1);
}

const migrationsDir = resolve(process.cwd(), "supabase-signalworks/migrations");
const files = readdirSync(migrationsDir)
  .filter(
    (name) =>
      name.endsWith(".sql") &&
      MIGRATION_PREFIXES.some((prefix) => name.startsWith(prefix)),
  )
  .sort();

if (files.length === 0) {
  console.error(`No migration files found in ${migrationsDir}`);
  process.exit(1);
}

async function main() {
  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    for (const file of files) {
      const sql = readFileSync(resolve(migrationsDir, file), "utf8");
      console.log(`Applying ${file}…`);
      await client.query(sql);
      console.log("  OK");
    }

    const { rows } = await client.query(
      "select id from public.tenants where slug = $1",
      ["metromowcrew"],
    );
    if (rows[0]?.id) {
      console.log("");
      console.log("Set in .env.local / Vercel:");
      console.log(`METROMOWCREW_TENANT_ID=${rows[0].id}`);
    } else {
      console.warn("Warning: tenant slug metromowcrew not found after migrations.");
    }

    console.log("");
    console.log("Migrations complete. Next: npm run db:staff");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
