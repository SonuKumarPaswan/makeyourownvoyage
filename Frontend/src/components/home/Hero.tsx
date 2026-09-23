import Image from "next/image";
import type { Collection } from "@/types/homepage-feed";
import { Link } from "lucide-react";


interface HeroProps {
  data: Collection[];
}

const Hero = ({ data }: HeroProps) => {
  const hero = data[0];

  if (!hero) return null;
  return (
    <section className="relative min-h-[680px] overflow-hidden">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0">
        {/* Desktop */}
        <Image
          src={hero.bannerImage.desktop}
          alt={hero.title}
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />

        {/* Mobile */}
        <Image
          src={hero.bannerImage.mobile}
          alt={hero.title}
          fill
          sizes="100vw"
          className="object-cover md:hidden"
        />
      </div>

      {/* ================= DARK OVERLAY ================= */}
      {/* <div className="absolute inset-0 bg-black/5" /> */}

      {/* ================= EXTRA GRADIENT ================= */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-black/15 to-transparent" /> */}

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex min-h-[680px] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl text-white">

            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur-md">
                {hero.badgeText}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              {hero.subtitle}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#"
                className="rounded-lg bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
              >
                Explore Packages
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border border-white/60 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                Plan My Trip
              </Link>
            </div>

            {/* Small trust/info row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/80">
              <span>✓ Customizable Trips</span>
              <span>✓ Local Experiences</span>
              <span>✓ Trusted Travel Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM GRADIENT ================= */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default Hero;