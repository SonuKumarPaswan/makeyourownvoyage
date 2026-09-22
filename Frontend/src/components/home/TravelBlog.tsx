import React from "react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "10 Best Places to Visit in India in 2026",
    excerpt:
      "Discover beautiful destinations, hidden gems and unforgettable experiences for your next trip across India.",
    category: "Travel Guide",
    date: "Sep 15, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
    slug: "best-places-to-visit-in-india-2026",
  },
  {
    id: 2,
    title: "Complete Guide to Planning a Goa Trip",
    excerpt:
      "From beaches and activities to hotels and local experiences, here's everything you need for a memorable Goa holiday.",
    category: "Destination Guide",
    date: "Sep 10, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    slug: "complete-goa-travel-guide",
  },
  {
    id: 3,
    title: "How to Plan a Budget-Friendly Vacation",
    excerpt:
      "Learn practical tips to save money on flights, hotels and packages while still enjoying a great travel experience.",
    category: "Travel Tips",
    date: "Sep 05, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
    slug: "budget-friendly-vacation-tips",
  },
];

const TravelBlog = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Travel Inspiration
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Travel Stories & Tips
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Get travel inspiration, destination guides and useful tips to
              make your next journey even better.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary transition hover:text-primary-hover"
          >
            View All Articles
            <span>→</span>
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <Link href={`/blog/${blog.slug}`}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Category */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span>{blog.date}</span>

                  <span className="h-1 w-1 rounded-full bg-border" />

                  <span>{blog.readTime}</span>
                </div>

                {/* Title */}
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="mt-3 text-xl font-bold leading-7 text-heading transition group-hover:text-primary">
                    {blog.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
                  {blog.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-primary-hover"
                >
                  Read Article

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-6-6 6 6-6 6"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted">
            Looking for more travel inspiration?
          </p>

          <Link
            href="/blog"
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Explore Travel Blog

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
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelBlog;