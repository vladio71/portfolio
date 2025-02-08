/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  images: {
    domains: ["r4.wallpaperflare.com", "ucarecdn.com"],
  },
};

module.exports = nextConfig;
