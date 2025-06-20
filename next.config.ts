import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      },
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/research-guest',
        destination: '/',
        permanent: true,
      },
    ]
  },
  experimental: {
    proxyTimeout: 1000000
  }
};

export default nextConfig;
