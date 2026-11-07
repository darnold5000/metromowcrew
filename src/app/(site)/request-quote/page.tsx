import { FormChoice } from "@/components/forms/form-choice";
import { JobberRequestForm } from "@/components/forms/jobber-request-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { getJobberConfig, jobberQuoteCopy } from "@/config/jobber";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Free Lawn Care Quote",
  description: `${jobberQuoteCopy.headline} from ${siteConfig.legalName} for properties in ${siteConfig.serviceArea.summary}.`,
  path: "/request-quote",
});

export default function RequestQuotePage() {
  const jobber = getJobberConfig();

  return (
    <>
      <Section className="bg-sand/40 pt-16">
        <SectionHeading
          eyebrow={jobberQuoteCopy.eyebrow}
          title={jobberQuoteCopy.headline}
          description={jobberQuoteCopy.explanation}
        />
        <FormChoice active="quote" />
      </Section>
      <Section className="pt-8 pb-28 lg:pb-20">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-8">
          <JobberRequestForm
            embedSrc={jobber.embedSrc}
            requestUrl={jobber.requestUrl}
          />
        </div>
      </Section>
    </>
  );
}
