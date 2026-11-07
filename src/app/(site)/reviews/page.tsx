import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { reviews } from "@/data/reviews";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Satisfied Customers",
  description: `What customers say about ${siteConfig.name} in ${siteConfig.serviceArea.summary}.`,
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <Section className="bg-sand/40 pt-16">
        <SectionHeading
          eyebrow={siteConfig.positioning}
          title="Satisfied Customers"
          description={`Reviews from customers of ${siteConfig.name}.`}
        />
      </Section>
      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-xl border border-border bg-surface p-6 shadow-sm"
            >
              <blockquote className="text-sm leading-relaxed text-muted">
                &ldquo;{review.body}&rdquo;
              </blockquote>
              <p className="mt-4 font-display text-lg text-evergreen-deep">{review.name}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href={siteConfig.quoteHref}>{siteConfig.estimateCta}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
