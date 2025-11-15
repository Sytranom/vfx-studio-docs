import nextMDX from '@next/mdx'

const withMDX = nextMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  
  // Comment out basePath for local development.
  // basePath: '/vfx-studio-docs',
};

export default withMDX(nextConfig);