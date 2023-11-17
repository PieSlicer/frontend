import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  //network: Network.ETH_SEPOLIA, // TODO: switch to Sepolia testnet when smart contract is deployed
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);