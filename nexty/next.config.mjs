/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'next-ecommerce-api.vercel.app',
              port: '',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'cdn.dummyjson.com',
              port: '',
              pathname: '/**',
          },
      ],
  },
};

export default nextConfig;
