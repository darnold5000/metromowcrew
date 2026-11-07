import { describe, expect, it } from "vitest";
import { assertNoClientTenantId } from "./assert-no-client-tenant";
import {
  METROMOWCREW_TENANT_ID_ENV,
  getMetroMowCrewTenantId,
  getMetroMowCrewTenantIdOrNull,
} from "./deployment";

const testUuid = "11111111-1111-1111-1111-111111111111";

describe("assertNoClientTenantId", () => {
  it("allows bodies without tenant fields", () => {
    expect(() => assertNoClientTenantId({ email: "a@b.com" })).not.toThrow();
    expect(() => assertNoClientTenantId(null)).not.toThrow();
  });

  it("rejects tenant_id / tenantId / server env keys from clients", () => {
    expect(() => assertNoClientTenantId({ tenant_id: "x" })).toThrow(
      /not allowed/,
    );
    expect(() => assertNoClientTenantId({ tenantId: "x" })).toThrow(
      /not allowed/,
    );
    expect(() =>
      assertNoClientTenantId({ [METROMOWCREW_TENANT_ID_ENV]: "x" }),
    ).toThrow(/not allowed/);
    expect(() =>
      assertNoClientTenantId({ WEIDNER_TENANT_ID: "x" }),
    ).toThrow(/not allowed/);
  });
});

describe("getMetroMowCrewTenantId", () => {
  it("reads METROMOWCREW_TENANT_ID from process.env", () => {
    const prevMetro = process.env[METROMOWCREW_TENANT_ID_ENV];
    const prevLegacy = process.env.WEIDNER_TENANT_ID;
    delete process.env[METROMOWCREW_TENANT_ID_ENV];
    delete process.env.WEIDNER_TENANT_ID;
    expect(getMetroMowCrewTenantIdOrNull()).toBeNull();
    expect(() => getMetroMowCrewTenantId()).toThrow(
      new RegExp(METROMOWCREW_TENANT_ID_ENV),
    );
    process.env[METROMOWCREW_TENANT_ID_ENV] = testUuid;
    expect(getMetroMowCrewTenantId()).toBe(testUuid);
    if (prevMetro === undefined) delete process.env[METROMOWCREW_TENANT_ID_ENV];
    else process.env[METROMOWCREW_TENANT_ID_ENV] = prevMetro;
    if (prevLegacy === undefined) delete process.env.WEIDNER_TENANT_ID;
    else process.env.WEIDNER_TENANT_ID = prevLegacy;
  });

  it("falls back to legacy WEIDNER_TENANT_ID when primary unset", () => {
    const prevMetro = process.env[METROMOWCREW_TENANT_ID_ENV];
    const prevLegacy = process.env.WEIDNER_TENANT_ID;
    delete process.env[METROMOWCREW_TENANT_ID_ENV];
    process.env.WEIDNER_TENANT_ID = testUuid;
    expect(getMetroMowCrewTenantIdOrNull()).toBe(testUuid);
    if (prevMetro === undefined) delete process.env[METROMOWCREW_TENANT_ID_ENV];
    else process.env[METROMOWCREW_TENANT_ID_ENV] = prevMetro;
    if (prevLegacy === undefined) delete process.env.WEIDNER_TENANT_ID;
    else process.env.WEIDNER_TENANT_ID = prevLegacy;
  });
});
