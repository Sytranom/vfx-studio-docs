import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
// Corrected imports for the Pages Router
import Seo from "@/components/Seo"; // Import Seo component
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";

import Layout from "@/components/Layout";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";

// Define the shape of our props, which is correct
interface DocsPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
}

export default function DocsPage({ source, frontMatter }: DocsPageProps) {
  return (
    // Pass title and description from the MDX frontmatter to the Layout
    <Layout
      breadcrumbs={frontMatter.breadcrumbs || "Docs"}
      title={frontMatter.title || "Docs"}
      description={frontMatter.description}
    >
      <article className="doc-article">
        <MDXRemote {...source} components={{ InfoBox, CodeBlock }} />
      </article>
    </Layout>
  );
}

const docsDirectory = path.join(process.cwd(), "_docs");

// This function is correct and does not need to change
export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = await fs.readdir(docsDirectory);
  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.mdx$/, ""),
    },
  }));

  return { paths, fallback: false };
};

// This function is also correct and does not need to change
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) {
    return { notFound: true };
  }

  const filePath = path.join(docsDirectory, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(fileContents);
    const mdxSource = await serialize(content, { parseFrontmatter: false });

    return {
      props: {
        source: mdxSource,
        frontMatter: data,
      },
    };
  } catch (error) {
    // If the file doesn't exist, return a 404
    return { notFound: true };
  }
};
