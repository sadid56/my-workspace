import { prisma } from "@repo/database";
import { generateSlug } from "../../utils/generateSlug";

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
    return prisma.category.create({
      data: {
        title,
        slug,
      },
    });
  }
}
