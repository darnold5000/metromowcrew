import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { navLinks, siteConfig } from "@/config/site";
import { getActiveServices } from "@/data/services";
import Image from "next/image";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const services = getActiveServices();

  return (
    <footer className="border-t border-evergreen/20 bg-evergreen-deep text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/">
            <BrandLogo variant="on-dark" />
          </Link>
          <p className="text-sm font-medium text-white">{siteConfig.positioning}</p>
          <p className="max-w-sm text-sm leading-relaxed text-sand/80">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/request-estimate" className="hover:text-white">
                {siteConfig.estimateCta}
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                Staff Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:text-white"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-sand/85">
            <li className="flex gap-2">
              <Phone className="size-4 shrink-0" aria-hidden />
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>Serving: {siteConfig.serviceArea.cities.join(" • ")}</span>
            </li>
            <li>
              <a
                href={siteConfig.publicWebsiteHref}
                className="hover:text-white"
              >
                {siteConfig.publicWebsite}
              </a>
            </li>
            <li>
              <Link href="/request-estimate" className="font-semibold text-white hover:underline">
                Free Estimates
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-sand/70 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.{" "}
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </p>
          <a
            href={siteConfig.developer.url}
            target="_blank"
            rel="noreferrer"
            title="Professional websites, software & AI solutions."
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 hover:bg-white/10"
          >
            <Image
              src="/signal-works-icon.png"
              alt=""
              width={24}
              height={24}
              className="size-6 rounded-md"
            />
            <span>
              Powered by the{" "}
              <span className="font-semibold text-white">
                {siteConfig.developer.platformLabel}
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
