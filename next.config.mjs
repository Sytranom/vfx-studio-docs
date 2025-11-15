import nextMDX from '@next/mdx'

const withMDX = nextMDX()

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/vfx-studio-docs', 
};

export default withMDX(nextConfig);