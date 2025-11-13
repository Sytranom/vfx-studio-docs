import Head from "next/head";

interface SeoProps {
  title: string;
  description?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description }) => {
  const siteTitle = "VFX Studio Docs";

  // FIX: Wrapped the string in backticks (`) to create a template literal
  const fullTitle = `${title} | ${siteTitle}`;

  const defaultDescription =
    "The official documentation for VFX Studio, an all-in-one toolkit for Roblox developers.";

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:type" content="website" />
      {/* Optional: Add an og:image for social media previews */}
      {/* <meta property="og:image" content="https://your-site.com/og-image.png" /> */}
    </Head>
  );
};

export default Seo;
