import { useState, useEffect } from "react";
import { alchemy } from "../lib/alchemy";
import { NFT } from "@/interfaces";
import { getNFTMetadata } from "@/hooks/contract";

export const useUserNFTs = ({ address } : { address: string }) => {
  const [nfts, setNFTs] = useState<any[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    fetchNFT(address);
  }, [address]);

  const fetchNFT = async (address: string) => {
    setLoading(true);
    const response = await alchemy.nft.getNftsForOwner(address);
    setNFTs(response.ownedNfts);
    setLoading(false);
  };

  return { nfts, loading };
}

export const fetchOwner = async (contractAddress: string, tokenId: string ) => {
  let owners: any[] = [];
  try {
    const response = await alchemy.nft.getOwnersForNft(contractAddress, tokenId);
    owners = response.owners;
  } catch (error) {
    console.log(error);
  }
  return owners;
}

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

export const useNFTMetadata = ({
  cid,
  contractAddress,
  tokenId
  } :
  {
    cid: string,
    contractAddress: string | string[] | undefined,
    tokenId: string | string[] | undefined
  }) => {
  const [metadata, setMetadata] = useState<any>({});
  const [owners, setOwners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cid || !tokenId || typeof(contractAddress) !== 'string' || typeof(tokenId) !== 'string' ) return;
    init();
  }, [contractAddress, tokenId, cid]);

  async function init() {
    if (!cid || !tokenId || typeof(contractAddress) !== 'string' || typeof(tokenId) !== 'string' ) return;
    fetchMetadata(cid, tokenId);
    const owners = await fetchOwner(contractAddress, tokenId);
    setOwners(owners);
  }

  const fetchMetadata = async (cid: string, tokenId: string ) => {
    setLoading(true);
    const response = await getNFTMetadata(`${tokenId}.json`, cid, contractAddress as string);
    setMetadata(response);
    setLoading(false);
  };

  return { metadata, loading, owners };
}
