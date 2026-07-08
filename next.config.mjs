/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ali-khedr-portfolio-next",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "ali-khedr.weebly.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
