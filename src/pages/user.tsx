import { useState } from "react";
import Layout from "../components/layout/Layout";

import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";

import pieSlicerABI from '@/abis/slicerabi.json';
import treasuryABI from '@/abis/treasury.json';
import { formatSCAddress } from '@/utils/scUtils';

import { useUserNFT } from "@/hooks/nft";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";

import { Toast, Button, Card, Typography, Heading, CountdownCircle } from '@ensdomains/thorin';


export default function Profile() {

  const [contractAddress, setContractAddress] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const { address, isConnected } = useAccount();
  const { nfts, loading: loadingNFT } = useUserNFT({address: address as string});

  useContractRead({
    address: formatSCAddress(process.env.NEXT_PUBLIC_SLICER_ADDRESS),
    abi: pieSlicerABI.abi,
    functionName: 'getNFTContracts',
    async onSuccess(data: string[]) {
      if (data.length > 0) {
        setContractAddress(data[0]);
      }
      setLoading(false);
   },
   onError(error) {
      setLoading(false);
   }
  })

  if (!isConnected) {
    return (
      <Layout>
        <Heading>Connect your wallet first</Heading>
      </Layout>
    )
  }
  return (
    <Layout>
      <Heading>Wecome to your dashboard </Heading>
      <MarketplaceGrid nfts={nfts as any[]} contractAddress={contractAddress as string} />
    </Layout>
  )
}