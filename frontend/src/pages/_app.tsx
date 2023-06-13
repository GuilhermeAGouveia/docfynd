import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/Theme";
import GlobalStyle from "../styles/Global";
import { SearchProvider } from "@/context/Search";
import { ResultProvider } from "@/context/FavoriteResult";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
