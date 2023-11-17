import NFTCard from "./NFTCard";

export default function MarketplaceGrid({ nfts } : { nfts: any[] }) {
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