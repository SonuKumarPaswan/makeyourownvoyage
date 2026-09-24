import { apiFetch } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  DestinationResponse,
  SingleDestinationResponse,
} from "@/types/destination";

export async function getDestinations(params?: {
  state?: string;
  type?: string;
  isFeatured?: boolean;
  limit?: number;
}): Promise<DestinationResponse> {
  return apiFetch<DestinationResponse>(API_ENDPOINTS.DESTINATIONS, { params });
}

export async function getDestinationBySlug(
  slug: string
): Promise<SingleDestinationResponse> {
  return apiFetch<SingleDestinationResponse>(
    API_ENDPOINTS.DESTINATION_BY_SLUG(slug)
  );
}

export async function getFeaturedDestinations(
  limit: number = 8
): Promise<DestinationResponse> {
  return apiFetch<DestinationResponse>(API_ENDPOINTS.DESTINATIONS, {
    params: { isFeatured: true, limit },
  });
}
