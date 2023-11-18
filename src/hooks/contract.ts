import { useState, useEffect } from "react";
import { alchemy } from "../lib/alchemy";

export const useContractBalance = ({ contractAddress } : { contractAddress: string | undefined }) => {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] =  useState<any>();

  useEffect(() => {
    if (!contractAddress) return;
    fetchBalance(contractAddress);
  }, [contractAddress]);

  const fetchBalance = async (address: string) => {
    setLoading(true);
    const response = await alchemy.core.getBalance(address);
    setBalance(response.toString());
    setLoading(false);
  };

  return { balance, loading, error };
}
export async function getNFTMetadata(fileName: string, cid: string, contractAddress: string) {
  const response = await fetch("https://ipfs.io/ipfs/" + cid + "/" + fileName);
  let content = await response.json();
  return {
    name: content.properties.name,
    description: content.properties.description,
    image: content.properties.image,
    collection: content.title,
    tokenId: fileName.replace('.json', ''),
    address: contractAddress,
  }
}

import { Web3Storage }  from 'web3.storage';
const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN as string });
export const useNFTFiles = ({ rootCid, contractAddress } : { rootCid: string, contractAddress: string }) => {
  const [files, setFiles] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] =  useState<any>();

  useEffect(() => {
    if (!rootCid || !contractAddress) return;
    fetchFiles(rootCid);
  }, [rootCid, rootCid, contractAddress]);

  const fetchFiles = async (rootCid: string) => {
    setLoading(true);
    const res = await client.get(rootCid);
    if (!res || !res.ok) {
      setError(res?.statusText);
      return;
    }
    const storedFiles = await res.files();
    const metadata = [];
    for (const file of storedFiles) {
      const metadataFile = await getNFTMetadata(file.name, rootCid, contractAddress);
      metadata.push(metadataFile);
    }

    setFiles(metadata);
    setLoading(false);
  };

  return { files, loading, error };
}
