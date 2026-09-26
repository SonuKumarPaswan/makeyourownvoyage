import { apiFetch, ApiFetchOptions } from "./client";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("voyage_admin_token") || localStorage.getItem("token") || null;
}

export function setAdminToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("voyage_admin_token", token);
  }
}

export function removeAdminToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("voyage_admin_token");
    localStorage.removeItem("token");
  }
}

export async function adminFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const token = getAdminToken();
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return apiFetch<T>(endpoint, {
    ...options,
    headers,
    credentials: "include",
  });
}

// ==========================================
// 0. AUTH & ADMIN VERIFICATION APIS
// ==========================================
export const adminAuthApi = {
  getMe: () => adminFetch<{ success: boolean; user: any }>("/auth/me"),
  login: (credentials: { email?: string; phoneNumber?: string; password?: string }) =>
    apiFetch<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      credentials: "include",
    }),
};

// ==========================================
// 1. HOTELS ADMIN APIS
// ==========================================
export const adminHotelsApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/admin/hotels", { params }),
  getById: (id: string) => adminFetch<any>(`/admin/hotels/${id}`),
  create: (data: any) =>
    adminFetch<any>("/admin/hotels/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/admin/hotels/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/admin/hotels/${id}`, {
      method: "DELETE",
    }),
};

// ==========================================
// 2. TRANSPORTS & FLEET ADMIN APIS
// ==========================================
export const adminTransportsApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/admin/transports", { params }),
  getById: (id: string) => adminFetch<any>(`/admin/transports/${id}`),
  create: (data: any) =>
    adminFetch<any>("/admin/transports/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/admin/transports/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/admin/transports/${id}`, {
      method: "DELETE",
    }),
};

// ==========================================
// 3. PACKAGES ADMIN APIS
// ==========================================
export const adminPackagesApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/packages", { params }),
  getById: (id: string) => adminFetch<any>(`/packages/id/${id}`),
  create: (data: any) =>
    adminFetch<any>("/packages/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/packages/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/packages/${id}`, {
      method: "DELETE",
    }),
};

// ==========================================
// 4. DESTINATIONS & STATES ADMIN APIS
// ==========================================
export const adminDestinationsApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/destinations", { params }),
  create: (data: any) =>
    adminFetch<any>("/destinations", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/destinations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/destinations/${id}`, {
      method: "DELETE",
    }),
};

export const adminStatesApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/states", { params }),
  create: (data: any) =>
    adminFetch<any>("/states", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/states/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/states/${id}`, {
      method: "DELETE",
    }),
};

// ==========================================
// 5. ENQUIRIES / LEADS CRM ADMIN APIS
// ==========================================
export const adminEnquiriesApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/enquiries/admin/all", { params }),
  getById: (id: string) =>
    adminFetch<any>(`/enquiries/admin/${id}`),
  updateStatus: (id: string, data: { status?: string; notes?: string; assignedTo?: string; quoteAmount?: number }) =>
    adminFetch<any>(`/enquiries/admin/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/enquiries/admin/${id}`, {
      method: "DELETE",
    }),
};

// ==========================================
// 6. ACTIVITIES MASTER & ITINERARY TEMPLATES
// ==========================================
export const adminActivitiesApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/activities", { params }),
  create: (data: any) =>
    adminFetch<any>("/activities/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/activities/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/activities/${id}`, {
      method: "DELETE",
    }),
};

export const adminTemplatesApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/itinerary-templates", { params }),
  create: (data: any) =>
    adminFetch<any>("/itinerary-templates/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/itinerary-templates/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/itinerary-templates/${id}`, {
      method: "DELETE",
    }),
};

// ==========================================
// 7. COLLECTIONS & PROMOTIONAL OFFERS
// ==========================================
export const adminCollectionsApi = {
  getAll: () => adminFetch<any>("/collections/admin/all"),
  create: (data: any) =>
    adminFetch<any>("/collections/admin/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/collections/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/collections/admin/${id}`, {
      method: "DELETE",
    }),
};

// ==========================================
// 8. FAQS & REVIEWS ADMIN APIS
// ==========================================
export const adminFaqsApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>("/faq", { params }),
  create: (data: any) =>
    adminFetch<any>("/faq/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/faq/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/faq/${id}`, {
      method: "DELETE",
    }),
};

// ==========================================
// 9. USERS ADMIN APIS
// ==========================================
export const adminUsersApi = {
  getAll: () => adminFetch<any>("/auth"),
  getById: (id: string) => adminFetch<any>(`/auth/${id}`),
  update: (id: string, data: any) =>
    adminFetch<any>(`/auth/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ==========================================
// 10. CLOUDINARY MEDIA UPLOAD APIS
// ==========================================
export const adminUploadApi = {
  uploadImage: async (file: File, folder: string = "packages") => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    const token = getAdminToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/upload/image`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || "Failed to upload image to Cloudinary");
    }
    return data;
  },

  uploadMultiple: async (files: FileList | File[], folder: string = "packages") => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));
    formData.append("folder", folder);

    const token = getAdminToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/upload/multiple`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || "Failed to upload images to Cloudinary");
    }
    return data;
  },
};

// ==========================================
// 11. VISA MANAGEMENT APIS
// ==========================================
export const adminVisaApi = {
  getAll: (params?: Record<string, any>) =>
    adminFetch<any>(`/visas${params ? `?${new URLSearchParams(params).toString()}` : ""}`),
  getById: (id: string) => adminFetch<any>(`/visas/${id}`),
  create: (data: any) =>
    adminFetch<any>("/visas", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/visas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/visas/${id}`, {
      method: "DELETE",
    }),
};


