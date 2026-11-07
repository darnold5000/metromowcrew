import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Service Area",
  description: siteConfig.serviceArea.note,
  path: "/service-area",
});

export default function ServiceAreaPage() {
  return (
    <>
      <Section className="bg-sand/40 pt-16">
        <SectionHeading
          eyebrow="Service area"
          title="Serving Your Community"
          description={siteConfig.serviceArea.note}
        />
      </Section>
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-8">
            <h2 className="font-display text-2xl text-evergreen-deep">Serving</h2>
            <ul className="mt-4 space-y-2 text-lg text-evergreen">
              {siteConfig.serviceArea.cities.map((city) => (
                <li key={city}>• {city}</li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-leaf-soft">
            <iframe
              title="Map of Indianapolis, Avon, and Plainfield, Indiana"
              src="https://maps.google.com/maps?q=Indianapolis%2C%20Avon%2C%20Plainfield%2C%20IN&t=&z=10&ie=UTF8&iwloc=&output=embed"
              className="h-80 w-full min-h-80 border-0 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.quoteHref}>{siteConfig.estimateCta}</ButtonLink>
          <ButtonLink href={siteConfig.phoneHref} variant="secondary">
            {siteConfig.phoneDisplay}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
