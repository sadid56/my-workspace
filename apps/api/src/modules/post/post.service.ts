import { prisma } from "@repo/database";

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
    return prisma.post.findUnique({
      where: {
        slug,
        status: "active",
      },
    });
  }

  static async getBlogDetailsMetaData(slug: string) {
    return prisma.post.findUnique({
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
    return prisma.post.create({
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
  }

  static async getAllBlogsRaw() {
    return prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async updatePostStatus(id: string, status: any) {
    return prisma.post.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  static async getBlogById(id: string) {
    return prisma.post.findUnique({
      where: { id },
    });
  }
}
