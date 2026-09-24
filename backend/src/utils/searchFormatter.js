// src/utils/searchFormatter.js

/**
 * Standardize and format database search results for frontend consumption
 */
export const formatSearchResults = (resultMap) => {
    const formattedDestinations = (resultMap.destinations || []).map((d) => ({
        id: d._id,
        title: d.name,
        slug: d.slug,
        subtitle: Array.isArray(d.type) ? d.type.join(", ") : d.shortDescription || "Destination",
        image: d.images?.[0]?.url || "",
        url: `/destinations/${d.slug}`,
        type: "destination",
    }));

    const formattedPackages = (resultMap.packages || []).map((p) => ({
        id: p._id,
        title: p.title,
        slug: p.slug,
        subtitle: p.duration || `${p.days || 3} Days / ${p.nights || 2} Nights`,
        region: p.region,
        packageType: p.packageType,
        price: p.startingPrice || 0,
        image: p.image || "",
        url: `/packages/${p.slug}`,
        type: "package",
    }));

    const formattedHotels = (resultMap.hotels || []).map((h) => {
        const firstRoomPrice = h.rooms?.[0]?.pricing?.finalPrice || h.rooms?.[0]?.pricing?.basePrice || 0;
        const hotelImg = h.images?.[0]?.url || h.rooms?.[0]?.images?.[0] || "";
        return {
            id: h._id,
            title: h.name,
            slug: h.slug,
            subtitle: `${h.location?.city ? h.location.city.charAt(0).toUpperCase() + h.location.city.slice(1) : ""}${h.location?.state ? `, ${h.location.state}` : ""}`,
            city: h.location?.city || "",
            state: h.location?.state || "",
            starCategory: h.starCategory || 3,
            price: firstRoomPrice,
            image: hotelImg,
            url: `/hotels/${h.slug}`,
            type: "hotel",
        };
    });

    const formattedTransports = (resultMap.transports || []).map((t) => {
        let startingPrice = 0;
        if (t.category === "Bike") startingPrice = t.pricing?.dailyRentalPrice || 0;
        else if (t.category === "Bus") startingPrice = t.pricing?.seatTicketPrice || 0;
        else startingPrice = t.pricing?.basePrice || t.pricing?.perKmRate || 0;

        return {
            id: t._id,
            title: t.title,
            slug: t.slug,
            subtitle: `${t.category} • ${t.vehicleType || ""}`,
            category: t.category,
            price: startingPrice,
            seating: t.capacity?.seating || 4,
            image: t.images?.[0]?.url || "",
            url: `/transports/${t.slug}`,
            type: "transport",
        };
    });

    const formattedStates = (resultMap.states || []).map((s) => ({
        id: s._id,
        title: s.name,
        slug: s.slug,
        subtitle: "State / Region",
        image: s.image?.url || "",
        url: `/states/${s.slug}`,
        type: "state",
    }));

    const formattedActivities = (resultMap.activities || []).map((a) => ({
        id: a._id,
        title: a.title,
        slug: a.destination?.slug ? `${a.destination.slug}#${a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : "",
        subtitle: `${a.type ? a.type.charAt(0).toUpperCase() + a.type.slice(1) : "Activity"}${a.approxDuration ? ` • ${a.approxDuration}` : ""}`,
        image: a.image?.url || "",
        url: a.destination?.slug ? `/destinations/${a.destination.slug}` : "/activities",
        type: "activity",
    }));

    const combined = [
        ...formattedDestinations.slice(0, 3),
        ...formattedPackages.slice(0, 3),
        ...formattedHotels.slice(0, 3),
        ...formattedTransports.slice(0, 2),
        ...formattedStates.slice(0, 2),
        ...formattedActivities.slice(0, 2),
    ];

    return {
        results: {
            destinations: formattedDestinations,
            packages: formattedPackages,
            hotels: formattedHotels,
            transports: formattedTransports,
            states: formattedStates,
            activities: formattedActivities,
        },
        combined,
    };
};
