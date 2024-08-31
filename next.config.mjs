/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['upload.wikimedia.org'],
  },
  env: {
    WS_ENDPOINT: process.env.WS_ENDPOINT,
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
