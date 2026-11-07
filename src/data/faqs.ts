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
    answer: `Use the ${siteConfig.estimateCta} form on this site, or call ${siteConfig.phoneDisplay}. Include your address, the service you need, and photos if you have them.`,
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
