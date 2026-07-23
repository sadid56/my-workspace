import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    qualities: [75, 85, 95, 100, 50],
  },
  devIndicators: false,
  transpilePackages: ["@repo/shared"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
