// 1. Live Suggestion Item (Typeahead ke liye)
export interface SearchSuggestion {
    title: string;
    slug: string;
    type: "destination" | "state" | "package" | "hotel" | "transport" | "activity";
    url: string;
    subtitle: string;
    image?: string;
}

// 2. Suggestions API Response
export interface SearchSuggestionsResponse {
    success: boolean;
    query: string;
    suggestions: SearchSuggestion[];
}

// 3. Full Search item (Global Search ke liye)
export interface SearchResultItem {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    type: "destination" | "package" | "hotel" | "transport" | "state" | "activity";
    url: string;
    price?: number;
    image?: string;
    region?: string;
    destination?: string;
    starCategory?: number;
}

// 4. Global Search Response
export interface GlobalSearchResponse {
    success: boolean;
    query: string;
    totalMatches: number;
    counts: {
        destinations: number;
        packages: number;
        hotels: number;
        transports: number;
        states: number;
        activities: number;
    };
    results: {
        destinations: SearchResultItem[];
        packages: SearchResultItem[];
        hotels: SearchResultItem[];
        transports: SearchResultItem[];
        states: SearchResultItem[];
        activities: SearchResultItem[];
    };
    combined: SearchResultItem[];
}
