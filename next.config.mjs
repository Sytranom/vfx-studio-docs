import nextMDX from '@next/mdx'

const withMDX = nextMDX()

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  // comment out the basePath line when working locally
  basePath: '/vfx-studio-docs', 
};

export default withMDX(nextConfig);