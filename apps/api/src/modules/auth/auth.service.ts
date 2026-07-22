import { prisma } from "@repo/database";

export class AuthService {
  static async checkUser(email: string) {
    if (!email) {
      return { success: false, message: "Email is required" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, user };
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }
}
