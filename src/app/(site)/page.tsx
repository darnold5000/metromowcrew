import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { HomeServiceRow } from "@/components/home/home-service-row";
import { HomeWhyChoose } from "@/components/home/home-why-choose";
import { Section, SectionHeading } from "@/components/ui/section";
import { imageAssets } from "@/config/assets";
import { siteConfig } from "@/config/site";
import { featuredGallery } from "@/data/gallery";
import { reviews } from "@/data/reviews";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: `${siteConfig.legalName} | ${siteConfig.positioning}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[52vh] overflow-hidden bg-evergreen-deep text-white sm:min-h-[58vh] lg:min-h-[64vh]">
        <Image
          src={imageAssets.hero}
          alt="Professional landscaped lawn with stone edging and mulched planting beds"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-evergreen-deep/75 via-evergreen-deep/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-evergreen-deep/50 via-transparent to-white/10" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:min-h-[58vh] sm:px-6 sm:pb-14 lg:min-h-[64vh]">
          <h1 className="animate-fade-up max-w-2xl font-display text-3xl leading-tight font-semibold drop-shadow-md sm:text-4xl lg:text-5xl">
            {siteConfig.heroTitle}
          </h1>
          <p className="animate-fade-up-delay mt-4 max-w-xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
            {siteConfig.description}
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/request-estimate">{siteConfig.estimateCta}</ButtonLink>
            <ButtonLink
              href="/services"
              variant="secondary"
              className="border-white/40 bg-white/20 text-white shadow-sm backdrop-blur-sm hover:bg-white/30"
            >
              View Services
            </ButtonLink>
            <ButtonLink
              href={siteConfig.phoneHref}
              variant="secondary"
              className="border-white/40 bg-white/20 text-white shadow-sm backdrop-blur-sm hover:bg-white/30"
            >
              <Phone className="mr-2 size-4" aria-hidden />
              {siteConfig.phoneDisplay}
            </ButtonLink>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/90 drop-shadow-sm">
            <MapPin className="size-4" aria-hidden />
            Serving {siteConfig.serviceArea.cities.join(" • ")}
          </p>
        </div>
      </section>

      <HomeServiceRow />

      <HomeWhyChoose />

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our Work"
            title="Recent Projects"
            description={`Finished outdoor work from ${siteConfig.name}.`}
          />
          <ButtonLink href="/projects" variant="secondary">
            View all
          </ButtonLink>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {featuredGallery.slice(0, 6).map((image) => (
            <div
              key={image.id}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand shadow-sm"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Reviews"
          title="Satisfied Customers"
          description="What homeowners say about working with us."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <p className="text-sm leading-relaxed text-muted">
                &ldquo;{review.body}&rdquo;
              </p>
              <p className="mt-4 font-display text-lg text-evergreen-deep">
                {review.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/reviews" variant="secondary">
            All reviews
          </ButtonLink>
        </div>
      </Section>

      <Section className="bg-leaf-soft">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <SectionHeading
            eyebrow="Service area"
            title="Serving Your Community"
            description={siteConfig.serviceArea.note}
          />
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-leaf uppercase">
              Serving
            </p>
            <ul className="mt-3 space-y-1 font-display text-2xl text-evergreen-deep">
              {siteConfig.serviceArea.cities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
            <ButtonLink href="/service-area" variant="secondary" className="mt-5">
              Service area
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section className="bg-evergreen-deep text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl">{siteConfig.tagline}</h2>
          <p className="mt-4 text-base text-sand/85 sm:text-lg">
            {siteConfig.estimateCta} for your property in {siteConfig.serviceArea.summary}.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/request-estimate">{siteConfig.estimateCta}</ButtonLink>
            <ButtonLink
              href={siteConfig.phoneHref}
              variant="secondary"
              className="border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              {siteConfig.phoneDisplay}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
