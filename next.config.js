/** @type {import('next').NextConfig} */
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig = {
  images: {
    unoptimized: true, // Disable Next.js image optimization
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "charlie.icu",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;

// Initialize OpenNext for Cloudflare
initOpenNextCloudflareForDev();
