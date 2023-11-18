import { Web3AuthModalPack, Web3AuthConfig } from '@safe-global/auth-kit';
import { Web3AuthOptions } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';

import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

export const CHAIN_CONFIG = {
  mainnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1", // Please use 0x1 for Mainnet
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
  } as CustomChainConfig,
  sepolia: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x2a", // Please use 0x2a for Sepolia
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Sepolia",
    blockExplorer: "https://etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
  } as CustomChainConfig,
  gnosis: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x2a", // Please use 0x2a for Gnosis
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Gnosis",
    blockExplorer: "https://etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
  } as CustomChainConfig,

} as const;


// Instantiate and initialize the pack
export default async function initWeb3Auth() {
  const options: Web3AuthOptions = {
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string,
    web3AuthNetwork: "testnet",  // TODO: change to ETH_SEPOLIA when smart contract is deployed
    chainConfig: CHAIN_CONFIG['mainnet'], // TODO: change to CHAIN_CONFIG['sepolia'] when smart contract is deployed 
    uiConfig: {
      theme: 'dark',
      loginMethodsOrder: ['google']
    }
  };
  
  // https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters
  const modalConfig = {
  };
  
  // https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization
  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: 'none' 
    },
    adapterSettings: {
      uxMode: 'popup',
      whiteLabel: {
        name: 'Safe'
      }
    }
  });
  
  const web3AuthConfig: Web3AuthConfig = {
    txServiceUrl: 'https://safe-transaction-goerli.safe.global'
  };
  const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
  await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig });
  return web3AuthModalPack;
}