"use client";

import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How can I book a flight through Make Your Own Voyage?",
    answer:
      "You can search for flights by entering your departure city, destination, travel date and number of travellers. Compare the available options and continue with the booking process.",
  },
  {
    id: 2,
    question: "Can I book hotels and holiday packages as well?",
    answer:
      "Yes. You can explore and book hotels, holiday packages, flights and cabs through Make Your Own Voyage from their respective sections.",
  },
  {
    id: 3,
    question: "How do I know if my booking is confirmed?",
    answer:
      "After completing your booking, you will receive your booking details and confirmation through the contact information provided during the booking process.",
  },
  {
    id: 4,
    question: "Can I cancel or modify my booking?",
    answer:
      "Cancellation and modification options depend on the booking type and the applicable terms and conditions. Check your booking details or contact our support team for assistance.",
  },
  {
    id: 5,
    question: "Are the prices shown on the website final?",
    answer:
      "Prices may vary based on availability, travel dates, demand and applicable taxes or fees. The final amount will be displayed before you complete your booking.",
  },
  {
    id: 6,
    question: "How can I contact customer support?",
    answer:
      "You can contact our support team through the Contact Us page. Our team can assist you with bookings, travel plans and other queries.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Frequently Asked Questions
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Have Questions?
          </h2>

          <p className="mt-4 text-base leading-7 text-muted">
            Find answers to some of the most common questions about booking
            flights, hotels, packages and other travel services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border bg-card transition ${
                  isOpen
                    ? "border-primary/30 shadow-sm"
                    : "border-border"
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-base font-semibold text-heading sm:text-lg">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border px-5 pb-5 pt-4 sm:px-6">
                      <p className="text-sm leading-7 text-muted sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Support CTA */}
        <div className="mt-10 rounded-2xl border border-primary/20 bg-primary-light p-6 text-center sm:p-8">
          <h3 className="text-xl font-bold text-heading">
            Still have questions?
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            Our travel support team is here to help you with your travel
            plans and bookings.
          </p>

          <a
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
          >
            Contact Support

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

export default FAQ;