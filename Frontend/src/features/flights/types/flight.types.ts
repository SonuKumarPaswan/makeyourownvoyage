export interface FlightSearchParams {
  itinerary?: string;
  tripType?: string;
  paxType?: string;
  intl?: string;
  cabinClass?: string;
  lang?: string;
}

export interface Flight {
  id: string;

  airline: string;
  airlineCode: string;
  flightNumber: string;

  departure: {
    time: string;
    airport: string;
    city?: string;
  };

  arrival: {
    time: string;
    airport: string;
    city?: string;
  };

  duration: string;
  stops: number;

  price: number;

  baggage?: string;
  refundable?: boolean;

  cabinClass?: string;
}