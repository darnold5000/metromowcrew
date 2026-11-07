/**
 * Report whether lawn-ops migrations 001–005 look applied on this database.
 *
 *   DATABASE_URL=... npm run db:migrate:status
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

const projectRefMatch = databaseUrl.match(/@db\.([a-z0-9]+)\.supabase\.co/i);

const checks = [
  {
    id: "001",
    label: "Tenant slug metromowcrew",
    sql: `select exists (select 1 from public.tenants where slug = 'metromowcrew') as ok`,
  },
  {
    id: "002",
    label: "Schema: public.weidner_leads",
    sql: `select exists (
      select 1 from information_schema.tables
      where table_schema = 'public' and table_name = 'weidner_leads'
    ) as ok`,
  },
  {
    id: "003",
    label: "RLS helpers: public.weidner_is_staff",
    sql: `select exists (
      select 1 from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'public' and p.proname = 'weidner_is_staff'
    ) as ok`,
  },
  {
    id: "004",
    label: "Storage bucket weidner-lead-photos (private)",
    sql: `select exists (
      select 1 from storage.buckets
      where id = 'weidner-lead-photos' and public is false
    ) as ok`,
  },
  {
    id: "005",
    label: "Assertion helper: public.weidner_assert_rls_enabled",
    sql: `select exists (
      select 1 from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'public' and p.proname = 'weidner_assert_rls_enabled'
    ) as ok`,
  },
];

async function main() {
  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const { rows: conn } = await client.query(
      "select current_database() as db, inet_server_addr()::text as host",
    );
    const ref =
      projectRefMatch?.[1] ??
      databaseUrl.match(/@db\.([a-z0-9]+)\.supabase\.co/i)?.[1] ??
      "(unknown project)";
    const dbName = conn[0]?.db ?? "?";
    console.log(`Connected: Supabase project ref ${ref}, database ${dbName}\n`);
    console.log("Lawn-ops migration status (shared weidner_* product):\n");

    const missing = [];
    for (const check of checks) {
      const { rows } = await client.query(check.sql);
      const ok = rows[0]?.ok === true;
      console.log(`  ${ok ? "✓" : "✗"} ${check.id}  ${check.label}`);
      if (!ok) missing.push(check.id);
    }

    const { rows: lawnTenants } = await client.query(
      `select slug, display_name from public.tenants
       where slug in ('metromowcrew', 'weidner-lawnscape')
       order by slug`,
    );
    if (lawnTenants.length) {
      console.log("\nRelated tenants on this database:");
      for (const t of lawnTenants) {
        console.log(`  - ${t.slug} (${t.display_name})`);
      }
    }

    const { rows: tenantRow } = await client.query(
      "select id from public.tenants where slug = 'metromowcrew'",
    );
    if (tenantRow[0]?.id) {
      console.log(`\nMETROMOWCREW_TENANT_ID=${tenantRow[0].id}`);
    }

    console.log("");
    if (missing.length === 0) {
      console.log("All checks passed. You only need npm run db:staff (if owner not provisioned) + app env vars.");
    } else if (missing.length === 1 && missing[0] === "001") {
      console.log(
        "002–005 look present (often from targetlawnpro / another lawn client). Run only 001:",
      );
      console.log("  npm run db:migrate   # or paste 001 SQL in the SQL editor");
    } else {
      console.log(`Missing migration layer(s): ${missing.join(", ")}`);
      console.log("  npm run db:migrate   # applies 001–005 that are still needed");
      console.log(
        "  If 004 fails, create bucket in Dashboard and run 004b manually.",
      );
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
