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