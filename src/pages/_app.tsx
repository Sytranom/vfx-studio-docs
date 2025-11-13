import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter, JetBrains_Mono } from "next/font/google";

config.autoAddCss = false;

// Configure and load the fonts with next/font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // CSS Variable for the sans-serif font
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono", // CSS Variable for the mono font
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Add the font variables to the root HTML element
    <div className={`${inter.variable} ${jetbrains_mono.variable}`}>
      <Head>
        <title>VFX Studio Documentation</title>
        {/* The old <link> tags for fonts are no longer needed */}
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
