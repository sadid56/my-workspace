"use client";

import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMarkdownComponents } from "./MarkdownComponents";
import { TBlog } from "@/types/blog-types";
import { ArrowLeft, Hash } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import ShareArticle from "./ShareArticle";
import { TYPOGRAPHY } from "@/store/useConfigStore";
import Container from "@/components/global/Container";
import BlogFeedback from "./BlogFeedback";

const BlogDetails = ({ blog }: { blog: TBlog }) => {
  const markdownComponents = useMarkdownComponents();

  return (
    <Container className="pt-28 md:pt-36">
      <div className='mb-10'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-6'>
          <Link
            href={"/"}
            className='p-2 rounded-full hover:bg-theme-primary/10 text-muted-foreground hover:text-theme-primary transition-all duration-300'
          >
            <ArrowLeft className='h-6 w-6' />
          </Link>
          <h1 className={TYPOGRAPHY.title}>{blog.title}</h1>
        </div>

        <div className='flex items-center gap-3 mb-8 text-sm font-medium'>
          <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary'>
            <Hash className='h-3.5 w-3.5' />
            <span>{blog.category}</span>
          </div>
          <div className='h-1 w-1 rounded-full bg-muted-foreground/30' />
          <p className='text-muted-foreground'>Last updated: {format(new Date(blog.updatedAt), "MMMM dd, yyyy")}</p>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className='relative aspect-video w-full overflow-hidden rounded-3xl mb-8 shadow-2xl shadow-theme-primary/10 border border-theme-primary/10'>
            <Image
              fill
              src={blog.coverImage}
              alt={blog.title}
              className='object-cover hover:scale-105 transition-transform duration-700'
              priority
            />
          </div>
        )}

        {/* Tags & Sharing */}
        <div className='mb-10'>
          <ShareArticle title={blog.title} url={`/read/${blog.slug}`} />
        </div>

        {/* Description */}
        <div className={TYPOGRAPHY.description}>{blog.descriptions}</div>

        {/* Content */}
        <div className='prose prose-orange dark:prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0 mb-16'>
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {blog.content}
          </Markdown>
        </div>

        {/* Feedback Component (Client Component) */}
        <BlogFeedback blogId={blog.id} />
      </div>
    </Container>
  );
};

export default BlogDetails;
