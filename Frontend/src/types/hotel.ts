export interface HotelRoom {
  _id: string;
  roomType: string;
  description: string;
  images: string[];
  bedType: string;
  bedCount: number;
  occupancy: {
    adults: number;
    children: number;
    maxGuests: number;
  };
  roomSize: {
    value: number;
    unit: string;
  };
  amenities: string[];
  mealPlan: string[];
  pricing: {
    basePrice: number;
    taxPercentage: number;
    taxAmount: number;
    finalPrice: number;
    currency: string;
  };
  availability: {
    totalRooms: number;
    availableRooms: number;
  };
}

export interface Hotel {
  _id: string;
  name: string;
  slug: string;
  description: string;
  propertyType: string; // Resort, 5 Star, Boutique, Villa, Heritage, Business
  starCategory: number;
  destination: any;
  location: {
    address: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    coordinates?: { latitude: number; longitude: number };
  };
  contact?: {
    phone: string;
    email: string;
  };
  images: Array<{
    url: string;
    alt?: string;
    type?: string;
    order?: number;
  }>;
  rating?: {
    average: number;
    totalReviews: number;
  };
  amenities: string[];
  rooms: HotelRoom[];
  dining?: {
    restaurants: Array<{
      name: string;
      cuisine: string[];
      openingTime: string;
      closingTime: string;
    }>;
    breakfast?: {
      available: boolean;
      timing?: string;
      type?: string;
    };
  };
  facilities?: {
    parking?: boolean;
    swimmingPool?: boolean;
    gym?: boolean;
    spa?: boolean;
    restaurant?: boolean;
    conferenceRoom?: boolean;
  };
  checkIn?: {
    time: string;
    ageRequirement: number;
  };
  checkOut?: {
    time: string;
  };
  policies?: {
    petsAllowed?: boolean;
    smokingAllowed?: boolean;
    couplesAllowed?: boolean;
    localIdsAccepted?: boolean;
    childrenAllowed?: boolean;
    extraBedAvailable?: boolean;
  };
  cancellationPolicy?: {
    type: string;
    freeCancellationBefore: string;
    description: string;
  };
  nearbyAttractions?: Array<{
    name: string;
    distance: string;
  }>;
  status: "active" | "inactive" | "under_review";
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HotelListResponse {
  success: boolean;
  count?: number;
  data: Hotel[];
}

export interface SingleHotelResponse {
  success: boolean;
  data: Hotel;
}
