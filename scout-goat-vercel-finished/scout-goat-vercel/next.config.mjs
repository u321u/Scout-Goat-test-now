/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // keeps route handlers on Node runtime on Vercel
  }
};

export default nextConfig;
