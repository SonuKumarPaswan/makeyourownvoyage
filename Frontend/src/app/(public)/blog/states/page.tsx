import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

export const metadata: Metadata = {
  title: "Explore All States | Travel Blog & Destination Guides | Make Your Own Voyage",
  description:
    "Comprehensive travel guides and destination spotlights for Himachal Pradesh, Jammu & Kashmir, Uttarakhand, Uttar Pradesh, and Rajasthan.",
};

interface StateGuide {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capital: string;
  bestTime: string;
  popularPlaces: string[];
  gradient: string;
  iconName: string;
  slug: string;
  rating: number;
  reviews: number;
  photosCount: number;
}

const STATES_DATA: StateGuide[] = [
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    tagline: "Land of Snow-Capped Peaks & Scenic Valleys",
    description:
      "Nestled in the western Himalayas, Himachal Pradesh is celebrated for picturesque hill stations, apple orchards, thrilling high-altitude passes in Spiti, and serene colonial charms in Shimla and Manali.",
    capital: "Shimla (Summer), Dharamshala (Winter)",
    bestTime: "March - June & Oct - Feb",
    popularPlaces: ["Manali", "Shimla", "Dharamshala", "Spiti Valley", "Kasol", "Dalhousie"],
    gradient: "from-blue-900 via-indigo-950 to-slate-900",
    iconName: "terrain",
    rating: 4.9,
    reviews: 148,
    photosCount: 64,
  },
  {
    id: "jammu-and-kashmir",
    name: "Jammu & Kashmir",
    slug: "jammu-and-kashmir",
    tagline: "Paradise on Earth & Tranquil Houseboats",
    description:
      "Famed worldwide for its breathtaking natural beauty, pristine Dal Lake in Srinagar, world-class ski slopes in Gulmarg, and lush green meadows in Pahalgam, Kashmir offers an unmatched romantic escape.",
    capital: "Srinagar (Summer), Jammu (Winter)",
    bestTime: "April - October & Dec - Feb (Snow)",
    popularPlaces: ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg", "Patnitop", "Doodhpathri"],
    gradient: "from-teal-950 via-cyan-950 to-slate-900",
    iconName: "kayaking",
    rating: 4.9,
    reviews: 182,
    photosCount: 80,
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    slug: "uttarakhand",
    tagline: "Devbhoomi • Land of the Gods & Holy Rivers",
    description:
      "A sacred Himalayan state renowned for sacred pilgrimage sites, yoga and river rafting in Rishikesh, serene lakes in Nainital, and panoramic mountain ranges in Mussoorie and Auli.",
    capital: "Dehradun (Winter), Gairsain (Summer)",
    bestTime: "March - June & Sept - Nov",
    popularPlaces: ["Rishikesh", "Nainital", "Mussoorie", "Auli", "Haridwar", "Jim Corbett"],
    gradient: "from-emerald-950 via-teal-950 to-slate-900",
    iconName: "self_improvement",
    rating: 4.8,
    reviews: 126,
    photosCount: 52,
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    tagline: "Heartland of Timeless Heritage & Spirituality",
    description:
      "Home to the iconic Taj Mahal in Agra, sacred ghats and Ganga Aarti in Varanasi, holy shrines in Ayodhya & Mathura, and rich Awadhi royal gastronomy in Lucknow.",
    capital: "Lucknow",
    bestTime: "October - March",
    popularPlaces: ["Varanasi", "Agra", "Ayodhya", "Lucknow", "Mathura", "Prayagraj"],
    gradient: "from-amber-950 via-orange-950 to-slate-900",
    iconName: "temple_hindu",
    rating: 4.7,
    reviews: 114,
    photosCount: 48,
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    slug: "rajasthan",
    tagline: "Land of Royal Maharajas, Forts & Desert Dunes",
    description:
      "Step into a world of majestic hilltop forts, grand royal palaces, vibrant bazaars, camel desert safaris in Jaisalmer, and romantic lakeside Havelis in Udaipur.",
    capital: "Jaipur",
    bestTime: "October - March",
    popularPlaces: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar", "Mount Abu"],
    gradient: "from-yellow-950 via-amber-950 to-slate-900",
    iconName: "castle",
    rating: 4.9,
    reviews: 210,
    photosCount: 92,
  },
];

export default function BlogStatesPage() {
  return (
    <div className="min-h-screen bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <Link href="/blog/states" className="hover:text-primary transition">Blog</Link>
          <span>/</span>
          <span className="text-heading font-semibold">Featured States</span>
        </nav>

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#d4af37] font-serif tracking-tight">
            Explore India&apos;s Top 5 States
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted font-normal leading-relaxed">
            Discover detailed guides, iconic attractions, and travel itineraries across Himachal Pradesh, Jammu & Kashmir, Uttarakhand, Uttar Pradesh, and Rajasthan.
          </p>
        </div>

        {/* 5 States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STATES_DATA.map((state) => (
            <article
              key={state.id}
              className="how-card-rounded group flex flex-col justify-between overflow-hidden border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl"
            >
              <div>
                {/* Visual Banner */}
                <div
                  className={`relative flex h-52 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${state.gradient} p-4`}
                >
                  <div className="text-primary/70 transition-transform duration-500 group-hover:scale-110">
                    <MaterialIcon name={state.iconName} size={54} />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* State Name & Tagline Banner */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="block text-lg font-bold text-white font-serif tracking-wide">
                      {state.name}
                    </span>
                    <span className="block text-xs text-white/80 font-normal">
                      {state.tagline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating & Review */}
                  <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mb-3">
                    <MaterialIcon name="star" size={15} fill className="text-primary" />
                    <span className="text-heading font-bold">{state.rating}</span>
                    <span className="text-muted font-normal">({state.reviews} reviews)</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal line-clamp-3">
                    {state.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {state.popularPlaces.slice(0, 4).map((place) => (
                      <span
                        key={place}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                      >
                        {place}
                      </span>
                    ))}
                  </div>

                  {/* Best Time */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-muted border-t border-border/50 pt-3">
                    <MaterialIcon name="calendar_today" size={14} className="text-primary" />
                    <span>Best Time: {state.bestTime}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="border-t border-border/70 bg-[#faf6ed] p-4 text-center">
                <Link
                  href={`/blog/${state.slug === "jammu-and-kashmir" ? "jammu-kashmir" : state.slug}-blog`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0a192f] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-primary hover:text-heading"
                >
                  <span>Read Complete {state.name} Travel Guide</span>
                  <MaterialIcon name="arrow_forward" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
