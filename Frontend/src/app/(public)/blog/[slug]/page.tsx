import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogData } from "@/lib/data/blogDetailsData";
import BlogDetailClient from "./BlogDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogData(slug);
  if (!blog) {
    return { title: "Travel Blog | Make Your Own Voyage" };
  }
  return {
    title: `${blog.state} Complete Travel Guide | Make Your Own Voyage`,
    description: blog.subtitle,
  };
}

export default async function StateBlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogData(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
