import type { Metadata } from "next";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

export const metadata: Metadata = {
  title: "Contact Us | Make Your Own Voyage",
  description:
    "Contact Make Your Own Voyage for flight booking, hotel booking, holiday packages, visa assistance, corporate travel and customized travel enquiries. Noida Head Office.",
  keywords: [
    "contact Make Your Own Voyage",
    "travel enquiry Noida",
    "travel agency contact",
    "flight booking enquiry",
    "hotel booking enquiry",
    "holiday package enquiry",
    "travel assistance",
    "visa assistance",
    "travel support",
  ],
  alternates: {
    canonical: "https://www.makeyourownvoyage.com/contact-us",
  },
  openGraph: {
    title: "Contact Us | Make Your Own Voyage",
    description:
      "Get in direct touch with Make Your Own Voyage for travel bookings, holiday packages and customized concierge assistance.",
    url: "https://www.makeyourownvoyage.com/contact-us",
    siteName: "Make Your Own Voyage",
    type: "website",
  },
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      {/* ================= HERO HEADER ================= */}
      <section className="bg-background py-10 sm:py-14 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-medium text-heading">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] leading-none">
                ✦
              </span>
              <span>24/7 Concierge &amp; Travel Desk</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-heading tracking-tight">
              Contact <span className="text-primary">Make Your Own Voyage</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed font-normal">
              Whether you are planning a family holiday, corporate offsite, flight booking, or doorstep cab transfer, our dedicated travel specialists are here to assist you 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8 items-start">
          {/* Left Column: Official Contact Information Card */}
          <div className="lg:col-span-6 bg-card border border-border/80 p-6 sm:p-8 md:p-10 shadow-sm rounded-xl">
            {/* Top Badge */}
            <span className="text-xs font-semibold tracking-wider text-primary uppercase block">
              Noida Head Office &amp; Desk
            </span>

            {/* Main Heading */}
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-heading">
              Get in Direct Touch
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
              Corporate travel accounts and vacation seekers enjoy 24/7 dedicated concierge assistance.
            </p>

            <div className="my-6 border-t border-border/60" />

            {/* 4 Contact Info Blocks */}
            <div className="space-y-6">
              {/* 1. CALL & WHATSAPP HOTLINE */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <MaterialIcon name="call" size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-muted uppercase block">
                    Call &amp; WhatsApp Hotline
                  </span>
                  <a
                    href="tel:+917291000328"
                    className="mt-1 block text-lg sm:text-xl font-bold text-heading hover:text-primary transition-colors tracking-tight"
                  >
                    +91 72910 00328
                  </a>
                </div>
              </div>

              {/* 2. OFFICIAL OPERATIONS EMAIL */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <MaterialIcon name="mail" size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-muted uppercase block">
                    Official Operations Email
                  </span>
                  <a
                    href="mailto:Info@makeyourownvoyage.com"
                    className="mt-1 block text-base sm:text-lg font-semibold text-heading hover:text-primary transition-colors"
                  >
                    Info@makeyourownvoyage.com
                  </a>
                </div>
              </div>

              {/* 3. CORPORATE HEAD OFFICE */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <MaterialIcon name="location_on" size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-muted uppercase block">
                    Corporate Head Office
                  </span>
                  <p className="mt-1 text-xs sm:text-sm text-heading leading-relaxed max-w-sm font-normal">
                    Suite B-05, 127, C Block Road, C Block, Sector 63, Noida, Uttar Pradesh 201309, India
                  </p>
                </div>
              </div>

              {/* 4. DESK OPERATING HOURS */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <MaterialIcon name="schedule" size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-muted uppercase block">
                    Desk Operating Hours
                  </span>
                  <p className="mt-1 text-xs sm:text-sm text-heading font-medium leading-relaxed">
                    Mon - Sat: 09:00 AM - 08:30 PM <br />
                    <span className="text-primary text-xs font-semibold">(24/7 Dedicated Corporate Helpline)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Send Enquiry Form */}
          <div className="lg:col-span-6 bg-card border border-border/80 p-6 sm:p-8 md:p-10 shadow-sm rounded-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Online Request
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-heading">
              Send Us a Travel Enquiry
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted">
              Submit your trip requirements and a senior travel specialist will contact you with custom options.
            </p>

            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-semibold text-heading uppercase tracking-wider"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold text-heading uppercase tracking-wider"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-semibold text-heading uppercase tracking-wider"
                  >
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-xs font-semibold text-heading uppercase tracking-wider"
                  >
                    Travel Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="package">Holiday Tour Package</option>
                    <option value="hotel">Luxury Hotel / Resort</option>
                    <option value="flight">Flight Booking</option>
                    <option value="corporate">Corporate MICE &amp; Offsite</option>
                    <option value="cab">Doorstep Cab Transfer</option>
                    <option value="visa">Visa Assistance</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-semibold text-heading uppercase tracking-wider"
                >
                  Trip Details &amp; Special Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Destination, expected travel dates, number of travellers, or customized requirements..."
                  className="w-full resize-none border border-border bg-background px-3.5 py-2.5 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider py-3.5 hover:bg-[#c49f27] transition-all shadow-md cursor-pointer"
              >
                Submit Travel Enquiry →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}
      <section className="border-t border-border/40 bg-card py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-heading">
            Explore Make Your Own Voyage Portfolios
          </h2>

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/packages"
              className="border border-border bg-background px-4 py-2 text-xs font-medium text-heading transition hover:border-primary hover:text-primary"
            >
              Holiday Packages
            </Link>
            <Link
              href="/hotels"
              className="border border-border bg-background px-4 py-2 text-xs font-medium text-heading transition hover:border-primary hover:text-primary"
            >
              Hotels &amp; Resorts
            </Link>
            <Link
              href="/flights"
              className="border border-border bg-background px-4 py-2 text-xs font-medium text-heading transition hover:border-primary hover:text-primary"
            >
              Flight Deals
            </Link>
            <Link
              href="/blog/states"
              className="border border-border bg-background px-4 py-2 text-xs font-medium text-heading transition hover:border-primary hover:text-primary"
            >
              Travel Blogs &amp; Guides
            </Link>
            <Link
              href="/about-us"
              className="border border-border bg-background px-4 py-2 text-xs font-medium text-heading transition hover:border-primary hover:text-primary"
            >
              About Company
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}