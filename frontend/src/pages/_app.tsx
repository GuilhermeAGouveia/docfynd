import 'regenerator-runtime/runtime';
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/Theme";
import GlobalStyle from "../styles/Global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
          <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;