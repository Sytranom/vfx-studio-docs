import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    // --- THIS IS THE FIX ---
    // The suppressHydrationWarning prop tells React to ignore unavoidable
    // differences in attributes on the <html> tag. This is the standard and
    // recommended way to fix hydration errors caused by theme-switching
    // libraries like next-themes.
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}