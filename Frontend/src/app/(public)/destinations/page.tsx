import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Popular Travel Destinations | Make Your Own Voyage",

  description:
    "Explore popular travel destinations in India and around the world with Make Your Own Voyage. Discover destinations, holiday packages, flights, hotels and travel experiences.",

  keywords: [
    "travel destinations",
    "popular travel destinations",
    "best destinations in India",
    "Indian holiday destinations",
    "international travel destinations",
    "tourist destinations",
    "holiday destinations",
    "travel packages",
    "Make Your Own Voyage",
  ],

  alternates: {
    canonical: "https://www.makeyourownvoyage.com/destinations",
  },

  openGraph: {
    title: "Popular Travel Destinations | Make Your Own Voyage",
    description:
      "Explore popular domestic and international travel destinations and plan your next journey with Make Your Own Voyage.",
    url: "https://www.makeyourownvoyage.com/destinations",
    siteName: "Make Your Own Voyage",
    type: "website",
    images: [
      {
        url: "https://www.makeyourownvoyage.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Popular Travel Destinations - Make Your Own Voyage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Popular Travel Destinations | Make Your Own Voyage",
    description:
      "Explore popular travel destinations and plan your next trip.",
    images: ["https://www.makeyourownvoyage.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const destinations = [
  {
    name: "Goa",
    location: "India",
    description:
      "Explore beaches, coastal experiences, nightlife and relaxing holidays in Goa.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    href: "/destinations/goa",
  },
  {
    name: "Manali",
    location: "Himachal Pradesh, India",
    description:
      "Experience mountains, valleys, adventure activities and peaceful Himalayan landscapes.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    href: "/destinations/manali",
  },
  {
    name: "Jaipur",
    location: "Rajasthan, India",
    description:
      "Discover historic forts, royal architecture, culture and traditional Rajasthani experiences.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
    href: "/destinations/jaipur",
  },
  {
    name: "Kerala",
    location: "India",
    description:
      "Explore backwaters, beaches, hill stations and the natural beauty of Kerala.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    href: "/destinations/kerala",
  },
  {
    name: "Dubai",
    location: "United Arab Emirates",
    description:
      "Experience modern attractions, luxury shopping, desert adventures and city experiences.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    href: "/destinations/dubai",
  },
  {
    name: "Bali",
    location: "Indonesia",
    description:
      "Discover tropical beaches, temples, cultural experiences and scenic landscapes in Bali.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    href: "/destinations/bali",
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="bg-primary-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Explore The World
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              Popular Travel Destinations
            </h1>

            <p className="mt-6 text-lg leading-8 text-text">
              Discover beautiful destinations in India and around the world.
              Explore new places, plan memorable holidays and find travel
              experiences for your next journey.
            </p>
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Top Destinations
              </span>

              <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">
                Explore Your Next Destination
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-muted">
                Find inspiration for your next vacation and explore popular
                destinations for family holidays, romantic trips, adventure
                travel and more.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <article
                key={destination.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <Link href={destination.href}>
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={`${destination.name} travel destination`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">
                        {destination.name}
                      </h3>

                      <p className="text-sm text-white/85">
                        {destination.location}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <p className="leading-7 text-text">
                    {destination.description}
                  </p>

                  <Link
                    href={destination.href}
                    className="mt-5 inline-flex items-center font-semibold text-primary transition hover:text-primary-hover"
                  >
                    Explore {destination.name}
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAVEL TYPES ================= */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Plan Your Trip
            </span>

            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              Find a Destination for Every Journey
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Choose a travel experience that matches your interests and
              discover destinations for your next trip.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Beach Holidays",
                icon: "🏖️",
                description:
                  "Relax by beautiful beaches and enjoy coastal destinations.",
              },
              {
                title: "Mountain Trips",
                icon: "🏔️",
                description:
                  "Explore mountains, valleys and scenic destinations.",
              },
              {
                title: "Family Vacations",
                icon: "👨‍👩‍👧‍👦",
                description:
                  "Discover destinations suitable for memorable family trips.",
              },
              {
                title: "International Travel",
                icon: "🌍",
                description:
                  "Explore international destinations and new cultures.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-2xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-heading">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-text">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Explore Your Next Destination?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
            Explore holiday packages, flights and hotels and start planning
            your next journey with Make Your Own Voyage.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/packages"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-primary transition hover:bg-primary-light"
            >
              Explore Packages
            </Link>

            <Link
              href="/flights"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Search Flights
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}