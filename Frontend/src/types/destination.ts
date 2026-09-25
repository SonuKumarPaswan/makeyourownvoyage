import { State } from "./state";

export type DestinationType =
  | "hill_station"
  | "beach"
  | "wildlife"
  | "heritage"
  | "pilgrimage"
  | "adventure"
  | "city"
  | "desert"
  | "island"
  | "other";

export interface DestinationAttraction {
  _id?: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Destination {
  _id: string;
  name: string;
  slug: string;
  state: State | string;
  country: string;
  shortDescription?: string;
  description?: string;
  type: DestinationType[];
  location?: {
    latitude?: number;
    longitude?: number;
  };
  bestTimeToVisit?: {
    months: string[];
    description?: string;
  };
  recommendedDuration?: {
    minDays?: number;
    maxDays?: number;
  };
  howToReach?: {
    byAir?: string;
    byTrain?: string;
    byRoad?: string;
  };
  estimatedBudget?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  image?: string;
  gallery?: string[];
  attractions?: DestinationAttraction[];
  isFeatured?: boolean;
  packageCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DestinationResponse {
  success: boolean;
  count?: number;
  data: Destination[];
}

export interface SingleDestinationResponse {
  success: boolean;
  data: Destination;
}
