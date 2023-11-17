import { useState, useEffect } from "react";
import { alchemy } from "../lib/alchemy";
import { NFT } from "@/interfaces";

export const useCollectionNFTs = ({ contractAddress } : { contractAddress: string }) => {
  const [nfts, setNFTs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contractAddress) return;
    fetchNFTs(contractAddress);
  }, [contractAddress]);

  const fetchNFTs = async (address: string) => {
    setLoading(true);
    const response = await alchemy.nft.getNftsForContract(address);
    setNFTs(response.nfts);
    setLoading(false);
  };

  return { nfts, loading };
}
