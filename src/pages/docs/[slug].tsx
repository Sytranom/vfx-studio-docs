import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";

// --- NEW IMPORTS ---
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import Layout from "@/components/Layout";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";

interface DocsPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
}

export default function DocsPage({ source, frontMatter }: DocsPageProps) {
  return (
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

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = await fs.readdir(docsDirectory);
  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.mdx$/, ""),
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) {
    return { notFound: true };
  }

  const filePath = path.join(docsDirectory, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(fileContents);
    
    // --- UPDATED MDX SERIALIZATION ---
    const mdxSource = await serialize(content, {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug, // Adds IDs to headings
          [rehypeAutolinkHeadings, { behavior: "wrap" }], // Makes headings clickable
        ],
      },
    });

    return {
      props: {
        source: mdxSource,
        frontMatter: data,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};