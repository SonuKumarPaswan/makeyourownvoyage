import { apiFetch } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  PackageListResponse,
  SinglePackageResponse,
  Package,
} from "@/types/package";

export async function getPackages(params?: {
  page?: number;
  limit?: number;
  destination?: string;
  packageType?: string;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}): Promise<PackageListResponse> {
  return apiFetch<PackageListResponse>(API_ENDPOINTS.PACKAGES, { params });
}

export async function getPackageBySlug(
  slug: string
): Promise<SinglePackageResponse> {
  return apiFetch<SinglePackageResponse>(API_ENDPOINTS.PACKAGE_BY_SLUG(slug));
}

export async function getFeaturedPackages(
  limit: number = 6
): Promise<PackageListResponse> {
  return apiFetch<PackageListResponse>(API_ENDPOINTS.PACKAGES, {
    params: { isFeatured: true, limit },
  });
}
