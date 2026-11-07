/** Primary tenant env for this deployment (Metro Mow Crew on shared lawn-ops schema). */
export const METROMOWCREW_TENANT_ID_ENV = "METROMOWCREW_TENANT_ID";

/** @deprecated Use METROMOWCREW_TENANT_ID. Kept for older .env copies from the template. */
const LEGACY_WEIDNER_TENANT_ID_ENV = "WEIDNER_TENANT_ID";

export const METROMOWCREW_TENANT_SLUG = "metromowcrew" as const;

function readTenantIdFromEnv(): string | null {
  const primary = process.env[METROMOWCREW_TENANT_ID_ENV]?.trim();
  if (primary) return primary;
  const legacy = process.env[LEGACY_WEIDNER_TENANT_ID_ENV]?.trim();
  if (legacy) return legacy;
  return null;
}

export function getMetroMowCrewTenantId(): string {
  const id = readTenantIdFromEnv();
  if (!id) {
    throw new Error(
      `${METROMOWCREW_TENANT_ID_ENV} is not set. After applying migrations, set it from: select id from tenants where slug = '${METROMOWCREW_TENANT_SLUG}';`,
    );
  }
  return id;
}

export function getMetroMowCrewTenantIdOrNull(): string | null {
  return readTenantIdFromEnv();
}
