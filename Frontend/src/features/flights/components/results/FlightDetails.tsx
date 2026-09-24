"use client";

interface FlightDetailsProps {
  airline?: string;
  flightNumber?: string;
  departureTime?: string;
  departureAirport?: string;
  departureCity?: string;
  arrivalTime?: string;
  arrivalAirport?: string;
  arrivalCity?: string;
  duration?: string;
  stops?: number;
  baggage?: string;
  cabinClass?: string;
  baseFare?: number;
  taxes?: number;
  totalFare?: number;
}

const FlightDetails = ({
  airline = "IndiGo",
  flightNumber = "6E 2345",
  departureTime = "06:30",
  departureAirport = "DEL",
  departureCity = "Delhi",
  arrivalTime = "08:45",
  arrivalAirport = "BOM",
  arrivalCity = "Mumbai",
  duration = "2h 15m",
  stops = 0,
  baggage = "15 Kg",
  cabinClass = "Economy",
  baseFare = 4000,
  taxes = 850,
  totalFare = 4850,
}: FlightDetailsProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-2 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold text-heading">
            Flight Details
          </h3>

          <p className="mt-1 text-sm text-muted">
            {airline} • {flightNumber}
          </p>
        </div>

        <span className="w-fit rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
          {cabinClass}
        </span>
      </div>

      {/* Route */}
      <div className="py-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Departure */}
          <div>
            <p className="text-2xl font-bold text-heading">
              {departureTime}
            </p>

            <p className="mt-1 text-sm font-bold text-text">
              {departureAirport}
            </p>

            <p className="mt-1 text-xs text-muted">
              {departureCity}
            </p>
          </div>

          {/* Journey */}
          <div className="flex min-w-[120px] flex-col items-center">
            <span className="text-xs font-medium text-muted">
              {duration}
            </span>

            <div className="my-3 flex w-full items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />

              <div className="h-px flex-1 bg-border" />

              <span className="mx-2 text-xs text-primary">
                ✈
              </span>

              <div className="h-px flex-1 bg-border" />

              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            </div>

            <span className="text-xs font-medium text-muted">
              {stops === 0
                ? "Non Stop"
                : `${stops} Stop${stops > 1 ? "s" : ""}`}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <p className="text-2xl font-bold text-heading">
              {arrivalTime}
            </p>

            <p className="mt-1 text-sm font-bold text-text">
              {arrivalAirport}
            </p>

            <p className="mt-1 text-xs text-muted">
              {arrivalCity}
            </p>
          </div>
        </div>
      </div>

      {/* Flight Information */}
      <div className="grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
        <div className="rounded-lg bg-background p-3">
          <p className="text-xs text-muted">
            Airline
          </p>

          <p className="mt-1 text-sm font-semibold text-text">
            {airline}
          </p>
        </div>

        <div className="rounded-lg bg-background p-3">
          <p className="text-xs text-muted">
            Flight Number
          </p>

          <p className="mt-1 text-sm font-semibold text-text">
            {flightNumber}
          </p>
        </div>

        <div className="rounded-lg bg-background p-3">
          <p className="text-xs text-muted">
            Baggage
          </p>

          <p className="mt-1 text-sm font-semibold text-text">
            {baggage}
          </p>
        </div>
      </div>

      {/* Fare Breakdown */}
      <div className="mt-5 border-t border-border pt-5">
        <h4 className="text-sm font-bold text-heading">
          Fare Breakdown
        </h4>

        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">
              Base Fare
            </span>

            <span className="font-medium text-text">
              ₹{baseFare.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted">
              Taxes & Fees
            </span>

            <span className="font-medium text-text">
              ₹{taxes.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between border-t border-border pt-3">
            <span className="font-bold text-heading">
              Total Fare
            </span>

            <span className="text-lg font-bold text-primary">
              ₹{totalFare.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;