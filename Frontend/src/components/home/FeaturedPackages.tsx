"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

const featuredPackages = [
  {
    id: 1,
    title: "Goa Luxury Beachside & Yacht Escape",
    location: "Goa, India",
    duration: "5 Days / 4 Nights",
    price: "₹14,999",
    oldPrice: "₹19,999",
    discount: "25% OFF",
    rating: "4.8",
    reviews: "124",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    slug: "goa-premium-escape",
    type: "Beach & Leisure",
  },
  {
    id: 2,
    title: "Manali Snow Valley & Rohtang Expedition",
    location: "Manali, Himachal Pradesh",
    duration: "6 Days / 5 Nights",
    price: "₹17,999",
    oldPrice: "₹22,999",
    discount: "22% OFF",
    rating: "4.9",
    reviews: "98",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    slug: "manali-snow-adventure",
    type: "Mountain & Adventure",
  },
  {
    id: 3,
    title: "Kashmir Paradise: Srinagar, Gulmarg & Pahalgam",
    location: "Srinagar, Kashmir",
    duration: "7 Days / 6 Nights",
    price: "₹24,999",
    oldPrice: "₹31,999",
    discount: "21% OFF",
    rating: "4.9",
    reviews: "156",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop",
    slug: "kashmir-paradise",
    type: "Honeymoon & Luxury",
  },
  {
    id: 4,
    title: "Jaipur & Udaipur Royal Rajputana Heritage",
    location: "Rajasthan, India",
    duration: "6 Days / 5 Nights",
    price: "₹21,500",
    oldPrice: "₹28,000",
    discount: "23% OFF",
    rating: "4.8",
    reviews: "87",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
    slug: "rajasthan-royal-heritage",
    type: "Heritage & Culture",
  },
];

export const FeaturedPackages: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0a192f] text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-3">
              <MaterialIcon name="auto_awesome" size={14} />
              Handpicked Luxury
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#0a192f]">
              Featured <span className="text-[#d4af37]">Tour Packages</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light max-w-2xl">
              All-inclusive curated itineraries with 4/5-star verified stays, private cab transfers, and certified local guides.
            </p>
          </div>

          {/* Slider Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="p-3 border border-gray-300 bg-white text-[#0a192f] hover:border-[#d4af37] hover:bg-[#0a192f] hover:text-[#d4af37] transition-all"
            >
              <MaterialIcon name="chevron_left" size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next"
              className="p-3 border border-gray-300 bg-white text-[#0a192f] hover:border-[#d4af37] hover:bg-[#0a192f] hover:text-[#d4af37] transition-all"
            >
              <MaterialIcon name="chevron_right" size={20} />
            </button>
          </div>
        </div>

        {/* Packages Horizontal Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="group min-w-[300px] max-w-[300px] sm:min-w-[380px] sm:max-w-[380px] shrink-0 border-2 border-gray-200 bg-white shadow-sm hover:border-[#d4af37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Banner with Duration & Discount Badges */}
              <Link href={`/packages/${pkg.slug}`} className="block relative h-60 overflow-hidden bg-gray-900">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 bg-[#d4af37] text-[#0a192f] text-[10px] font-black uppercase tracking-wider px-2.5 py-1">
                  {pkg.discount}
                </div>

                <div className="absolute top-3 right-3 bg-[#0a192f]/90 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                  {pkg.type}
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
                  <MaterialIcon name="schedule" size={14} className="text-[#d4af37]" />
                  <span>{pkg.duration}</span>
                </div>
              </Link>

              {/* Package Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1 font-medium text-gray-600">
                      <MaterialIcon name="location_on" size={14} className="text-[#d4af37]" />
                      {pkg.location}
                    </span>
                    <div className="flex items-center gap-1 bg-[#0a192f] text-[#d4af37] text-[10px] font-bold px-1.5 py-0.5">
                      <MaterialIcon name="star" size={12} fill className="text-[#d4af37]" />
                      {pkg.rating} ({pkg.reviews})
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-[#0a192f] line-clamp-1 group-hover:text-[#d4af37] transition-colors mb-2">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-4 pb-3 border-b border-gray-100">
                    <span className="flex items-center gap-1 text-green-700 font-medium">
                      <MaterialIcon name="check_circle" size={12} /> Stays Included
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-green-700 font-medium">
                      <MaterialIcon name="check_circle" size={12} /> Sightseeing Cabs
                    </span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Starting from</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-[#0a192f]">{pkg.price}</span>
                      <span className="text-xs text-gray-400 line-through">{pkg.oldPrice}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block">per person on twin sharing</span>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="inline-flex items-center gap-1.5 bg-[#d4af37] text-[#0a192f] hover:bg-[#c49f27] px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span>View Details</span>
                    <MaterialIcon name="arrow_forward" size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-8 text-center sm:text-right">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0a192f] hover:text-[#d4af37] transition-colors"
          >
            <span>Explore All 500+ Tour Packages</span>
            <MaterialIcon name="arrow_forward" size={16} className="text-[#d4af37]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;