import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { imageAssets } from "@/config/assets";
import { siteConfig } from "@/config/site";
import { featuredGallery } from "@/data/gallery";
import { reviews } from "@/data/reviews";
import { getServicesByGroup, serviceGroups } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: `${siteConfig.legalName} | ${siteConfig.positioning}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-leaf-soft text-white lg:min-h-[72vh]">
        <Image
          src={imageAssets.hero}
          alt="Landscaped backyard with mulched beds, healthy lawn, and mature trees"
          fill
          priority
          className="object-cover object-center brightness-[1.08] saturate-[1.1] contrast-[1.02]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-evergreen-deep/65 via-evergreen-deep/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-evergreen-deep/55 via-transparent to-white/15" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:min-h-[72vh]">
          <p className="animate-fade-up text-sm font-semibold tracking-[0.18em] text-white uppercase drop-shadow-sm">
            {siteConfig.positioning}
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl leading-[1.08] drop-shadow-md sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="animate-fade-up-delay mt-2 max-w-2xl font-display text-xl text-white/95 drop-shadow-sm sm:text-2xl">
            {siteConfig.heroTitle}
          </p>
          <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
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

      <Section className="bg-surface py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          {siteConfig.trust.map((item) => (
            <div key={item.title}>
              <p className="text-xs font-semibold tracking-[0.16em] text-leaf uppercase">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Services"
          title="Lawn care & landscaping"
          description={`${siteConfig.legalName} — ${siteConfig.positioning}.`}
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {serviceGroups.map((group) => (
            <div key={group.id} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-display text-xl text-evergreen-deep">{group.label}</h3>
              <ul className="mt-4 space-y-2">
                {getServicesByGroup(group.id).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-evergreen hover:text-leaf"
                    >
                      {service.name}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/request-estimate">{siteConfig.estimateCta}</ButtonLink>
        </div>
      </Section>

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
            <div key={image.id} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand">
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
              className="rounded-xl border border-border bg-surface p-6"
            >
              <p className="text-sm leading-relaxed text-muted">&ldquo;{review.body}&rdquo;</p>
              <p className="mt-4 font-display text-lg text-evergreen-deep">{review.name}</p>
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
          <div className="rounded-xl border border-border bg-surface p-6">
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
