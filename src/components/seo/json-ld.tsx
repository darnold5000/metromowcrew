import { imageAssets } from "@/config/assets";
import { siteConfig } from "@/config/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneDisplay,
    areaServed: siteConfig.serviceArea.cities.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: "Indiana",
      },
    })),
    image: `${siteConfig.siteUrl}${imageAssets.shareOg}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
