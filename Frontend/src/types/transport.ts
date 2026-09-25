export type TransportCategory = "Cab" | "Bus" | "Bike" | "Traveller";

export interface TransportImage {
  url: string;
  alt?: string;
  isCover?: boolean;
}

export interface TransportPricing {
  perKmRate?: number;
  perDayRate?: number;
  minKmPerDay?: number;
  driverAllowancePerDay?: number;
  nightStayAllowance?: number;
  hourlyPackage?: {
    hours?: number;
    kms?: number;
    price?: number;
    extraHourRate?: number;
    extraKmRate?: number;
  };
  securityDeposit?: number; // For bikes/self-drive
}

export interface TransportCapacity {
  seating: number;
  luggageBags: number;
}

export interface TransportSpecifications {
  fuelType?: "Petrol" | "Diesel" | "CNG" | "Electric";
  transmission?: "Manual" | "Automatic";
  hasAC?: boolean;
  helmetProvidedCount?: number;
  isSelfDrive?: boolean;
}

export interface Transport {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: TransportCategory;
  vehicleType: string;
  brand?: string;
  modelName?: string;
  capacity: TransportCapacity;
  specifications: TransportSpecifications;
  images: TransportImage[];
  pricing: TransportPricing;
  features?: string[];
  termsAndConditions?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransportListResponse {
  success: boolean;
  count?: number;
  data: Transport[];
}

export interface SingleTransportResponse {
  success: boolean;
  data: Transport;
}
