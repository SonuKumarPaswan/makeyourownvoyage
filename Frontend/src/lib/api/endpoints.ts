export const API_ENDPOINTS = {
  // Public Feed & Global Search
  HOMEPAGE_FEED: "/collections/homepage-feed",
  GLOBAL_SEARCH: "/search",
  SEARCH_SUGGESTIONS: "/search/suggestions",

  // Packages
  PACKAGES: "/packages",
  PACKAGE_BY_SLUG: (slug: string) => `/packages/${slug}`,
  FEATURED_PACKAGES: "/packages?isFeatured=true",
  PACKAGES_BY_DESTINATION: (destinationId: string) => `/packages?destination=${destinationId}`,
  PACKAGES_BY_TYPE: (type: string) => `/packages?packageType=${type}`,

  // States & Destinations
  STATES: "/states",
  STATE_BY_SLUG: (slug: string) => `/states/${slug}`,
  DESTINATIONS: "/destinations",
  DESTINATION_BY_SLUG: (slug: string) => `/destinations/${slug}`,
  DESTINATIONS_BY_STATE: (stateId: string) => `/destinations?state=${stateId}`,
  FEATURED_DESTINATIONS: "/destinations?isFeatured=true",

  // Transport & Fleet
  TRANSPORT: "/transport",
  TRANSPORT_BY_CATEGORY: (category: "Cab" | "Bus" | "Bike" | "Traveller") =>
    `/transport?category=${category}`,
  TRANSPORT_BY_SLUG: (slug: string) => `/transport/${slug}`,
  FEATURED_TRANSPORT: "/transport?isFeatured=true",

  // Hotels & Stays
  HOTELS: "/hotels",
  HOTEL_BY_SLUG: (slug: string) => `/hotels/${slug}`,
  HOTELS_BY_DESTINATION: (destinationId: string) => `/hotels?destination=${destinationId}`,

  // Enquiries & Leads
  ENQUIRIES: "/enquiries",
  ENQUIRY_BY_ID: (id: string) => `/enquiries/${id}`,

  // FAQs
  FAQS: "/faqs",
  FAQS_BY_CATEGORY: (category: string) => `/faqs?category=${category}`,
};
