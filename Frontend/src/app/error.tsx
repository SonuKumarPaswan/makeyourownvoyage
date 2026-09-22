"use client";

import React from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary-light blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-secondary-light blur-3xl" />

      {/* Error Card */}
      <div className="relative z-10 w-full max-w-xl">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl sm:p-12">
          {/* Travel Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-10 w-10 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 4.5 21 9l-4.5 3-1.5 5.5-2.5-1.5.5-4-4-1.5-2.5 2L5 11l3-3.5-1-3L10.5 4.5Z"
              />
            </svg>
          </div>

          {/* Error Code */}
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Travel Interrupted
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Oops! Something went wrong
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
            We couldn't complete your request right now. Don't worry,
            your journey isn't over. Please try again or return to the
            home page.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {/* Refresh Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L19.5 9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 4.5V9h-4.5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12a7.5 7.5 0 0 1-12.8 5.3L4.5 15"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5V15H9"
                />
              </svg>

              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 font-semibold text-heading transition hover:border-primary hover:text-primary"
            >
              {/* Home Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"
                />
              </svg>

              Back to Home
            </Link>
          </div>

          {/* Small Footer Text */}
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm text-muted">
              Need help?{" "}
              <Link
                href="/contact"
                className="font-medium text-primary hover:underline"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>

        {/* Brand */}
        <p className="mt-6 text-center text-sm font-medium text-muted">
          Make Your Own Voyage
        </p>
      </div>
    </main>
  );
}