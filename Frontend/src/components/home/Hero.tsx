import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types/homepage-feed";

interface HeroProps {
  data: Collection[];
}

const Hero = ({ data }: HeroProps) => {
  const hero = data[0];

  if (!hero) return null;

  const featuredPackage = hero.featuredPackages?.[0];

  return (
    <section className="relative min-h-[680px] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop */}
        <Image
          src={hero.bannerImage.desktop}
          alt={hero.title}
          fill
          priority
          sizes="(min-width: 768px) 100vw, 0px"
          className="hidden object-cover md:block"
        />

        {/* Mobile */}
        <Image
          src={hero.bannerImage.mobile}
          alt={hero.title}
          fill
          sizes="(max-width: 767px) 100vw, 0px"
          className="object-cover md:hidden"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-black/5 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[680px] items-center py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

            {/* Left Side: Collection Details */}
            <div className="text-white lg:col-span-7">
              {/* Badge */}
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
                ✦ {hero.badgeText}
              </span>

              {/* Collection Title */}
              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {hero.title}
              </h1>

              {/* Collection Subtitle */}
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                {hero.subtitle}
              </p>
            </div>

            {/* Right Side: Featured Package & CTA */}
            <div className="w-full text-white lg:col-span-5 lg:ml-auto lg:max-w-lg">
              {/* Featured Package */}
              {featuredPackage && (
                <div className="rounded-2xl border border-white/20 bg-black/40 p-5">

                  <p className="text-sm font-medium text-white/70">
                    Featured Package
                  </p>

                  {/* Package Title */}
                  <Link
                    href={`/packages/${featuredPackage.slug}`}
                    className="pointer-events-auto mt-2 block"
                  >
                    <h2 className="text-xl font-bold transition hover:text-sky-300">
                      {featuredPackage.title}
                    </h2>
                  </Link>

                  {/* Package Details */}
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
                    <span>
                      📍 {featuredPackage.destination}
                    </span>

                    <span>
                      🕒 {featuredPackage.duration}
                    </span>
                  </div>

                  {/* Package CTA */}
                  <Link
                    href={`/packages/${featuredPackage.slug}`}
                    className="pointer-events-auto mt-5 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover"
                  >
                    View Package
                  </Link>
                </div>
              )}

              {/* Collection CTA */}
              <div className="mt-6">
                <Link
                  href={hero.exploreLink}
                  className="pointer-events-auto inline-flex rounded-lg border border-white/60 bg-white/10 px-6 py-3.5 font-semibold transition hover:bg-white hover:text-black"
                >
                  Explore All Monsoon Packages
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/5 to-transparent" />

    </section>
  );
};

export default Hero;