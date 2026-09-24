"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  Compass,
  Plane,
  Building2,
  FileCheck,
  Palmtree,
  Briefcase,
  Car,
  Ship,
  ChevronDown,
} from "lucide-react";
import NavbarSearch from "./NavbarSearch";
import BrandLogo from "./BrandLogo";
import { Button } from "@/components/ui/Button";

const serviceDropdownItems = [
  {
    title: "Flight Booking",
    description: "Domestic & International commercial flights",
    href: "/flights",
    icon: Plane,
  },
  {
    title: "Hotel Booking",
    description: "Worldwide 4-star, 5-star luxury resorts & stays",
    href: "/hotels",
    icon: Building2,
  },
  {
    title: "Visa Assistance",
    description: "End-to-end documentation, slot booking & filing",
    href: "/visa",
    icon: FileCheck,
  },
  {
    title: "Holiday Packages",
    description: "Curated domestic & international tour packages",
    href: "/packages",
    icon: Palmtree,
  },
  {
    title: "Corporate Travel & Events",
    description: "MICE, Executive offsites, dealer meets & events",
    href: "/events",
    icon: Briefcase,
  },
  {
    title: "Cabs & Transfers",
    description: "Airport pickups/drops, executive sedans & fleet",
    href: "/services/transport/cabs",
    icon: Car,
  },
  {
    title: "Cruise Holidays (Water)",
    description: "Ocean liners, luxury stateroom voyages & cruises",
    href: "/services",
    icon: Ship,
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Services", href: "/services", isServices: true },
  { name: "Packages", href: "/packages" },
  { name: "Contact", href: "/contact-us" },
];

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

  // Determine dynamic background classes
  const getHeaderBg = () => {
    if (isOpen) {
      return "bg-[#0a192f] border-b border-[#d4af37]/30 shadow-2xl";
    }

    if (isHomepage) {
      if (!isScrolled) {
        // Transparent hero overlay with subtle blur filter
        return "bg-[#0a192f]/20 backdrop-blur-md border-b border-white/10 shadow-sm";
      }
      // Scrolled state on homepage
      return "bg-[#0a192f]/85 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-2xl";
    }

    // Other pages
    if (!isScrolled) {
      return "bg-[#0a192f]/75 backdrop-blur-md border-b border-[#d4af37]/25 shadow-md";
    }
    return "bg-[#0a192f]/90 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-2xl";
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
                      className={`relative group px-3 py-2 text-xs uppercase tracking-widest font-semibold transition-colors duration-200 bg-transparent flex items-center gap-1 ${
                        isActive
                          ? "text-[#d4af37]"
                          : "text-gray-200 hover:text-[#d4af37]"
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/services:rotate-180" />

                      {/* Underline Stick */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#d4af37] transition-transform duration-300 ease-out origin-right group-hover:origin-left ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>

                    {/* White Luxury Dropdown Menu */}
                    <div className="absolute top-full -left-4 w-[380px] pt-2 opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-200 ease-out transform group-hover/services:translate-y-0 translate-y-2 z-50">
                      <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-2.5 overflow-hidden">
                        <div className="space-y-1">
                          {serviceDropdownItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="flex items-center gap-3.5 p-2.5 rounded-lg transition-all duration-150 hover:bg-slate-50 group/item"
                              >
                                {/* Icon box */}
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-[#0a192f]/5 border border-[#d4af37]/30 text-[#b89228] flex items-center justify-center group-hover/item:bg-[#0a192f] group-hover/item:text-[#d4af37] group-hover/item:border-[#d4af37] transition-all">
                                  <IconComponent className="w-5 h-5" />
                                </div>

                                {/* Text content */}
                                <div className="flex flex-col min-w-0 flex-1">
                                  <span className="text-[13px] font-bold text-[#0a192f] group-hover/item:text-[#b89228] transition-colors leading-tight">
                                    {item.title}
                                  </span>
                                  <span className="text-[11px] text-slate-500 truncate leading-snug mt-0.5">
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
                  className={`relative group px-3 py-2 text-xs uppercase tracking-widest font-semibold transition-colors duration-200 bg-transparent ${
                    isActive
                      ? "text-[#d4af37]"
                      : "text-gray-200 hover:text-[#d4af37]"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* Underline Stick: Enters from Left on hover, Exits to Right on unhover */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#d4af37] transition-transform duration-300 ease-out origin-right group-hover:origin-left ${
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
                className="uppercase tracking-widest text-[11px] font-bold py-2.5 px-4 flex items-center gap-1.5 shadow-md"
              >
                Explore Trips
                <ArrowRight className="w-3.5 h-3.5" />
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
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#d4af37]/30 bg-[#0a192f]/95 backdrop-blur-xl py-4 px-2 space-y-3 max-h-[80vh] overflow-y-auto">
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
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isActive ? "text-[#d4af37]" : "text-gray-200"
                          }`}
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="p-1 text-[#d4af37]"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {mobileServicesOpen && (
                        <div className="ml-4 pl-2 border-l border-[#d4af37]/30 space-y-1 py-1">
                          {serviceDropdownItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-[#d4af37]"
                              >
                                <IconComponent className="w-4 h-4 text-[#d4af37]" />
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
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-l-2 bg-transparent ${
                      isActive
                        ? "border-[#d4af37] text-[#d4af37]"
                        : "border-transparent text-gray-200 hover:text-[#d4af37]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 px-2">
              <Link href="/packages" onClick={() => setIsOpen(false)}>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full uppercase tracking-widest text-xs font-bold py-3 flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  Explore Tour Packages
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