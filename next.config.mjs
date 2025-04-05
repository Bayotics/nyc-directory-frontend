/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add this section to configure the sitemap generation
  experimental: {
    // This will make the sitemap generate at runtime instead of build time
    // which helps avoid build errors when the database isn't available
    serverComponentsExternalPackages: ['mongodb'],
  },
};

export default nextConfig;

