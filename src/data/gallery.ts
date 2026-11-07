import { imageAssets } from "@/config/assets";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: "Mowing" | "Mulching" | "Aeration" | "Yard Clean-Up" | "Leaf Clean-Up";
};

export const galleryImages: GalleryImage[] = [
  {
    id: "mowing",
    src: imageAssets.projects.mowing,
    alt: "Metro Mow Crew — mowed residential lawn",
    category: "Mowing",
  },
  {
    id: "mulching",
    src: imageAssets.projects.mulching,
    alt: "Metro Mow Crew — mulching service",
    category: "Mulching",
  },
  {
    id: "aeration",
    src: imageAssets.projects.aeration,
    alt: "Metro Mow Crew — lawn aeration",
    category: "Aeration",
  },
  {
    id: "yard-cleanup",
    src: imageAssets.projects.yardCleanup,
    alt: "Metro Mow Crew — yard clean-up",
    category: "Yard Clean-Up",
  },
  {
    id: "leaf-cleanup",
    src: imageAssets.projects.leafCleanup,
    alt: "Metro Mow Crew — leaf clean-up",
    category: "Leaf Clean-Up",
  },
];

export const featuredGallery = galleryImages;
