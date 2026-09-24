"use client";

import FlightCard from "./FlightCard";

interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;

  departure: {
    time: string;
    airport: string;
  };

  arrival: {
    time: string;
    airport: string;
  };

  duration: string;
  stops: number;
  price: number;
  baggage?: string;
  refundable?: boolean;
}

const flights: Flight[] = [
  {
    id: "flight-1",
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E 2345",
    departure: {
      time: "06:30",
      airport: "DEL",
    },
    arrival: {
      time: "08:45",
      airport: "BOM",
    },
    duration: "2h 15m",
    stops: 0,
    price: 4850,
    baggage: "15 Kg",
    refundable: true,
  },
  {
    id: "flight-2",
    airline: "Air India",
    airlineCode: "AI",
    flightNumber: "AI 864",
    departure: {
      time: "09:15",
      airport: "DEL",
    },
    arrival: {
      time: "11:30",
      airport: "BOM",
    },
    duration: "2h 15m",
    stops: 0,
    price: 5320,
    baggage: "15 Kg",
    refundable: true,
  },
  {
    id: "flight-3",
    airline: "Akasa Air",
    airlineCode: "QP",
    flightNumber: "QP 112",
    departure: {
      time: "13:40",
      airport: "DEL",
    },
    arrival: {
      time: "16:10",
      airport: "BOM",
    },
    duration: "2h 30m",
    stops: 0,
    price: 4680,
    baggage: "15 Kg",
    refundable: false,
  },
  {
    id: "flight-4",
    airline: "SpiceJet",
    airlineCode: "SG",
    flightNumber: "SG 8169",
    departure: {
      time: "18:20",
      airport: "DEL",
    },
    arrival: {
      time: "21:05",
      airport: "BOM",
    },
    duration: "2h 45m",
    stops: 1,
    price: 4250,
    baggage: "15 Kg",
    refundable: false,
  },
];

const FlightResults = () => {
  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-heading">
            Available Flights
          </h2>

          <p className="mt-1 text-sm text-muted">
            {flights.length} flights available for your search
          </p>
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard
            key={flight.id}
            airline={flight.airline}
            airlineCode={flight.airlineCode}
            flightNumber={flight.flightNumber}
            departureTime={flight.departure.time}
            departureAirport={flight.departure.airport}
            arrivalTime={flight.arrival.time}
            arrivalAirport={flight.arrival.airport}
            duration={flight.duration}
            stops={flight.stops}
            price={flight.price}
            baggage={flight.baggage}
            refundable={flight.refundable}
          />
        ))}
      </div>
    </section>
  );
};

export default FlightResults;