import nextMDX from '@next/mdx'

const withMDX = nextMDX()

const isProd = process.env.NODE_ENV === 'production';
const repoName = '/vfx-studio-docs'; 
const basePath = isProd ? repoName : '';

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export',
  images: { unoptimized: true },
  basePath: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  }
};

export default withMDX(nextConfig);