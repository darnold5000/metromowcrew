import Image from "next/image";
import { Leaf } from "lucide-react";
import { imageAssets } from "@/config/assets";
import { siteConfig } from "@/config/site";

export function HomeWhyChoose() {
  const { whyChoose } = siteConfig;

  return (
    <section className="bg-brand-gold py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="font-display text-3xl font-semibold text-evergreen-deep sm:text-4xl">
            {whyChoose.title}
          </h2>
          <ul className="mt-8 space-y-4">
            {whyChoose.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-base font-medium text-evergreen-deep sm:text-lg"
              >
                <Leaf
                  className="mt-0.5 size-5 shrink-0 text-leaf"
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md lg:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-lg ring-2 ring-evergreen-deep/10">
            <Image
              src={imageAssets.whyChoose}
              alt="Professional stand-on mower ready for lawn care service"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
