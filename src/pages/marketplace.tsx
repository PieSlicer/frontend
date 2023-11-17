import Layout from "../components/layout/Layout";

import { useCollectionNFTs } from "@/hooks/nft";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";
import { Spinner } from '@ensdomains/thorin';


export default function Marketplace() {

  // TODO: get address from smart contract
  const contractAddress = "0xf61F24c2d93bF2dE187546B14425BF631F28d6dC";

  const { nfts, loading } = useCollectionNFTs({contractAddress});

  return (
    <Layout>
      {
        loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner size="large" />
          </div>
        ) : <MarketplaceGrid nfts={nfts} />
      }
    </Layout>
  );
}