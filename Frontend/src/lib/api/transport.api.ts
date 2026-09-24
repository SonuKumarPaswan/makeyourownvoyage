import { apiFetch } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  TransportListResponse,
  SingleTransportResponse,
  TransportCategory,
} from "@/types/transport";

export async function getTransportList(params?: {
  category?: TransportCategory;
  vehicleType?: string;
  isFeatured?: boolean;
  limit?: number;
}): Promise<TransportListResponse> {
  return apiFetch<TransportListResponse>(API_ENDPOINTS.TRANSPORT, { params });
}

export async function getTransportByCategory(
  category: TransportCategory
): Promise<TransportListResponse> {
  return apiFetch<TransportListResponse>(
    API_ENDPOINTS.TRANSPORT_BY_CATEGORY(category)
  );
}

export async function getTransportBySlug(
  slug: string
): Promise<SingleTransportResponse> {
  return apiFetch<SingleTransportResponse>(
    API_ENDPOINTS.TRANSPORT_BY_SLUG(slug)
  );
}
