/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    // In case of SVG
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
