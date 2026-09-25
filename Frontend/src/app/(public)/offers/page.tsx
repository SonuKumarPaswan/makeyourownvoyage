import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel Offers & Deals | Flight, Hotel & Holiday Offers",
  description:
    "Explore the latest travel offers and deals on flights, hotels and holiday packages with Make Your Own Voyage. Discover available travel deals and plan your next trip.",
  keywords: [
    "travel offers",
    "travel deals",
    "flight offers",
    "flight deals",
    "hotel offers",
    "hotel deals",
    "holiday package offers",
    "holiday deals",
    "travel discounts",
    "Make Your Own Voyage offers",
  ],
  alternates: {
    canonical: "https://www.makeyourownvoyage.com/offers",
  },
  openGraph: {
    title: "Travel Offers & Deals | Make Your Own Voyage",
    description:
      "Discover flight offers, hotel deals and holiday package offers with Make Your Own Voyage.",
    url: "https://www.makeyourownvoyage.com/offers",
    siteName: "Make Your Own Voyage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Offers & Deals | Make Your Own Voyage",
    description:
      "Explore available flight, hotel and holiday package offers.",
    images: ["https://www.makeyourownvoyage.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const offerCategories = [
  {
    title: "Flight Offers",
    description:
      "Explore available deals and offers for domestic and international flights.",
    href: "/flights",
    icon: "✈️",
  },
  {
    title: "Hotel Offers",
    description:
      "Find accommodation deals and available hotel offers for your next journey.",
    href: "/hotels",
    icon: "🏨",
  },
  {
    title: "Holiday Package Offers",
    description:
      "Discover holiday package deals for domestic and international destinations.",
    href: "/packages",
    icon: "🌴",
  },
];

const staticOffers = [
  {
    title: "Domestic Flight Deals",
    description:
      "Explore available offers on domestic flights and plan your next trip.",
    category: "Flights",
    href: "/flights",
  },
  {
    title: "International Flight Offers",
    description:
      "Check available international flight options and travel deals.",
    category: "Flights",
    href: "/flights",
  },
  {
    title: "Hotel Booking Deals",
    description:
      "Explore available hotel options for your preferred destination.",
    category: "Hotels",
    href: "/hotels",
  },
  {
    title: "Domestic Holiday Packages",
    description:
      "Discover travel packages for popular destinations across India.",
    category: "Holiday Packages",
    href: "/packages",
  },
  {
    title: "International Holiday Packages",
    description:
      "Explore international destinations and available holiday packages.",
    category: "Holiday Packages",
    href: "/packages",
  },
  {
    title: "Customized Travel Offers",
    description:
      "Plan a personalized trip based on your destination and travel requirements.",
    category: "Travel",
    href: "/contact",
  },
];

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-primary-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Exclusive Travel Deals
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              Travel Offers &amp; Deals
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-text sm:text-lg">
              Explore available flight offers, hotel deals and holiday package
              offers with Make Your Own Voyage and plan your next journey.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/flights"
                className="rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
              >
                Explore Flights
              </Link>

              <Link
                href="/packages"
                className="rounded-xl border border-border bg-card px-6 py-3.5 font-semibold text-heading transition hover:border-primary hover:text-primary"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OFFER CATEGORIES ================= */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Explore Offers
            </span>

            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              Find Offers For Your Trip
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-text">
              Explore different travel services and check available deals for
              your journey.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {offerCategories.map((offer) => (
              <Link
                key={offer.title}
                href={offer.href}
                className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-2xl">
                  {offer.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-heading group-hover:text-primary">
                  {offer.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  {offer.description}
                </p>

                <div className="mt-5 font-semibold text-primary">
                  Explore Offers →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OFFER CARDS ================= */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Latest Deals
              </span>

              <h2 className="mt-2 text-3xl font-bold text-heading">
                Explore Travel Offers
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-muted">
              Offers and availability may change depending on the travel
              service, destination, dates and supplier conditions.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {staticOffers.map((offer) => (
              <article
                key={offer.title}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Offer Header */}
                <div className="flex h-36 items-center justify-center bg-primary-light">
                  <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
                    {offer.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-heading">
                    {offer.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {offer.description}
                  </p>

                  <Link
                    href={offer.href}
                    className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
                  >
                    Explore Deal
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY OFFERS ================= */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Travel With Confidence
            </span>

            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              Why Explore Our Travel Offers?
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-2xl">✈️</div>

              <h3 className="mt-4 font-bold text-heading">
                Flight Options
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Explore available domestic and international flight options.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-2xl">🏨</div>

              <h3 className="mt-4 font-bold text-heading">
                Hotel Options
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Discover accommodation options for different destinations and
                travel requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-2xl">🌍</div>

              <h3 className="mt-4 font-bold text-heading">
                Travel Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Get assistance with your travel planning and booking
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Looking for a Customized Travel Deal?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
            Tell us about your destination, travel dates and requirements. Our
            team can help you explore suitable travel options.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3.5 font-semibold text-primary transition hover:bg-primary-light"
          >
            Plan My Trip
          </Link>
        </div>
      </section>
    </main>
  );
}