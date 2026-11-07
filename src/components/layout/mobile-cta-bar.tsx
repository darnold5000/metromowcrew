"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          href={siteConfig.contactHref}
          className="inline-flex flex-1 items-center justify-center rounded-md border border-evergreen px-3 py-3 text-sm font-semibold text-evergreen"
        >
          {siteConfig.contactCta}
        </Link>
        <Link
          href={siteConfig.quoteHref}
          className="inline-flex flex-[1.4] items-center justify-center rounded-md bg-accent px-3 py-3 text-sm font-semibold text-white"
        >
          {siteConfig.estimateCta}
        </Link>
      </div>
    </div>
  );
}
