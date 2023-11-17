import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
