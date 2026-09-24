import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Domestic Flight Booking",
    description:
      "Book domestic flights across India and explore popular destinations with convenient flight options.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    href: "/flights?type=domestic",
    button: "Explore Domestic Flights",
  },
  {
    title: "International Flight Booking",
    description:
      "Find international flight options and plan your journey to destinations around the world.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
    href: "/flights?type=international",
    button: "Explore International Flights",
  },
];

export default function FlightCategories() {
  return (
    <section
      aria-labelledby="flight-categories-heading"
      className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Explore Flight Options
          </p>

          <h2
            id="flight-categories-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          >
            Domestic & International Flight Booking
          </h2>

          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            Search and explore domestic and international flights for your
            next journey with Make Your Own Voyage.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={category.href}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-heading">
                      Flight Booking
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-heading">
                  {category.title}
                </h3>

                <p className="mt-3 leading-7 text-muted">
                  {category.description}
                </p>

                <Link
                  href={category.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
                >
                  {category.button}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}