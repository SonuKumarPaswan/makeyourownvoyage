import { apiFetch } from "./client";
import type { HomepageFeedResponse } from "@/types/homepage-feed";

export async function getHomepageFeed(): Promise<HomepageFeedResponse> {
    return apiFetch<HomepageFeedResponse>(
        "/collections/homepage-feed"
    );
}