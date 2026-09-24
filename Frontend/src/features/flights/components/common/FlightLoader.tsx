const FlightLoader = () => {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Loading flight results"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          {/* Top Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Airline Logo */}
              <div className="h-12 w-12 rounded-full bg-gray-200" />

              <div className="space-y-2">
                {/* Airline */}
                <div className="h-5 w-32 rounded bg-gray-200" />

                {/* Flight Number */}
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2 text-right">
              <div className="ml-auto h-6 w-24 rounded bg-gray-200" />
              <div className="ml-auto h-4 w-20 rounded bg-gray-200" />
            </div>
          </div>

          {/* Flight Route */}
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Departure */}
            <div>
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-12 rounded bg-gray-200" />
            </div>

            {/* Duration */}
            <div className="text-center">
              <div className="mx-auto h-4 w-20 rounded bg-gray-200" />
              <div className="mx-auto mt-2 h-1 w-28 rounded bg-gray-200" />
              <div className="mx-auto mt-2 h-4 w-16 rounded bg-gray-200" />
            </div>

            {/* Arrival */}
            <div className="text-right">
              <div className="ml-auto h-6 w-16 rounded bg-gray-200" />
              <div className="ml-auto mt-2 h-4 w-12 rounded bg-gray-200" />
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="h-4 w-40 rounded bg-gray-200" />

            <div className="h-10 w-28 rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}

      <span className="sr-only">Searching for available flights...</span>
    </div>
  );
};

export default FlightLoader;