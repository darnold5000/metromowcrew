import { FormChoice } from "@/components/forms/form-choice";
import { ContactForm } from "@/components/forms/contact-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import { MapPin, Phone } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.legalName} at ${siteConfig.phoneDisplay}. Serving ${siteConfig.serviceArea.summary}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="bg-sand/40 pt-16">
        <SectionHeading
          eyebrow={siteConfig.contactCta}
          title="Questions or a conversation with the owner"
          description="Use this page for general questions. For mowing, mulching, aeration, or a clean-up quote, use Get a Free Quote instead so the request goes to Jobber."
        />
        <FormChoice active="contact" />
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <a
              href={siteConfig.phoneHref}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5 hover:bg-leaf-soft"
            >
              <Phone className="mt-0.5 size-5 text-leaf" aria-hidden />
              <div>
                <p className="font-semibold text-evergreen">Call or text</p>
                <p className="mt-1 text-muted">{siteConfig.phoneDisplay}</p>
              </div>
            </a>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
              <MapPin className="mt-0.5 size-5 text-leaf" aria-hidden />
              <div>
                <p className="font-semibold text-evergreen">Serving</p>
                <p className="mt-1 text-muted">
                  {siteConfig.serviceArea.cities.join(" • ")}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl text-evergreen-deep">
              Send a message
            </h2>
            <p className="mt-2 text-sm text-muted">
              This form notifies our team. It does not create a Jobber quote
              request.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
