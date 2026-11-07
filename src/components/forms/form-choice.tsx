import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type FormChoiceProps = {
  active: "quote" | "contact";
  className?: string;
};

export function FormChoice({ active, className }: FormChoiceProps) {
  return (
    <div
      className={cn(
        "mt-8 grid gap-4 sm:grid-cols-2",
        className,
      )}
    >
      <article
        className={cn(
          "rounded-2xl border bg-surface p-5",
          active === "quote" ? "border-leaf ring-1 ring-leaf/30" : "border-border",
        )}
      >
        <p className="text-xs font-semibold tracking-[0.14em] text-leaf uppercase">
          Lawn work
        </p>
        <h3 className="mt-2 font-display text-xl text-evergreen-deep">
          {siteConfig.estimateCta}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Request mowing, mulching, aeration, or a clean-up. This goes to Jobber
          for a quote — not the contact form.
        </p>
        {active === "quote" ? (
          <p className="mt-4 text-sm font-semibold text-evergreen">
            You’re on this form
          </p>
        ) : (
          <ButtonLink href={siteConfig.quoteHref} className="mt-4">
            {siteConfig.estimateCta}
          </ButtonLink>
        )}
      </article>
      <article
        className={cn(
          "rounded-2xl border bg-surface p-5",
          active === "contact" ? "border-leaf ring-1 ring-leaf/30" : "border-border",
        )}
      >
        <p className="text-xs font-semibold tracking-[0.14em] text-leaf uppercase">
          Questions
        </p>
        <h3 className="mt-2 font-display text-xl text-evergreen-deep">
          {siteConfig.contactCta}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          General questions or talk with the owner. This uses our website
          contact form and does not create a Jobber request.
        </p>
        {active === "contact" ? (
          <p className="mt-4 text-sm font-semibold text-evergreen">
            You’re on this form
          </p>
        ) : (
          <ButtonLink href={siteConfig.contactHref} variant="secondary" className="mt-4">
            {siteConfig.contactCta}
          </ButtonLink>
        )}
      </article>
    </div>
  );
}
