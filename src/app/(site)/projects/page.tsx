import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { galleryImages } from "@/data/gallery";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Our Work",
  description: `Recent outdoor projects from ${siteConfig.legalName}.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <Section className="bg-sand/40 pb-8 pt-16">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Projects"
          description={`Project photography from ${siteConfig.name}.`}
        />
      </Section>
      <Section className="pt-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((image) => (
            <figure
              key={image.id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg bg-surface"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={900}
                height={1100}
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <figcaption className="px-3 py-2 text-xs font-medium tracking-wide text-muted uppercase">
                {image.category}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 rounded-xl bg-evergreen px-6 py-10 text-center text-white">
          <h2 className="font-display text-2xl sm:text-3xl">
            {siteConfig.estimateCta}
          </h2>
          <ButtonLink href={siteConfig.quoteHref} className="mt-6">
            {siteConfig.estimateCta}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
