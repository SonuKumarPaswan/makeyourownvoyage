"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "How does booking with Make Your Own Voyage work?",
    answer:
      "Select your desired destination, dates, and package style. You can customize your stays, private transfers, and sightseeing itineraries online, or speak directly with our 24/7 travel specialists for a tailored quote.",
  },
  {
    id: 2,
    question: "Can I customize holiday packages with flights and cabs?",
    answer:
      "Yes, absolutely. Every package is completely customizable. You can add doorstep private cab transfers (Sedan/Innova/Crysta), verified luxury hotels, domestic flights, and guided excursions to match your preferences.",
  },
  {
    id: 3,
    question: "Are there any hidden fees or extra charges?",
    answer:
      "No. We practice complete price transparency. All inclusions, government taxes, driver allowances, toll charges, and hotel tariffs are clearly itemized before you confirm your reservation.",
  },
  {
    id: 4,
    question: "What is your cancellation and refund policy?",
    answer:
      "We offer flexible cancellation policies depending on the airline and hotel partner terms. Clear refund timelines and minimal cancellation charges are outlined during your booking confirmation.",
  },
  {
    id: 5,
    question: "How do I receive my booking vouchers and tickets?",
    answer:
      "Immediately upon confirmation, all verified booking vouchers, hotel confirmation numbers, flight e-tickets, and assigned driver details are delivered directly to your email and WhatsApp.",
  },
  {
    id: 6,
    question: "Is 24/7 customer and on-trip assistance available?",
    answer:
      "Yes. Our dedicated travel concierge and ground support team are available 24 hours a day, 7 days a week to assist you before, during, and after your trip.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-background py-16 sm:py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading, Badge & Info */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28">
            {/* Pill Badge */}
           

            {/* Main Editorial Heading */}
            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-heading font-serif tracking-tight">
              Frequently asked <br />
              <span className="text-[#d4af37] font-serif">
                questions
              </span>
            </h2>

            {/* Description Subtitle */}
            <p className="mt-5 text-sm sm:text-base text-muted leading-relaxed font-normal max-w-md">
              Choose personalized travel packages that fit your itinerary and
              budget. No hidden fees, no surprises—just transparent pricing and
              seamless holiday planning.
            </p>

            {/* Contact Support Mini Box */}
            <div className="mt-8 flex items-center gap-3 text-sm text-muted">
              <span>Have a specific query?</span>
              <Link
                href="/contact"
                className="font-medium text-heading underline underline-offset-4 hover:text-primary transition-colors"
              >
                Contact Support →
              </Link>
            </div>
          </div>

          {/* Right Column: Stacked Rounded FAQ Cards */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`faq-card-rounded transition-all duration-300 border overflow-hidden ${
                    isOpen
                      ? "bg-[#fdfaf3] border-[#d4af37]/40 shadow-xs"
                      : "bg-[#fbfbfe] hover:bg-white border-slate-200/80 shadow-xs"
                  }`}
                  style={{ borderRadius: "1.25rem" }}
                >
                  {/* Card Header / Question Button */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                  >
                    <span className="text-base sm:text-lg font-medium text-heading leading-snug">
                      {faq.question}
                    </span>

                    {/* Circular Chevron Toggle Button with Brand Royal Gold */}
                    <span
                      className={`banner-circle-btn dest-circle-btn flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-[#d4af37] text-white shadow-sm"
                          : "bg-[#d4af37]/15 text-[#936e20] hover:bg-[#d4af37]/25"
                      }`}
                      style={{ borderRadius: "9999px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {/* Accordion Answer Collapse */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-border/30">
                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}