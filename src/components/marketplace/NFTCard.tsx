import Image from "next/image";
import Link from "next/link";

import { NFTMetadata } from "@/interfaces";
import { Card } from '@ensdomains/thorin';

export default function NFTCard( { nft } : {nft : NFTMetadata}) {
  const imageUrl = nft?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/') || '';
  return (
      <>
        <div className="flex flex-col justify-center items-center">
            <Card className="!z-5 relative flex flex-col max-w-[300px] bg-white bg-clip-border border-0 shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px] bg-white">
                <div className="h-full w-full">
                    <div className="relative w-full">
                        <Link href={`/marketplace/${nft.address}/${nft.tokenId}`}>
                          <Image width={100} height={100} src={imageUrl || '/logo.jpeg'} className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full" alt=""/>
                        </Link>
                    </div>
                    <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                        <div className="mb-2">
                            <p className="text-lg font-bold text-navy-700"> {nft.name} </p>
                            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">By {nft.collection} </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
      </>
  );
}