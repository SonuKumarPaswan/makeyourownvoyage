import { apiFetch } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { Hotel, HotelListResponse, SingleHotelResponse } from "@/types/hotel";

export const hotelsApi = {
  /**
   * Search / List all active hotels with filters
   */
  async getAllHotels(params?: {
    city?: string;
    destination?: string;
    starCategory?: number;
    propertyType?: string;
    isFeatured?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<HotelListResponse> {
    return apiFetch<HotelListResponse>(API_ENDPOINTS.HOTELS, { params });
  },

  /**
   * Fetch single hotel by slug
   */
  async getHotelBySlug(slug: string): Promise<SingleHotelResponse> {
    return apiFetch<SingleHotelResponse>(API_ENDPOINTS.HOTEL_BY_SLUG(slug));
  },

  /**
   * Fetch hotels by destination ObjectId
   */
  async getHotelsByDestination(destinationId: string): Promise<HotelListResponse> {
    return apiFetch<HotelListResponse>(API_ENDPOINTS.HOTELS_BY_DESTINATION(destinationId));
  },
};
