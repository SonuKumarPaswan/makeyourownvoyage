import React from "react";
import Link from "next/link";

interface BenefitItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const column1Benefits: BenefitItem[] = [
  {
    id: 1,
    title: "Best Price Guarantee",
    description:
      "Get competitive prices on flights, hotels and holiday packages without compromising on quality.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v18M17 7.5c0-1.7-2.2-3-5-3s-5 1.3-5 3 2.2 3 5 3 5 1.3 5 3-2.2 3-5 3-5-1.3-5-3"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Easy & Secure Booking",
    description:
      "Enjoy a smooth booking experience with secure payments and a simple, user-friendly interface.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <rect width="16" height="14" x="4" y="7" rx="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V5a4 4 0 0 1 8 0v2M8 12h.01M12 12h.01M16 12h.01"
        />
      </svg>
    ),
  },
];

const column2Benefits: BenefitItem[] = [
  {
    id: 3,
    title: "Trusted Travel Partner",
    description:
      "Plan your journey with a reliable travel platform designed to make every trip simple and convenient.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9 12 2 2 4-4"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "24/7 Travel Support",
    description:
      "Our dedicated support team is available around the clock to help you with your bookings and queries.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 13a8 8 0 0 1 16 0"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2ZM20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19h-3"
        />
      </svg>
    ),
  },
];

const stats = [
  {
    value: "5K+",
    label: "Happy Travelers",
  },
  {
    value: "68+",
    label: "Destinations",
  },
  {
    value: "85+",
    label: "Travel Packages",
  },
  {
    value: "24/7",
    label: "Customer Support",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left Intro + Right 2-Column Features */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="flex flex-col items-start lg:col-span-5">
            {/* Tag with underline accent */}
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                FEATURES
              </span>
              <span className="mt-1 h-0.5 w-8 bg-primary" />
            </div>

            {/* Editorial Heading */}
            <h2 className="mt-4 text-3xl font-normal leading-tight tracking-tight text-heading sm:text-4xl lg:text-[42px] font-serif">
              Why People{" "}
              <span className="text-primary font-serif">Choose Us?</span>
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted font-normal">
              We make your travel planning simple, convenient and memorable —
              from personalized holiday packages to secure bookings and 24/7
              concierge support.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-heading shadow-md transition-all duration-300 hover:bg-primary-hover hover:shadow-lg active:scale-95"
              >
                <span>Explore Packages</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-6-6 6 6-6 6"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Grid with Dividers */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {/* First Column of Features */}
              <div className="flex flex-col divide-y divide-border sm:pr-6 lg:pr-8">
                {column1Benefits.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group flex items-start gap-4 transition duration-200 ${
                      index === 0 ? "pb-8 sm:pb-10" : "pt-8 sm:pt-10"
                    }`}
                  >
                    {/* Circular Icon Pill */}
                    <div className="how-icon-circle flex h-12 w-12 shrink-0 items-center justify-center border-2 border-primary/40 bg-gold-50/80 text-primary shadow-xs transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-heading font-serif transition-colors group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Column of Features */}
              <div className="flex flex-col divide-y divide-border pt-8 sm:pt-0 sm:pl-6 lg:pl-8">
                {column2Benefits.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group flex items-start gap-4 transition duration-200 ${
                      index === 0 ? "pb-8 sm:pb-10" : "pt-8 sm:pt-10"
                    }`}
                  >
                    {/* Circular Icon Pill */}
                    <div className="how-icon-circle flex h-12 w-12 shrink-0 items-center justify-center border-2 border-primary/40 bg-gold-50/80 text-primary shadow-xs transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-heading font-serif transition-colors group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brand Stats Bar */}
        <div className="mt-16 sm:mt-20 overflow-hidden border border-border bg-white shadow-xs">
          <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-6 text-center sm:px-6 sm:py-8"
              >
                <p className="text-2xl sm:text-3xl font-bold text-heading font-serif">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;