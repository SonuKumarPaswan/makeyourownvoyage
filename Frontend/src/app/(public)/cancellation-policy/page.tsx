import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Make Your Own Voyage",

  description:
    "Read the cancellation and refund policy of Make Your Own Voyage for flights, hotels, holiday packages, travel services and other bookings.",

  keywords: [
    "cancellation policy",
    "refund policy",
    "flight cancellation policy",
    "hotel cancellation policy",
    "holiday package cancellation",
    "travel booking refund",
    "Make Your Own Voyage cancellation policy",
  ],

  alternates: {
    canonical:
      "https://www.makeyourownvoyage.com/cancellation-policy",
  },

  openGraph: {
    title: "Cancellation & Refund Policy | Make Your Own Voyage",
    description:
      "Learn about cancellation, refund and booking modification terms for travel services booked through Make Your Own Voyage.",
    url: "https://www.makeyourownvoyage.com/cancellation-policy",
    siteName: "Make Your Own Voyage",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const policySections = [
  {
    number: "01",
    title: "General Cancellation Policy",
    content: (
      <>
        <p>
          Cancellation and refund conditions may vary depending on the travel
          service, supplier, airline, hotel, tour operator or package selected
          at the time of booking.
        </p>

        <p>
          Before cancelling a booking, customers should review the applicable
          cancellation terms provided during the booking process. Any
          cancellation charges imposed by the service provider may be
          applicable.
        </p>
      </>
    ),
  },

  {
    number: "02",
    title: "Flight Cancellation",
    content: (
      <>
        <p>
          Flight cancellation and refund conditions are generally determined
          by the airline and the fare rules associated with the ticket.
        </p>

        <p>
          Depending on the airline and fare type, cancellation may be
          refundable, partially refundable or non-refundable. Applicable
          airline cancellation charges, fare differences, taxes or service
          charges may be deducted from the refundable amount.
        </p>

        <p>
          Once a cancellation request has been submitted, processing time may
          depend on the airline and payment method used for the booking.
        </p>
      </>
    ),
  },

  {
    number: "03",
    title: "Hotel Cancellation",
    content: (
      <>
        <p>
          Hotel cancellation policies vary according to the property, room
          type, rate plan and booking conditions.
        </p>

        <p>
          Some hotel reservations may allow free cancellation before a
          specified deadline, while other reservations may be partially
          refundable or completely non-refundable.
        </p>

        <p>
          Any applicable hotel cancellation fee will be deducted according to
          the booking conditions.
        </p>
      </>
    ),
  },

  {
    number: "04",
    title: "Holiday Package Cancellation",
    content: (
      <>
        <p>
          Cancellation terms for holiday packages may depend on the package
          itinerary, hotels, transportation, activities, flights and other
          services included in the booking.
        </p>

        <p>
          Cancellation charges may increase as the travel date approaches
          because suppliers may have already incurred non-refundable costs.
        </p>

        <p>
          The applicable cancellation terms will be communicated according to
          the package and supplier conditions.
        </p>
      </>
    ),
  },

  {
    number: "05",
    title: "Cancellation Request Process",
    content: (
      <>
        <p>
          Customers who want to cancel a booking should contact Make Your Own
          Voyage through the available support channels and provide their
          booking reference and relevant passenger or customer details.
        </p>

        <p>
          Cancellation requests should be submitted as early as possible.
          Processing of a cancellation request may require confirmation from
          the relevant airline, hotel, supplier or service provider.
        </p>
      </>
    ),
  },

  {
    number: "06",
    title: "Refund Processing",
    content: (
      <>
        <p>
          If a booking is eligible for a refund, the refundable amount will be
          processed after applicable cancellation charges, supplier charges,
          service fees or other applicable deductions.
        </p>

        <p>
          The time required for a refund may vary depending on the supplier,
          payment gateway, bank and original payment method.
        </p>

        <p>
          A refund does not necessarily mean that the entire booking amount
          will be returned. The final refundable amount depends on the
          applicable booking terms.
        </p>
      </>
    ),
  },

  {
    number: "07",
    title: "Non-Refundable Bookings",
    content: (
      <>
        <p>
          Certain flight fares, hotel rates, activities, packages and other
          travel services may be marked as non-refundable.
        </p>

        <p>
          In such cases, cancellation may not qualify for a refund unless the
          applicable supplier specifically provides an exception.
        </p>
      </>
    ),
  },

  {
    number: "08",
    title: "Changes & Amendments",
    content: (
      <>
        <p>
          Requests to change travel dates, passenger details, destinations,
          hotels or other booking information may be subject to supplier
          availability and applicable amendment charges.
        </p>

        <p>
          Any fare difference, hotel rate difference or supplier amendment
          charge may be payable by the customer.
        </p>
      </>
    ),
  },

  {
    number: "09",
    title: "Supplier & Airline Changes",
    content: (
      <>
        <p>
          If an airline, hotel, tour operator or other supplier changes,
          cancels or modifies a service, the available options will depend on
          the supplier's applicable rules and policies.
        </p>

        <p>
          Customers may be offered an alternative arrangement, rescheduling
          option or refund where permitted by the relevant supplier.
        </p>
      </>
    ),
  },

  {
    number: "10",
    title: "Important Information",
    content: (
      <>
        <p>
          Customers should carefully review the fare rules, hotel conditions,
          package terms and cancellation conditions before completing a
          booking.
        </p>

        <p>
          Make Your Own Voyage may act as an intermediary between the customer
          and the relevant travel service provider. Certain cancellation and
          refund decisions are therefore subject to the policies of the
          applicable supplier.
        </p>
      </>
    ),
  },
];

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-primary-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Booking Information
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
              Cancellation &amp; Refund Policy
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-text sm:text-lg">
              Please review our cancellation and refund guidelines before
              cancelling or modifying a flight, hotel, holiday package or
              other travel booking.
            </p>

            <p className="mt-4 text-sm text-muted">
              Last Updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-info/20 bg-info-light p-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-info/10 text-info">
                ℹ
              </div>

              <div>
                <h2 className="font-bold text-heading">
                  Please check your booking conditions
                </h2>

                <p className="mt-2 text-sm leading-6 text-text">
                  Cancellation and refund conditions can differ between
                  airlines, hotels, tour operators and other suppliers.
                  Always check the specific terms associated with your booking
                  before requesting cancellation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POLICY CONTENT ================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="space-y-6">
            {policySections.map((section) => (
              <article
                key={section.number}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                    {section.number}
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-heading sm:text-2xl">
                      {section.title}
                    </h2>

                    <div className="mt-4 space-y-4 text-sm leading-7 text-text sm:text-base">
                      {section.content}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK SUMMARY ================= */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Before You Cancel
            </span>

            <h2 className="mt-3 text-3xl font-bold text-heading">
              Things to Keep in Mind
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-2xl">📋</div>

              <h3 className="mt-4 font-bold text-heading">
                Check Booking Terms
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Review the cancellation conditions attached to your booking.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-2xl">💳</div>

              <h3 className="mt-4 font-bold text-heading">
                Refund Amount
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                The final refund may be reduced by applicable cancellation or
                service charges.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-2xl">⏱️</div>

              <h3 className="mt-4 font-bold text-heading">
                Processing Time
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Refund processing time can vary depending on the supplier and
                payment method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT CTA ================= */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Need Help With a Cancellation?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
            If you have questions about cancelling a booking or checking your
            refund eligibility, contact our travel support team.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-primary transition hover:bg-primary-light"
            >
              Contact Us
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}