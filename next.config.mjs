import createMDX from "@next/mdx";

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
  // Field notes are authored as .mdx pages under app/notes/<slug>/.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
