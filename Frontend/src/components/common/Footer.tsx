import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-heading text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              
                <Image
                  src="/logo.png"
                  alt="Make Your Own Voyage"
                  width={130}
                  height={50}
                  priority
                  className="h-14 w-auto object-contain rounded-full"
                />
             

              <div>
                <p className="text-lg font-bold leading-tight">Make Your Own</p>
                <p className="text-sm font-semibold text-secondary text-center">-------Voyage-------</p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Your trusted travel partner for flights, hotels, cabs and
              unforgettable holiday packages. Plan your journey your way.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <SocialLink href="#" label="Facebook">
                f
              </SocialLink>

              <SocialLink href="#" label="Instagram">
                ◎
              </SocialLink>

              <SocialLink href="#" label="Twitter">
                𝕏
              </SocialLink>

              <SocialLink href="#" label="LinkedIn">
                in
              </SocialLink>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/blog">Travel Blog</FooterLink>
              <FooterLink href="/destinations">Destinations</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h3>

            <ul className="mt-5 space-y-3">
              <FooterLink href="/flights">Flights</FooterLink>
              <FooterLink href="/hotels">Hotels</FooterLink>
              <FooterLink href="/cabs">Cabs</FooterLink>
              <FooterLink href="/packages">Tour Packages</FooterLink>
              <FooterLink href="/packages">Holiday Packages</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h3>

            <ul className="mt-5 space-y-3">
              <FooterLink href="/faq">FAQs</FooterLink>
              <FooterLink href="/contact">Help Center</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cancellation">Cancellation Policy</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Stay Updated
            </h3>

            <p className="mt-5 text-sm leading-6 text-white/60">
              Get travel deals, offers and destination inspiration in your
              inbox.
            </p>

            <form className="mt-4">
              <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-white/40"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex w-12 shrink-0 items-center justify-center bg-primary text-white transition hover:bg-primary-hover"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 12 14-7-4 14-3-6-7-1Z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <ContactItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z"
                />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            }
            title="Our Location"
            value="India"
          />

          <ContactItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4h16v16H4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4 6 8 6 8-6"
                />
              </svg>
            }
            title="Email Us"
            value="support@makeyourownvoyage.com"
          />

          <ContactItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1C10.7 20 4 13.3 4 5a1 1 0 0 1 1-1Z"
                />
              </svg>
            }
            title="Call Us"
            value="+91 00000 00000"
          />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center sm:flex-row sm:text-left lg:px-8">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Make Your Own Voyage. All rights
            reserved.
          </p>

          <p className="text-sm text-white/50">
            Made for travelers, by travelers ✈️
          </p>
        </div>
      </div>
    </footer>
  );
};

/* Footer Link */
const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/60 transition hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
};

/* Social Link */
const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm font-bold text-white/70 transition hover:border-primary hover:bg-primary hover:text-white"
    >
      {children}
    </a>
  );
};

/* Contact Item */
const ContactItem = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-secondary">
        {icon}
      </div>

      <div>
        <p className="text-xs text-white/40">{title}</p>
        <p className="mt-0.5 text-sm font-medium text-white/75">{value}</p>
      </div>
    </div>
  );
};

export default Footer;
