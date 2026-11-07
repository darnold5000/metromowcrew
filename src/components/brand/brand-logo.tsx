import Image from "next/image";
import { cn } from "@/lib/utils";
import { imageAssets } from "@/config/assets";
import { siteConfig } from "@/config/site";

type BrandLogoProps = {
  className?: string;
  variant?: "default" | "on-dark";
};

export function BrandLogo({ className, variant = "default" }: BrandLogoProps) {
  const onDark = variant === "on-dark";

  return (
    <span
      className={cn("inline-flex max-w-[16rem] items-center gap-2.5 sm:max-w-none", className)}
      aria-label={siteConfig.legalName}
    >
      <Image
        src={imageAssets.logo}
        alt=""
        width={56}
        height={56}
        className="size-12 shrink-0 rounded-md object-contain sm:size-14"
        priority
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "font-display text-sm font-semibold tracking-tight sm:text-base",
            onDark ? "text-white" : "text-evergreen-deep",
          )}
        >
          {siteConfig.legalName}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.65rem] font-semibold tracking-[0.12em] uppercase",
            onDark ? "text-sand/85" : "text-leaf",
          )}
        >
          {siteConfig.positioning}
        </span>
      </span>
    </span>
  );
}
