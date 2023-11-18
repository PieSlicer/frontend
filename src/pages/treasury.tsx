import { useState } from "react";
import Layout from "../components/layout/Layout";

import { useContractRead } from "wagmi";
import pieSlicerABI from '@/abis/slicerabi.json';
import treasuryABI from '@/abis/treasury.json';
import { formatSCAddress } from '@/utils/scUtils';
import { useContractBalance } from "@/hooks/contract";

import { Toast, Button, Card, Typography, Heading, CountdownCircle } from '@ensdomains/thorin'


export default function Treasury() {

  const [treasuryAddress, setTreasuryAddress] = useState<string | undefined>(undefined);
  const [nextDistribution, setNextDistribution] = useState<string>();
  const [nbHolders, setNbHolders] = useState<number>();
  const [nbNFTsSold, setNbNFTsSold] = useState<number>();
  const [secondsUntilDistribution, setSecondsUntilDistribution] = useState<number>(0);
  const [error, setError] = useState<any>(undefined);
  const [toastState, setToastState] = useState<boolean>(false);

  const {balance, loading} = useContractBalance({contractAddress: treasuryAddress});

  useContractRead({
    address: formatSCAddress(process.env.NEXT_PUBLIC_SLICER_ADDRESS),
    abi: pieSlicerABI.abi,
    functionName: 'distributionTreasury',
    async onSuccess(data: string) {
      setTreasuryAddress(data);
   },
   onError(error) {
      setError(error.message);
      setToastState(true);
   }
  })

  useContractRead({
    address: formatSCAddress(process.env.NEXT_PUBLIC_SLICER_ADDRESS),
    abi: pieSlicerABI.abi,
    functionName: 'getHolders',
    async onSuccess(data: string[]) {
      setNbHolders(data.length);
   },
   onError(error) {
      setError(error.message);
      setToastState(true);
   }
  })

  useContractRead({
    address: formatSCAddress(process.env.NEXT_PUBLIC_SLICER_ADDRESS),
    abi: pieSlicerABI.abi,
    functionName: 'totalTokens',
    async onSuccess(data: number) {
      if (data !== undefined) setNbNFTsSold(Number(data));
   },
   onError(error) {
      setError(error.message);
      setToastState(true);
   }
  })

  useContractRead({
    address: formatSCAddress(treasuryAddress),
    abi: treasuryABI.abi,
    functionName: 'distributionTime',
    async onSuccess(data: string) {
      console.log(data);
      const date = new Date (Number(data) * 1000).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;
      // get number of seconds until the date
      const seconds = Math.floor((new Date(date).getTime() - new Date().getTime()) / 1000);
      setNextDistribution(date);
      setSecondsUntilDistribution(seconds);
   },
   onError(error) {
      setError(error.message);
      setToastState(true);
   }
  })

  return (
    <Layout>
      <div className="space-y-8 my-10 w-fit mx-auto">
        <Heading className="text-3xl">Pie Slicer DAO</Heading>
        <Typography>This treasury exists for Pie Slicer DAO to allocate resources to support public goods, and redistribute profits to all the holders</Typography>
      </div>
      <div>
      <div className="flex justify-center">
        <Card className="w-3/4">
          <Heading>Treasury</Heading>
          <div className="flex justify-between">
            <div className="space-4 flex flex-col items-center">
              <Typography>Balance:</Typography>
              <Typography>{balance} ETH</Typography>
            </div>
            <div className="space-4 flex flex-col items-center">
              <Typography>Nb holders:</Typography>
              <Typography>{nbHolders}</Typography>
            </div>
            <div className="space-4 flex flex-col items-center">
              <Typography>NFTs sold:</Typography>
              <Typography>{nbNFTsSold}</Typography>
            </div>
            <div className="space-4 flex flex-col items-center">
              <Typography>Next distribution:</Typography>
              <Typography>{nextDistribution}</Typography>
              <CountdownCircle countdownSeconds={secondsUntilDistribution} size="large"/>
            </div>
          </div>
        </Card>
      </div>

      </div>
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