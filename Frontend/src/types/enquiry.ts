export type EnquiryCategory =
  | "hotel"
  | "flight"
  | "package"
  | "weekend_trip"
  | "transport"
  | "custom";

export interface HotelEnquiryData {
  hotelId?: string;
  hotelName?: string;
  roomType?: string;
  roomsCount?: number;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: { adults: number; children: number };
  mealPlan?: string;
  totalEstimatedPrice?: number;
}

export interface PackageEnquiryData {
  packageId?: string;
  destinationId?: string;
  packageTitle?: string;
  travelDate?: string;
  durationDays?: number;
  travelers?: { adults: number; children: number };
  packageCategory?: "holiday" | "weekend_trip" | "corporate" | "honeymoon" | "family" | "other";
  corporateFacilitiesNeeded?: {
    conferenceHall?: boolean;
    teamBuilding?: boolean;
    djAndSound?: boolean;
  };
  totalEstimatedPrice?: number;
}

export interface TransportEnquiryData {
  transportId?: string;
  category?: "Cab" | "Bus" | "Bike" | "Traveller" | "Other";
  vehicleType?: string;
  pickupLocation?: string;
  dropLocation?: string;
  serviceType?: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  passengersCount?: number;
}

export interface FlightEnquiryData {
  fromCity: string;
  toCity: string;
  tripType?: "one_way" | "round_trip" | string;
  departureDate: string;
  returnDate?: string;
  travelClass?: "Economy" | "Premium Economy" | "Business" | "First Class" | string;
  passengers?: { adults?: number; children?: number; infants?: number };
}

export interface BaseEnquiryPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city?: string;
  specialRequests?: string;
  enquiryType: EnquiryCategory;
  hotelDetails?: HotelEnquiryData;
  packageDetails?: PackageEnquiryData;
  transportDetails?: TransportEnquiryData;
  flightDetails?: FlightEnquiryData;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    enquiryCode: string;
    status: string;
    createdAt: string;
  };
}
