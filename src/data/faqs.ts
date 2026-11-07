import { siteConfig } from "@/config/site";
import { getActiveServices } from "@/data/services";

export type FaqItem = {
  question: string;
  answer: string;
};

const serviceNames = getActiveServices()
  .map((s) => s.name)
  .join(", ");

export const faqs: FaqItem[] = [
  {
    question: "What areas do you serve?",
    answer: `${siteConfig.name} serves ${siteConfig.serviceArea.summary}.`,
  },
  {
    question: "How do I request an estimate?",
    answer: `Use ${siteConfig.estimateCta} for lawn work — that request goes to Jobber. Use ${siteConfig.contactCta} for general questions or to speak with the owner. Don’t submit the same request on both forms.`,
  },
  {
    question: "What’s the difference between quote and contact?",
    answer: `${siteConfig.estimateCta} is for service quotes in Jobber. ${siteConfig.contactCta} is the website inquiry form for questions. Jobber submissions are not copied into the contact form.`,
  },
  {
    question: "What services do you offer?",
    answer: `We offer ${serviceNames}.`,
  },
  {
    question: "Do you offer free estimates?",
    answer: `Yes. ${siteConfig.estimateCta} is available for the services listed on this site.`,
  },
];
