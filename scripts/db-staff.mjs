/**
 * Grant Metro Mow Crew owner staff profile (scripts/grant-staff-access.sql).
 *
 *   DATABASE_URL="postgresql://..." npm run db:staff
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

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
  console.error("Set DATABASE_URL or SUPABASE_DB_URL.");
  process.exit(1);
}

const sql = readFileSync(
  resolve(process.cwd(), "scripts/grant-staff-access.sql"),
  "utf8",
);

async function main() {
  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    console.log("Provisioning owner staff profile…");
    const result = await client.query(sql);
    console.log("OK", result.rowCount != null ? `(rows: ${result.rowCount})` : "");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
