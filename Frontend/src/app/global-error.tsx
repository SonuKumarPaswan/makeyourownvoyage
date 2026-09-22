"use client";

import React from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
          {/* Background Decorations */}
          <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary-light blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-secondary-light blur-3xl" />

          {/* Error Card */}
          <div className="relative z-10 w-full max-w-xl">
            <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl sm:p-12">
              
              {/* Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-10 w-10 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.3 3.5h3.4L21 17.2a1.5 1.5 0 0 1-1.3 2.3H4.3A1.5 1.5 0 0 1 3 17.2L10.3 3.5Z"
                  />
                </svg>
              </div>

              {/* Label */}
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-error">
                Travel Interrupted
              </p>

              {/* Heading */}
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                Something went wrong
              </h1>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
                We're sorry, but something unexpected happened. Please try
                again or return to the home page and continue your journey.
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
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"
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
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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

              {/* Support */}
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
      </body>
    </html>
  );
}