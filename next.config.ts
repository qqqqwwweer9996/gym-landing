import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 프로토타입 placeholder 도메인. 최종본에서 images.unsplash.com / images.pexels.com 추가.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
