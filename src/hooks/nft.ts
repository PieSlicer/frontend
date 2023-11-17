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

export const useNFTMetadata = ({ contractAddress, tokenId }: { contractAddress: string | string[] | undefined, tokenId: string | string[] | undefined }) => {
  const [metadata, setMetadata] = useState<any>({});
  const [owners, setOwners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contractAddress || !tokenId || typeof(contractAddress) !== 'string' || typeof(tokenId) !== 'string' ) return;
    fetchMetadata(contractAddress, tokenId);
    fetchOwner(contractAddress, tokenId);
  }, [contractAddress, tokenId]);

  const fetchMetadata = async (contractAddress: string, tokenId: string ) => {
    setLoading(true);
    const response = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    setMetadata(response);
    setLoading(false);
  };

  const fetchOwner = async (contractAddress: string, tokenId: string ) => {
    setLoading(true);
    const response = await alchemy.nft.getOwnersForNft(contractAddress, tokenId);
    setOwners(response.owners);
    setLoading(false);
  }

  return { metadata, loading, owners };
}
