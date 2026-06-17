import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static export to work with <Image /> tags
  },
};

export default nextConfig;