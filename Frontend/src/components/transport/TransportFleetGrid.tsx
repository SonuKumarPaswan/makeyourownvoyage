import React from "react";
import Link from "next/link";
import Image from "next/image";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { Transport, TransportCategory } from "@/types/transport";

interface TransportFleetGridProps {
  items: Transport[];
  category: TransportCategory;
  heading: string;
  subheading: string;
}

export default function TransportFleetGrid({
  items,
  category,
  heading,
  subheading,
}: TransportFleetGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="border-b border-[#e8e3d9] pb-4">
        <h2 className="text-2xl font-bold text-[#0a192f]">{heading}</h2>
        <p className="text-sm text-slate-600">{subheading}</p>
      </div>

      {items.length === 0 ? (
        <div className="my-12 border border-dashed border-[#e8e3d9] bg-white p-12 text-center">
          <h3 className="text-lg font-bold text-[#0a192f]">Book {category} Rental Online</h3>
          <p className="mt-1 text-xs text-slate-500">
            Custom chauffeur and self-drive options available across all major tourist corridors.
          </p>
          <Link
            href={`/enquiry?enquiryType=custom_trip&notes=${encodeURIComponent(category + " Rental")}`}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0a192f]"
          >
            <MaterialIcon name="call" size={16} /> Request {category} Booking Quote
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item._id}
              className="group flex flex-col border border-[#e8e3d9] bg-white shadow-sm transition-all hover:border-[#d4af37] hover:shadow-xl"
            >
              <div className="relative h-48 w-full bg-slate-100">
                <Image
                  src={item.images?.[0]?.url || "/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0a192f] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30">
                  {item.vehicleType}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-[#0a192f]">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">{item.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-2 border border-[#e8e3d9] bg-[#faf8f5] p-3 text-xs text-slate-700">
                  {item.capacity?.seating && (
                    <span className="flex items-center gap-1.5">
                      <MaterialIcon name="group" size={14} className="text-[#d4af37]" /> {item.capacity.seating} Seats
                    </span>
                  )}
                  {item.capacity?.luggageBags !== undefined && (
                    <span className="flex items-center gap-1.5">
                      <MaterialIcon name="luggage" size={14} className="text-[#d4af37]" /> {item.capacity.luggageBags} Bags
                    </span>
                  )}
                  {item.specifications?.fuelType && (
                    <span className="flex items-center gap-1.5">
                      <MaterialIcon name="local_gas_station" size={14} className="text-[#d4af37]" /> {item.specifications.fuelType}
                    </span>
                  )}
                  {item.specifications?.helmetProvidedCount !== undefined && (
                    <span className="flex items-center gap-1.5">
                      Helmets: {item.specifications.helmetProvidedCount}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Rate starting</span>
                    <p className="text-base font-extrabold text-[#0a192f]">
                      {item.pricing?.perKmRate
                        ? `₹${item.pricing.perKmRate}/km`
                        : item.pricing?.perDayRate
                          ? `₹${item.pricing.perDayRate}/day`
                          : "On Request"}
                    </p>
                  </div>
                  <Link
                    href={`/enquiry?enquiryType=custom_trip&vehicle=${encodeURIComponent(item.title)}`}
                    className="bg-gradient-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0a192f]"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
