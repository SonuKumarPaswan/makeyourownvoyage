import React from "react";

const steps = [
  {
    id: 1,
    number: "01",
    title: "Choose Your Destination",
    description:
      "Explore flights, hotels, cabs and holiday packages and choose the destination that matches your travel plans.",
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
          d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z"
        />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    id: 2,
    number: "02",
    title: "Select Your Travel Plan",
    description:
      "Compare available options, check prices and select the flight, hotel or package that suits your requirements.",
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
          d="M4 7h16M4 12h16M4 17h10"
        />
        <circle cx="18" cy="17" r="2" />
      </svg>
    ),
  },
  {
    id: 3,
    number: "03",
    title: "Book Securely",
    description:
      "Complete your booking through our simple and secure checkout process and get your travel details.",
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
          x="4"
          y="10"
          width="16"
          height="11"
          rx="2"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10V7a4 4 0 0 1 8 0v3"
        />
        <circle cx="12" cy="15" r="1" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16v2"
        />
      </svg>
    ),
  },
  {
    id: 4,
    number: "04",
    title: "Enjoy Your Journey",
    description:
      "Pack your bags, start your adventure and create unforgettable memories with Make Your Own Voyage.",
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
          d="M3 17h18M5 17l2-6h10l2 6M8 11l2-5h4l2 5"
        />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Simple & Easy
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            How It Works
          </h2>

          <p className="mt-4 text-base leading-7 text-muted">
            Planning your next trip is easy. Follow these simple steps and
            get ready for your next adventure.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Connecting Line - Desktop */}
          <div className="absolute left-[12%] right-[12%] top-9 hidden border-t-2 border-dashed border-border lg:block" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group relative text-center"
              >
                {/* Icon */}
                <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-8 border-white bg-primary-light text-primary shadow-md transition duration-300 group-hover:bg-primary group-hover:text-white">
                  {step.icon}
                </div>

                {/* Number */}
                <div className="mx-auto mt-5 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-bold text-heading">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm text-muted">
            Ready to plan your next adventure?
          </p>

          <a
            href="/packages"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
          >
            Explore Packages

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;