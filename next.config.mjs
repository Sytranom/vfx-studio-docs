import nextMDX from '@next/mdx'

const withMDX = nextMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // We're using the App Router which is the future of Next.js
  // This enables it.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // --- CONFIG FOR GITHUB PAGES ---
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);