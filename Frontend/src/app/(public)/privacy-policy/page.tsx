import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Make Your Own Voyage",

  description:
    "Read the Privacy Policy of Make Your Own Voyage to understand how we collect, use, protect and manage information provided through our travel website and services.",

  keywords: [
    "privacy policy",
    "travel website privacy policy",
    "Make Your Own Voyage privacy policy",
    "travel booking privacy",
    "flight booking privacy",
    "hotel booking privacy",
    "customer data privacy",
  ],

  alternates: {
    canonical: "https://www.makeyourownvoyage.com/privacy-policy",
  },

  openGraph: {
    title: "Privacy Policy | Make Your Own Voyage",
    description:
      "Learn how Make Your Own Voyage collects, uses and protects customer information.",
    url: "https://www.makeyourownvoyage.com/privacy-policy",
    siteName: "Make Your Own Voyage",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Make Your Own Voyage",
    description:
      "Read the Privacy Policy of Make Your Own Voyage.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content: (
      <>
        <p>
          When you use our website or travel services, we may collect
          information that is necessary to provide and manage your requested
          services.
        </p>

        <p>
          Depending on the service you use, this information may include your
          name, contact details, travel preferences, booking information and
          other details required to complete a reservation.
        </p>
      </>
    ),
  },

  {
    number: "02",
    title: "Information Provided During Booking",
    content: (
      <>
        <p>
          When you make a flight, hotel, holiday package or other travel
          booking, certain information may be required to process and confirm
          your reservation.
        </p>

        <p>
          The information required may vary depending on the travel service,
          supplier, airline, hotel or other service provider.
        </p>
      </>
    ),
  },

  {
    number: "03",
    title: "How We Use Your Information",
    content: (
      <>
        <p>
          Information collected through our website may be used to provide,
          process and manage travel services requested by customers.
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Process and manage bookings.</li>
          <li>Provide booking confirmations and service updates.</li>
          <li>Respond to customer enquiries and support requests.</li>
          <li>Communicate important information about travel services.</li>
          <li>Improve our website and customer experience.</li>
          <li>Maintain website security and prevent misuse.</li>
        </ul>
      </>
    ),
  },

  {
    number: "04",
    title: "Payment Information",
    content: (
      <>
        <p>
          Payments may be processed through third-party payment gateways or
          other authorized payment service providers.
        </p>

        <p>
          Payment providers may process payment-related information according
          to their own privacy policies and security practices.
        </p>

        <p>
          We recommend reviewing the applicable payment provider's terms and
          privacy policy before completing a transaction.
        </p>
      </>
    ),
  },

  {
    number: "05",
    title: "Sharing Information With Service Providers",
    content: (
      <>
        <p>
          Certain customer information may need to be shared with relevant
          airlines, hotels, tour operators, transportation providers,
          payment providers or other suppliers in order to provide the
          requested travel service.
        </p>

        <p>
          Information shared with such providers may be handled according to
          their respective privacy policies and applicable terms.
        </p>
      </>
    ),
  },

  {
    number: "06",
    title: "Cookies & Website Technologies",
    content: (
      <>
        <p>
          Our website may use cookies and similar technologies to support
          website functionality, improve user experience and understand how
          visitors interact with our website.
        </p>

        <p>
          You may be able to manage certain cookie preferences through your
          browser settings.
        </p>
      </>
    ),
  },

  {
    number: "07",
    title: "Website Analytics",
    content: (
      <>
        <p>
          We may use analytics and similar tools to understand website usage,
          identify technical issues and improve our services.
        </p>

        <p>
          Analytics providers may collect information according to their own
          privacy policies and applicable settings.
        </p>
      </>
    ),
  },

  {
    number: "08",
    title: "Data Security",
    content: (
      <>
        <p>
          We take reasonable measures to protect information handled through
          our website and services against unauthorized access, misuse or
          disclosure.
        </p>

        <p>
          However, no method of transmission or electronic storage can be
          guaranteed to be completely secure.
        </p>
      </>
    ),
  },

  {
    number: "09",
    title: "Third-Party Websites",
    content: (
      <>
        <p>
          Our website may contain links to third-party websites, services or
          platforms.
        </p>

        <p>
          We are not responsible for the privacy practices, content or security
          of third-party websites. Customers should review the privacy policies
          of those websites before providing personal information.
        </p>
      </>
    ),
  },

  {
    number: "10",
    title: "Data Retention",
    content: (
      <>
        <p>
          Information may be retained for as long as reasonably necessary to
          provide requested services, maintain business records, comply with
          applicable requirements or resolve disputes.
        </p>

        <p>
          The retention period may vary depending on the type of information
          and the purpose for which it was collected.
        </p>
      </>
    ),
  },

  {
    number: "11",
    title: "Your Privacy Choices",
    content: (
      <>
        <p>
          Depending on applicable law, you may have rights or choices regarding
          certain personal information provided to us.
        </p>

        <p>
          If you have a privacy-related request or question, please contact us
          using the contact information provided on our website.
        </p>
      </>
    ),
  },

  {
    number: "12",
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes to our services, website, practices or applicable
          requirements.
        </p>

        <p>
          Any updated version will be published on this page with the relevant
          updated date.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="border-b border-border bg-primary-light">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Legal Information
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-text sm:text-lg">
              This Privacy Policy explains how Make Your Own Voyage may
              collect, use and manage information when you visit our website or
              use our travel services.
            </p>

            <p className="mt-4 text-sm text-muted">
              Last Updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-2xl border border-info/20 bg-info-light p-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-info/10 text-info">
                ℹ
              </div>

              <div>
                <h2 className="font-bold text-heading">
                  Your privacy matters to us
                </h2>

                <p className="mt-2 text-sm leading-6 text-text">
                  We aim to handle customer information responsibly and use it
                  for legitimate business and service-related purposes.
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
            {sections.map((section) => (
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

      {/* ================= CONTACT CTA ================= */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Have a Privacy Question?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
            If you have questions about how your information is handled,
            contact our team for assistance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-7 py-3.5 font-semibold text-primary transition hover:bg-primary-light"
            >
              Contact Us
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}