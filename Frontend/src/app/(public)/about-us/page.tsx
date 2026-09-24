import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Make Your Own Voyage",

  description:
    "Learn about Make Your Own Voyage, your travel partner for flights, hotels, holiday packages, visa assistance, airport transfers and customized travel experiences.",

  keywords: [
    "about Make Your Own Voyage",
    "travel agency",
    "travel company",
    "online travel booking",
    "flight booking",
    "hotel booking",
    "holiday packages",
    "customized travel packages",
    "visa assistance",
    "travel services",
  ],

  alternates: {
    canonical: "https://www.makeyourownvoyage.com/about-us",
  },

  openGraph: {
    title: "About Us | Make Your Own Voyage",
    description:
      "Discover Make Your Own Voyage and explore our travel services including flights, hotels, holiday packages and customized trips.",
    url: "https://www.makeyourownvoyage.com/about-us",
    siteName: "Make Your Own Voyage",
    type: "website",
    images: [
      {
        url: "https://www.makeyourownvoyage.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Make Your Own Voyage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | Make Your Own Voyage",
    description:
      "Learn more about Make Your Own Voyage and our travel services.",
    images: ["https://www.makeyourownvoyage.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="bg-primary-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              About Make Your Own Voyage
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              Your Journey, Our Commitment
            </h1>

            <p className="mt-6 text-lg leading-8 text-text">
              Make Your Own Voyage is a travel platform helping travelers
              discover, plan and book flights, hotels, holiday packages and
              other travel services for memorable journeys.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-card py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              Making Travel Planning Simple
            </h2>

            <p className="mt-6 leading-7 text-text">
              At Make Your Own Voyage, we aim to make travel planning simple,
              convenient and accessible. From finding flights and hotels to
              exploring holiday packages, we bring essential travel services
              together in one place.
            </p>

            <p className="mt-4 leading-7 text-text">
              Whether you are planning a domestic trip, an international
              holiday, a family vacation or a customized journey, our platform
              is designed to help you explore your options and plan your trip
              with confidence.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-background">
            <Image
              src="/about-us.jpg"
              alt="Make Your Own Voyage travel experience"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Services
            </span>

            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              Travel Services for Every Journey
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Explore travel services designed to help you plan and organize
              your next trip.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Flight Booking",
                description:
                  "Search and book domestic and international flights for your travel plans.",
              },
              {
                title: "Hotel Booking",
                description:
                  "Explore accommodation options for your domestic and international trips.",
              },
              {
                title: "Holiday Packages",
                description:
                  "Discover curated and customizable holiday packages for different destinations.",
              },
              {
                title: "Visa Assistance",
                description:
                  "Get travel assistance and information for visa-related requirements.",
              },
              {
                title: "Airport Transfers",
                description:
                  "Plan convenient airport transfers and local transportation for your journey.",
              },
              {
                title: "Customized Trips",
                description:
                  "Create travel experiences based on your destination, schedule and preferences.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-xl font-bold text-heading">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-text">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-heading sm:text-4xl">
              Why Choose Make Your Own Voyage?
            </h2>

            <p className="mt-4 leading-7 text-muted">
              We focus on making travel planning easier from discovery to
              booking.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-2xl">
                ✈️
              </div>

              <h3 className="mt-5 text-xl font-bold text-heading">
                Easy Travel Planning
              </h3>

              <p className="mt-3 leading-7 text-text">
                Find travel services and plan important parts of your journey
                from one platform.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary-light text-2xl">
                🌍
              </div>

              <h3 className="mt-5 text-xl font-bold text-heading">
                Multiple Destinations
              </h3>

              <p className="mt-3 leading-7 text-text">
                Explore domestic and international destinations for different
                types of travel.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-2xl">
                💬
              </div>

              <h3 className="mt-5 text-xl font-bold text-heading">
                Travel Support
              </h3>

              <p className="mt-3 leading-7 text-text">
                Get assistance while planning your travel and choosing the
                services that fit your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Plan Your Next Journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
            Explore flights, hotels and holiday packages with Make Your Own
            Voyage.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/packages"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-primary transition hover:bg-primary-light"
            >
              Explore Packages
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}