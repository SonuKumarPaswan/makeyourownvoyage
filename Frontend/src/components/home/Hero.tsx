const Hero = () => {
  const videoUrl =
    "https://res.cloudinary.com/dctc23cr4/video/upload/v1788946671/vidssave.com_TRAVEL_MEMORIES___Short_Cinematic_film_720P_jirt4n.mp4";

  return (
    <section className="relative min-h-[700px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[700px] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              Explore • Travel • Discover
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
              Your Journey,
              <span className="block text-sky-300">
                Your Way
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Discover amazing destinations, book flights, hotels,
              cabs and tour packages — all in one place.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/packages"
                className="rounded-lg bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
              >
                Explore Packages
              </a>

              <a
                href="/flights"
                className="rounded-lg border border-white/70 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-heading"
              >
                Search Flights
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  );
};

export default Hero;