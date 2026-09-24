import { NextResponse } from "next/server";
import { getSearchSuggestions, globalSearch } from "@/lib/api/search";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "all";
    const isSuggestions = searchParams.get("suggestions") === "true";

    // Agar query empty ho toh khali response do
    if (!query.trim()) {
        return NextResponse.json({ success: true, suggestions: [], results: [] });
    }

    try {
        // 1. Agar dropdown suggestions maangi hain
        if (isSuggestions) {
            const data = await getSearchSuggestions(query);
            return NextResponse.json(data);
        }

        // 2. Agar full search results maange hain
        const data = await globalSearch(query, type);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json(
            { success: false, message: "Search failed" },
            { status: 500 }
        );
    }
}
