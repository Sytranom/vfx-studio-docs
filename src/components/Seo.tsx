import Head from "next/head";
import { useRouter } from "next/router";

interface SeoProps {
  title: string;
  description?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description }) => {
  const router = useRouter();
  const siteTitle = "VFX Studio Docs";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  const siteUrl = "https://sytranom.github.io/vfx-studio-docs"; 
  const canonicalUrl = siteUrl + (router.asPath === "/" ? "" : router.asPath).split('?')[0];
  const defaultDescription = "The official documentation for VFX Studio, an all-in-one toolkit for Roblox developers.";
  const pageDescription = description || defaultDescription;
  const imageUrl = `${siteUrl}/default-og-image.png`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default Seo;