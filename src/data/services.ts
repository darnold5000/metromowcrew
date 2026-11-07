import { imageAssets } from "@/config/assets";
import { siteConfig } from "@/config/site";

const brand = siteConfig.name;
const area = siteConfig.serviceArea.summary;

export type Service = {
  slug: string;
  name: string;
  group: "lawn-landscaping";
  shortSummary: string;
  description: string;
  benefits: string[];
  process: string[];
  includes: { title: string; description: string }[];
  image: string;
  imageAlt: string;
  status: "active" | "coming_soon";
  statusNote?: string;
  seoTitle: string;
  seoDescription: string;
  relatedSlugs: string[];
};

const estimateProcess = [
  "Share the property address and the service you need",
  "We review the request and follow up on your estimate",
  "Work is scheduled after scope is confirmed",
];

function serviceCopy(
  name: string,
  descriptionOverride?: string,
): Pick<
  Service,
  "shortSummary" | "description" | "benefits" | "process" | "includes" | "seoTitle" | "seoDescription"
> {
  const description =
    descriptionOverride ??
    `${brand} offers ${name} in ${area}. Request an estimate to confirm scope for your property.`;
  return {
    shortSummary: `${name} for properties in ${area}.`,
    description,
    benefits: siteConfig.trust.map((item) => item.title),
    process: estimateProcess,
    includes: [
      {
        title: name,
        description: "Details and pricing are confirmed with your estimate.",
      },
    ],
    seoTitle: `${name} | ${brand}`,
    seoDescription: `${name} from ${brand}, serving ${area}. Free estimates.`,
  };
}

export const serviceGroups = [{ id: "lawn-landscaping", label: "Lawn Care & Landscaping" }] as const;

export const services: Service[] = [
  {
    slug: "lawn-mowing",
    name: "Mowing",
    group: "lawn-landscaping",
    ...serviceCopy(
      "Mowing",
      "With our mowing service, your lawn stays pristine and well cared for through the seasons. We use professional equipment and techniques to maintain your green space.",
    ),
    image: imageAssets.projects.mowing,
    imageAlt: "Manicured residential lawn after mowing",
    status: "active",
    relatedSlugs: ["aeration", "mulching", "yard-clean-up"],
  },
  {
    slug: "aeration",
    name: "Aeration",
    group: "lawn-landscaping",
    ...serviceCopy(
      "Aeration",
      "Our aeration service helps your lawn get the oxygen, water, and nutrients it needs. We perforate the soil so air and moisture reach deep into the roots.",
    ),
    image: imageAssets.projects.aeration,
    imageAlt: "Lawn aeration service in progress",
    status: "active",
    relatedSlugs: ["lawn-mowing", "mulching"],
  },
  {
    slug: "mulching",
    name: "Mulching",
    group: "lawn-landscaping",
    ...serviceCopy(
      "Mulching",
      "We apply organic mulch to flower beds, trees, and shrubs for moisture retention and healthier soil.",
    ),
    image: imageAssets.projects.mulching,
    imageAlt: "Fresh mulch in landscaped planting beds",
    status: "active",
    relatedSlugs: ["yard-clean-up", "lawn-mowing"],
  },
  {
    slug: "yard-clean-up",
    name: "Yard Clean-Up",
    group: "lawn-landscaping",
    ...serviceCopy(
      "Yard Clean-Up",
      "One-time or recurring yard clean-up for a spotless, welcoming outdoor area tailored to your property.",
    ),
    image: imageAssets.projects.yardCleanup,
    imageAlt: "Residential yard after clean-up",
    status: "active",
    relatedSlugs: ["leaf-clean-up", "lawn-mowing"],
  },
  {
    slug: "leaf-clean-up",
    name: "Leaf Clean-Up",
    group: "lawn-landscaping",
    ...serviceCopy(
      "Leaf Clean-Up",
      "Professional leaf collection and disposal for a stress-free autumn, with eco-friendly methods and equipment.",
    ),
    image: imageAssets.projects.leafCleanup,
    imageAlt: "Leaf clean-up on a residential lawn",
    status: "active",
    relatedSlugs: ["yard-clean-up", "lawn-mowing"],
  },
  {
    slug: "bush-trimming",
    name: "Bush Trimming",
    group: "lawn-landscaping",
    ...serviceCopy(
      "Bush Trimming",
      "Precise bush and shrub trimming for healthy growth — preventing overgrowth, reducing disease risk, and shaping your landscape.",
    ),
    image: imageAssets.projects.yardCleanup,
    imageAlt: "Trimmed shrubs along a maintained lawn",
    status: "active",
    relatedSlugs: ["yard-clean-up", "mulching"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getActiveServices(): Service[] {
  return services.filter((s) => s.status === "active");
}

export function getServicesByGroup(group: Service["group"]): Service[] {
  return getActiveServices().filter((s) => s.group === group);
}
