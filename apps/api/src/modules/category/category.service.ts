import { prisma } from "@repo/database";
import { StatusCodes } from "http-status-codes";
import { generateSlug, AppError } from "@utils";

export class CategoryService {
  static async getCategories() {
    return prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async createCategory(title: string) {
    const slug = generateSlug(title);
    try {
      return await prisma.category.create({
        data: {
          title,
          slug,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new AppError("Category title or slug already exists", StatusCodes.BAD_REQUEST);
      }
      throw error;
    }
  }
}

