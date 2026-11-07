import type { Metadata } from "next";
import { allowIndexing, siteConfig } from "@/config/site";

import { imageAssets } from "@/config/assets";

const defaultOgImage = imageAssets.shareOg;
const ogImageDimensions = { width: 1024, height: 768 } as const;

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteConfig.siteUrl}${path}`;
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const indexable = allowIndexing();

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          alt: `${siteConfig.legalName} — ${siteConfig.tagline}`,
          ...ogImageDimensions,
          type: "image/png",
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          alt: `${siteConfig.legalName} — ${siteConfig.tagline}`,
          ...ogImageDimensions,
        },
      ],
    },
  };
}
