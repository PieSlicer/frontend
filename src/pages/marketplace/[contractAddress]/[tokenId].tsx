import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Image from "next/image";
import Link from 'next/link';

import { useNFTMetadata } from "@/hooks/nft";

import { nounsURL } from '@/hooks/profilePicture';
import Layout from "@/components/layout/Layout";
import { Spinner, Profile, LeftArrowSVG } from '@ensdomains/thorin';
import Logo from 'public/logo.jpeg';


const TokenPage = () => {
  const router = useRouter();
  const rootCid = process.env.NEXT_PUBLIC_SLICER_CID as string; //TODO: query from contract
  const { contractAddress, tokenId } = router.query;

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
        </div>
      </div>
    </Layout>
  );
};

export default TokenPage;
