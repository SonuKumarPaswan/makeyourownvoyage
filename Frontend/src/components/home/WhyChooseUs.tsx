import React from "react";

const benefits = [
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
        className="h-7 w-7"
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
        className="h-7 w-7"
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
    id: 3,
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
        className="h-7 w-7"
      >
        <rect
          width="16"
          height="14"
          x="4"
          y="7"
          rx="2"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V5a4 4 0 0 1 8 0v2M8 12h.01M12 12h.01M16 12h.01"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "24/7 Travel Support",
    description:
      "Our support team is available to help you with your travel plans, bookings and queries.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7"
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
    value: "10K+",
    label: "Happy Travelers",
  },
  {
    value: "50+",
    label: "Destinations",
  },
  {
    value: "1000+",
    label: "Travel Packages",
  },
  {
    value: "24/7",
    label: "Customer Support",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Why Travel With Us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Why Choose Make Your Own Voyage?
          </h2>

          <p className="mt-4 text-base leading-7 text-muted">
            We make your travel planning simple, convenient and memorable —
            from booking your journey to reaching your destination.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="mt-5 text-lg font-bold text-heading">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-primary">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/20 lg:grid-cols-4 lg:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-7 text-center sm:px-8"
              >
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-white/75">
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