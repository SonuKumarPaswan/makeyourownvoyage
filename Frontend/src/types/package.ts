import { Destination } from "./destination";

export type PackageType =
  | "sea_beach"
  | "trekking_tour"
  | "single_tour"
  | "weekend_trips"
  | "mountain_trips"
  | "group_trips"
  | "honeymoon"
  | "family"
  | "couple"
  | "corporate"
  | "adventure"
  | "luxury"
  | "pilgrimage"
  | "heritage"
  | "road_trip"
  | "domestic"
  | "weekend"
  | "group"
  | "custom"
  | "holiday"
  | string;

export interface Activity {
  _id?: string;
  time?: string;
  type:
    | "conference"
    | "team_building"
    | "gala_dinner"
    | "cocktail_night"
    | "award_ceremony"
    | "breakfast"
    | "lunch"
    | "dinner"
    | "transfer"
    | "bus_departure"
    | "bus_arrival"
    | "hotel_checkin"
    | "hotel_checkout"
    | "sightseeing"
    | "adventure"
    | "free_time"
    | "other";
  title: string;
  description?: string;
  location?: string;
  duration?: string;
  image?: string;
}

export interface OvernightStay {
  enabled: boolean;
  location?: string;
  hotelId?: string | any;
  checkIn?: string;
  roomType?: string;
  description?: string;
}

export interface ItineraryDay {
  _id?: string;
  day: number;
  title: string;
  description?: string;
  dayTransport?: string | any;
  activities: Activity[];
  overnight?: OvernightStay;
}

export interface PriceSlab {
  minPax: number;
  maxPax: number;
  pricePerPerson: number;
}

export interface CorporateFacilities {
  conferenceHallIncluded?: boolean;
  projectorAndAVSetup?: boolean;
  djAndSoundSystem?: boolean;
  teamBuildingFacilitator?: boolean;
  stageAndBackdrop?: boolean;
}

export interface Package {
  _id: string;
  title: string;
  slug: string;
  destination: Destination | string;
  packageType: PackageType;
  categories?: string[];
  region: string;
  days: number;
  nights: number;
  duration: string;
  primaryHotel?: any;
  primaryTransport?: any;
  sourceTemplate?: string;
  corporateFacilities?: CorporateFacilities;
  functions?: any[];
  startingPrice: number;
  currency: string;
  minPax: number;
  maxPax: number;
  priceSlabs?: PriceSlab[];
  image: string;
  gallery?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary: ItineraryDay[];
  isFeatured?: boolean;
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageListResponse {
  success: boolean;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  data: Package[];
}

export interface SinglePackageResponse {
  success: boolean;
  data: Package;
}
