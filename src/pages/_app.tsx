import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// We are removing the next/font imports

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    // The font variables are no longer needed on the div
    <div>
      <Head>
        <title>VFX Studio Documentation</title>
        {/* Reverted to the classic <link> tag method for loading fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}