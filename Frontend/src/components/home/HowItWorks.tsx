import React from "react";
import Link from "next/link";

interface StepItem {
  id: number;
  number: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const steps: StepItem[] = [
  {
    id: 1,
    number: "1",
    title: "Choose Your Destination",
    description:
      "Explore flights, hotels, cabs and holiday packages and choose the destination that matches your travel plans.",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        {/* Orbital decorative dashed ring */}
        <div className="how-icon-circle absolute inset-0 border-2 border-dashed border-primary/30 transition-transform duration-700 group-hover:rotate-45" />
        <div className="how-icon-circle absolute inset-2 bg-gradient-to-br from-gold-50 via-white to-primary/10" />

        {/* Floating mini badges */}
        <span className="how-badge-circle absolute -left-1 top-2 flex h-6 w-6 items-center justify-center bg-white text-[11px] text-primary shadow-xs border border-border">
          ✈
        </span>
        <span className="how-badge-circle absolute -right-1 bottom-3 flex h-6 w-6 items-center justify-center bg-white text-[10px] text-heading shadow-xs border border-border">
          ✦
        </span>

        {/* Central Illustration: Laptop & Destination Pin */}
        <svg
          viewBox="0 0 100 90"
          className="relative z-10 h-20 w-20 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Laptop Screen */}
          <rect
            x="18"
            y="14"
            width="64"
            height="44"
            rx="4"
            className="fill-navy-900 stroke-navy-800"
            strokeWidth="2"
          />
          {/* Laptop Inner Display */}
          <rect
            x="22"
            y="18"
            width="56"
            height="36"
            rx="2"
            className="fill-white"
          />
          {/* Map Grid on Display */}
          <path
            d="M26 30h48M26 40h48M38 20v32M54 20v32"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          {/* Destination Pin */}
          <circle cx="50" cy="32" r="7" className="fill-primary/20" />
          <path
            d="M50 25c-3.3 0-6 2.7-6 6 0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6z"
            className="fill-primary"
          />
          <circle cx="50" cy="31" r="2.2" className="fill-white" />
          {/* Laptop Base */}
          <path
            d="M10 60h80c1.5 0 2.5 1 2.5 2.5v1.5H7.5v-1.5C7.5 61 8.5 60 10 60z"
            className="fill-slate-700"
          />
          <rect
            x="42"
            y="60"
            width="16"
            height="2.5"
            rx="1"
            className="fill-slate-400"
          />
        </svg>
      </div>
    ),
  },
  {
    id: 2,
    number: "2",
    title: "Select Your Travel Plan",
    description:
      "Compare available options, check prices and select the flight, hotel or package that suits your requirements.",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        {/* Orbital decorative dashed ring */}
        <div className="how-icon-circle absolute inset-0 border-2 border-dashed border-primary/30 transition-transform duration-700 group-hover:-rotate-45" />
        <div className="how-icon-circle absolute inset-2 bg-gradient-to-br from-gold-50 via-white to-primary/10" />

        {/* Floating mini badges */}
        <span className="how-badge-circle absolute -left-1 bottom-4 flex h-6 w-6 items-center justify-center bg-white text-[11px] text-primary shadow-xs border border-border">
          %
        </span>
        <span className="how-badge-circle absolute -right-1 top-2 flex h-6 w-6 items-center justify-center bg-white text-[10px] text-success shadow-xs border border-border font-bold">
          ✓
        </span>

        {/* Central Illustration: Smartphone with Travel Deals */}
        <svg
          viewBox="0 0 100 90"
          className="relative z-10 h-20 w-20 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Phone Frame */}
          <rect
            x="32"
            y="8"
            width="36"
            height="68"
            rx="6"
            className="fill-navy-900 stroke-navy-800"
            strokeWidth="2"
          />
          {/* Screen */}
          <rect
            x="35"
            y="13"
            width="30"
            height="58"
            rx="3"
            className="fill-white"
          />
          {/* Notch / Speaker */}
          <circle cx="50" cy="11" r="1" className="fill-slate-400" />
          {/* Card 1 on Screen */}
          <rect
            x="38"
            y="18"
            width="24"
            height="14"
            rx="2"
            className="fill-gold-100 stroke-primary"
            strokeWidth="1"
          />
          <rect x="41" y="21" width="10" height="2" rx="1" className="fill-primary" />
          <rect x="41" y="25" width="16" height="2" rx="1" className="fill-slate-400" />
          <circle cx="57" cy="23" r="2.5" className="fill-primary" />
          {/* Card 2 on Screen */}
          <rect
            x="38"
            y="35"
            width="24"
            height="14"
            rx="2"
            className="fill-slate-50 stroke-slate-200"
            strokeWidth="1"
          />
          <rect x="41" y="38" width="12" height="2" rx="1" className="fill-slate-600" />
          <rect x="41" y="42" width="15" height="2" rx="1" className="fill-slate-300" />
          {/* Button at bottom */}
          <rect
            x="40"
            y="54"
            width="20"
            height="7"
            rx="2"
            className="fill-primary"
          />
          <rect x="44" y="57" width="12" height="1.5" rx="0.75" className="fill-white" />
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    number: "3",
    title: "Book Securely",
    description:
      "Complete your booking through our simple and secure checkout process and get your travel details.",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        {/* Orbital decorative dashed ring */}
        <div className="how-icon-circle absolute inset-0 border-2 border-dashed border-primary/30 transition-transform duration-700 group-hover:rotate-45" />
        <div className="how-icon-circle absolute inset-2 bg-gradient-to-br from-gold-50 via-white to-primary/10" />

        {/* Floating mini badges */}
        <span className="how-badge-circle absolute -left-1 top-3 flex h-6 w-6 items-center justify-center bg-white text-[11px] text-heading shadow-xs border border-border">
          🔒
        </span>
        <span className="how-badge-circle absolute -right-1 bottom-4 flex h-6 w-6 items-center justify-center bg-white text-[10px] text-primary shadow-xs border border-border">
          ★
        </span>

        {/* Central Illustration: Shield & Verified Security */}
        <svg
          viewBox="0 0 100 90"
          className="relative z-10 h-20 w-20 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Card background */}
          <rect
            x="18"
            y="26"
            width="64"
            height="42"
            rx="5"
            className="fill-slate-100 stroke-slate-300"
            strokeWidth="1.5"
          />
          <rect
            x="18"
            y="35"
            width="64"
            height="8"
            className="fill-navy-900"
          />
          <rect x="25" y="52" width="18" height="4" rx="1" className="fill-slate-400" />
          <rect x="25" y="58" width="28" height="3" rx="1" className="fill-slate-300" />
          {/* Security Shield */}
          <path
            d="M62 14L48 9L34 14C34 26 40 37 48 41C56 37 62 26 62 14Z"
            className="fill-navy-900 stroke-primary"
            strokeWidth="2"
          />
          {/* Inner Shield Accent */}
          <path
            d="M58 17L48 13.5L38 17C38 26.5 42.5 35 48 38C53.5 35 58 26.5 58 17Z"
            className="fill-primary/20"
          />
          {/* Checkmark in shield */}
          <path
            d="M43 24.5L46.5 28L53 21"
            stroke="#d4af37"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
  },
  {
    id: 4,
    number: "4",
    title: "Enjoy Your Journey",
    description:
      "Pack your bags, start your adventure and create unforgettable memories with Make Your Own Voyage.",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        {/* Orbital decorative dashed ring */}
        <div className="how-icon-circle absolute inset-0 border-2 border-dashed border-primary/30 transition-transform duration-700 group-hover:-rotate-45" />
        <div className="how-icon-circle absolute inset-2 bg-gradient-to-br from-gold-50 via-white to-primary/10" />

        {/* Floating mini badges */}
        <span className="how-badge-circle absolute -left-1 bottom-3 flex h-6 w-6 items-center justify-center bg-white text-[11px] text-primary shadow-xs border border-border">
          🌍
        </span>
        <span className="how-badge-circle absolute -right-1 top-2 flex h-6 w-6 items-center justify-center bg-white text-[10px] text-heading shadow-xs border border-border">
          🧳
        </span>

        {/* Central Illustration: Traveler & Adventure Compass */}
        <svg
          viewBox="0 0 100 90"
          className="relative z-10 h-20 w-20 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Suitcase */}
          <rect
            x="26"
            y="32"
            width="48"
            height="38"
            rx="4"
            className="fill-navy-900 stroke-navy-800"
            strokeWidth="2"
          />
          {/* Suitcase straps */}
          <rect x="36" y="32" width="5" height="38" className="fill-primary" />
          <rect x="59" y="32" width="5" height="38" className="fill-primary" />
          {/* Suitcase handle */}
          <path
            d="M42 32V24C42 22 44 20 46 20H54C56 20 58 22 58 24V32"
            stroke="#d4af37"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Wheels */}
          <circle cx="34" cy="72" r="3" className="fill-slate-700" />
          <circle cx="66" cy="72" r="3" className="fill-slate-700" />
          {/* World/Compass Badge on suitcase */}
          <circle cx="50" cy="51" r="9" className="fill-white shadow-xs" />
          <path
            d="M50 44L52.5 49L57 51L52.5 53L50 58L47.5 53L43 51L47.5 49L50 44Z"
            className="fill-primary"
          />
        </svg>
      </div>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Upper Colored Hero Banner */}
      <div className="relative bg-gradient-to-b from-[#060b13] via-[#0a192f] to-[#0f2442] pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-40 text-white">
        {/* Subtle Ambient Background Accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
          <div className="how-icon-circle absolute -top-24 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-primary/20 blur-3xl" />
          <div className="how-icon-circle absolute top-12 left-10 h-72 w-72 bg-navy-600/30 blur-2xl" />
          <div className="how-icon-circle absolute bottom-0 right-10 h-72 w-72 bg-primary/15 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Subheading Tag */}
        

          {/* Main Title */}
          <h2 className="mt-4 text-3xl font-normal tracking-tight text-[#d4af37] sm:text-4xl  lg:text-5xl font-serif">
            How It Works
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Planning your next trip is easy. Follow these simple steps and get
            ready for your next adventure with Make Your Own Voyage.
          </p>
        </div>
      </div>

      {/* Cards Section Overlapping the Banner */}
      <div className="relative -mt-16 sm:-mt-20 lg:-mt-24 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="how-card-rounded group relative flex flex-col justify-between border border-[#e8e3d9] bg-white p-6 pt-9 text-center shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Step Number Circle overlapping the top card boundary */}
                <div className="how-badge-circle absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center border-2 border-primary/50 bg-white text-sm font-bold text-heading shadow-md transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                  {step.number}
                </div>

                {/* Card Illustration Graphic */}
                <div className="pt-2">
                  {step.illustration}
                </div>

                {/* Card Title and Description */}
                <div className="mt-4 flex flex-1 flex-col justify-start">
                  <h3 className="text-lg font-bold text-heading transition-colors duration-200 group-hover:text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-14 text-center">
            <p className="text-sm font-medium text-muted">
              Ready to plan your next adventure?
            </p>

            <Link
              href="/packages"
              className="mt-4 inline-flex items-center gap-2.5 rounded-xl bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-heading shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105 active:scale-95"
            >
              <span>Explore Packages</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
      </div>
    </section>
  );
};

export default HowItWorks;