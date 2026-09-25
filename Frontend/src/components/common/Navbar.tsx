"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcon";
import NavbarSearch from "./NavbarSearch";
import BrandLogo from "./BrandLogo";
import { Button } from "@/components/ui/Button";

const serviceDropdownItems = [
  {
    title: "Flight Booking",
    description: "Domestic & International commercial flights",
    href: "/flights",
    iconName: "flight_takeoff",
  },
  {
    title: "Hotel Booking",
    description: "Worldwide 4-star, 5-star luxury resorts & stays",
    href: "/hotels",
    iconName: "hotel",
  },
  {
    title: "Visa Assistance",
    description: "End-to-end documentation, slot booking & filing",
    href: "/visa",
    iconName: "assignment",
  },
  {
    title: "Holiday Packages",
    description: "Curated domestic & international tour packages",
    href: "/packages",
    iconName: "luggage",
  },
  {
    title: "Corporate Travel & Events",
    description: "MICE, Executive offsites, dealer meets & events",
    href: "/events",
    iconName: "corporate_fare",
  },
  {
    title: "Cabs & Transfers",
    description: "Airport pickups/drops, executive sedans & fleet",
    href: "/services/transport/cabs",
    iconName: "local_taxi",
  },
  {
    title: "Cruise Holidays (Water)",
    description: "Ocean liners, luxury stateroom voyages & cruises",
    href: "/services",
    iconName: "directions_boat",
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Services", href: "/services", isServices: true },
  { name: "Packages", href: "/packages" },
  { name: "Contact", href: "/contact-us" },
];

interface FlipTextProps {
  text: string;
  className?: string;
  flippedClassName?: string;
}

const FlipText: React.FC<FlipTextProps> = ({
  text,
  className = "",
  flippedClassName = "text-[#d4af37]",
}) => {
  return (
    <span className="relative inline-flex flex-col overflow-hidden h-[1.35em] leading-[1.35em] select-none align-middle">
      <span
        className={`inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full ${className}`}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-full left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full ${flippedClassName}`}
      >
        {text}
      </span>
    </span>
  );
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  const isHomepage = pathname === "/";

  // Buttery-smooth rAF-throttled scroll handler with hysteresis threshold
  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        const DELTA_THRESHOLD = 6; // Ignore micro-jitters

        // Header transparency state
        setIsScrolled(currentScrollY > 20);

        // Keep navbar visible if mobile dropdown is open
        if (isOpen) {
          setIsVisible(true);
          lastScrollY.current = currentScrollY;
          rafId.current = null;
          return;
        }

        // Always show near top
        if (currentScrollY <= 30) {
          setIsVisible(true);
        } else if (Math.abs(delta) > DELTA_THRESHOLD) {
          if (delta > 0 && currentScrollY > 70) {
            // Scrolling down -> Smoothly slide up & hide
            setIsVisible(false);
          } else if (delta < 0) {
            // Scrolling up -> Smoothly slide down & reveal
            setIsVisible(true);
          }
        }

        lastScrollY.current = currentScrollY;
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, [isOpen]);

  // Determine dynamic background classes (matching Footer #071324 luxury theme)
  const getHeaderBg = () => {
    return "bg-[#071324] border-b border-[#d4af37]/30 shadow-2xl";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transform will-change-transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${getHeaderBg()}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand Logo */}
          <BrandLogo theme="dark" onClick={() => setIsOpen(false)} />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.isServices) {
                return (
                  <div key={link.href} className="relative group/services py-5">
                    <Link
                      href={link.href}
                      className={`relative group px-3.5 py-2 text-sm font-medium transition-colors duration-200 bg-transparent flex items-center gap-1 ${
                        isActive
                          ? "text-[#d4af37]"
                          : "text-gray-200"
                      }`}
                    >
                      <FlipText text={link.name} flippedClassName="text-[#d4af37]" />
                      <MaterialIcon name="expand_more" size={14} className="transition-transform duration-200 group-hover/services:rotate-180" />

                      {/* Underline Stick */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#d4af37] transition-transform duration-300 ease-out origin-right group-hover:origin-left ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>

                    {/* White Luxury Dropdown Menu with #d4af37 Hover */}
                    <div className="absolute top-full -left-2 w-[320px] pt-2 opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-200 ease-out transform group-hover/services:translate-y-0 translate-y-2 z-50">
                      <div
                        style={{ backgroundColor: "#ffffff" }}
                        className="bg-white shadow-2xl border border-slate-200 p-2.5 overflow-hidden"
                      >
                        <div className="space-y-1">
                          {serviceDropdownItems.map((item) => {
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="flex items-center gap-3.5 p-2.5 transition-all duration-150 hover:bg-[#d4af37] group/item"
                              >
                                {/* Icon box */}
                                <div className="h-10 w-10 shrink-0 bg-[#0a192f] text-[#d4af37] flex items-center justify-center transition-all group-hover/item:bg-black group-hover/item:text-[#d4af37]">
                                  <MaterialIcon name={item.iconName} size={20} />
                                </div>

                                {/* Text content */}
                                <div className="flex flex-col min-w-0 flex-1">
                                  <span className="text-[13px] font-medium text-[#0a192f] group-hover/item:text-black transition-colors leading-tight">
                                    {item.title}
                                  </span>
                                  <span className="text-[11px] text-slate-500 group-hover/item:text-black/80 font-normal truncate leading-snug mt-0.5 transition-colors">
                                    {item.description}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative group px-3.5 py-2 text-sm font-medium transition-colors duration-200 bg-transparent ${
                    isActive
                      ? "text-[#d4af37]"
                      : "text-gray-200"
                  }`}
                >
                  <FlipText text={link.name} flippedClassName="text-[#d4af37]" />

                  {/* Underline Stick: Enters from Left on hover, Exits to Right on unhover */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#d4af37] transition-transform duration-300 ease-out origin-right group-hover:origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Global Search Autocomplete Bar */}
            <div className="w-56 xl:w-64">
              <NavbarSearch />
            </div>

            <Link href="/packages">
              <Button
                variant="primary"
                size="sm"
                className="group text-xs font-medium py-2.5 px-4 flex items-center gap-1.5 shadow-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                <FlipText text="Explore Trips" className="text-black" flippedClassName="text-black" />
                <MaterialIcon name="arrow_forward" size={16} className="transition-transform duration-300 group-hover:translate-x-1 text-black" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md border border-[#d4af37]/40 bg-transparent backdrop-blur-md text-[#d4af37] focus:outline-none"
            >
              {isOpen ? <MaterialIcon name="close" size={24} /> : <MaterialIcon name="menu" size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#d4af37]/30 bg-[#071324] backdrop-blur-xl py-4 px-2 space-y-3 max-h-[80vh] overflow-y-auto">
            {/* Mobile Search Bar */}
            <div className="px-2 pb-2">
              <NavbarSearch />
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                if (link.isServices) {
                  return (
                    <div key={link.href} className="flex flex-col">
                      <div className="flex items-center justify-between px-4 py-2.5">
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`group text-sm font-medium ${
                            isActive ? "text-[#d4af37]" : "text-gray-200"
                          }`}
                        >
                          <FlipText text={link.name} flippedClassName="text-[#d4af37]" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="p-1 text-[#d4af37]"
                        >
                          <MaterialIcon
                            name="expand_more"
                            size={16}
                            className={`transition-transform ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {mobileServicesOpen && (
                        <div className="ml-4 pl-2 border-l border-[#d4af37]/30 space-y-1 py-1">
                          {serviceDropdownItems.map((item) => {
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-normal text-gray-300 hover:text-[#d4af37]"
                              >
                                <MaterialIcon name={item.iconName} className="text-[#d4af37]" size={16} />
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group px-4 py-2.5 text-sm font-medium transition-colors border-l-2 bg-transparent ${
                      isActive
                        ? "border-[#d4af37] text-[#d4af37]"
                        : "border-transparent text-gray-200"
                    }`}
                  >
                    <FlipText text={link.name} flippedClassName="text-[#d4af37]" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 px-2">
              <Link href="/packages" onClick={() => setIsOpen(false)}>
                <Button
                  variant="primary"
                  size="md"
                  className="group w-full text-xs font-medium py-3 flex items-center justify-center gap-2 overflow-hidden"
                >
                  <MaterialIcon name="travel_explore" size={16} className="text-black" />
                  <FlipText text="Explore Tour Packages" className="text-black" flippedClassName="text-black" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;