import { prisma } from "@repo/database";
import { parseDevice } from "../../utils/parseDevice";

export class UserService {
  static async getUsers(search: string = "") {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      where: search
        ? {
            OR: [
              { email: { contains: search, mode: "insensitive" as const } },
              { name: { contains: search, mode: "insensitive" as const } }
            ],
          }
        : undefined,
    });

    return users.map((user: any) => ({
      ...user,
      sessions: user.sessions.map((session: any) => ({
        ip: session?.ipAddress,
        userAgent: session?.userAgent,
        deviceInfo: parseDevice(session.userAgent),
      })),
    }));
  }
}
