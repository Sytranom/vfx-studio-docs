import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout"; 

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

const { title = '', breadcrumbs = '', description = '' } = pageProps;

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className={`${inter.variable} ${jetbrains_mono.variable}`}>
        <Head>
          {}
          <title>VFX Studio Documentation</title>
          {}
          <meta name="google-site-verification" content="Tr8tL3vHkL0x5dFoV5_F-ltejyJRotA2yy1sPgNmWUU" />
        </Head>
        {}
        <Layout
          title={title}
          breadcrumbs={breadcrumbs}
          description={description}
        >
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}