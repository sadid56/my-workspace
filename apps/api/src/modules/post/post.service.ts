import { prisma } from "@repo/database";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@utils";

export class PostService {
  static async getBlogs(category?: string, search?: string, page: number = 1, limit: number = 3) {
    const skip = (page - 1) * limit;
    const whereClause: any = {
      status: "active",
      ...(category && {
        category: {
          equals: category,
          mode: "insensitive",
        },
      }),
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    };

    const [blogs, totalCount] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.post.count({
        where: whereClause,
      }),
    ]);

    return { blogs, totalCount };
  }

  static async getAllBlogSlugs() {
    return prisma.post.findMany({
      select: { slug: true },
      where: { status: "active" },
    });
  }

  static async getBlogDetails(slug: string) {
    const blog = await prisma.post.findUnique({
      where: {
        slug,
        status: "active",
      },
    });
    if (!blog) {
      throw new AppError("Blog not found", StatusCodes.NOT_FOUND);
    }
    return blog;
  }

  static async getBlogDetailsMetaData(slug: string) {
    const meta = await prisma.post.findUnique({
      where: {
        slug,
        status: "active",
      },
      select: {
        title: true,
        coverImage: true,
        slug: true,
        descriptions: true,
      },
    });
    if (!meta) {
      throw new AppError("Blog metadata not found", StatusCodes.NOT_FOUND);
    }
    return meta;
  }

  static async getRecentBlogs() {
    return prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      where: {
        status: "active",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        readTime: true,
      },
    });
  }

  static async createPost(data: any, coverImageUrl: string) {
    try {
      return await prisma.post.create({
        data: {
          title: data.title,
          slug: data.slug,
          tags: data.tags || [],
          coverImage: coverImageUrl,
          descriptions: data.descriptions,
          category: data.category,
          readTime: Number(data.readTime) || 0,
          content: data.content,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new AppError("Blog title or slug already exists", StatusCodes.BAD_REQUEST);
      }
      throw error;
    }
  }

  static async getAllBlogsRaw() {
    return prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async updatePostStatus(id: string, status: any) {
    const exists = await prisma.post.findUnique({
      where: { id },
    });
    if (!exists) {
      throw new AppError("Blog not found", StatusCodes.NOT_FOUND);
    }

    return prisma.post.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  static async getBlogById(id: string) {
    const blog = await prisma.post.findUnique({
      where: { id },
    });
    if (!blog) {
      throw new AppError("Blog not found", StatusCodes.NOT_FOUND);
    }
    return blog;
  }
}

