"use client";

import { useCallback, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { JobberDemoForm } from "@/components/forms/jobber-demo-form";
import { siteConfig } from "@/config/site";

type JobberRequestFormProps = {
  embedSrc: string | null;
  requestUrl: string | null;
};

export function JobberRequestForm({ embedSrc, requestUrl }: JobberRequestFormProps) {
  const [embedFailed, setEmbedFailed] = useState(false);
  const onEmbedError = useCallback(() => setEmbedFailed(true), []);

  if (!embedSrc || embedFailed) {
    return (
      <div className="space-y-5">
        {!embedSrc ? (
          <p className="inline-flex rounded-full bg-brand-gold/25 px-3 py-1 text-xs font-bold tracking-wide text-evergreen-deep uppercase">
            Demo preview — not submitted
          </p>
        ) : (
          <p className="rounded-md border border-border bg-sand/60 px-3 py-2 text-sm text-muted">
            The Jobber form could not load in this page. Open it in a new tab
            instead, or call {siteConfig.phoneDisplay}.
          </p>
        )}
        {requestUrl ? (
          <ButtonLink href={requestUrl}>Open Jobber request form</ButtonLink>
        ) : null}
        {!embedSrc ? <JobberDemoForm /> : null}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <iframe
        src={embedSrc}
        title={`${siteConfig.name} Jobber request form`}
        className="h-[52rem] w-full rounded-md border-0 bg-background sm:h-[58rem] lg:h-[64rem]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onError={onEmbedError}
      />
      {requestUrl ? (
        <p className="text-sm text-muted">
          Form not loading?{" "}
          <a
            href={requestUrl}
            className="font-semibold text-evergreen underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Open the Jobber request form
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
