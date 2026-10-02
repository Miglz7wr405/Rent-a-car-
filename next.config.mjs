/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" }
    ]
  },
  experimental: {
    serverActions: { bodySizeLimit: "6mb" }
  }
};

export default nextConfig;
