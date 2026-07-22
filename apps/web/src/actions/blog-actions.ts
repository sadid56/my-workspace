"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const GetBlogs = async (category?: string, search?: string, page: number = 1, limit: number = 3) => {
  try {
    const url = new URL(`${API_URL}/api/blogs`);
    if (category) url.searchParams.append("category", category);
    if (search) url.searchParams.append("search", search);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return { blogs: [], totalCount: 0 };
    return res.json();
  } catch (error) {
    console.error("GetBlogs error:", error);
    return { blogs: [], totalCount: 0 };
  }
};

export async function GetAllBlogSlugs(): Promise<{ slug: string }[]> {
  try {
    const res = await fetch(`${API_URL}/api/blogs/slugs`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("GetAllBlogSlugs error:", error);
    return [];
  }
}

export const GetBlogDetails = async (slug: string) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs/slug/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("GetBlogDetails error:", error);
    return null;
  }
};

export const GetBlogDetailsMetaData = async (slug: string) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs/meta/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("GetBlogDetailsMetaData error:", error);
    return null;
  }
};

export const GetRecentBlog = async () => {
  try {
    const res = await fetch(`${API_URL}/api/blogs/recent`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("GetRecentBlog error:", error);
    return [];
  }
};

export const GetHomeCategory = async () => {
  try {
    const res = await fetch(`${API_URL}/api/categories`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("GetHomeCategory error:", error);
    return [];
  }
};
