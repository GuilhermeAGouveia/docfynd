import "regenerator-runtime/runtime";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/Theme";
import GlobalStyle from "../styles/Global";
import { SearchProvider } from "@/context/Search";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <SearchProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SearchProvider>
    </>
  );
}

export default MyApp;
