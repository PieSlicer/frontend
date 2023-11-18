import { useState } from "react";

import Layout from "../components/layout/Layout";

import { useCollectionNFTs } from "@/hooks/nft";
import { useNFTFiles } from "@/hooks/contract";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";

import { useContractRead } from "wagmi";
import pieSlicerABI from '@/abis/slicerabi.json';
import { formatSCAddress } from '@/utils/scUtils';

import { Toast, Button, Spinner } from '@ensdomains/thorin';


export default function Marketplace() {

  const [contractAddress, setContractAddress] = useState<string>();
  const [error, setError] = useState<any>(undefined);
  const [toastState, setToastState] = useState<boolean>(false);

  const rootCid = process.env.NEXT_PUBLIC_SLICER_CID as string; //TODO: query from contract
  const { files: nfts, loading: loadingFiles } = useNFTFiles({rootCid, contractAddress: contractAddress as string});

  useContractRead({
    address: formatSCAddress(process.env.NEXT_PUBLIC_SLICER_ADDRESS),
    abi: pieSlicerABI.abi,
    functionName: 'getNFTContracts',
    async onSuccess(data: string[]) {
      if (data.length > 0) {
        setContractAddress(data[0]);
      } else {
        setError('No NFT contract found');
        setToastState(true);
      }
   },
   onError(error) {
      setError(error.message);
      setToastState(true);
   }
  })

  const { nfts: mintedNFTs, loading } = useCollectionNFTs({contractAddress: contractAddress as string});

  return (
    <Layout>
      {
        loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner size="large" />
          </div>
        ) : <MarketplaceGrid nfts={nfts as any[]} />
      }
      <Toast
        description={error}
        open={toastState}
        title="Error"
        variant="desktop"
        onClose={() => setToastState(false)}
      >
        <Button size="small" onClick={() => setToastState(false)}>
          Close
        </Button>
      </Toast>
    </Layout>
  );
}