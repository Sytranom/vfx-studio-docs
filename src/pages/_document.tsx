import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Font Awesome is handled by the _app component to avoid FOUT */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
