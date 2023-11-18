import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin';

import { AuthProvider } from '@/components/auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
    </ThemeProvider>
  );
}
