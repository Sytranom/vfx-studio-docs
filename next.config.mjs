import nextMDX from '@next/mdx'

const withMDX = nextMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // --- CONFIG FOR GITHUB PAGES ---
  output: 'export',
  images: {
    unoptimized: true,
  },
 basePath: '/vfx-studio-docs', 
};

export default withMDX(withMDX(nextConfig));