import "@/styles/globals.css";
// The import for EasingVisualizer.css should be removed from here
import type { AppProps } from "next/app";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className={`${inter.variable} ${jetbrains_mono.variable}`}>
        <Head>
          <title>VFX Studio Documentation</title>
        </Head>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}