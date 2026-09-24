import { apiFetch } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { StateResponse, SingleStateResponse } from "@/types/state";

export async function getStates(): Promise<StateResponse> {
  return apiFetch<StateResponse>(API_ENDPOINTS.STATES);
}

export async function getStateBySlug(
  slug: string
): Promise<SingleStateResponse> {
  return apiFetch<SingleStateResponse>(API_ENDPOINTS.STATE_BY_SLUG(slug));
}
