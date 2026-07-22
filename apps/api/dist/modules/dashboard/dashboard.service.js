"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const database_1 = require("@repo/database");
class DashboardService {
    static async getStats() {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const [totalUsers, totalBlogs, activeBlogs, totalFeedbacks, blogsByMonth, categoryStats, recentBlogs, recentFeedbacks,] = await Promise.all([
            database_1.prisma.user.count(),
            database_1.prisma.post.count(),
            database_1.prisma.post.count({ where: { status: "active" } }),
            database_1.prisma.feedback.count(),
            database_1.prisma.post.groupBy({
                by: ["createdAt"],
                where: {
                    createdAt: { gte: sixMonthsAgo },
                },
                _count: true,
            }),
            database_1.prisma.post.groupBy({
                by: ["category"],
                _count: true,
            }),
            database_1.prisma.post.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    createdAt: true,
                    status: true,
                },
            }),
            database_1.prisma.feedback.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                include: {
                    post: {
                        select: { title: true },
                    },
                },
            }),
        ]);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyTrendMap = {};
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const label = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            monthlyTrendMap[label] = 0;
        }
        blogsByMonth.forEach((item) => {
            const d = new Date(item.createdAt);
            const label = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            if (monthlyTrendMap[label] !== undefined) {
                monthlyTrendMap[label] += item._count;
            }
        });
        const formattedMonthlyTrend = Object.entries(monthlyTrendMap).map(([name, count]) => ({
            name,
            count,
        }));
        return {
            totalUsers,
            totalBlogs,
            activeBlogs,
            totalFeedbacks,
            monthlyTrend: formattedMonthlyTrend,
            categoryDistribution: categoryStats.map((item) => ({
                name: item.category,
                value: item._count,
            })),
            recentBlogs,
            recentFeedbacks,
        };
    }
}
exports.DashboardService = DashboardService;
