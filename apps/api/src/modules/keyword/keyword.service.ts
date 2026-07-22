import { prisma } from "@repo/database";
import { generateSlug } from "../../utils/generateSlug";

export class KeywordService {
  static async getKeywords() {
    return prisma.keywords.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getKeywordById(id: string) {
    return prisma.keywords.findUnique({
      where: { id },
    });
  }

  static async createKeyword(title: string) {
    const slug = generateSlug(title);
    return prisma.keywords.create({
      data: {
        title,
        slug,
      },
    });
  }

  static async updateKeyword(id: string, title: string, slug?: string) {
    const cleanSlug = slug || generateSlug(title);
    return prisma.keywords.update({
      where: { id },
      data: {
        title,
        slug: cleanSlug,
      },
    });
  }

  static async deleteKeyword(id: string) {
    return prisma.keywords.delete({
      where: { id },
    });
  }
}
