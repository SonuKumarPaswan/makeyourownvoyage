import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[650px] overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        {/* Desktop */}
        <Image
          src="https://res.cloudinary.com/t2keybqe/image/upload/v1790077216/collections/mobile/lipoi497kkrsa3j9y7b9.jpg"
          alt="Travel destination - Make Your Own Voyage"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />

        {/* Mobile */}
        <Image
          src="https://res.cloudinary.com/t2keybqe/image/upload/v1790077216/collections/mobile/lipoi497kkrsa3j9y7b9.jpg"
          alt="Travel destination - Make Your Own Voyage"
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex min-h-[550px] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-5xl text-white">

            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur-md">
                Explore the World
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
              Explore the World with
              <br />
              Make Your Own Voyage
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Book flights, hotels, and holiday packages with Make Your Own
              Voyage. Discover domestic and international destinations and
              create unforgettable travel experiences.
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
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default Hero;