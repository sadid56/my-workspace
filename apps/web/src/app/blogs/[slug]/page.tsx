import { GetAllBlogSlugs } from "@/actions/blog-actions";
import BlogDetails from "../_components/BlogDetails";
import { notFound } from "next/navigation";
import { TBlog } from "@/types/blog-types";
import { getBlog, getBlogMeta } from "@/actions/cached-data";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const slugs = await GetAllBlogSlugs();
    return slugs.map((s) => ({
      slug: s.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogMeta(slug);

  if (!blog) {
    notFound();
  }

  return {
    title: blog.title,
    description: blog.descriptions?.slice(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.descriptions,
      url: `/read/${blog.slug}`,
      type: "article",
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    alternates: {
      canonical: `/read/${blog.slug}`,
    },
  };
}

const BlogReadPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const blog: TBlog | null = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetails blog={blog} />;
};

export default BlogReadPage;
