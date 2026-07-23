"use client";

import { useState, useEffect } from "react";
import { NoData } from "@/components/ui/no-data";
import BlogCardHorizontal from "./BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { cn } from "@/lib/utils";
import Container from "@/components/global/Container";
import Dropdown from "@/components/ui/Dropdown";
import { useConfigStore } from "@/store/useConfigStore";

interface BlogCardsProps {
  data: {
    blogs: any[];
    totalCount: number;
  };
  categories: any[];
  page: number;
  limit: number;
  currentCategory: string;
  currentSearch: string;
}

const BlogCards = ({
  data,
  categories,
  page,
  limit,
  currentCategory,
  currentSearch,
}: BlogCardsProps) => {
  const [, setSearchQuery] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false, scroll: false })
  );
  const [, setSelectedCategory] = useQueryState(
    "category",
    parseAsString.withDefault("").withOptions({ shallow: false, scroll: false })
  );
  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false, scroll: false })
  );

  const [searchVal, setSearchVal] = useState(currentSearch);

  const { blogLayout, _hasHydrated } = useConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const layout = mounted && _hasHydrated ? blogLayout : "horizontal";

  useEffect(() => {
    setSearchVal(currentSearch);
  }, [currentSearch]);

  // Debounced search query URL updates
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchVal !== currentSearch) {
        setSearchQuery(searchVal || null);
        setPage(1); 
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchVal, currentSearch, setSearchQuery, setPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat || null);
    setPage(1); 
  };

  const blogs = data?.blogs || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container className="pt-28 md:pt-36">
      <div className='space-y-6 pb-10'>
        {/* Search and Category Select Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white focus:outline-none focus:border-theme-primary transition-all placeholder:text-neutral-400"
            />
          </div>
          <Dropdown
            options={[
              { value: "", label: "All Categories" },
              ...categories.map((cat: any) => ({
                value: cat.slug,
                label: cat.title,
              })),
            ]}
            value={currentCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {blogs.length === 0 ? (
          <NoData
            title="Can't find any blog!"
            description="We can't find any blogs with our queries please try another search or filter."
          />
        ) : (
          <>
             <div className={cn(
              layout === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            )}>
              {blogs.map((blog: any) => (
                <BlogCardHorizontal post={blog} key={blog.id} layout={layout}></BlogCardHorizontal>
              ))}
            </div>

            {totalPages > 1 && (
              <div className='flex items-center justify-center gap-2 pt-4'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className='rounded-xl border-theme-primary/10 hover:bg-theme-primary/10 hover:text-theme-primary transition-all duration-300'
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>

                <div className='flex items-center gap-1.5'>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1;
                    const isActive = pageNumber === page;
                    return (
                      <Button
                        key={pageNumber}
                        variant={isActive ? "default" : "outline"}
                        size='sm'
                        onClick={() => handlePageChange(pageNumber)}
                        className={cn(
                          "min-w-9 h-9 rounded-xl font-bold transition-all duration-300",
                          isActive
                            ? "bg-theme-primary hover:bg-theme-primary/90 text-white shadow-lg shadow-theme-primary/20"
                            : "border-theme-primary/10 hover:bg-theme-primary/10 hover:text-theme-primary",
                        )}
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className='rounded-xl border-theme-primary/10 hover:bg-theme-primary/10 hover:text-theme-primary transition-all duration-300'
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default BlogCards;
