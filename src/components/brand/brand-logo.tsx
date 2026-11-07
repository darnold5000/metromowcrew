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
      className={cn(
        "inline-flex min-w-0 max-w-[calc(100vw-4.5rem)] items-center gap-2 sm:max-w-none sm:gap-2.5",
        className,
      )}
      aria-label={siteConfig.legalName}
    >
      <Image
        src={imageAssets.logo}
        alt=""
        width={56}
        height={56}
        className="size-10 shrink-0 rounded-md object-contain sm:size-14"
        priority
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "truncate font-display text-sm font-semibold tracking-tight sm:text-base",
            onDark ? "text-white" : "text-evergreen-deep",
          )}
        >
          {siteConfig.legalName}
        </span>
        <span
          className={cn(
            "mt-0.5 hidden text-[0.65rem] font-semibold tracking-[0.12em] uppercase min-[400px]:block",
            onDark ? "text-sand/85" : "text-leaf",
          )}
        >
          {siteConfig.positioning}
        </span>
      </span>
    </span>
  );
}
