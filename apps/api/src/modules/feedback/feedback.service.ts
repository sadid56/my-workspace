import { prisma } from "@repo/database";

export class FeedbackService {
  static async getFeedbacks(search: string = "", page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const whereClause = {
      OR: [
        { feedback: { contains: search, mode: "insensitive" as const } },
        { post: { title: { contains: search, mode: "insensitive" as const } } },
        { user: { name: { contains: search, mode: "insensitive" as const } } },
      ],
    };

    const [items, total] = await Promise.all([
      prisma.feedback.findMany({
        where: whereClause,
        include: {
          post: {
            select: {
              title: true,
              slug: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.feedback.count({
        where: whereClause,
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async createFeedback(data: any, userId?: string) {
    return prisma.feedback.create({
      data: {
        emoji: data.emoji,
        feedback: data.feedback,
        anonymous: Boolean(data.anonymous),
        postId: data.postId,
        userId: userId || undefined,
      },
    });
  }

  static async deleteFeedback(id: string) {
    return prisma.feedback.delete({
      where: { id },
    });
  }
}
