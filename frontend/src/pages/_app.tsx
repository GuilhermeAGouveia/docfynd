import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/Theme";
import GlobalStyle from "../styles/Global";
import { SearchProvider } from "@/context/Search";
import { ResultProvider } from "@/context/FavoriteResult";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Docfynd</title>
      </Head>
      <GlobalStyle />
      <ResultProvider>
        <SearchProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </SearchProvider>
      </ResultProvider>
    </>
  );
}

export default MyApp;
