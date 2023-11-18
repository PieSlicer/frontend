import { useRouter } from 'next/router';

import Image from "next/image";
import Link from 'next/link';

import { useNFTMetadata } from "@/hooks/nft";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { formatSCAddress } from '@/utils/scUtils';
import NFTABI from '@/abis/psnft.json';
import { parseEther } from 'viem';
import { useAccount } from "wagmi";


import { nounsURL } from '@/hooks/profilePicture';
import Layout from "@/components/layout/Layout";
import { Spinner, Profile, LeftArrowSVG, Button, Banner } from '@ensdomains/thorin';
import Logo from 'public/logo.jpeg';
import { useAuth } from '@/components/auth';


const TokenPage = () => {
  const router = useRouter();
  const rootCid = process.env.NEXT_PUBLIC_SLICER_CID as string; //TODO: query from contract
  const { contractAddress, tokenId } = router.query;
  //const { isConnected } = useAuth();
  const { isConnected } = useAccount();


  const { metadata: nft, loading, owners } = useNFTMetadata({ cid: rootCid, tokenId, contractAddress });
  const imageUrl = (nft && nft?.image) ? nft?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/') : '';

  const Ariane = () => {
    return (
      <div className="flex items-center space-x-2 my-10">
        <Link href="/marketplace"> <LeftArrowSVG/> </Link>
        <span>Marketplace / {nft?.collection} / {nft?.name}</span>
      </div>
    )
  }

  const { config } = usePrepareContractWrite({
    address: formatSCAddress(contractAddress as string),
    abi: NFTABI.abi,
    functionName: 'mint',
    args: [tokenId],
    enabled: true,
    value: parseEther('0.001'),
    onSuccess(data) {
      console.log('onSuccess usePrepareContractWrite', data)
    },
    onError(error) {
      console.log('onError usePrepareContractWrite', error)
    },
  })
  const { data, write } = useContractWrite(config)
 
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const BuyButton = () => {
    if (!write) {
      return null
    }
    return (
      <div>
        <Button disabled={!write || isLoading} onClick={() => write()}>
          {isLoading ? 'Minting...' : 'Mint'}
        </Button>
        {isSuccess && (
          <div>
            Successfully minted your NFT!
            <div>
              <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <Spinner size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Ariane />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
        <div>
          <Image width={200} height={200} src={imageUrl ? imageUrl : Logo} className="mb-3 h-full w-2/3 mx-auto" alt="NFT image"/>
        </div>
        <div className='space-y-6 mr-10'>
          <p className="mt-1 text-xl font-bold md:mt-2">{nft?.collection} </p>
          <p className="text-lg font-bold text-navy-700"> {nft?.name} </p>
          {
            owners.length > 0 &&
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-navy-700">Owned by:</span>
              {
                owners?.map((owner, index) => {
                  return (
                    <span key={index}>
                      <Profile address={owner} avatar={nounsURL}></Profile>
                    </span>
                  )
                })
              }
            </div>
          }
          <p className="">{nft?.description} </p>
          {
            (!owners || owners.length === 0) && (
              isConnected ?
                <BuyButton />
              :
              <div className='pt-12'>
                <Banner alert="warning" title="">
                  Please login to buy this NFT
                </Banner>
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  );
};

export default TokenPage;
