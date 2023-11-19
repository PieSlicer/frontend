import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin';

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import Web3AuthConnectorInstance from "@/lib/web3auth";
import { sepolia, gnosis } from 'wagmi/chains';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
 

// Setup chain
const currentChain = process.env.NEXT_PUBLIC_MODE === 'production' ? gnosis : sepolia;
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [currentChain],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '' }),
  ]
);

// Set up client
const config = createConfig({
  autoConnect: true,
  connectors: [
    Web3AuthConnectorInstance(chains) as any,
  ],
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
        <WagmiConfig config={config}>
          <Component {...pageProps} />
        </WagmiConfig>
    </ThemeProvider>
  );
}
