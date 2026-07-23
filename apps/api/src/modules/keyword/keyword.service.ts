import { prisma } from "@repo/database";
import { StatusCodes } from "http-status-codes";
import { generateSlug, AppError } from "@utils";

export class KeywordService {
  static async getKeywords() {
    return prisma.keywords.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getKeywordById(id: string) {
    const keyword = await prisma.keywords.findUnique({
      where: { id },
    });
    if (!keyword) {
      throw new AppError("Keyword not found", StatusCodes.NOT_FOUND);
    }
    return keyword;
  }

  static async createKeyword(title: string) {
    const slug = generateSlug(title);
    try {
      return await prisma.keywords.create({
        data: {
          title,
          slug,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new AppError("Keyword title or slug already exists", StatusCodes.BAD_REQUEST);
      }
      throw error;
    }
  }

  static async updateKeyword(id: string, title: string, slug?: string) {
    const exists = await prisma.keywords.findUnique({
      where: { id },
    });
    if (!exists) {
      throw new AppError("Keyword not found", StatusCodes.NOT_FOUND);
    }

    const cleanSlug = slug || generateSlug(title);
    try {
      return await prisma.keywords.update({
        where: { id },
        data: {
          title,
          slug: cleanSlug,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new AppError("Keyword title or slug already exists", StatusCodes.BAD_REQUEST);
      }
      throw error;
    }
  }

  static async deleteKeyword(id: string) {
    const exists = await prisma.keywords.findUnique({
      where: { id },
    });
    if (!exists) {
      throw new AppError("Keyword not found", StatusCodes.NOT_FOUND);
    }

    return prisma.keywords.delete({
      where: { id },
    });
  }
}

