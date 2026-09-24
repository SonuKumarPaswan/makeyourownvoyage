import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | Make Your Own Voyage",

  description:
    "Contact Make Your Own Voyage for flight booking, hotel booking, holiday packages, visa assistance, airport transfers and customized travel enquiries.",

  keywords: [
    "contact Make Your Own Voyage",
    "travel enquiry",
    "travel agency contact",
    "flight booking enquiry",
    "hotel booking enquiry",
    "holiday package enquiry",
    "travel assistance",
    "visa assistance",
    "travel support",
  ],

  alternates: {
    canonical: "https://www.makeyourownvoyage.com/contact",
  },

  openGraph: {
    title: "Contact Us | Make Your Own Voyage",
    description:
      "Get in touch with Make Your Own Voyage for travel bookings, holiday packages and customized travel assistance.",
    url: "https://www.makeyourownvoyage.com/contact",
    siteName: "Make Your Own Voyage",
    type: "website",
    images: [
      {
        url: "https://www.makeyourownvoyage.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Make Your Own Voyage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Make Your Own Voyage",
    description:
      "Contact Make Your Own Voyage for travel bookings and enquiries.",
    images: ["https://www.makeyourownvoyage.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="bg-primary-light">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Get In Touch
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
              Contact Us
            </h1>

            <p className="mt-5 text-lg leading-8 text-text">
              Have a question about flights, hotels, holiday packages or your
              next trip? Get in touch with Make Your Own Voyage and our team
              will help you with your travel enquiry.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          {/* Contact Information */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Contact Information
            </span>

            <h2 className="mt-3 text-3xl font-bold text-heading">
              Let&apos;s Plan Your Journey
            </h2>

            <p className="mt-5 leading-7 text-text">
              Whether you need help with flight bookings, hotels, holiday
              packages or a customized trip, send us your requirements and
              we&apos;ll get back to you.
            </p>

            <div className="mt-8 space-y-4">
              {/* Email */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-xl">
                    ✉️
                  </div>

                  <div>
                    <h3 className="font-bold text-heading">Email</h3>

                    <a
                      href="mailto:info@makeyourownvoyage.com"
                      className="mt-1 block text-sm text-primary hover:underline"
                    >
                      info@makeyourownvoyage.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-light text-xl">
                    📞
                  </div>

                  <div>
                    <h3 className="font-bold text-heading">Phone</h3>

                    <a
                      href="tel:+919999999999"
                      className="mt-1 block text-sm text-primary hover:underline"
                    >
                      +91 99999 99999
                    </a>
                  </div>
                </div>
              </div>

              {/* Travel Enquiry */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-light text-xl">
                    🌍
                  </div>

                  <div>
                    <h3 className="font-bold text-heading">
                      Travel Enquiry
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-muted">
                      Tell us about your destination, travel dates and
                      requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-heading">
              Send Us an Enquiry
            </h2>

            <p className="mt-2 text-sm text-muted">
              Fill in your details and tell us how we can help.
            </p>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Travel Service
                  </label>

                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="">Select service</option>
                    <option value="flight">Flight Booking</option>
                    <option value="hotel">Hotel Booking</option>
                    <option value="package">Holiday Package</option>
                    <option value="visa">Visa Assistance</option>
                    <option value="cab">Airport Transfer</option>
                    <option value="custom">Customized Trip</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Your Enquiry
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your travel requirements..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-heading sm:text-3xl">
            Explore Our Travel Services
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/flights"
              className="rounded-xl bg-primary-light px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Flight Booking
            </Link>

            <Link
              href="/hotels"
              className="rounded-xl bg-secondary-light px-5 py-3 font-semibold text-secondary transition hover:bg-secondary hover:text-white"
            >
              Hotel Booking
            </Link>

            <Link
              href="/packages"
              className="rounded-xl bg-accent-light px-5 py-3 font-semibold text-accent-hover transition hover:bg-accent hover:text-white"
            >
              Holiday Packages
            </Link>

            <Link
              href="/about-us"
              className="rounded-xl border border-border px-5 py-3 font-semibold text-heading transition hover:border-primary hover:text-primary"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}