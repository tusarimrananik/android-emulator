/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['remotion', '@remotion/player', '@remotion/media-utils'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
