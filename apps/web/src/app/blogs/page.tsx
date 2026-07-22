import { Metadata } from "next";
import BlogCards from "./_components/BlogCards";

export const revalidate = 600;

export const metadata: Metadata = {
  title: {
    default: "Sadid Coder — Modern software architecture",
    template: "%s | Sadid Coder Blog",
  },

  description:
    "Sadid Coder Blog shares practical tutorials, deep dives, and real-world insights on web development, Linux, and modern software architecture.",

  keywords: [
    "web development blog",
    "javascript tutorials",
    "react blog",
    "next.js blog",
    "frontend development",
    "backend engineering",
    "full stack development",
    "programming tutorials",
    "software engineering",
    "developer blog",
    "linux",
  ],

  authors: [{ name: "Sadid Coder" }],
  creator: "Sadid Coder",
  publisher: "Sadid Coder",

  metadataBase: new URL(process.env.BETTER_AUTH_URL || "http://localhost:3000"),

  openGraph: {
    title: "Sadid Coder Blog — Web Development & Engineering",
    description: "Practical tutorials and engineering insights on React, Next.js, JavaScript, backend systems, and modern web development.",
    url: process.env.BETTER_AUTH_URL,
    siteName: "Sadid Coder",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sadid Coder Blog — Web Development & Engineering",
    description: "Tutorials, guides, and real-world lessons on React, Next.js, JavaScript, and full-stack development.",
  },

  alternates: {
    canonical: process.env.BETTER_AUTH_URL,
  },

  robots: {
    index: true,
    follow: true,
  },
};

import { GetBlogs, GetHomeCategory } from "@/actions/blog-actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category || "";
  const search = resolvedSearchParams.search || "";
  const pageNum = Number(resolvedSearchParams.page) || 1;
  const limit = 3;

  const [data, categories] = await Promise.all([
    GetBlogs(category, search, pageNum, limit),
    GetHomeCategory(),
  ]);

  return (
    <BlogCards
      data={data}
      categories={categories}
      page={pageNum}
      limit={limit}
      currentCategory={category}
      currentSearch={search}
    />
  );
}
