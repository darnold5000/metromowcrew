import type { NextConfig } from "next";

import { siteAllowIndexing } from "./src/config/site";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/gallery", destination: "/projects", permanent: true },
      { source: "/services/mowing", destination: "/services/lawn-mowing", permanent: true },
      { source: "/request-estimate", destination: "/request-quote", permanent: false },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
    ];
  },
  async headers() {
    const robotsValue = siteAllowIndexing ? "index, follow" : "noindex, nofollow";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: robotsValue },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/request-quote",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://clienthub.getjobber.com https://www.jobberonline.com; frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
