const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface VisaItem {
  _id: string;
  country: string;
  slug: string;
  flag?: string;
  visaType: string;
  processingTime: string;
  validity: string;
  stayDuration: string;
  fee: number;
  currency?: string;
  entryType: string;
  image: string;
  description?: string;
  documents?: { title: string; description: string }[];
  steps?: string[];
  isPopular?: boolean;
  isActive?: boolean;
}

export const visaApi = {
  // Get all active visas with optional search
  getAll: async (params?: { search?: string; popular?: boolean }): Promise<{ success: boolean; data: VisaItem[] }> => {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.popular) query.append("popular", "true");

    const res = await fetch(`${BASE_URL}/visas?${query.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch visas");
    return res.json();
  },

  // Get visa by slug or ID
  getBySlugOrId: async (idOrSlug: string): Promise<{ success: boolean; data: VisaItem }> => {
    const res = await fetch(`${BASE_URL}/visas/${encodeURIComponent(idOrSlug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Failed to fetch visa for ${idOrSlug}`);
    return res.json();
  },
};
