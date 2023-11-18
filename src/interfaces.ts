export interface NFT {
  acquiredAt: string;
  collection: {
    name: string;
    slug: string;
    externalUrl: string;
    bannerImageUrl: string;
  };
  contract: {
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
  };
  description: string;
  image: {
    cachedUrl: string;
    thumbnailUrl: string;
    pngUrl: string;
    contentType: string;
    size: number;
  };
  mint: {
    mintAddress: string;
    blockNumber: number;
    timestamp: number;
    transactionHash: string;
  };
  name: string;
  owners: string[];
  raw: {
    tokenUri: string;
    metadata: any;
    error: string;
  };
  timeLastUpdated: string;
  tokenId: string;
  tokenType: string;
  tokenUri: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  collection: string;
  address: string;
  tokenId: string;
}