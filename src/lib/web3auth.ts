import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, } from "@web3auth/base";
import { Chain } from "wagmi";

export function initWeb3authInstance(chains: Chain[]) {
  // Create Web3Auth Instance
  const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0] as string,
  };

  const web3AuthInstance = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string,
    chainConfig,
    web3AuthNetwork: 'sapphire_devnet',
    enableLogging: true,
  });

  // Add openlogin adapter for customisations
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      uxMode: "redirect",
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);
  return web3AuthInstance;
}

export default function Web3AuthConnectorInstance(chains: Chain[]) {
const web3AuthInstance = initWeb3authInstance(chains);
return new Web3AuthConnector({
  chains: chains as any,
  options: {
    web3AuthInstance,
  },
});
}