"use client";

import React, { useRef } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface DestinationBlog {
  id: number;
  state: string;
  title: string;
  excerpt: string;
  location: string;
  rating: number;
  reviewCount: number;
  tag: string;
  slug: string;
  stateSlug: string;
  gradient: string;
  photosCount: number;
  iconName: string;
}

const blogs: DestinationBlog[] = [
  {
    id: 1,
    state: "Himachal Pradesh",
    title: "Himachal Pradesh Valley & Snow Trails",
    excerpt:
      "Experience snow-capped peaks, pine valleys, colonial retreats in Shimla, and thrilling adventure in Manali & Spiti.",
    location: "Manali, Shimla, Dharamshala, Spiti",
    rating: 4.9,
    reviewCount: 48,
    tag: "Featured",
    slug: "himachal-pradesh-blog",
    stateSlug: "himachal-pradesh",
    gradient: "from-blue-900 via-indigo-950 to-slate-900",
    photosCount: 24,
    iconName: "terrain",
  },
  {
    id: 2,
    state: "Jammu Kashmir",
    title: "Jammu & Kashmir Heavenly Paradise",
    excerpt:
      "Glide on Dal Lake in traditional Shikaras, explore snowfields of Gulmarg, and uncover lush meadows of Pahalgam.",
    location: "Srinagar, Gulmarg, Pahalgam, Sonmarg",
    rating: 4.9,
    reviewCount: 56,
    tag: "Top Rated",
    slug: "jammu-kashmir-blog",
    stateSlug: "jammu-and-kashmir",
    gradient: "from-teal-950 via-cyan-950 to-slate-900",
    photosCount: 32,
    iconName: "kayaking",
  },
  {
    id: 3,
    state: "Uttarakhand",
    title: "Uttarakhand Sacred Valleys & Yoga",
    excerpt:
      "Immerse in spiritual river ghats of Rishikesh, tranquil lakes of Nainital, and panoramic Himalayan vistas in Mussoorie.",
    location: "Rishikesh, Nainital, Mussoorie, Auli",
    rating: 4.8,
    reviewCount: 42,
    tag: "Featured",
    slug: "uttarakhand-blog",
    stateSlug: "uttarakhand",
    gradient: "from-emerald-950 via-teal-950 to-slate-900",
    photosCount: 18,
    iconName: "self_improvement",
  },
  {
    id: 4,
    state: "Uttar Pradesh",
    title: "Uttar Pradesh Heritage & Sacred Ghats",
    excerpt:
      "Marvel at the timeless Taj Mahal in Agra, divine Ganga Aarti in Varanasi, and royal Awadhi culinary heritage in Lucknow.",
    location: "Varanasi, Agra, Ayodhya, Lucknow",
    rating: 4.7,
    reviewCount: 39,
    tag: "Popular",
    slug: "uttar-pradesh-blog",
    stateSlug: "uttar-pradesh",
    gradient: "from-amber-950 via-orange-950 to-slate-900",
    photosCount: 22,
    iconName: "temple_hindu",
  },
  {
    id: 5,
    state: "Rajasthan",
    title: "Royal Rajasthan Forts & Desert Safaris",
    excerpt:
      "Step into majestic palaces of Jaipur, golden dunes of Jaisalmer, and romantic lakeside royal Havelis of Udaipur.",
    location: "Jaipur, Udaipur, Jaisalmer, Jodhpur",
    rating: 4.9,
    reviewCount: 64,
    tag: "Featured",
    slug: "rajasthan-blog",
    stateSlug: "rajasthan",
    gradient: "from-yellow-950 via-amber-950 to-slate-900",
    photosCount: 40,
    iconName: "castle",
  },
];

const TravelBlog = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 340;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.15] text-[#d4af37] font-serif tracking-tight">
            Most Favorite Tour Places
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted font-normal">
            Handcrafted travel guides and destination highlights across India&apos;s most iconic states.
          </p>
        </div>

        {/* 5 Destination Cards Carousel */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="how-card-rounded group relative flex w-[300px] sm:w-[330px] md:w-[350px] shrink-0 flex-col justify-between overflow-hidden border border-border/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl select-none"
              >
                {/* Top Visual Banner with Badges */}
                <div className="relative">
                  <div
                    className={`relative flex h-48 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${blog.gradient} p-4`}
                  >
                    {/* Google Material Center Icon */}
                    <div className="text-primary/70 transition-transform duration-500 group-hover:scale-110">
                      <MaterialIcon name={blog.iconName} size={48} />
                    </div>

                    {/* Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Top Left Tag */}
                    <span className="how-badge-circle absolute left-3.5 top-3.5 bg-[#0a192f]/90 border border-primary/40 px-3 py-1 text-[11px] font-semibold text-primary shadow-xs">
                      {blog.tag}
                    </span>

                    {/* Top Right Heart/Bookmark Button */}
                    <button
                      type="button"
                      aria-label="Save to favorites"
                      className="how-badge-circle absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center bg-black/40 text-white/90 backdrop-blur-xs transition hover:scale-110 hover:bg-primary hover:text-white"
                    >
                      <MaterialIcon name="favorite" size={16} />
                    </button>

                    {/* State Name Overlay */}
                    <span className="absolute bottom-2.5 left-4 text-xs font-semibold text-white/95 tracking-wide uppercase">
                      {blog.state}
                    </span>
                  </div>
                </div>

                {/* Middle Content */}
                <div className="p-5">
                  {/* Title */}
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="text-lg font-bold leading-snug text-heading font-serif transition-colors hover:text-primary">
                      {blog.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2 font-normal">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Bottom Styled Card Box */}
                <div className="border-t border-border/70 bg-[#faf6ed] p-4 text-xs">
                  {/* Rating Line */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary font-semibold">
                      <MaterialIcon name="star" size={15} fill className="text-primary" />
                      <span className="text-heading font-bold">{blog.rating}</span>
                      <span className="text-muted font-normal">({blog.reviewCount} Reviews)</span>
                    </div>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-primary transition hover:text-primary-hover"
                    >
                      <span>Read Guide</span>
                      <MaterialIcon name="arrow_forward" size={14} />
                    </Link>
                  </div>

                  {/* Location with Pin */}
                  <div className="mt-2.5 flex items-center gap-1 text-muted truncate border-t border-border/50 pt-2">
                    <MaterialIcon name="location_on" size={15} className="text-primary shrink-0" />
                    <span className="truncate">{blog.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Navigation & View All States Link */}
        <div className="mt-8 flex items-center justify-between">
          {/* Slider Arrow Buttons with Google Icons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="dest-circle-btn flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading shadow-xs transition hover:border-primary hover:bg-primary hover:text-white active:scale-95"
              aria-label="Previous destination"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="dest-circle-btn flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading shadow-xs transition hover:border-primary hover:bg-primary hover:text-white active:scale-95"
              aria-label="Next destination"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <Link
            href="/blog/states"
            className="inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-hover"
          >
            <span>View All States</span>
            <MaterialIcon name="arrow_forward" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelBlog;