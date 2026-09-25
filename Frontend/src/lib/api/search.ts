import { apiFetch } from "./client";
import type { SearchSuggestionsResponse, GlobalSearchResponse } from "@/types/search";


export async function getSearchSuggestions(
    query: string,
    limit: number = 8
): Promise<SearchSuggestionsResponse> {
    if (!query.trim()) {
        return {
            success: true,
            query: "",
            suggestions: []
        }
    }

    return apiFetch<SearchSuggestionsResponse>(
        `/search/suggestions?q=${encodeURIComponent(query.trim())}&limit=${limit}`
    );
}

export async function globalSearch(
    query: string,
    type: string = "all",
    limit: number = 20
): Promise<GlobalSearchResponse> {
    return apiFetch<GlobalSearchResponse>(
        `/search?q=${encodeURIComponent(query.trim())}&type=${type}&limit=${limit}`
    );
}