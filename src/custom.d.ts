declare module 'gray-matter' {
  import { Buffer } from 'buffer';

  interface GrayMatterFile<T> {
    content: T;
    data: { [key: string]: any };
    excerpt?: string;
    isEmpty: boolean;
    orig: Buffer;
    language: string;
    matter: string;
    stringify(lang: string): string;
  }

  interface GrayMatterOption<T, O> {
    parser?: (input: string, options: O) => T;
    eval?: boolean;
    excerpt?: boolean | ((file: GrayMatterFile<T>, options: O) => string);
    excerpt_separator?: string;
    engines?: { [key: string]: { parse: (input: string) => object, stringify?: (data: object) => string } | ((input: string) => object) };
    language?: string;
    delimiters?: string | [string, string];
  }

  function matter(
    input: string | Buffer | { content: string },
    options?: GrayMatterOption<string, any>
  ): GrayMatterFile<string>;

  export = matter;
}