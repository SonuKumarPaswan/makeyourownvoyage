import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types/homepage-feed";

interface HeroProps {
  data?: Collection[];
}

const Hero = ({ data }: HeroProps = {}) => {
  const hero = data?.[0];
  const featuredPackage = hero?.featuredPackages?.[0];

  const desktopImage =
    hero?.bannerImage?.desktop ||
    "https://res.cloudinary.com/t2keybqe/image/upload/v1790077216/collections/mobile/lipoi497kkrsa3j9y7b9.jpg";
  const mobileImage =
    hero?.bannerImage?.mobile ||
    "https://res.cloudinary.com/t2keybqe/image/upload/v1790077216/collections/mobile/lipoi497kkrsa3j9y7b9.jpg";

  return (
    <section className="relative min-h-[650px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop */}
        <Image
          src={desktopImage}
          alt={hero?.title || "Travel destination - Make Your Own Voyage"}
          fill
          priority
          sizes="(min-width: 768px) 100vw, 0px"
          className="hidden object-cover md:block"
        />

        {/* Mobile */}
        <Image
          src={mobileImage}
          alt={hero?.title || "Travel destination - Make Your Own Voyage"}
          fill
          sizes="(max-width: 767px) 100vw, 0px"
          className="object-cover md:hidden"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[600px] items-center py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Side */}
            <div className="text-white lg:col-span-7">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur-md">
                  ✦ {hero?.badgeText || "Explore the World"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {hero?.title || (
                  <>
                    Explore the World with
                    <br />
                    Make Your Own Voyage
                  </>
                )}
              </h1>

              {/* Subtitle / Description */}
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                {hero?.subtitle ||
                  "Book flights, hotels, and holiday packages with Make Your Own Voyage. Discover domestic and international destinations and create unforgettable travel experiences."}
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/packages"
                  className="rounded-lg bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
                >
                  Explore Holiday Packages
                </Link>

                <Link
                  href="/flights"
                  className="rounded-lg border border-white/60 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
                >
                  Search Flights
                </Link>
              </div>

              {/* Trust Info */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/80">
                <span>✓ Customizable Trips</span>
                <span>✓ Domestic & International Travel</span>
                <span>✓ Travel Assistance</span>
              </div>
            </div>

            {/* Right Side: Featured Package & Collection CTA if available */}
            {hero && (
              <div className="w-full text-white lg:col-span-5 lg:ml-auto lg:max-w-lg">
                {featuredPackage && (
                  <div className="rounded-2xl border border-white/20 bg-black/40 p-5">
                    <p className="text-sm font-medium text-white/70">
                      Featured Package
                    </p>
                    <Link
                      href={`/packages/${featuredPackage.slug}`}
                      className="pointer-events-auto mt-2 block"
                    >
                      <h2 className="text-xl font-bold transition hover:text-sky-300">
                        {featuredPackage.title}
                      </h2>
                    </Link>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
                      <span>📍 {featuredPackage.destination}</span>
                      <span>🕒 {featuredPackage.duration}</span>
                    </div>
                    <Link
                      href={`/packages/${featuredPackage.slug}`}
                      className="pointer-events-auto mt-5 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover"
                    >
                      View Package
                    </Link>
                  </div>
                )}

                {hero.exploreLink && (
                  <div className="mt-6">
                    <Link
                      href={hero.exploreLink}
                      className="pointer-events-auto inline-flex rounded-lg border border-white/60 bg-white/10 px-6 py-3.5 font-semibold transition hover:bg-white hover:text-black"
                    >
                      Explore All Monsoon Packages
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default Hero;