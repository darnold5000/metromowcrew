import { EstimateForm } from "@/components/forms/estimate-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: siteConfig.estimateCta,
  description: `${siteConfig.estimateCta} from ${siteConfig.legalName} for properties in ${siteConfig.serviceArea.summary}.`,
  path: "/request-estimate",
});

export default function RequestEstimatePage() {
  return (
    <>
      <Section className="bg-sand/40 pt-16">
        <SectionHeading
          eyebrow="Free estimate"
          title="Tell us about your property"
          description={siteConfig.responseTime}
        />
      </Section>
      <Section className="pt-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-6 sm:p-8">
          <EstimateForm />
        </div>
      </Section>
    </>
  );
}
