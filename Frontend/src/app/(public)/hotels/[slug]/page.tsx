import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Booking | Book Hotels Online | Make Your Own Voyage",

  description:
    "Book hotels online with Make Your Own Voyage. Find hotels for domestic and international destinations, compare options and plan your perfect stay.",

  keywords: [
    "hotel booking",
    "online hotel booking",
    "book hotels online",
    "hotel reservation",
    "cheap hotel booking",
    "domestic hotel booking",
    "international hotel booking",
    "best hotels",
    "hotel deals",
    "Make Your Own Voyage",
  ],

  alternates: {
    canonical: "https://www.makeyourownvoyage.com/hotels",
  },

  openGraph: {
    title: "Hotel Booking | Book Hotels Online | Make Your Own Voyage",

    description:
      "Find and book hotels for domestic and international destinations with Make Your Own Voyage.",

    url: "https://www.makeyourownvoyage.com/hotels",

    siteName: "Make Your Own Voyage",

    type: "website",

    images: [
      {
        url: "https://www.makeyourownvoyage.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Booking - Make Your Own Voyage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Hotel Booking | Make Your Own Voyage",

    description:
      "Book hotels online for domestic and international destinations with Make Your Own Voyage.",

    images: ["https://www.makeyourownvoyage.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function HotelsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hotel Booking UI will come here */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-heading sm:text-4xl">
          Hotel Booking
        </h1>

        <p className="mt-4 max-w-3xl text-text">
          Book hotels online for your next trip. Explore accommodation
          options across popular domestic and international destinations
          with Make Your Own Voyage.
        </p>
      </section>
    </main>
  );
}