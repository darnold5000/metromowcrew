"use client";

import { useState } from "react";
import { getActiveServices } from "@/data/services";
import { siteConfig } from "@/config/site";

/**
 * Visual preview only. Does not POST, email, or create a Jobber request.
 */
export function JobberDemoForm() {
  const services = getActiveServices();
  const [attempted, setAttempted] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
      }}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name">
          <input className={inputClass} name="firstName" autoComplete="given-name" />
        </Field>
        <Field label="Last name">
          <input className={inputClass} name="lastName" autoComplete="family-name" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone">
          <input className={inputClass} name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label="Email">
          <input className={inputClass} name="email" type="email" autoComplete="email" />
        </Field>
      </div>
      <Field
        label="Property address"
        hint="Usually required in live Jobber forms so we can price the visit."
      >
        <input
          className={inputClass}
          name="address"
          autoComplete="street-address"
          placeholder="Street, city, ZIP"
        />
      </Field>
      <Field label="Service">
        <select className={inputClass} name="service" defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
          <option value="multiple">Multiple / not sure</option>
        </select>
      </Field>
      <Field label="Additional details">
        <textarea
          className={`${inputClass} min-h-28`}
          name="details"
          rows={4}
          placeholder="Lot size, frequency, or anything else we should know"
        />
      </Field>
      {attempted ? (
        <p className="rounded-md border border-brand-gold/50 bg-brand-gold/15 px-3 py-2 text-sm text-evergreen-deep">
          This is a demo preview. Requests are not submitted. Configure Jobber
          embed settings to send quotes to {siteConfig.name}.
        </p>
      ) : null}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover sm:w-auto"
      >
        Request quote (demo)
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-leaf";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-evergreen">
      {label}
      {hint ? <span className="ml-1 font-normal text-muted">({hint})</span> : null}
      <span className="mt-1.5 block font-normal">{children}</span>
    </label>
  );
}
