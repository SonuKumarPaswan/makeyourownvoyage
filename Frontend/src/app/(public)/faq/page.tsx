import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Make Your Own Voyage",

  description:
    "Find answers to frequently asked questions about flight booking, hotel booking, holiday packages, cancellations, refunds, travel services and bookings with Make Your Own Voyage.",

  keywords: [
    "travel FAQ",
    "flight booking FAQ",
    "hotel booking FAQ",
    "holiday package FAQ",
    "travel booking questions",
    "flight cancellation FAQ",
    "hotel cancellation FAQ",
    "refund FAQ",
    "Make Your Own Voyage FAQ",
  ],

  alternates: {
    canonical: "https://www.makeyourownvoyage.com/faq",
  },

  openGraph: {
    title: "Frequently Asked Questions | Make Your Own Voyage",
    description:
      "Get answers to common questions about flights, hotels, holiday packages, cancellations, refunds and travel bookings.",
    url: "https://www.makeyourownvoyage.com/faq",
    siteName: "Make Your Own Voyage",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Make Your Own Voyage",
    description:
      "Find answers to common travel booking questions.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const faqCategories = [
  {
    title: "Flight Booking",
    icon: "✈️",
    questions: [
      {
        question: "How can I book a flight with Make Your Own Voyage?",
        answer:
          "You can search for flights by entering your departure city, destination, travel date and passenger details. After reviewing the available options, select the flight that meets your requirements and continue with the booking process.",
      },
      {
        question: "Can I book domestic and international flights?",
        answer:
          "Yes. Our flight booking service is designed to support both domestic and international travel options, subject to availability and applicable airline booking conditions.",
      },
      {
        question: "Can I choose my preferred cabin class?",
        answer:
          "Depending on the available flight options, you may be able to select from different cabin classes such as Economy, Premium Economy, Business or First Class.",
      },
      {
        question: "Can I change my flight after booking?",
        answer:
          "Flight changes depend on the airline's fare rules and ticket conditions. Additional airline charges, fare differences or service charges may apply.",
      },
    ],
  },

  {
    title: "Hotel Booking",
    icon: "🏨",
    questions: [
      {
        question: "Can I book hotels through Make Your Own Voyage?",
        answer:
          "Yes. You can explore available hotel options and choose accommodation based on your destination, travel dates and booking requirements.",
      },
      {
        question: "Can I cancel my hotel booking?",
        answer:
          "Hotel cancellation depends on the property's cancellation policy and the rate plan selected during booking. Some bookings may allow free cancellation while others may be partially refundable or non-refundable.",
      },
      {
        question: "Are hotel booking conditions the same for every property?",
        answer:
          "No. Cancellation rules, check-in requirements, payment conditions and other policies can vary between hotels and room types. Please review the booking conditions before completing your reservation.",
      },
    ],
  },

  {
    title: "Holiday Packages",
    icon: "🌴",
    questions: [
      {
        question: "What types of holiday packages are available?",
        answer:
          "Holiday packages may include domestic and international trips covering destinations, accommodation, transportation, activities and other travel services depending on the selected package.",
      },
      {
        question: "Can I customize a holiday package?",
        answer:
          "Customized travel options may be available depending on the destination, travel dates, accommodation, transportation and other requirements. Contact our team to discuss your travel plans.",
      },
      {
        question: "Can I modify a holiday package after booking?",
        answer:
          "Package modifications depend on the availability and terms of the individual services included in the package. Additional charges may apply for changes.",
      },
    ],
  },

  {
    title: "Cancellation & Refunds",
    icon: "↩️",
    questions: [
      {
        question: "How can I cancel my booking?",
        answer:
          "You can contact our support team with your booking reference and relevant booking details. The cancellation request will be processed according to the applicable supplier and booking conditions.",
      },
      {
        question: "Will I receive a full refund after cancellation?",
        answer:
          "Not necessarily. The refundable amount depends on the cancellation rules of the airline, hotel, tour operator or other service provider. Applicable cancellation charges and service fees may be deducted.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Refund processing time can vary depending on the supplier, payment gateway, bank and original payment method. The applicable refund will be processed after the cancellation is confirmed.",
      },
      {
        question: "Are non-refundable bookings eligible for a refund?",
        answer:
          "Generally, non-refundable bookings are not eligible for a refund unless the applicable supplier provides an exception under its booking conditions.",
      },
    ],
  },

  {
    title: "Travel Services",
    icon: "🌍",
    questions: [
      {
        question: "Do you provide visa assistance?",
        answer:
          "Visa assistance may be available for selected destinations. Visa requirements, processing times and approval decisions are subject to the relevant embassy, consulate or immigration authority.",
      },
      {
        question: "Do you provide airport transfer services?",
        answer:
          "Airport transfer options may be available depending on the destination and service availability. Contact our team for assistance with your transfer requirements.",
      },
      {
        question: "Can I request a customized trip?",
        answer:
          "Yes. You can contact our team with your preferred destination, travel dates, number of travelers, accommodation requirements and other preferences to discuss a customized travel plan.",
      },
    ],
  },

  {
    title: "Payments & Bookings",
    icon: "💳",
    questions: [
      {
        question: "What information is required to make a booking?",
        answer:
          "Depending on the service, you may need to provide traveler details, contact information, travel dates and payment information required to complete the booking.",
      },
      {
        question: "Is my booking confirmed immediately?",
        answer:
          "Confirmation depends on the travel service and supplier. Once the booking is successfully confirmed, the relevant booking or confirmation details will be provided according to the service.",
      },
      {
        question: "What should I do if I do not receive my booking confirmation?",
        answer:
          "If you have completed a payment but have not received your confirmation, contact our support team with your booking and payment details so the booking status can be checked.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-primary-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Help &amp; Information
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>

            <p className="mt-6 text-lg leading-8 text-text">
              Find answers to common questions about flight bookings, hotels,
              holiday packages, cancellations, refunds and other travel
              services.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FAQ CONTENT ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="space-y-10">
            {faqCategories.map((category) => (
              <section key={category.title}>
                {/* Category Heading */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-xl">
                    {category.icon}
                  </div>

                  <h2 className="text-2xl font-bold text-heading">
                    {category.title}
                  </h2>
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  {category.questions.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-2xl border border-border bg-card shadow-sm"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 font-semibold text-heading">
                        <span>{faq.question}</span>

                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-lg font-normal text-primary transition-transform duration-200 group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <div className="border-t border-border px-6 py-5">
                        <p className="text-sm leading-7 text-text sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-2xl">
              💬
            </div>

            <h2 className="mt-5 text-3xl font-bold text-heading">
              Still Have a Question?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted">
              If you cannot find the information you are looking for, contact
              our team and share your travel requirements with us.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
              >
                Contact Us
              </Link>

              <Link
                href="/flights"
                className="rounded-xl border border-border bg-card px-6 py-3 font-semibold text-heading transition hover:border-primary hover:text-primary"
              >
                Explore Flights
              </Link>

              <Link
                href="/packages"
                className="rounded-xl border border-border bg-card px-6 py-3 font-semibold text-heading transition hover:border-primary hover:text-primary"
              >
                Explore Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Plan Your Next Journey
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
            Explore flights, hotels and holiday packages with Make Your Own
            Voyage.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3.5 font-semibold text-primary transition hover:bg-primary-light"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </main>
  );
}