import NFTCard from "./NFTCard";

export default function MarketplaceGrid({ nfts } : { nfts: any[] }) {
  if (!nfts || nfts.length === 0) return (
    <div className="flex justify-center items-center h-96">
      <h1 className="text-2xl">No NFTs found</h1>
    </div>
  );
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-2'>
      {
        nfts.map((nft, i) => {
          return <NFTCard key={i} nft={nft} />
        })
      }
    </div>
  );
}