const NoFlightsFound = () => {
  return (
    <div
      className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-sm"
      role="status"
    >
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-8 w-8 text-primary"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10.5 21 6l-7.5 12-2.5-5-5-2.5L3 10.5Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11 13 3.5-3.5"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="mt-5 text-2xl font-bold text-heading">
        No Flights Found
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">
        We couldn&apos;t find any flights for your selected route and travel
        date. Try changing your search criteria or selecting a different date.
      </p>

      {/* Suggestions */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary">
          Try another date
        </span>

        <span className="rounded-full bg-secondary-light px-4 py-2 text-sm font-medium text-secondary">
          Check nearby airports
        </span>
      </div>
    </div>
  );
};

export default NoFlightsFound;