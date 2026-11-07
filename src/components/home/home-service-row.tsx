import Image from "next/image";
import Link from "next/link";
import { getHomeFeaturedServices } from "@/data/services";

export function HomeServiceRow() {
  const services = getHomeFeaturedServices();

  return (
    <section className="bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-semibold text-evergreen-deep sm:text-4xl">
          Lawn Care &amp; Landscaping{" "}
          <span className="text-brand-gold">Services</span>
        </h2>
        <ul className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 md:grid md:grid-cols-5 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
          {services.map((service) => (
            <li
              key={service.slug}
              className="min-w-[9.5rem] flex-1 snap-start md:min-w-0"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative aspect-[4/5] w-full max-w-[11rem] overflow-hidden rounded-2xl bg-sand shadow-md ring-1 ring-border transition group-hover:-translate-y-0.5 group-hover:shadow-lg sm:max-w-none">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                </div>
                <p className="mt-3 font-display text-base font-semibold text-evergreen-deep group-hover:text-leaf sm:text-lg">
                  {service.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
