/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'brickarchitect.com',
          pathname: '/content/parts-veryhighcontrast/**',
        },
      ],
    },

};

export default nextConfig;