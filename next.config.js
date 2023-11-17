/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nft-cdn.alchemy.com', 'ipfs.io'],
  },
}

module.exports = nextConfig
