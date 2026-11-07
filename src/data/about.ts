import { siteConfig } from "@/config/site";

export const aboutContent = {
  headline: siteConfig.tagline,
  intro: `${siteConfig.name} is your go-to for landscaping and lawn care in ${siteConfig.serviceArea.summary}. From mowing and aeration to yard clean-up, we've got you covered.`,
  story: [
    "Our seasoned professionals are committed to enhancing your outdoor space, whether you need a one-time service or regular maintenance.",
    "We pay close attention to detail and prioritize customer satisfaction to ensure every job meets the highest standards.",
    "Transforming your lawn into a beautiful oasis — tailored maintenance from mowing and edging to seasonal clean-up.",
  ],
  mission: siteConfig.description,
  values: siteConfig.trust,
} as const;
