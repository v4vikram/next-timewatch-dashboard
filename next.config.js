/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: [
      'http://localhost:3000'
    ],
    remotePatterns: [
      {
        protocol: 'http', 
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;

