/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Vercel/Cloudflare Pages hosting (digidan.co.za).
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimisation is unavailable in static export.
    unoptimized: true,
  },
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
};

export default nextConfig;
