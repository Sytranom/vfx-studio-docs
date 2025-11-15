import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

import Layout from "@/components/Layout";
import InfoBox from "@/components/InfoBox";
import MdxImage from "@/components/MdxImage";
import PaginationLink from "@/components/PaginationLink";
import Steps from '@/components/Steps';

import { navigation } from '@/config/siteConfig';

interface DocsPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
  pagination: {
    prev: { title: string; href: string } | null;
    next: { title: string; href: string } | null;
  };
}

export default function DocsPage({ source, frontMatter, pagination }: DocsPageProps) {
  return (
    <Layout
      breadcrumbs={frontMatter.breadcrumbs || "Docs"}
      title={frontMatter.title || "Docs"}
      description={frontMatter.description}
    >
      <article className="doc-article">
        <MDXRemote {...source} components={{ InfoBox, img: MdxImage, Steps }} />
      </article>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border-color pt-8">
        {pagination.prev ? <PaginationLink type="prev" {...pagination.prev} /> : <div />}
        {pagination.next ? <PaginationLink type="next" {...pagination.next} /> : <div />}
      </div>
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

  const allDocs = navigation
    .flatMap(section => section.links)
    .flatMap(link => link.children || [link])
    .filter(link => link.href.startsWith('/docs/'));

  const currentIndex = allDocs.findIndex(doc => doc.href === `/docs/${slug}`);
  
  const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const next = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(fileContents);
    
    const mdxSource = await serialize(content, {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ['anchor'] } }],
          [rehypePrettyCode, {
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
            keepBackground: false,
          }],
        ],
      },
    });

    return {
      props: {
        source: mdxSource,
        frontMatter: data,
        pagination: {
          prev: prev ? { title: prev.title, href: prev.href } : null,
          next: next ? { title: next.title, href: next.href } : null,
        },
      },
    };
  } catch (error) {
    console.error("Error during getStaticProps for slug:", slug, error);
    return { notFound: true };
  }
};